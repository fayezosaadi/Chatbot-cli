const natural = require('natural');

const classifier = new natural.BayesClassifier();

classifier.addDocument('you ready q\'s', 'yesNoQ');
classifier.addDocument('sum of q\'s', 'sumQ');
classifier.addDocument('largest of q\'s', 'largestNumberQ');
classifier.addDocument('repeat even words q\'s', 'evenWordsQ');
classifier.addDocument('alphabetize words q\'s', 'alphabetizeWordsQ');
classifier.addDocument('team q\'s', 'teamQ');
classifier.addDocument('teams established q\'s', 'teamDateEstablishedQ');

classifier.train();

module.exports = { classifier };
