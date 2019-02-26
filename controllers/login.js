const fetch = require('node-fetch');

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
	const { code } = req.body;
	fetch(`https://github.com/login/oauth/access_token/?client_id=c7bdc63f0a88829cb6f2&client_secret=81e4ae8221fd323b103bab4cca15433b26f42ff4&code=${code}`, {
	        method: "post",
	        headers: {'User-Agent': 'request' }
	      })
		.then(res => res.json())
		.then(res => {
			console.log(res)
		})
}

module.exports = {
	logInFB: logInFB,
	logInGithub: logInGithub
}