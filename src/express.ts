import express from 'express'
import { Subscriber } from './postgreSQL'
import bodyParser from 'body-parser'
import path from 'path'

export const startServer = () => {
  const app = express()
  const onDone = () => console.log(`Example app listening at http://localhost:${5000}`)
  const jsonParser = bodyParser.json()

  app.get('/root', (req, res) => res.send('Hello World!'))
  app.get('/js', (req, res) => res.send('Hello Patooter!'))
  // app.get('/', function (req, res) {
  //   res.sendFile(path.join(__dirname + '/../public/test.html'))
  // })
  app.use('/', express.static(path.join(__dirname, '../public')))

  app.post('/subscribers', jsonParser, async (req, res) => {
    const { name, smsNumber } = req.body
    const newSubscriber = await Subscriber.create({ name, smsNumber })
    res.json({
      id: newSubscriber.id,
      name: newSubscriber.name,
      smsNumber: newSubscriber.smsNumber
    })
  })

  app.listen(process.env.PORT || 5000, onDone)
}
