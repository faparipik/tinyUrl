import axios from "axios";
import { handleValidationError } from "../../utils/handleValidationError";

type Methods = "get" | "post" | "put" | "patch" | "delete";

const defaults = {
  headers: () => ({
    "Content-Type": "application/json",
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 502,
    data: {},
  },
};

const api = <T>(
  method: Methods,
  url: string,
  variables?: {}
): Promise<{ data: T }> =>
  new Promise<{ data: T }>((resolve, reject) => {
    axios({
      baseURL: import.meta.env.VITE_TINY_URL_BACKEND,
      url,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response: any) => {
        resolve(response);
      },
      (err) => {
        if (err.response.data.status === 422) {
          reject(handleValidationError(err.response));
        }
        reject(defaults.error);
      }
    );
  });

export default {
  get: <T>(...args: [url: string, variable?: {}]) => api<T>("get", ...args),
  post: <T>(...args: [url: string, variable?: {}]) => api<T>("post", ...args),
  put: (...args: [url: string, variable?: {}]) => api("put", ...args),
  patch: (...args: [url: string, variable?: {}]) => api("patch", ...args),
  delete: (...args: [url: string, variable?: {}]) => api("delete", ...args),
};
