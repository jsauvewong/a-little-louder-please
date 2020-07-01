import { sendSms } from './sendSms'
import { pickPhrase } from './pickPhrase'
import schedule from 'node-schedule'
import { startServer } from './express'
import { setUpDatabase } from './postgreSQL'

// So the app can talk to Heroku on their own assigned port
startServer()

setUpDatabase()
