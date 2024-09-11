export default () => ({
  PORT: parseInt(process.env.PORT) || 4000,
  HCP_CLIENT_ID: process.env.HCP_CLIENT_ID,
  HCP_CLIENT_SECRET: process.env.HCP_CLIENT_SECRET,
  HCP_GENERATE_URL: process.env.HCP_GENERATE_URL,
  HCP_READ_SECRETS_URL: process.env.HCP_READ_SECRETS_URL,
});
