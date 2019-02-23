const getNutrition = (req, res, db) =>  {
	const { id } = req.params;
	db.select('food', 'calories', 'fat', 'carbs', 'protein')
		.from('nutrition')
		.where('user_id', '=', id)
		.then(data => res.json(data))
		.catch(err => console.log(err))
}

const addNutrition = (req, res, db) =>  {
	const { food, id } = req.body;
	db('nutrition')
	.returning('food_id')
	.insert(Object.assign(food, { user_id: id }))
	.then(id => res.json(id));
}

const deleteNutrition = (req, res, db) =>  {
	const { id } = req.body;
	db('nutrition')
	.where('food_id', id)
	.del()
	.then(count => res.json(count));
}

module.exports = {
	getNutrition: getNutrition,
	addNutrition: addNutrition,
	deleteNutrition: deleteNutrition
}