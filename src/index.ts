import { Server } from './core/mainServer';
import { insertLocations } from './core/Database/utils';
import { CorsMiddleware } from './core/middleware/cors.middleware';
import { HTTPLoggerMiddleware } from './core/middleware/httpLogger.middleware';
import { ErrorMiddleware } from './core/middleware/error.middleware';
import { LocationRouter } from './routers/location.router';

// -------------- server init ---------------
const app = new Server();
app
  .connectToDB()
  .then(() => {
    const PORT = parseInt(process.env.PORT as string);
    app.listen(PORT || 8080);
  })
  .then(insertLocations);

// -------------- MWs -----------------------
app.middleware(new CorsMiddleware());
app.middleware(new HTTPLoggerMiddleware());

// -------------- Routers -------------------
app.route(new LocationRouter());


// -------------- Err MW --------------------
app.errorMiddleware(new ErrorMiddleware());
