import express from 'express';
import dotenv from 'dotenv';
import { IMiddleware } from './interface/middleware.interface';
import { IRouterCustom } from './interface/router.interface';
import { ErrorMiddleware } from './middleware/error.middleware';
import connectToDatabase from './Database/connection';
dotenv.config();

export class Server {
  private readonly _server = express();
  constructor() {
    this._server.use(express.static('uploads'));
    this._server.use(express.json());
    this._server.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  middleware(mw: IMiddleware) {
    this._server.use(mw.getMiddleware());
  }

  errorMiddleware(errMw: ErrorMiddleware) {
    this._server.use(errMw.getErrorMiddleware());
  }

  route(router: IRouterCustom) {
    this._server.use(router.getRouter());
  }

  listen(PORT: number) {
    this._server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} 🚀`);
    });
  }

  async connectToDB() {
    await connectToDatabase();
  }
}
