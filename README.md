## Link to Hosted Version

The address of the hosted api is: https://mark-portfolio-project.onrender.com/api

## Project Summary

This project was aimed at building the back-end for a board game review website.\
There are 3 data types to deal with, users, reviews and comments.\
The aim for the back-end is to create an API for the future front-end project to communicate with.\
There will be different endpoints from which HTTP requests will be made and these endpoints will be stated in the app.js file.\
Using MVC formatting, these requests will be directed and given instructions in how to communicate with the database and what happens in the database/which data is relayed back (if any).\
Using the hosted api stated above, you can test the backend of the database using the endpoints stated in the app.js.

## Requirements

In order to run this repository, you must have the latest versions of node and postgres installed:\
node: v19.6.0\
postgres: 14.7

## How to Run Locally

To run this repository locally, follow these steps:

- Firstly, you need to clone the repository. Open the terminal and direct yourself to where you want to store the repo.
- Run the command 'git clone https://github.com/Zipeth1010/NC-games-project.git'
- After cloning the repository, cd into it with the following command 'cd be-nc-games'
- Run 'npm i' to install all of the local packages
- Run 'npm run seed' to seed create the local database and seed it
- After the database is created and seeded, you can test the tests written with 'npm test app.test.js'
- Now the .env files must be created.
- As you can see from the information in be-nc-games/db/connection.js the test and development database's need to be seperated.
- The next step, is to create a .env.test file and set the variable 'PGDATABASE = nc_games_test' for example. The name of the database before the '\_test' doesn't matter but the PGDATABASE and \_test must be there.
- This means that when the app is being tested, it is testing the locally stored data as opposed to the development dataset.
- If you wish to create a development dataset, make a seperate .env.development file at the same level as the .env.test file.
