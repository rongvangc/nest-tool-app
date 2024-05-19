import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string): string => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(rawPassword, salt);

  return hash;
};

export const comparePassword = (rawPassword: string, hash: string): boolean => {
  return bcrypt.compareSync(rawPassword, hash);
};
