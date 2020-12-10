'use strict'

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-http-proxy'), {
    upstream: 'https://jsonplaceholder.typicode.com'
  })
}
