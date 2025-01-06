"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { AlertTriangle, Download } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import DeleteUserModal from "@/components/settings/delete-account-modal";
import { useGetAllUrls } from "@/hooks";
import { Url } from "@/types";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { urls } = useGetAllUrls();

  const extractOriginalUrls = (urls: Url[]) => {
    return urls.map(url => ({ originalUrl: url.originalUrl }));
  };
  
  const handleExportLinks = () => {
    // Type assertion and null check
    const urlsArray = Array.isArray(urls) ? urls : [];

    const originalUrls = extractOriginalUrls(urlsArray);
    const jsonString = JSON.stringify(originalUrls, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quick-shrink-urls.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <main className="px-8 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="border-b border-dull-lavender-200 pb-12">
            <h1 className="text-3xl font-bold text-blue-violet-800 mb-8">General</h1>
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-sm text-gravel-600">Update your personal information:</h2>

                <div className="space-y-8">
                  {session?.user?.image && (
                    <div className="flex items-start space-x-4 justify-start">
                      <div className="relative">
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm">
                          <AlertTriangle className="w-3 h-3 text-water-leaf-500" />
                        </div>
                      </div>
                      <p className="text-sm text-gravel-500 mt-2">
                        Profile picture is managed by your OAuth provider
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gravel-700 mb-2">
                      Your name:
                    </label>
                    <input
                      type="text"
                      value={session?.user?.name || ""}
                      disabled
                      className="w-full px-3 py-2 bg-gravel-100 border border-dull-lavender-200 rounded-md text-gravel-900"
                    />
                    <div className="flex items-center space-x-2 text-sm text-gravel-500">
                      <AlertTriangle className="w-4 h-4 text-water-leaf-500" />
                      <span>Email address is managed by your OAuth provider</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gravel-700 mb-2">
                      Your email:
                    </label>
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="w-full px-3 py-2 bg-gravel-100 border border-dull-lavender-200 rounded-md text-gravel-900 mb-2"
                    />
                    <div className="flex items-center space-x-2 text-sm text-gravel-500">
                      <AlertTriangle className="w-4 h-4 text-water-leaf-500" />
                      <span>Email address is managed by your OAuth provider</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-blue-violet-800">Account</h2>
            <div className="space-y-6">
              <h3 className="text-sm text-gravel-600">Update your account settings:</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-medium text-gravel-900 mb-2">Export links:</h4>
                  <Button
                    onClick={handleExportLinks}
                    variant="outline"
                    className="text-blue-violet-600 border-blue-violet-200 hover:bg-blue-violet-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Links
                  </Button>
                </div>

                <div>
                  <h4 className="text-base font-medium text-gravel-900 mb-2">Delete account:</h4>
                  <DeleteUserModal userId={"2"} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

