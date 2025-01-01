import { useMutation } from "@tanstack/react-query";

import { verifyPassword } from "@/services";

interface VerifyPasswordParams {
  shortCode: string;
  password: string;
}

export const useVerifyPassword = () => {
  const mutation = useMutation({
    mutationFn: async ({ shortCode, password }: VerifyPasswordParams) => {
      const response = await verifyPassword(shortCode, password);
      return response;
    }
  });

  return {
    verifyPassword: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data
  };
};

export default useVerifyPassword;