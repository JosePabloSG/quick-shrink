import { useState } from "react";

import useArtificialDelay from "@/hooks/useArtificialDelay";
import { notify } from "@/utils/notification";

import { useDeleteUrlMutation } from "./mutations";

interface Props {
  urlId: string;
}

const URL_MESSAGES = {
  loading: "Deleting URL...",
  success: "URL deleted successfully!",
  error: "An error occurred while deleting the URL. Please try again.",
} as const;

const DEFAULT_ERROR =
  "An error occurred while deleting the URL. Please try again.";

export default function useDeleteUrl({ urlId }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { withDelay } = useArtificialDelay(500);

  const mutation = useDeleteUrlMutation((error: Error) => {
    setErrorMessage(error.message || DEFAULT_ERROR);
  });

  const confirmDelete = async () => {
    try {
      await notify(withDelay(mutation.mutateAsync(urlId)), URL_MESSAGES);
      setIsDeleteModalOpen(false);
    } catch (error) {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return {
    handleDelete,
    mutation,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
  };
}
