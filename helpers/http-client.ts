import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { getSession } from "next-auth/react";

interface HttpClientOptions<T = unknown> {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint: string;
  data?: T;
  headers?: RawAxiosRequestHeaders;
  timeout?: number;
}

interface ApiError {
  message: string;
  [key: string]: unknown;
}

class HttpClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpClientError";
  }
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ApiError>) => {
      throw new HttpClientError(
        error.response?.data?.message || "Unknown error occurred"
      );
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

async function httpClient<ResponseType, RequestType = unknown>({
  method,
  endpoint,
  data,
  headers,
  timeout,
}: HttpClientOptions<RequestType>): Promise<ResponseType> {
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: headers as RawAxiosRequestHeaders,
    timeout,
  };

  if (data instanceof FormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
    config.data = data;
  } else if (data) {
    config.data = data;
  }

  return axiosInstance.request<unknown, ResponseType>(config);
}

export default httpClient;
