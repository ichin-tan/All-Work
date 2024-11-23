const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="name" placeholder="Your name"><br>
      <input type="email" name="email" placeholder="Your email"><br>
      <input type="radio" name="gender" value="male"> Male
      <input type="radio" name="gender" value="female"> Female
      <input type="radio" name="gender" value="other"> Other<br>
      <select name="country">
        <option value="usa">USA</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
      </select><br>
      <textarea name="comments" placeholder="Your comments"></textarea><br>
      <input type="checkbox" name="subscribe" value="Yes">
      <p>Subscribe to news letter</p>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
    console.log(req.body)
  const { name, email, gender, country, comments, subscribe } = req.body;
  res.send(`
    <h2>Submitted Data:</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Gender: ${gender}</p>
    <p>Country: ${country}</p>
    <p>Comments: ${comments}</p>
    <p>Subscribe to Newsletter: ${subscribe ? 'Yes' : 'No'}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
