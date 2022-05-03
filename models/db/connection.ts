import { Sequelize } from 'sequelize';

const db = new Sequelize('db_express','root','',{
  host: 'localhost',
  dialect: 'mysql',
  logging: true
});

export default db;