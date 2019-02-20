const logInFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "facebook_" + id;
	db.select()
	.from('users')
	.where('user_id', '=', userid)
	.then(user => {
		db.select()
		.from('nutrition')
		.where('User_id', '=', user[0].user_id)
		.then(info => res.json(info))
		.catch(err => {
			res.json("No nutrition data available")
		})
	})
	.catch(err => {
	 	res.status(400).json('No such user. Please register');
	})
}


const logInGithub = (req, res, db) =>  {
	
}

module.exports = {
	logInFB: logInFB,
	logInGithub: logInGithub
}