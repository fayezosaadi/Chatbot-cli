const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;
const BASE_URL = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";

const registerUser = async ({ name, email }) => axios.post(`${BASE_URL}/challenge-register`, { name, email });
const initializeConversation = async ({ user_id }) => axios.post(`${BASE_URL}/challenge-conversation`, { user_id });
const getNewMassage = ({ conversation_id }) => axios.get(`${BASE_URL}/challenge-behaviour/${conversation_id}` );
const postAnswer = async ({ conversation_id, content }) =>  axios.post(`${BASE_URL}/challenge-behaviour/${conversation_id}`, { content });
const printQuestion = async ({ question, name = "answer" }) => inquirer.prompt([
  { type: "input", name , message: question }
]);
const checkWordInString = async (s, word) => new RegExp( '\\b' + word + '\\b', 'i').test(s);
const getUserId = async ({ name, email }) => {
  const { data: { user_id } } = await registerUser({ name , email });
  if (!user_id) await getUserId({ name , email });
  return { user_id }
};
const getConversationId = async ({ user_id }) => {
  const { data: { conversation_id } } = await initializeConversation({ user_id });
  if (!conversation_id) await getConversationId({ user_id });
  return { conversation_id }
}
const beginTheConversation = async ({ conversation_id }) => {
  const { data: { messages } } = await getNewMassage({ conversation_id });
  const [lastMassage] = messages.slice(-1);
  if (await checkWordInString(lastMassage.text, "Thank you")) {
    log(chalk.green("Congrates 👏👏👏👏 !!! You are done 🎉🎉🎉"));
    process.exit()
  }
  const { answer: userAnswer } = await printQuestion({ question: lastMassage.text });
  if (!userAnswer) await beginTheConversation({ conversation_id });
  const { data: { correct } } = await postAnswer({ conversation_id, content: userAnswer });
  if (!correct) await beginTheConversation({ conversation_id });
  await beginTheConversation({ conversation_id })
};
const start = async () => {
  log(chalk.blue.bold("Welcome to the Rival Chatbot!"));
  log(chalk.blue.underline.bold("Before we begin, let's create an account"));
  const { name } = await printQuestion({ question: "user name", name: "name" });
  const { email } = await printQuestion({ question: "email", name: "email" });
  const { user_id } = await getUserId({ name, email });
  log(chalk.cyan.underline.bold("Account Created!"));
  const { conversation_id } = await getConversationId({ user_id });
  await beginTheConversation({ conversation_id })
};

module.exports = () => start();
