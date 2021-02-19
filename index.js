const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/public/*', (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

app.listen(3000, () => {
	console.log('>>> Server Running <<<');
});
