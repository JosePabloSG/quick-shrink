import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

import { UpdateUrlSchema } from "@/schemas";
import { updateUrl } from "@/services";
import { UpdateUrl } from "@/types";

export type FormFields = z.infer<typeof UpdateUrlSchema>;

export const useUpdateUrlMutation = (
  urlId: string,
  setError: UseFormSetError<FormFields>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUrl) => await updateUrl(urlId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
    },
    onError: (error: Error) => {
      setError("root", { message: error.message });
    },
  });
};

export default useUpdateUrlMutation;
