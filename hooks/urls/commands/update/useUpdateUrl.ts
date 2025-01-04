/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useArtificialDelay from "@/hooks/useArtificialDelay";
import { UpdateUrlSchema } from "@/schemas";
import { UpdateUrl } from "@/types";
import { notify } from "@/utils/notification";

import useUpdateUrlMutation, { FormFields } from "./mutations";

interface Props {
  setIsOpen: (value: boolean) => void;
  UrlId: string;
}

const URL_MESSAGES = {
  loading: "Updating URL...",
  success: "URL updated successfully",
  error: "Error updating URL",
};

const useUpdateUrl = ({ setIsOpen, UrlId }: Props) => {
  const { withDelay } = useArtificialDelay(500);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(UpdateUrlSchema),
  });

  const mutation = useUpdateUrlMutation(UrlId, setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const convertedData = convertedDataTypes(data);
      await notify(
        withDelay(mutation.mutateAsync(convertedData)),
        URL_MESSAGES
      );
      setIsOpen(false);
    } catch (error: any) {
      setError("root", { message: error.message });
      setIsOpen(false);
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    mutation,
  };
};

export default useUpdateUrl;

export const convertedDataTypes = (url: any): UpdateUrl => ({
  originalUrl: url.originalUrl,
  customAlias: url.customAlias || null,
  password: url.password || null,
  expirationDate: url.expirationDate,
});
