import { Server } from './core/mainServer';
import { CorsMiddleware } from './core/middleware/cors.middleware';
import { HTTPLoggerMiddleware } from './core/middleware/httpLogger.middleware';
import { ErrorMiddleware } from './core/middleware/error.middleware';

// -------------- server init ---------------
const app = new Server();
app.connectToDB().then(() => {
  const PORT = parseInt(process.env.PORT as string);
  app.listen(PORT || 8080);
});

// -------------- MWs -----------------------
app.middleware(new CorsMiddleware());
app.middleware(new HTTPLoggerMiddleware());

// -------------- Routers -------------------

// -------------- Err MW --------------------
app.errorMiddleware(new ErrorMiddleware());
