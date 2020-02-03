const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaFields = {
  teamName: { type: String, required: true },
  city: { type: String, required: true },
  teamLeague: { type: String, required: true },
  yearFounded: { type: String, required: true },
  sport: { type: String, required: true },
};

const teamSchema = new Schema(schemaFields, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };
