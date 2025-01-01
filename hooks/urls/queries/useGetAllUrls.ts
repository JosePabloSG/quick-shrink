import { useQuery } from "@tanstack/react-query";

import { getAllUrls } from "@/services";

const useGetAllUrls = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: getAllUrls,
    staleTime: 1000 * 60 * 5,
  });

  return {
    urls,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllUrls;
