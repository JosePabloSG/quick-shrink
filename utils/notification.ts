import toast from "react-hot-toast";

/**
 * Displays a toast notification for a given promise lifecycle (loading, success, and error states).
 * @template T - The type of the value returned by the promise.
 * @param {Promise<T>} promise - The promise to monitor and display notifications for.
 * @param {Object} messages - Messages to display for each state of the promise.
 * @param {string} messages.loading - Message displayed while the promise is pending.
 * @param {string} messages.success - Message displayed when the promise resolves successfully.
 * @param {string} messages.error - Message displayed when the promise rejects.
 * @returns {Promise<T>} - The original promise, allowing chaining.
 */
export const notify = async <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

/**
 * Displays an error notification with a custom message.
 * @param {string} message - The error message to display.
 */
export const showError = (message: string) => {
  toast.error(message, { duration: 2500 });
};

/**
 * Displays a success notification with a custom message.
 * @param {string} message - The success message to display.
 */
export const showSuccess = (message: string) => {
  toast.success(message, { duration: 2500 });
};
