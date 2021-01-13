import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoute from "./src/routes/user";

const app = express();

const PORT = 3000;

const db = 'mongodb://mongo:27017/test';

app.get('/', (req, res) => res.send('Hello world.'));

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.info(`Successfully connected to ${db}`);
}).catch((error) => {
    console.error('Error connecting to database: ', error);
    return process.exit(1);
});

