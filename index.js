import express from 'express';
import usersRouter from './routes/usersRouter.js';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', usersRouter);

app.get('/', (request, response) => {
    return response.send('Welcome to the Users API');
});

app.listen(PORT, () => {
    console.log('Server is running on port 8000');
    }
);