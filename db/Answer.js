import { Sequelize } from 'sequelize'
import conn from './db.js'

const Answer = conn.define('answers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

Answer.sync({ force: false })

export default Answer
