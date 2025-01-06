import { DeleteUser } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUserMutation = (onError: (error: Error) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => await DeleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};
