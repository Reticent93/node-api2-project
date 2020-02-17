const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
	const opts = {
		sortBy: req.query.sortBy,
		limit: req.query.limit
	};
	db
		.find(opts)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				errorMessage: 'Error retrieving the posts'
			});
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id).then((data) => {
		if (data) {
			res.status(200).json(db);
		} else {
			res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		}
	});
});

router.post('/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}
	db
		.insert({ title, contents })
		.then((res) => db.findById(res.id))
		.then((data) => {
			res.status(201).json(data);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error adding the post'
			});
		});
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, contents } = req.body;

	if (!title || !contents) {
		return res.status(400).json({
			message: 'Please provide title and contents for the post.'
		});
	}
	db
		.findById(id)
		.then((post) => {
			if (post) {
				return db.update(id, { title, contents });
			}
			res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		})
		.then(() => db.findById(id))
		.then((data) => res.json(data))
		.catch((error) =>
			res.status(500).json({
				error: 'There was an error while saving the post to the database'
			})
		);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, contents } = req.body;

	if (!title || contents) {
		return res.status(400).json({
			message: 'The post with the specified ID does not exist.'
		});
	}
	db
		.findById(id)
		.then((post) => {
			if (post) {
				return db.remove(id, { title, contents });
			}
		})
		.then(() => res.status(204).end())
		.catch((err) =>
			res.status(500).json({
				error: 'The post could not be removed'
			})
		);
});

module.exports = router;
