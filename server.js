const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const login = require('./controllers/login');
const nutrition = require('./controllers/nutrition');
const sleep = require('./controllers/sleep');
const exercise = require('./controllers/exercise');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  version: '11.2',
  connection: {
    host : '127.0.0.1',
    user : 'blynn',
    password : 'cookies',
    database : 'wellness-tracker'
  }
});

app.get("/nutrition/:id", (req, res) => { nutrition.getNutrition(req, res, db)});
app.post("/nutrition-submit", (req, res) => { nutrition.addNutrition(req, res, db)});
app.delete("/nutrition-delete", (req, res) => { nutrition.deleteNutrition(req, res, db)});

app.get("/sleep/:id", (req, res) => { sleep.getSleepData(req, res, db)});
app.post("/add-sleep", (req, res) => { sleep.addSleep(req, res, db)});
app.put("/edit-sleep", (req, res) => { sleep.editSleep(req, res, db)});

app.get("/exercise/:id", (req, res) => { exercise.getWorkouts(req, res, db)});
app.post("/exercise-submit", (req, res) => { exercise.submitWorkouts(req, res, db)});

app.post("/login-fb", (req, res) => { login.logInFB(req, res, db) });
app.post("/login-gh", (req, res) => { login.logInGithub(req, res, db) });

app.post("/register-fb", (req, res) => { register.registerFB(req, res, db) });
app.post("/register-github", (req, res) => { register.registerGithub(req, res, db) });


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

/*
paths:

"/login" => gets user data (dailyFoods, workouts, sleepData) + data for landing page
/register => posts user data to database
/nutrition-submit => post, adds food to database
/nutrition-remove => delete, removes food from database
/sleep-add => post, adds sleep to database
/sleep-edit => post, saves sleep changes
/exercise-submit => post, adds food to database


need to figure out a way to handle date changes
any date change --> clear nutrient table
				--> pushes out currentdate - lastactivitydate from sleepData arr
				--> maybe have lastActivity item in database and compare it to currentDate, when different...do stuff

stuff in database

user: {
	login stuff
	last activity
	workouts
	sleepData
	dailyFoods
} 


*/