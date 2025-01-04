import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUrl } from "@/services";

export const useDeleteUrlMutation = (onError: (error: Error) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (urlId: string) => await deleteUrl(urlId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};
