const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const app = express();
const port = process.env.PORT || 5656;

app.use(cors());
app.use(bodyParser.json());

const Schema = mongoose.Schema({
	user_id: String,
	last_activity: String,
	workouts: [{ title: String, workoutList: [{ text: String, weight: String, reps: String, sets: String }] }],
	sleepData: { coordinates: [{ date: Number, hours: Number, quality: String }], dates: Array },
	dailyFoods: [{ food: String, calories: String, fat: String, carbs: String, protein: String }]
})

app.post("/login", (req, res) => { login.logIn(req, res) });
app.post("/register", (req, res) => { register.handleRegister(req, res) });


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

/*
paths:

"/login" => gets user data (dailyFoods, workouts, sleepData) + data for landing page
/register => posts user data to database
/nutrition-submit => post, adds food to database
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