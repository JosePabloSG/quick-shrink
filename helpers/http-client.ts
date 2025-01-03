import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { getSession } from "next-auth/react";

/**
 * Interface representing the configuration options for HTTP requests.
 * @template T - Type of the request data.
 */
interface HttpClientOptions<T = unknown> {
  /** HTTP method to be used for the request. */
  method: "GET" | "POST" | "PATCH" | "DELETE";
  /** API endpoint to call. */
  endpoint: string;
  /** Data to be sent in the request body (optional). */
  data?: T;
  /** Custom headers for the request (optional). */
  headers?: RawAxiosRequestHeaders;
  /** Request timeout in milliseconds (optional). */
  timeout?: number;
}

/**
 * Interface representing an API error structure.
 */
interface ApiError {
  /** Error message returned by the API. */
  message: string;
  /** Additional properties provided by the API error response. */
  [key: string]: unknown;
}

/**
 * Custom error class for handling HTTP client-specific errors.
 */
class HttpClientError extends Error {
  /**
   * Creates an instance of HttpClientError.
   * @param message - Error message describing the issue.
   */
  constructor(message: string) {
    super(message);
    this.name = "HttpClientError";
  }
}

/**
 * Creates and configures an Axios instance with interceptors.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to attach an authorization token
  instance.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Response interceptor to handle errors
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

/** Global Axios instance configured with custom interceptors. */
const axiosInstance = createAxiosInstance();

/**
 * HTTP client function for making API requests.
 * @template ResponseType - Expected type of the response data.
 * @template RequestType - Type of the request data (default is `unknown`).
 * @param {HttpClientOptions<RequestType>} options - Configuration options for the request.
 * @returns {Promise<ResponseType>} - Promise resolving to the response data.
 * @throws {HttpClientError} - Throws an error if the request fails.
 */
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
