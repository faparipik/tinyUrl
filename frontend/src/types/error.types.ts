export interface IErrorData {
  message: string;
  stack: string;
  status: number;
  success?: boolean;
}

export interface IErrorParam {
  statusText: string;
  status: number;
  data: IErrorData;
}

export interface IErrorReturnData {
  code: string;
  data: IErrorData;
  message: string;
  status: number;
}
