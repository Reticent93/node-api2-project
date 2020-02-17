const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/:id/comments', (req, res) => {
	db
		.findPostComments(req.params.id)
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The comments information could not be retrieved.'
			});
		});
});

router.get('/:postId/comments/:commentId', (req, res) => {
	db
		.findCommentById(req.params.postId, req.params.commentId)
		.then((comment) => {
			if (comment) {
				res.json(comment);
			} else {
				res.status(404).json({
					message: 'The comment with the specified ID does not exist.'
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				error: 'The comment information could not be retrieved.'
			});
		});
});

router.post('/:id/comments', (req, res) => {
	const { text } = req.body;
	if (!text) {
		return res.status(400).json({
			errorMessage: 'Please provide text for the comment.'
		});
	}
	db
		.insertComment(req.params.id, { text })
		.then((newComment) => {
			res.status(201).json(newComment);
		})
		.catch((error) => {
			res.status(500).json({
				error: 'There was an error while saving the comment to the database'
			});
		});
});

module.exports = router;
