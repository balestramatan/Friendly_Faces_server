import UserSQLModel from '../seq_models/user.seq.model';
import jwt from "jsonwebtoken";

class User {
    static async getAllUsers() {
        return await UserSQLModel.findAll();
    }

    static async getUserById(id) {
        return await UserSQLModel.findByPk(id);
    }

    static async getUserByPhoneNumber(phone_number) {
        return await UserSQLModel.findOne({
            where: {
                phone_number: phone_number
            }
        });
    }

    static createUser(user) {
        return UserSQLModel.create(user);
    }

    static async updateUser(user) {
        return await UserSQLModel.update(user, {
            where: {
                id: user.id
            }
        });
    }

    static async deleteUser(id) {
        return await UserSQLModel.destroy({
            where: {
                id: id
            }
        });
    }

    static async generateToken(user) {
        return jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
}

export default User;