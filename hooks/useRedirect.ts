/**
 * Custom hook for handling navigation with optional delay.
 * Provides a method to programmatically redirect users to a specified path.
 *
 * @returns {Object}
 * @property {Function} redirect - Redirects to the specified path, with an optional delay.
 */
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Redirection = {
  /**
   * The target path for redirection.
   */
  path: string;

  /**
   * Optional delay (in milliseconds) before the redirection occurs.
   * Defaults to 0 (immediate redirection).
   */
  delay?: number;
};

const useRedirection = () => {
  const router = useRouter();

  /**
   * Redirects to the specified path with an optional delay.
   *
   * @param {Redirection} options - Contains the path and optional delay for redirection.
   */
  const redirect = useCallback(
    ({ path, delay = 0 }: Redirection) => {
      if (delay === 0) {
        router.push(path);
        return;
      }

      setTimeout(() => {
        router.push(path);
      }, delay);
    },
    [router]
  );

  return { redirect };
};

export default useRedirection;
