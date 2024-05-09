import app from './app.js';
const cors = require('cors');

const hostname = 'localhost';
const port = 3000;

app.use(cors());


app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
