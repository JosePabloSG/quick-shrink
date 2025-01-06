import useArtificialDelay from "@/hooks/useArtificialDelay";
import useRedirection from "@/hooks/useRedirect";
import { notify } from "@/utils/notification";
import { useState } from "react";
import { useDeleteUserMutation } from "./mutations";
import { signOut } from "next-auth/react";

interface Props {
  userId: string;
}

const USER_MESSAGES = {
  loading: "Deleting user...",
  success: "User deleted successfully.",
  error: "An error occurred while deleting the user.",
};

const DEFAULT_ERROR = "An error occurred while deleting the user.";

export default function useDeleteUser({ userId }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { withDelay } = useArtificialDelay(500);
  const { redirect } = useRedirection();

  const mutation = useDeleteUserMutation((error: Error) => {
    setErrorMessage(error.message || DEFAULT_ERROR);
  });

  const confirmDelete = async () => {
    try {
      await notify(withDelay(mutation.mutateAsync(userId)), USER_MESSAGES);
      setIsDeleteModalOpen(false);
      await signOut({
        redirect: false,
      });
      redirect({
        path: "/",
        delay: 2000,
      });
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
