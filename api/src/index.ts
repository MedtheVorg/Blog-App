import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config/config';
import Logger from './library/Logger';
import cors from 'cors';
import path from 'path';
//Routes
import UserRouter from './routes/User';
import AuthRouter from './routes/Auth';
import BlogRouter from './routes/Blog';
// custom Error
import CustomError from './utils/CustomErrorInterface';

const app = express();

//  first connect to MongoDb otherwise do nothing
mongoose
  .connect(config.mongo.url, { w: 'majority', retryWrites: true })
  .then(() => {
    Logger.info('Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    Logger.error('could not connect to MongoDB');
    Logger.error(err);
  });

function startServer() {
  // Request Logger middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Log the request
    Logger.info(
      `Request -> Method: [${req.method}] - Url: [${req.url}] - Ip:[${req.socket.remoteAddress}] `
    );

    // Log the response
    Logger.info(
      ` Response -> Method: [${req.method}] - Url: [${req.url}] - Ip:[${req.socket.remoteAddress}]  - Status: [${res.statusCode}]\n`
    );
    // Call the next middleware
    next();
  });

  // serve static files
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  Logger.warn(path.join(__dirname, 'uploads'));

  //  Payload parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true }));

  // Routes
  // TODO
  app.use('/user', UserRouter);
  app.use('/auth', AuthRouter);
  app.use('/blog', BlogRouter);

  // health check
  app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'pong' });
  });

  //unrecognized path
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Page not found' });
  });

  // Error handling
  app.use(
    (err: CustomError, req: Request, res: Response, next: NextFunction) => {
      Logger.error(err.message);
      Logger.error(err.stack);
      res.json({ error: err.message });
    }
  );

  // Create Server
  if (config.server.port) {
    http.createServer(app).listen(config.server.port, () => {
      Logger.info(
        `Server running on port ${config.server.port} , http://localhost:${config.server.port}`
      );
    });
  }
}

export default app;
