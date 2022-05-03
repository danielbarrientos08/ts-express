import express, { Application } from 'express';
import userRoutes from '../routes/user.route';
import cors from 'cors';

import db from './db/connection';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection () {

    try {
        await db.authenticate();
        console.log('db online');

    } catch (error: any) {
     throw new Error( error );
      
    }
  }    

  middlewares() {
    //CORS
    this.app.use(cors({}));

    //lECTURA DE BODY
    this.app.use(express.json());

    //Capeta Pública
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server opn port: ' + this.port);
    });
  }
}

export default Server;
