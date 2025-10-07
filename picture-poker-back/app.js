import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.js";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization"
    ]
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
