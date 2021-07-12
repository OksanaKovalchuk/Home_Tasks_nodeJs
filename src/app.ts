/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from './routers/users.router';
import { groupsRouter } from './routers/groups.router';
import { logger } from './config/winston';
import winston from 'winston';

dotenv.config();
const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'winston.log' })
    ]
});

/**
 * App Variables
 *
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    // console.log(`Listening on port ${PORT}`);
});

app.use((err: {
    type: any;
    message: any; }, req: { method: any; originalUrl: any; ip: any; }, res: any, next: (arg0: any) => void) => {
    logger.error(`${req.method} - ${err.message} - ${err.type} - ${req.originalUrl} - ${req.ip}`);
    next(err);
    res.send(500);
})

process.on('uncaughtException', (err: any) => {
    logger.error(`Caught exception: ${err}\n`);
    process.exit(1);
});
