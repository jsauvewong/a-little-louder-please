import express from 'express'
import { Subscriber } from './postgreSQL'
import bodyParser from 'body-parser'
import path from 'path'
import { filterNumber } from './parseNumber'
import { createMessage } from './sendSms'

export const createApp = () => {
  const app = express()

  const jsonParser = bodyParser.json()

  app.use('/', express.static(path.join(__dirname, '../public')))

  app.use(express.urlencoded({ extended: false }))

  app.post('/subscriber', jsonParser, async (req, res) => {
    const { name, smsNumber } = req.body
    const formattedNumber = filterNumber(smsNumber)
    if (formattedNumber !== undefined) {
      const project = await Subscriber.findOne({ where: { smsNumber: formattedNumber } })
      if (project === null) {
        const newSubscriber = await Subscriber.create({ name, smsNumber: filterNumber(smsNumber) })
        createMessage(
          `Hi there! Thanks for subscribing to A Little Louder App. This is me letting you know I've signed you up. Have a lovely day!`,
          formattedNumber
        )
        res.redirect('/redirectsuccess.html')
      } else {
        res.redirect('/redirectsuccess.html')
      }
    } else {
      res.redirect('/error404.html')
    }
  })
  return app
}

export const startServer = () => {
  const onDone = () => console.log(`Example app listening at http://localhost:${5000}`)
  createApp().listen(process.env.PORT, onDone)
}
