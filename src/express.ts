import express from 'express'

export const startServer = () => {

  const app = express()
  const port = 5000

  app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/js', (req, res) => res.send('Hello Patooter!'))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

}