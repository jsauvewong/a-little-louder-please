import twilio from 'twilio'
import { Subscriber } from './postgreSQL'

export const sendSms = async (message: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)

  const listOfsmsNumber = await Subscriber.findAll({ attributes: ['smsNumber'], raw: true })
  for (let i = 0; i < listOfsmsNumber.length; i++) {
    const messageInstancePromise = client.messages.create({
      body: message,
      from: process.env.PHONE_NUMBER,
      to: listOfsmsNumber[i].smsNumber
    })

    messageInstancePromise.then((message) => console.log(message.sid))
  }
}
