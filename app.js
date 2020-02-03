const chalk = require('chalk');
const inquirer = require('inquirer');

const { classifier } = require("./Nlp");
const { registerUser, initializeConversation, getNewMassage, postAnswer } = require('./chatbotApi');
const { calculateSum, getLargestNumber, evenLetters, alphabetizeWords, findTeamByYear, findTeam, isWordInString } = require('./utils');

const printQuestion = async ({ question, name = "answer" }) => inquirer.prompt([{ type: "input", name , message: question }]);

const getUserId = async ({ name, email }) => {
  const { data: { user_id } } = await registerUser({ name , email });

  if (!user_id) await getUserId({ name , email });

  return { user_id }
};

const getConversationId = async ({ user_id }) => {
  const { data: { conversation_id } } = await initializeConversation({ user_id });
  return { conversation_id }
};

const getAnswer = async (question) => {
  if (classifier.classify(question) === 'yesNoQ') return 'yes';
  if (classifier.classify(question) === 'sumQ') return calculateSum(question);
  if (classifier.classify(question) === 'largestNumberQ') return getLargestNumber(question);
  if (classifier.classify(question) === 'evenWordsQ') return evenLetters(question);
  if (classifier.classify(question) === 'alphabetizeWordsQ') return alphabetizeWords(question);
  if (classifier.classify(question) === 'teamQ') return findTeam(question);
  if (classifier.classify(question) === 'teamDateEstablishedQ') return findTeamByYear(question);
};

const beginConversation = async ({ conversation_id }) => {
  const { data: { messages } } = await getNewMassage({ conversation_id });
  const [ lastMassage ] = messages.slice(-1);

  if (isWordInString(lastMassage.text, "Thank you")) {
    console.log(chalk.green("Congrats 👏👏👏👏 !!! You are done 🎉🎉🎉"));
    process.exit()
  }

  console.log(chalk.blueBright.bold(lastMassage.text));

  const answer = await getAnswer(lastMassage.text);

  console.log(chalk.greenBright.bold(answer));

  await postAnswer({ conversation_id, content: answer });

  await beginConversation({ conversation_id })
};

const start = async () => {
  console.log(chalk.blue.bold("Welcome to the Rival Chatbot!"));
  console.log(chalk.blue.underline.bold("Before we begin, let's create an account"));

  const { name } = await printQuestion({ question: "user name", name: "name" });
  const { email } = await printQuestion({ question: "email", name: "email" });
  const { user_id } = await getUserId({ name, email });

  console.log(chalk.cyan.underline.bold("Account Created!"));

  const { conversation_id } = await getConversationId({ user_id });

  await beginConversation({ conversation_id })
};

module.exports = () => start();
