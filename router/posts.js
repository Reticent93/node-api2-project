const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/api/posts', (req, res) => {
	const opts = {
		sortBy: req.query.sortBy,
		limit: req.query.limit
	};
	db
		.find(opts)
		.then((db) => {
			res.status(200).json(db);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the posts'
			});
		});
});

router.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id).then((db) => {
		if (db) {
			res.status(200).json(db);
		} else {
			res.status(404).json({
				message: 'Posts not found'
			});
		}
	});
});

module.exports = router;
