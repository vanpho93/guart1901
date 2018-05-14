const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const User = require('./User');

const app = express();

app.use(cors());
app.use(json());

app.use((req, res, next) => setTimeout(() => next(), 1000));

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(user => res.send({ success: true, user }))
    .catch(error => res.send({ success: false, message: error.message }));
});

app.post('/check', (req, res) => {
    const { token } = req.headers;
    User.check(token)
    .then(user => res.send({ success: true, user }))
    .catch(error => res.send({ success: false, message: error.message }));
});

app.listen(3000, () => console.log('Server started.'));
