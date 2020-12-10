'use strict'

const { promisify } = require('util')

const model = require('../../model').boat
const uid = model.uid
const read = promisify(model.read)
const create = promisify(model.create)

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors

  fastify.get('/:id', async function (request, reply) {
    const id = request.params.id;

    try {
      return await read(id)
    } catch (err) {
      if (err.code === 'E_NOT_FOUND') throw notFound()
      throw err
    }
  })

  fastify.post('/', async function (request, reply) {
      const id = uid()
      await create(id, request.body.data)
      reply.status(201)
      reply.send({id})
    
  })
}
