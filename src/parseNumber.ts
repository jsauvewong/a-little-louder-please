import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const filterNumber = (number) => {
  const phoneNumber = parsePhoneNumberFromString(number)
  if (phoneNumber) {
    return phoneNumber.format('E.164')
  } else {
    console.log(number)
  }
}
