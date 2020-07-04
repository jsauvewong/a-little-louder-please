import { sendSmsQuote } from './sendSms'
import { pickPhrase } from './pickPhrase'
import { startServer } from './express'
import { setUpDatabase } from './postgreSQL'
import { schedule } from 'node-schedule'

// So the app can talk to Heroku on their own assigned port
const letsRunThisBaby = async () => {
  startServer()

  // const execute = () => {
  //   const randomPhrase = pickPhrase()
  //   sendSmsQuote(randomPhrase)
  //   console.log('sent')
  // }

  // comment out until ready for it contionously send a message
  const j = schedule.scheduleJob('0 9 * * *', function () {
    sendSmsQuote(pickPhrase())
    console.log('done!')
  })
  await setUpDatabase()
  // execute()
}

letsRunThisBaby()
