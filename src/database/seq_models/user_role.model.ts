import {Table, Column, Model, HasMany, PrimaryKey, AllowNull} from 'sequelize-typescript';

import {DataTypes} from 'sequelize';
import UserRole from "../../utils/user_roles.enum";

@Table
class UserRoleSQLModel extends Model {
    @Column({type: DataTypes.INTEGER, defaultValue: UserRole.USER, primaryKey: true})
    id;

    @Column({type: DataTypes.STRING, allowNull: false})
    name;
}

export default UserRoleSQLModel;