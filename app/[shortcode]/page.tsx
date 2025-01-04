"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import LoadingSpinner from "@/components/spineer";
import { useGetRedirectUrl } from "@/hooks";
import useRedirection from "@/hooks/useRedirect";

export default function Page() {
  const params = useParams<{ shortcode: string }>();
  const shortCode = params.shortcode;
  const { url, isError, isLoading } = useGetRedirectUrl(shortCode);
  const { redirect } = useRedirection();

  useEffect(() => {
    if (url?.url) {
      redirect({ path: url.url });
    }
  }, [url, redirect]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !url || typeof url !== "object") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gravel text-blue-violet">
        <p className="text-xl font-semibold">Error: Unable to load data</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gravel text-blue-violet">
      <p className="text-xl font-semibold">Redirecting...</p>
    </div>
  );
}

