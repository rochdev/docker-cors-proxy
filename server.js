'use strict'

const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')

// Server

const app = express()

app.disable('x-powered-by')

app.use('/', cors(corsOptions()))
app.use('/', proxy(proxyOptions()))

app.listen(3000)

// Helpers

function corsOptions () {
  const options = {}

  process.env.ORIGIN && (options.origin = process.env.ORIGIN)
  process.env.METHODS && (options.methods = process.env.METHODS)
  process.env.ALLOWED_HEADERS && (options.allowedHeaders = process.env.ALLOWED_HEADERS)
  process.env.EXPOSED_HEADERS && (options.exposedHeaders = process.env.EXPOSED_HEADERS)
  process.env.OPTIONS_SUCCESS_STATUS && (options.optionsSuccessStatus = Number(process.env.OPTIONS_SUCCESS_STATUS))
  process.env.MAX_AGE && (options.maxAge = process.env.MAX_AGE)

  if (process.env.CREDENTIALS === '1' || process.env.CREDENTIALS === 'true') {
    options.credentials = true
  } else if (process.env.CREDENTIALS === '0' || process.env.CREDENTIALS === 'false') {
    options.credentials = false
  }

  if (process.env.PREFLIGHT_CONTINUE === '1' || process.env.PREFLIGHT_CONTINUE === 'true') {
    options.preflightContinue = true
  } else if (process.env.PREFLIGHT_CONTINUE === '0' || process.env.PREFLIGHT_CONTINUE === 'false') {
    options.preflightContinue = false
  }

  return options
}

function proxyOptions () {
  const options = {}

  process.env.TARGET && (options.target = process.env.TARGET)
  process.env.FORWARD && (options.forward = process.env.FORWARD)
  process.env.PROXY_TIMEOUT && (options.proxyTimeout = Number(process.env.PROXY_TIMEOUT))

  return options
}
