import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.routes.js';
import postRoute from './routes/post.route.js';
import messageRoute from './routes/message.route.js';
import { app ,server} from './socket/socket.js';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected 🌐'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true,
}
app.use(cors(corsOptions));


app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/message', messageRoute)


app.get("/health", async (req, res) => {
    res.send({ message: "health OK!" });
});



app.use(express.static(path.join(__dirname,"/client/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client/dist/index.html'));
})


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})