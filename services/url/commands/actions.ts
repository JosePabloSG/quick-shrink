import httpClient from "@/helpers/http-client";
import { CreateUrl, UpdateUrl } from "@/types";

const BASE_PATH = "/urls";

export async function createUrl(data: CreateUrl) {
  return httpClient<CreateUrl>({
    method: "POST",
    endpoint: BASE_PATH,
    data,
  });
}

export async function updateUrl(urlId: string, data: UpdateUrl) {
  return httpClient<UpdateUrl>({
    method: "PATCH",
    endpoint: `${BASE_PATH}/${urlId}`,
    data,
  });
}

export async function deleteUrl(urlId: string) {
  return httpClient({
    method: "DELETE",
    endpoint: `${BASE_PATH}/${urlId}`,
  });
}
