import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

import { UrlSchema } from "@/schemas";
import { createUrl } from "@/services";
import { CreateUrl } from "@/types";

export type FormFields = z.infer<typeof UrlSchema>;

/**
 * Custom hook for managing the creation of URLs with server interaction and state updates.
 * Handles API requests, retries, and error handling.
 *
 * @param {UseFormSetError<FormFields>} setError - Function to set form errors in react-hook-form.
 * @returns {object} - React Query mutation object with methods and state for URL creation.
 */
export const useCreateUrlMutation = (setError: UseFormSetError<FormFields>) => {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * Mutation function to create a new URL.
     * @param {CreateUrl} data - The data required to create a URL.
     * @returns {Promise<void>} - A promise that resolves when the URL is created successfully.
     */
    mutationFn: async (data: CreateUrl) => await createUrl(data),

    /**
     * Number of retry attempts for the mutation in case of failure.
     */
    retry: 3,

    /**
     * Function to calculate the delay between retries based on the attempt index.
     * @param {number} attemptIndex - The index of the retry attempt.
     * @returns {number} - The delay in milliseconds before the next retry.
     */
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    /**
     * Callback triggered when the mutation is successful.
     * Invalidates the query cache for URLs to ensure fresh data is fetched.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
    },

    /**
     * Callback triggered when the mutation encounters an error.
     * Sets the error message in the form using react-hook-form's `setError`.
     * @param {Error} error - The error encountered during the mutation.
     */
    onError: (error: Error) => {
      setError("root", { message: error.message });
    },
  });
};
