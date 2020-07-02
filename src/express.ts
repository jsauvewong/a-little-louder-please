import express from 'express'
import { Subscriber } from './postgreSQL'
import bodyParser from 'body-parser'
import path from 'path'
import { filterNumber } from './parseNumber'

export const createApp = () => {
  const app = express()

  const jsonParser = bodyParser.json()

  app.use('/', express.static(path.join(__dirname, '../public')))

  app.use(express.urlencoded({ extended: false }))

  app.post('/subscriber', jsonParser, async (req, res) => {
    const { name, smsNumber } = req.body
    if (filterNumber(smsNumber) !== undefined) {
      const project = await Subscriber.findOne({ where: { smsNumber: filterNumber(smsNumber) } })
      if (project === null) {
        const newSubscriber = await Subscriber.create({ name, smsNumber: filterNumber(smsNumber) })
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
  createApp().listen(process.env.PORT || 5000, onDone)
}


