import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";

export default async function SigninPage() {
  const session = await auth();

  if (session) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });
    } catch (err) {
      console.error("Error posting data:", err);
    }
    redirect("/dashboard/urls");
  }

  return (
    <div className="min-h-screen flex flex-col bg-dull-lavender-50">
      {/* Top crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-b-[100%] w-full" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gravel-900 mb-4">
            Welcome to QuickShrink
          </h1>
          <p className="text-xl text-gravel-700 mb-8 max-w-2xl">
            Log in securely and start simplifying your links.
          </p>
        </div>

        <div className="w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-4">
            <button
              onClick={async () => {
                "use server";
                await signIn("google");
              }}
              className="w-full bg-white text-black border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-200"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
              className="w-full bg-[#24292e] text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 hover:bg-opacity-90 transition duration-200">
              <GithubIcon className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gravel-600">
          By continuing, you agree to QuickShrink's{" "}
          <a href="/terms" className="font-medium text-blue-violet-600 hover:text-blue-violet-500">
            Terms of Service
          </a>
        </p>
      </main>

      {/* Bottom crescent */}
      <div className="h-32 md:h-48 bg-dull-lavender-300 rounded-t-[100%] w-full mt-auto" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}