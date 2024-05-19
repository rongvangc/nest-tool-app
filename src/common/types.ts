export enum GeneralStatus {
  Success = 'sucess',
  Fail = 'fail',
}

export type ApiResponse<T, S extends GeneralStatus = GeneralStatus.Success> = {
  data?: T;
  status?: S;
};
