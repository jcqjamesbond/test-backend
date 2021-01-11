import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoute from "./src/routes/user";

const app = express();

const PORT = 3000;

app.get('/', (req, res) => res.send('Hello world.'));

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});

// connect to mongo
mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

