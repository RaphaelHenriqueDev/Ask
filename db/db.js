import { Sequelize } from 'sequelize'

const conn = new Sequelize('questions', 'root', 'system', {
  host: '127.0.0.1',
  dialect: 'mysql',
})

export default conn
