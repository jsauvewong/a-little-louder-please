import express from 'express'

export const startServer = () => {

  const app = express()
  const onDone = () => console.log(`Example app listening at http://localhost:${5000}`)

  app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/js', (req, res) => res.send('Hello Patooter!'))

  app.listen(process.env.PORT || 5000, onDone)

}