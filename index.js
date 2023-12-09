require('dotenv').config();
const app = require('./app');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

(async () => {
  try {
    app
      .listen(PORT, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
      })
      .on('error', (error) => {
        console.log('Unable to initaialise the server:', error.message);
        process.exit(1);
      });
  } catch (error) {
    console.error('Unable to connect to the server', error.message);
    process.exit(1);
  }
})();