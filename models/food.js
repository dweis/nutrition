var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var Food = new Schema({
    ndbNo: String // nutrient databank number
  , shortDescription: String // abbreviated description
  , water: Number // grams per 100g
  , kCal: Number
  , protein: Number
  , lipid: Number
  , ash: Number
  , carbohydrate: Number
  , fiber: Number
  , sugar: Number
  , calcium: Number
  , iron: Number
  , magnesium: Number
  , phosphorus: Number
  , potassium: Number
  , sodium: Number
  , zinc: Number
  , copper: Number
  , manganese: Number
  , selenium: Number
  , vitaminC: Number
  , thiamin: Number
  , riboflavin: Number
  , niacin: Number
  , pantothenicAcid: Number
  , vitaminB6: Number
  , folateTotal: Number
  , folicAcid: Number
  , foodFolate: Number
  , folateDfe: Number
  , vitaminB12: Number
  , vitaminAIu: Number
  , vitaminARae: Number
  , retinol: Number
  , vitaminE: Number
  , vitaminK: Number
  , alphaCarotene: Number
  , betaCarotene: Number
  , betaCryptoxanthin: Number
  , lycopene: Number
  , luteinZeazanthin: Number
  , fatSaturated: Number
  , fatMonounsaturated: Number
  , fatPolyunsaturated: Number
  , cholesterol: Number
  , weight1: { name: String, weight: Number }
  , weight2: { name: String, weight: Number }
  , refusePct: Number
})


module.exports = function(db) {
  return db.model('Food', Food)
}
