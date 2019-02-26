const registerFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "fb_" + id;
	db('users').returning('id')
			   .insert({ id: userid })
			   .then(user => res.json(user));
	
}

const registerGithub = (req, res, db) =>  {
	const { id } = req.body;
	console.log(req.body);
	console.log(id);
	db('users').returning('id')
			   .insert({ id: id })
			   .then(user => res.json(user));
}

module.exports = {
	registerFB: registerFB,
	registerGithub: registerGithub
}