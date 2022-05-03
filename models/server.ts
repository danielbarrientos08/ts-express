
import express, {Application} from 'express';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('server opn port: '+ this.port )
        })
    }
}

export default Server;