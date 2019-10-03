import express from 'express';
import body from 'body-parser';
import router from '../src/routes';
import env from 'dotenv';
env.config();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(body.json());
app.use(express.json());

app.use('/api/v1/',router);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello ES6').status(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} ...........`);
})
