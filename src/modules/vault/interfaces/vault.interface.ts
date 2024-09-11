export enum VaultSecretNames {
  CLERK_SECRET_KEY = 'CLERK_SECRET_KEY',
  MONGODB_URI = 'MONGODB_URI',
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  PORT = 'PORT',
  SIGN_URL = 'SIGN_URL',
  REDIS_URL = 'REDIS_URL',
  REDIS_USERNAME = 'REDIS_USERNAME',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_DATABASENAME = 'REDIS_DATABASENAME',
}

export type VaultSecrets = {
  name: VaultSecretNames;
  version: {
    version: string;
    type: string;
    created_at: string;
    value: string;
    created_by_id: string;
  };
  created_at: string;
  latest_version: string;
  created_by: {
    name: string;
    type: string;
    email: string;
  };
  created_by_id: string;
};
