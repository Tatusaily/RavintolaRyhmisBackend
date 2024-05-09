import express from 'express';
import cors from 'cors';
import api from './api/index.js';


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to Pizza Enrico API!');
});

app.use('/api/v1', api);

export default app;