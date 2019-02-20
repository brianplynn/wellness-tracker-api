const getNutrition = (req, res, db) =>  {
	db.select()
	.from('nutrition')
}

module.exports = {
	getNutrition: getNutrition
}