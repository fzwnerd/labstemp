'use strict'

const { promisify } = require('util')

const model = require('../../model').boat
const del = promisify(model.del)
const read = promisify(model.read)

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors

  fastify.get('/:id', async function (request, reply) {
    try {
      return await read(request.params.id)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') throw notFound()
      throw error
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    try {
      await del(request.params.id)
      reply.status(204)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') throw notFound()
      throw error
    }
  })
}
