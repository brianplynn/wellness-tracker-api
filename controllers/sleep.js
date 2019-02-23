const getSleepData = (req, res, db) =>  {
	const { id } = req.params;
	db.select('weekday', 'hours', 'quality')
		.from('sleep')
		.where('user_id', '=', id)
		.then(data => res.json(data))
		.catch(err => console.log(err))
}

const addSleep = (req, res, db) =>  {
	const { data, weekday } = req.body;
	res.json([data, weekday]);
}

const editSleep = (req, res, db) => {
	res.json(req.body);
}

module.exports = {
	getSleepData: getSleepData,
	addSleep: addSleep,
	editSleep: editSleep
}