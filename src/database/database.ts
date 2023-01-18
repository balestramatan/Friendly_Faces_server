import {Sequelize} from 'sequelize';

const db_connection = new Sequelize('manage_appointments_db', 'root', null, {
    host: '127.0.0.1',
    dialect: 'mysql',
});

export default db_connection;