const express = require('express');
const postsRouter = require('./router/posts');
const commentsRouter = require('./router/comments');

const server = express();
const port = 4000;

server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/comments', commentsRouter);

server.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the Blog'
	});
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
