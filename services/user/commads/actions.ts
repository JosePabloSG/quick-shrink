import httpClient from "@/helpers/http-client";

const BASE_PATH = "/users";

export async function DeleteUser(id: string) {
  console.log("DeleteUser", id);
  return httpClient({
    method: "DELETE",
    endpoint: `${BASE_PATH}`,
  });
}
