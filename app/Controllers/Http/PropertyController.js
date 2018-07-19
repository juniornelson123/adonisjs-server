'use strict'

const Property = use('App/Models/Property')
const Image = use('App/Models/Image')

class PropertyController {

  async index ({request}) {
    const { latitude, longitude } = request.all()

    const properties = Property.query().nearBy(latitude, longitude, 10).fetch()

    return properties
  }


  async store ({ request, auth, response }) {
    const { id } = auth.user
    const data = request.only(["title", "address", "price", "latitude", "longitude"])

    const property = await Property.create({...data, user_id: id})

    return property
  }


  async show ({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }


  async update ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    const data = request.only(["title", "address", "price", "latitude", "longitude"])

    property.merge(data)

    await property.save()

    return property
  }


  async destroy ({ params, auth }) {
    const property = await Property.findOrFail(params.id)

    if (property.user_id != auth.user.id) {
      return reponse.status(401).send({error: "Not authorized"})
    }

    await property.delete()
  }
}

module.exports = PropertyController
