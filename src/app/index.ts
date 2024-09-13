import express from 'express';
import routes from '../routes';
import { PORT } from '../utils/constants';

 class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(routes);
  }

  start(port: number, ) {
    this.app.listen(port, ()=>console.log(`Servers is running on port ${port}`));
  }
}

export default new Server().start(PORT);

