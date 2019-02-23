const logInFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "fb_" + id;
	db.select()
	.from('users')
	.where('id', '=', userid)
	.then(user => {
		if (user[0]) {
			res.json(user[0]);
		} else {
			throw new Error;
		}
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