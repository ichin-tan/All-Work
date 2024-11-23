const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
      <form action="/submi" method="POST">
        <input type="text" name="att1" placeholder="Enter a message 1">
        <input type="text" name="message2" placeholder="Enter a message 2">
        <button type="submit">Send</button>
      </form>
    `);
  });

app.post('/submi', (req, res) => {
    const att1 = req.body.att1;
    const message2 = req.body.message2;
    res.send(`Received: ${att1} ${message2}`);
});


app.listen(3000)