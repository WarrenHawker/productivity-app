//import packages
import { app } from './app';

//port and database variables - imported from .env file
const port = process.env.PORT || 5000;

//currently active environment (development or production), used by email templates
export let activeEnvironment: string;

const mongodb = process.env.MONGO_DB || 'mongodb://localhost:8080';

//start server
app.listen(port, async () => {
  console.log(`server running on port ${port}`);
  console.log('environment: ', app.get('env'));
  activeEnvironment = app.get('env');
});
