var sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database(':memory:')
  , csv = require('csv')

function createAndPopulateFoodDescription(done) {
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
         ' n_factor FLOAT(5,2), ' +
         ' pro_factor FLOAT(5,2), ' +
         ' fat_factor FLOAT(5,2), ' +
         ' cho_factor FLOAT(5,2), ' +
         ' PRIMARY KEY(ndb_no))')

  var stmt = db.prepare('INSERT INTO food_description VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')

  csv()
    .fromPath(__dirname + '/data/FOOD_DES.txt', { delimiter: '^'
                                                , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateFoodGroupDescription(done) {
  db.run('CREATE TABLE food_group_description (' +
         ' fdgrp_cd CHAR(5) not null, ' +
         ' fdgrp_desc VARCHAR(60) not null, ' +
         ' PRIMARY KEY(fdgrp_cd))')

  var stmt = db.prepare('INSERT INTO food_group_description VALUES (?, ?)')

  csv()
    .fromPath(__dirname + '/data/FD_GROUP.txt', { delimiter: '^'
                                                , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateNutrientData(done) {
  db.run('CREATE TABLE nutrient_data (' +
         ' ndb_no CHAR(5) not null, ' +
         ' nutr_no CHAR(3) not null, ' +
         ' nutr_val FLOAT(10,3) not null, ' +
         ' num_data_pts FLOAT(5,0) not null, ' +
         ' std_error FLOAT(8,3), ' +
         ' src_cd CHAR(2) not null, ' +
         ' deriv_cd CHAR(4), ' +
         ' ref_ndb_no CHAR(5), ' +
         ' add_nutr_mark CHAR(1), ' +
         ' num_studies INT(2), ' +
         ' min FLOAT(10,3), ' +
         ' max FLOAT(10,3), ' +
         ' df INT(2), ' +
         ' low_eb FLOAT(10,3), ' +
         ' up_eb FLOAT(10,3), ' +
         ' stat_cmt CHAR(10), ' +
         ' cc CHAR(1), ' +
         ' PRIMARY KEY(ndb_no, nutr_no))')

  var stmt = db.prepare('INSERT INTO nutrient_data VALUES(?, ?, ?, ' +
                        ' ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  csv()
    .fromPath(__dirname + '/data/NUT_DATA.txt', { delimiter: '^'
                                                , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
      //db.each("SELECT * FROM nutrient_data", function(err, row) {
      //  console.log(row)
      //})
    })
}

function createAndPopulateSourceCodes(done) {
  db.run('CREATE TABLE source_code (' +
         ' src_cd CHAR(2) not null, ' +
         ' srccd_desc VARCHAR(60) not null, ' +
         ' PRIMARY KEY(src_cd))')

  var stmt = db.prepare('INSERT INTO source_code VALUES (?, ?)')

  csv()
    .fromPath(__dirname + '/data/SRC_CD.txt', { delimiter: '^'
                                              , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateDataDerivationCodes(done) {
  db.run('CREATE TABLE data_derivation_code (' +
         ' deriv_cd CHAR(4) not null, ' +
         ' deriv_desc VARCHAR(120) not null ' +
         ' PRIMARY_KEY(deriv_cd))')

  var stmt = db.prepare('INSERT INTO data_derivation_code VALUES (?, ?)')

  csv()
    .fromPath(__dirname + '/data/DERIV_CD.txt', { delimiter: '^'
                                                , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateWeight(done) {
  db.run('CREATE TABLE weight (' +
         ' ndb_no CHAR(5) not null, ' +
         ' seq CHAR(2) not null, ' +
         ' amount FLOAT(5,2) not null, ' +
         ' msre_desc VARCHAR(80) not null, ' +
         ' gm_wgt FLOAT(7,1) not null, ' +
         ' num_data_pts INT(3), ' +
         ' std_dev FLOAT(7,3), ' +
         ' PRIMARY KEY(ndb_no))')

  var stmt = db.prepare('INSERT INTO weight VALUES (?, ?, ?, ?, ?, ?, ?)')

  csv()
    .fromPath(__dirname + '/data/WEIGHT.txt', { delimiter: '^'
                                              /*, quote: '~' */})
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('end', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateFootnotes(done) {
  db.run('CREATE TABLE footnote (' +
         ' ndb_no CHAR(5) not null, ' +
         ' footnt_no CHAR(4) not null, ' +
         ' footnt_typ CHAR(1) not null, ' +
         ' nutr_no CHAR(3), ' +
         ' footnt_txt VARCHAR(200) not null, ' +
         ' PRIMARY KEY(ndb_no))')

  var stmt = db.prepare('INSERT INTO footnote VALUES (?, ?, ?, ?, ?)')

  csv()
    .fromPath(__dirname + '/data/FOOTNOTE.txt', { delimiter: '^'
                                                , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('data', function(count) {
      stmt.finalize()
      done()
    })
}

function createAndPopulateSources(done) {
  db.run('CREATE TABLE sources (' +
         ' ndb_no CHAR(5) not null, ' +
         ' nutr_no CHAR(3) not null, ' +
         ' datasrc_id CHAR(6) not null, ' +
         ' PRIMARY KEY (ndb_no, ntr_no))')

  var stmt = db.prepare('INSERT INTO sources VALUES (?, ?, ?)')

  csv()
    .fromPath(__dirname + '/data/DATSRCLN.txt', { delimiter: '^'
                                                 , quote: '~' })
    .on('data', function(data, index) {
      stmt.run.apply(stmt, data)
    })
    .on('data', function(count) {
      stmt.finalize()
      done()
    })
}

db.serialize(function(){
  console.log('Loading Food descriptions...')
  createAndPopulateFoodDescription(function() {
    console.log('Loading Food Group descriptions...')
    createAndPopulateFoodGroupDescription(function(){
      console.log('Loading Nutrient data...')
      createAndPopulateNutrientData(function() {
        console.log('Loading Sources...')
        createAndPopulateSourceCodes(function() {
          console.log('Loading Data Derivations...')
          createAndPopulateDataDerivationCodes(function(){
            console.log('Loading Weights...')
            createAndPopulateWeight(function(){
              console.log('Loading Footnotes...')
              createAndPopulateFootnotes(function() {
                console.log('Loading Sources...')
                createAndPopulateSources(function() {
                  console.log('done')
                })
              })
            })
          })
        })
      })
    })
  })
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
