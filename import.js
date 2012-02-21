var sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database(':memory:')
  , csv = require('csv')

function createAndPopulateFoodDescription() {
  db.run('CREATE TABLE food_description (' +
         ' ndb_no CHAR(5) not null, ' +
         ' fdgrp_cd CHAR(4) not null, ' +
         ' long_desc VARCHAR(200) not null, ' +
         ' shrt_desc VARCHAR(60) not null, ' +
         ' comname VARCHAR(100), ' +
         ' manufacname VARCHAR(50), ' +
         ' survey CHAR(1), ' +
         ' ref_desc VARCHAR(60), ' +
         ' refuse TINYINT, ' +
         ' sciname VARCHAR(100), ' +
         ' PRIMARY KEY(ndb_no))')

  var stmt = db.prepare('INSERT INTO food_description VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')

  csv()
    .fromPath(__dirname + '/data/FOOD_DES.txt', { delimiter: '^', quote: '~' })
    .on('data', function(data, index) {
      stmt.run(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])
    })
    .on('end', function(count) {
      stmt.finalize()
    })
}

function createAndPopulateFoodGroupDescription() {
  db.run('CREATE TABLE food_group_description (' +
         ' fdgrp_cd CHAR(5) not null, ' +
         ' fdgrp_desc VARCHAR(60) not null, ' +
         ' PRIMARY KEY(fdgrp_cd))')

  var stmt = db.prepare('INSERT INTO food_group_description VALUES (?, ?)')

  csv()
    .fromPath(__dirname + '/data/FD_GROUP.txt', { delimiter: '^', quote: '~' })
    .on('data', function(data, index) {
      stmt.run(data[0], data[1])
    })
    .on('end', function(count) {
      stmt.finalize()
    })
}

db.serialize(function(){
  createAndPopulateFoodDescription()
  createAndPopulateFoodGroupDescription()
  /*
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
  */
})
