// Packages
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

// Routers
import router from './router/index.js';
import { AppDataSource } from './models/dataSource.js';

// Setting
configDotenv();
const app = express();
const port = process.env.PORT || 8000;

await AppDataSource.initialize()
    .then(() => { console.log(`DB has initted`) })
    .catch((err) => { console.error(err) })

app.use(cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))
app.use(express.json());

app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server has initted on port ${port}`);
})