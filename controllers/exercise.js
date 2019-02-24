const getWorkouts = (req, res, db) =>  {
	const { id } = req.params;
	db.select( 'weekday', 'workout_title','text', 'weight', 'reps', 'sets')
		.from('workouts')
		.where('user_id', '=', id)
		.then(data => res.json(data))
		.catch(err => console.log(err))
	
}

const submitWorkouts = (req, res, db) => {
	let { user, day, fields } = req.body;
	if (fields.title === "") fields.title = "Untitled Workout";
	const rows = fields.workoutList.map( workout => {
		return Object.assign(workout, { user_id: user, weekday: day, workout_title: fields.title });
	})
	db.transaction( trx => {
		trx('workouts').where({
			user_id: user,
			weekday: day
		})
		.del()
		.then(nums => {
			return trx('workouts')
				   .insert(rows)
				   .returning('user_id')
				   .then(id => res.json(id));
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to submit workout'));	 
}

module.exports = {
	getWorkouts: getWorkouts,
	submitWorkouts: submitWorkouts
}