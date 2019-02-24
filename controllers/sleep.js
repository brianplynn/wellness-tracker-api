const getSleepData = (req, res, db) =>  {
	const { id } = req.params;
	db.transaction(trx => {
		trx.raw(`delete from sleep where sleep_date < (current_date - interval '7 days')`)
			.then(nums => {
			  db.select('sleep_date', 'hours', 'quality')
				.from('sleep')
				.where('user_id', '=', id)
				.then(data => res.json(data))
			})
			.then(trx.commit)
			.catch(trx.rollback)
	});
}

const addSleep = (req, res, db) =>  {
	const { data, user } = req.body;
	const formattedData = Object.assign({}, { user_id: user, hours: Number(data.hours)+Number(data.minutes)/60, quality: data.quality, sleep_date: data.date });
	db('sleep')
    .insert(formattedData)
    .returning('user_id')
    .then(id => res.json(id));
}

const editSleep = (req, res, db) => {
	const { data, user } = req.body;
	const formattedData = data.map( item => {
		return Object.assign({}, { user_id: user, hours: Number(item.hours)+Number(item.minutes)/60, quality: item.quality, sleep_date: item.date });
	});
	db.transaction( trx => {
		trx('sleep').where({
			user_id: user
		})
		.del()
		.then(nums => {
			return trx('sleep')
				   .insert(formattedData)
				   .returning('sleep_date')
				   .then(id => res.json(id));
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to submit workout'));
}

module.exports = {
	getSleepData: getSleepData,
	addSleep: addSleep,
	editSleep: editSleep
}