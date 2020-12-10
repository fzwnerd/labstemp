'use strict'

const got = require('got')

const {  BOAT_SERVICE_PORT,  BRAND_SERVICE_PORT} = process.env

const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify 

  fastify.get('/:id', async function (request, reply) {
    const id = request.params.id;
    try {
      const [boat, brand] = await Promise.all([
        got(`${boatSrv}/${id}`, {timeout: 500, retry: 0}).json(),
        got(`${brandSrv}/${+id + 231}`, {timeout: 500, retry: 0}).json(),
      ])
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name,    
      }
    } catch (error) {
      if (!error.response) throw error
      if (error.response.statusCode === 404) 
        throw httpErrors.notFound()
      if (error.response.statusCode === 400)
        throw httpErrors.badRequest()
      throw error
    }
  })
}
