'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  setTimeout(() => {
    const un = req.query.un;
    if (!un) {
      const err = new Error('Bad Request')
      err.status = 400
      res.send(err)
    } else {
      if (Array.isArray(un)) {
        res.send(un.map(s => s.toUpperCase()))
      } else {
        res.send(un.toUpperCase())
      }
    }
    
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})