import twilio from 'twilio'
import { Subscriber } from './postgreSQL'

export const sendSms = async (message: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)

  const listOfsmsNumber = await Subscriber.findAll({ attributes: ['smsNumber'], raw: true })
  console.log(`${listOfsmsNumber} is being sent`)
  for (let i = 0; i < listOfsmsNumber.length; i++) {
    const singleNumber = listOfsmsNumber[i].smsNumber
    console.log(`${singleNumber} is no longer empty`)
    await client.messages.create({
      body: message,
      from: process.env.PHONE_NUMBER,
      to: singleNumber
    })

    console.log(`sent sms to ${singleNumber}`)
  }
}
