import { sendSms } from "./sendSms"
import { pickPhrase } from "./pickPhrase"
import schedule from ('node-schedule')


// const execute = () => {
//   const randomPhrase = pickPhrase()
//   sendSms(randomPhrase)
//   console.log('sent')
// }

// console.log('started running')
// const timeout = setTimeout(execute, 1000);

 
const j = schedule.scheduleJob('* * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});