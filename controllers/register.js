const registerFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "fb_" + id;
	db('users').returning('id')
			   .insert({ id: userid })
			   .then(user => res.json(user));
	
}

const registerGithub = (req, res) =>  {
	
}

module.exports = {
	registerFB: registerFB,
	registerGithub: registerGithub
}