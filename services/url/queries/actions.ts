import httpClient from "@/helpers/http-client";
import { Url } from "@/types";

const BASE_PATH = "/urls";

type Response = {
  url: string;
};

export async function getAllUrls() {
  return httpClient<Url>({
    method: "GET",
    endpoint: BASE_PATH,
  });
}

export async function getRedirectUrl(shortcode: string) {
  return httpClient<Response>({
    method: "GET",
    endpoint: `${BASE_PATH}/redirect/${shortcode}`,
  });
}

export async function verifyPassword(shortcode: string, password: string) {
  return httpClient<Response>({
    method: "GET",
    endpoint: `${BASE_PATH}/${shortcode}/verify-password/${password}`,
  });
}
