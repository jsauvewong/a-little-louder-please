import twilio from 'twilio'
import { Subscriber } from './postgreSQL'

export const sendSmsQuote = async (message: string) => {
  const listOfsmsNumber = await Subscriber.findAll({ attributes: ['smsNumber'], raw: true })
  for (let i = 0; i < listOfsmsNumber.length; i++) {
    const singleNumber = listOfsmsNumber[i].smsNumber
    createMessage(message, singleNumber)
    console.log(`sent sms to ${singleNumber}`)
  }
}

export const createMessage = async (bodyMessage: string, messageReceiver: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)
  await client.messages.create({
    body: bodyMessage,
    from: process.env.PHONE_NUMBER,
    to: messageReceiver
  })
}
