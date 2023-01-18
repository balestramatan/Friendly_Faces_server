import {Table, Column, Model, HasMany, PrimaryKey, AllowNull} from 'sequelize-typescript';

import {DataTypes} from 'sequelize';
import UserRoleSQLModel from "./user_role.model";

@Table
class UserSQLModel extends Model {
    @Column({type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false})
    id: DataTypes.AbstractDataTypeConstructor = DataTypes.UUIDV4;

    @Column({type: DataTypes.STRING, allowNull: false})
    name;

    @Column({type: DataTypes.STRING, allowNull: false})
    phone_number;

    @Column({type: DataTypes.STRING, allowNull: false})
    city;

    @Column({type: DataTypes.DATE, allowNull: false})
    birthday;

    @HasMany(() => UserRoleSQLModel)
    @Column({type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false})
    roles: UserRoleSQLModel[] = [];
}

export default UserSQLModel;