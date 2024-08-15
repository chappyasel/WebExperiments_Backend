import express from 'express'
import http from 'http'
import path from 'path'
import helmet from 'helmet'
import boom from 'boom'
import weightliftingAppRoutes from './api/weightliftingapp/v1/controllers'
import caffieneRoutes from './api/caffiene/v1'
import fantasyRoutes from './api/fantasy/v1'
import liarsDiceRoutes from './api/liarsdice/v1'

const app = express()
const server = new http.Server(app)

// Setup
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
server.listen(process.env.PORT, () => {
  const environment = process.env.IS_DEV ? 'dev' : 'prod'
  console.log(`Web Experiments activated! (environment: ${environment})`)
})

// Static files
app.use(express.static('client/build'))

// API routes
app.use('/api/weightliftingapp/v1', weightliftingAppRoutes)
app.use('/api/caffiene/v1/', caffieneRoutes)
app.use('/api/fantasy/v1/', fantasyRoutes)
app.use('/api/liarsdice/v1/', liarsDiceRoutes)

// Public routes
app.get('*', (_: any, res: any) => res.sendFile(path.resolve('client', 'build', 'index.html')))

// Error handler
app.use((err: any, _: any, res: any, __: any) => {
  if (!boom.isBoom(err)) err = boom.badImplementation(err)
  return res.status(err.output.statusCode).json(err.output.payload)
})
