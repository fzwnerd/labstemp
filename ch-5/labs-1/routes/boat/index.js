'use strict'

const model = require('../../model');

module.exports = async function (fastify, opts) {
  fastify.get('/:id', function (request, reply) {
    model.boat.read(request.params.id, (err, result) => {
      if (err) {
        if (err.code === 'E_NOT_FOUND') reply.notFound()
        else reply.send(err)
      } else {
        reply.send(result)
      }
    })
  })
}
