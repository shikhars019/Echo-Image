const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

dotenv.config();

app.use('/v1',  require('./routes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
