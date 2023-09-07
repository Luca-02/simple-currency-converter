const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const DEFAULT_KEY = process.env.DEFAULT_KEY || '';
const URL = `http://${HOST}:${PORT}`;

module.exports = {
    HOST,
    PORT,
    DEFAULT_KEY,
    URL
};