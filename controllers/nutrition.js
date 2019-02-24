const getNutrition = (req, res, db) =>  {
	const { id } = req.params;
	db.transaction(trx => {
		trx.raw(`delete from nutrition where date_added < current_date`)
			.then(nums => {
			  db.select('food', 'calories', 'fat', 'carbs', 'protein')
				.from('nutrition')
				.where('user_id', '=', id)
				.then(data => res.json(data))
				.catch(err => console.log(err))
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
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