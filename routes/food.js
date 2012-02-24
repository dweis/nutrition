exports.get = function(req, res) {
  var Food = app.db.model('Food')
    , ndbNo = req.params.ndbNo

  Food.findOne({ ndbNo: ndbNo }, function(err, doc) {
    res.json(doc)
  })
}

exports.search = function(req, res) {
  var Food = app.db.model('Food')
    , q = req.query.query
    , re = new RegExp(q, "gi")

  Food.find({ shortDescription: re }, function(err, docs) {
    var out = Array()
    for (var idx in docs) {
      var doc = docs[idx]

      out.push({ ndbNo: doc.ndbNo, shortDescription: doc.shortDescription })
    }

    res.json(out)
  })
}
