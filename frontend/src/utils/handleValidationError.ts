import { IErrorParam, IErrorReturnData } from "../types/error.types";

export const handleValidationError = (error: IErrorParam): IErrorReturnData => {
  const parsedMessage = JSON.parse(error.data.message);
  return {
    code: error.statusText,
    message: parsedMessage[0].message,
    status: error.status,
    data: error.data,
  };
};
