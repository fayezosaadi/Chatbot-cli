# Rival Chatbot

## Technical Approach & Objectives

The app is built with Node and MongoDB. It communicates with
Rival chatbot and attempt to answer its questions

## Getting started

### Requirements

- NodeJS v10.7.0+ (https://nodejs.org)
- MongoDB 4.1.x (https://mongodb.com)
  - If using Docker, run `docker run --name rival -p 27017:27017 -d mongo:4.1-xenial`

### Downloading the dependencies (node modules)
- clone the repo
- Install dependencies: `npm install` or `npm i` for short

### Data Migrations
- In order to populate the database with the teams data, run the following command: `npm run migrate:sports`

### Start the app
- To start the app run `npm run start`
- You will need to enter user name and email in order to start the conversation flow
