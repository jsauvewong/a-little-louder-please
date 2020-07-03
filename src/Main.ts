import { sendSms } from './sendSms'
import { pickPhrase } from './pickPhrase'
import { startServer } from './express'
import { setUpDatabase } from './postgreSQL'

// So the app can talk to Heroku on their own assigned port
const letsRunThisBaby = async () => {
  startServer()
  const execute = () => {
    const randomPhrase = pickPhrase()
    sendSms(randomPhrase)
    console.log('sent')
  }
  //comment out until ready for it contionously send a message
  // const j = schedule.scheduleJob('0 9 * * *', function () {
  //   sendSms(pickPhrase())
  //   console.log('done!')
  // })
  await setUpDatabase()
  execute()
}

letsRunThisBaby()
