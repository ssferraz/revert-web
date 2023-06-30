const mongoose = require('mongoose');
const User = mongoose.model('User');

const userRepository = {
    create: async (user) => {
        const response = await UserModel.create(user);
        return response;
    },
    getAll: async () => {
        const users = await UserModel.find().select('-password -__v');
        return users;
    },
    get: async (id) => {
        const user = await UserModel.findById(id);
        return user;
    },
    delete: async (id) => {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    },
    deleteAll: async () => {
        await UserModel.deleteMany({});
    },
    update: async (id, user) => {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user);
        return updatedUser;
    },
    authenticate: async (user) => {
        const user = await User.findOne({
            email: user.email,
            password: user.password
        });
        return user;
    },
    
}

module.exports = userRepository;

exports.get = async() => {
    const res = await User.find(
        {}, '_id nickname city protection_code ');
    return res;
}

exports.getById = async(id) => {
    const res = await User.findById(id, '_id nickname city protection_code ');
    return res;
}
exports.getByNickname = async(nickname)=>{
    const res = await User.findOne({
        nickname:nickname
    }, '_id nickname protection_code indexQuestion answerQuestion');
    return res;

}

exports.create = async(data) => {
    var user = new User(data);
    await user.save();

}

exports.update = async(id, data) => {
    await User.findByIdAndUpdate(id,{
        $set: {
            nickname: data.nickname,
            password: data.password,
            protection_code: data.protection_code
        }
    });
}
exports.delete = async(id) => {
    await User.findByIdAndRemove(id);
}

exports.authenticate = async(data) => {
    const res = await User.findOne(
        {
            nickname: data.nickname,
            password: data.password 
        }
    );
    return res;
}