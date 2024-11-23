const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Pet Info API!');
});

// Route for dogs
app.get('/dogs/:breed', (req, res) => {
    const breed = req.params.breed;
    res.send(`Information about ${breed} dogs`);
});

// Route for cats with optional age parameter
app.get('/cats/:breed/:age?', (req, res) => {
    const breed = req.params.breed;
    const age = req.params.age;
    if (age) {
        res.send(`Information about ${age}-year-old ${breed} cats`);
    } else {
        res.send(`Information about ${breed} cats`);
    }
});

app.get('/fish/:type/:color/:size', (req, res) => {
    const { type, color, size } = req.params;
    res.send(`Information about ${size} ${color} ${type} fish`);
});


app.get('/pets/:type/:attribute', (req, res) => {
    const { type, attribute } = req.params;
    const { sort, limit, name } = req.query;

    let response = `Showing ${attribute} ${type}`;
    if (sort) response += `, sorted by ${sort}`;
    if (limit) response += `, limited to ${limit} results`;
    if (name) response += ` name is ${name}`;

    res.send(response);
});

// app.post('/submit-request', (req,res) => {

// })

app.use((req, res) => {
    res.status(404).send('404: Page not found');
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
