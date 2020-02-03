const axios = require('axios');

const BASE_URL = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";

const registerUser = async ({ name, email }) => axios.post(`${BASE_URL}/challenge-register`, { name, email });

const initializeConversation = async ({ user_id }) => axios.post(`${BASE_URL}/challenge-conversation`, { user_id });

const getNewMassage = ({ conversation_id }) => axios.get(`${BASE_URL}/challenge-behaviour/${conversation_id}` );

const postAnswer = async ({ conversation_id, content }) => axios.post(`${BASE_URL}/challenge-behaviour/${conversation_id}`, { content });

module.exports = {
  registerUser,
  initializeConversation,
  getNewMassage,
  postAnswer
};
