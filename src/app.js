import express from 'express';
import api from './api/index.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to Pizza Enrico API!');
});

app.use('/api/v1', api);

export default app;