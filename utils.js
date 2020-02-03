const models = require("./models");

const _stringIntoArray = async (question) => question.replace(/[.\s]/g, '').split(':')[1].split(',');

const isWordInString = (s, word) => new RegExp( '\\b' + word + '\\b', 'i').test(s);

const calculateSum = async (question) => {
  const numbers = question.replace( /[^\d,]*/g, '').split(',').map(n => Number(n));
  return `${numbers.reduce((a, b) => Number(a)+ Number(b))}`
};

const getLargestNumber = async (question) => {
  const numbers = question.replace( /[^\d,]*/g, '').split(',').map(n => Number(n));
  return `${Math.max(...numbers)}`;
};

const evenLetters = async (question) => {
  let words = await _stringIntoArray(question);
  let wordsWithEvenNumberOfLetters = [];

  words.map(e => e.replace(/\s+/g, ''));

  for (const word of words) {
    if (word.length % 2 === 0) wordsWithEvenNumberOfLetters = [ ...wordsWithEvenNumberOfLetters, word ]
  }

  return wordsWithEvenNumberOfLetters.join(', ');
};

const alphabetizeWords = async (question) => {
  const words = await _stringIntoArray(question);

  return words
    .map(e => e.replace(/\s+/g, ''))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .join(', ')
};

const findTeamByYear = async (question) => {
  const [yearFounded] = (/\b\d{4}\b/).exec(question);
  const teams = await models.Team.find({ yearFounded });
  return teams.map(team => team.teamName, []).join(',')
};

const findTeam = async (question) => {
  let words = question
    .replace(/[.\s]/g, ' ')
    .split(':')[1]
    .split(', ')
    .map(e => e.replace('?', ''))
    .map(e => e.trimLeft());

  const [query] = (/(?:\S+\s)?\S*team?/).exec(question);
  const queryString = query.substring(0, query.indexOf(" team"));
  const teams = await models.Team.find({ teamName: { $in: words }, $or:[ { teamLeague: queryString }, { sport: queryString } ] });

  return teams.map(team => team.teamName, []).join(',')
};

module.exports = {
  calculateSum,
  getLargestNumber,
  evenLetters,
  alphabetizeWords,
  findTeamByYear,
  findTeam,
  isWordInString
};
