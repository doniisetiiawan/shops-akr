import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';
import bidding from './controllers/bidding.controller';

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('error', () => {
  throw new Error(
    `unable to connect to database: ${config.mongoUri}`,
  );
});

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});

bidding(server);
