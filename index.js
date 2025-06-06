import express from 'express'
import ejs from 'ejs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import conn from './db/db.js'
import ask from './db/ask.js'
import Answer from './db/Answer.js'

conn
  .authenticate()
  .then(() => {
    console.log('conexão feita com o db!')
  })
  .catch((err) => {
    console.log(err)
  })

dotenv.config()
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  ask
    .findAll({ raw: true, order: [['id', 'DESC'] /*ASC*/] })
    .then((perguntas) => {
      res.render('index', {
        perguntas: perguntas,
      })
    })
})

app.get('/ask', (req, res) => {
  res.render('ask')
})

app.post('/saveask', (req, res) => {
  const title = req.body.title
  const description = req.body.description
  ask
    .create({ title, description })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Erro ao salvar a pergunta.')
    })
})

app.get('/ask/:id', (req, res) => {
  const id = req.params.id
  ask.findOne({ where: { id: id } }).then((pergunta) => {
    if (pergunta != undefined) {
      Answer.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']],
      }).then((respostas) => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas,
        })
      })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/answer', (req, res) => {
  const body = req.body.body
  const perguntaId = req.body.perguntaId

  Answer.create({
    body: body,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/ask/${perguntaId}`)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`o app está rodando na porta ${PORT}`)
})
