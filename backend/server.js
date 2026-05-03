require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;   // Server port from .env

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});