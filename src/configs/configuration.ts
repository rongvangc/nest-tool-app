export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  mongoUrl: process.env.MONGODB_URI,
});
