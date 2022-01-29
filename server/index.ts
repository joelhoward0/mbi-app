import fs from 'fs'
import express from 'express'
import { env } from './env'
import { MBI } from './mbi'

const app = express()
app.use(express.json())

app.get(['/'], (req, res) => {
  fs.createReadStream('./client/index.html').pipe(res)
})

app.get('/app.js', (req, res) => {
  res.setHeader("Content-Type", "application/javascript")
  fs.createReadStream('./client/app.js').pipe(res)
})

app.get('/app.css', (req, res) => {
  res.setHeader("Content-Type", "text/css")
  fs.createReadStream('./client/app.css').pipe(res)
})
app.get('/format.pdf', (req, res) => {
  res.setHeader("Content-Type", "application/pdf")
  fs.createReadStream('./client/format.pdf').pipe(res)
})

export interface GenerateResponse { mbi: string }
app.get('/generate', (req, res) => {
  const mbi = MBI.Generate()
  const response: GenerateResponse = { mbi }
  return res.send(response)
})

export interface VerifyRequest { mbi: string }
export interface VerifyResponse { mbi: string, isValid: boolean }
app.post('/verify', (req, res) => {
  const request = req.body as VerifyRequest
  const mbi = request.mbi
  const isValid = MBI.Verify(mbi)
  const response: VerifyResponse = { mbi, isValid }
  return res.send(response)
})

app.listen(env.port, () => {
  console.log(`App listening at http://${env.hostname}:${env.port}`)
})