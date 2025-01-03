import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { UrlSchema } from "@/schemas";
import { CreateUrl } from "@/types";
import { notify } from "@/utils/notification";

import { FormFields, useCreateUrlMutation } from "./mutations";

/**
 * Custom hook for handling URL creation functionality.
 * Manages form handling, submission, and modal state for adding new URLs.
 *
 * @returns {Object} Form handling methods, state, and modal controls.
 * @property {Function} onSubmit - Handles form submission for creating URLs.
 * @property {Function} register - Registers form input fields with React Hook Form.
 * @property {Object} mutation - Mutation object for managing the create URL request.
 * @property {boolean} isAddModalOpen - Indicates whether the add URL modal is open.
 * @property {Function} setValue - Programmatically sets form values.
 * @property {Function} setIsAddModalOpen - Controls the open/close state of the add URL modal.
 * @property {Function} handleAddNew - Opens the modal for adding a new URL.
 * @property {Object} errors - Contains validation errors for the form fields.
 */

const URL_MESSAGES = {
  loading: "Creating URL...",
  success: "URL created successfully!",
  error: "Failed to create URL",
} as const;

const useCreateUrl = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(UrlSchema),
  });

  const mutation = useCreateUrlMutation(setError);

  const handleAddNew = () => setIsAddModalOpen(true);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const convertedData = convertedDataTypes(data);
      await notify(mutation.mutateAsync(convertedData), URL_MESSAGES);
      setIsAddModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  });

  useEffect(() => {
    if (!isAddModalOpen) {
      reset();
    }
  }, [isAddModalOpen, reset]);

  return {
    onSubmit,
    register,
    mutation,
    isAddModalOpen,
    setValue,
    setIsAddModalOpen,
    handleAddNew,
    errors,
  };
};

export default useCreateUrl;

export const convertedDataTypes = (url: any): CreateUrl => ({
  originalUrl: url.originalUrl,
  customAlias: url.customAlias || null,
  password: url.password || null,
  expirationDate: url.expirationDate,
});
