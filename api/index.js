const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' });
});

app.post('/api/transaction', (req, res) => {
    res.json(req.body);
})

const port = 4000; // Define the port you want to listen on

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});