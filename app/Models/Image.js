'use strict'

const Model = use('Model')

class Image extends Model {
  property() {
    return this.belongsTo('App/Models/Property')
  }
}

module.exports = Image
