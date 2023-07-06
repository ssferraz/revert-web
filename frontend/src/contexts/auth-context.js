import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let user = null;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      if (isAuthenticated) {
        user = JSON.parse(window.sessionStorage.getItem('user'));      
      } 
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: user
    });
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/authenticate', {
        email,
        password
      });
  
      const { data } = response;
  
      if (data.message === 'Usuário autenticado com sucesso!') {
        const user = {
          id: data.user._id,
          avatar: '/assets/avatars/avatar-blank.png',
          name: data.user.name,
          email: data.user.email
        };
  
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
  
        try {
          window.sessionStorage.setItem('authenticated', 'true');
          window.sessionStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
          console.error(err);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Please check your email and password');
    }
  };
    

  const signUp = async (name, email, password) => {
    try {
     await axios.post('http://localhost:3001/api/users', {
        name,  
        email,
        password
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('Erro ao criar usuário:', error.response.data.message);
      } else if (error.response) {
        throw new Error('Erro na resposta da API:', error.response);
      } else {
        throw new Error('Erro de requisição:', error);
      }
    }
  };

  const signOut = () => {
    try {
      window.sessionStorage.removeItem('user');
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const updateUser = (updatedUser) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: updatedUser
    });
  
    try {
      window.sessionStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
