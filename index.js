const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/public/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

app.listen(process.env.PORT, () => {
	console.log('>>> Server Running <<<');
});
