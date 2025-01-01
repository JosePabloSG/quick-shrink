"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useVerifyPassword } from "@/hooks";

const passwordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordPage() {
  const params = useParams<{ shortcode: string }>();
  const shortCode = params.shortcode;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { verifyPassword } = useVerifyPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      verifyPassword(
        { shortCode, password: data.password },
        {
          onSuccess: (response) => {
            if (response?.url) {
              router.push(response.url);
            }
          },
          onError: () => {
            setError("password", {
              type: "manual",
              message: "Incorrect password",
            });
          },
        }
      );
    } catch (err) {
      console.error(err);
      setError("password", {
        type: "manual",
        message: "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50">
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-b-[100%] w-full" />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-violet-100 p-3 rounded-full">
                <Lock className="w-6 h-6 text-blue-violet-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gravel-900 text-center mb-2">
              Protected Link
            </h1>
            <p className="text-gravel-600 text-center mb-6">
              This shortened URL is password-protected. Please enter the password to continue.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gravel-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border border-gravel-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-violet-400 focus:border-blue-violet-400 transition-colors duration-200"
                  placeholder="Enter password"
                  required
                />
                {errors.password && (
                  <p className="text-beauty-bush-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-violet-500 text-white py-2 px-4 rounded-md hover:bg-blue-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-violet-400 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />
    </div>
  );
}