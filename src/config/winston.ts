import winston, { format } from 'winston';

const transports = {
    console: new winston.transports.Console({
        level: 'warn',
    }),
    file: new winston.transports.File({
        filename: 'src/logs/combined.log',
        // level: 'error',
        // format:format.combine(
        //     format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        //     format.align(),
        //     format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        // )}),
        // formatter: (options: { timestamp: any; level: any; }) => `new Fromat ${options.timestamp}, ${options.level} `
    })
};

// export const logger = winston.createLogger({
//     transports: [
//         // transports.console,
//         transports.file
//     ]
// });

export const userLogger = winston.loggers.add('user-service', {
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/combined.log' }),
    ],
});

export const groupLogger = winston.loggers.add('group-service', {
    format: winston.format.json(),
    defaultMeta: { service: 'group-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/combined.log' }),
    ],
});

export const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { errorLevel: 'app' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    ],
});

// logger.warn('Whats great for a snack,');
// logger.info('And fits on your back?');
// logger.error('Its log, log, log');