import { Sequelize } from 'sequelize'
import conn from './db.js'

const Question = conn.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

Question.sync({ force: false })
  .then(() => {
    console.log('tabela criada com sucesso!!')
  })
  .catch((err) => {
    console.log(err)
  })
export default Question
