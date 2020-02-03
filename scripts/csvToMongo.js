const fs = require('fs');
const path = require('path');

const mongodb = require("mongodb").MongoClient;
const csv = require('csv-parser');

const baseLocation = path.resolve('./');
const fileLoc = path.join(baseLocation, 'sports-teams.dat');
const readStream = fs.createReadStream(fileLoc);

let results = [];
let mongoUrl = "mongodb://localhost:27017/";

readStream
  .pipe(csv({ mapHeaders: ({ header }) => header.trimLeft().replace('# ','') }))
  .on('data', (row) => results = [ ...results, row ])
  .on('end', () => {

    results = results.map(team => ({
      teamName: team['Team name'].trimLeft(),
      city: team['city'].trimLeft(),
      teamLeague: team['team league'].trimLeft(),
      yearFounded: team['year founded'].trimLeft(),
      sport: team['sport'].trimLeft(),
    }));

    mongodb.connect(
      mongoUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("rival")
          .collection("teams")
          .insertMany(results, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);

            client.close();
          });
      }
    );

  });
