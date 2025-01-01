import { useQuery } from "@tanstack/react-query";

import { getRedirectUrl } from "@/services";

const useGetRedirectUrl = (shortCode: string) => {
  const {
    data: url,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => getRedirectUrl(shortCode),
  });

  return {
    url,
    isLoading,
    isError,
    error,
  };
};

export default useGetRedirectUrl;
