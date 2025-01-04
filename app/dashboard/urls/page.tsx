"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { MoreHorizontal, EyeOff, Eye, Unlock, Copy, Check } from "lucide-react";
import { useState } from "react";

import { ErrorModal } from "@/components/error-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateUrlModal } from "@/components/url/create-url-modal";
import DeleteUrlModal from "@/components/url/delete-url-modal";
import UpdateUrlModal from "@/components/url/update-url-modal";
import { useGetAllUrls } from "@/hooks";
import { Url } from "@/types";

function UrlCardSkeleton() {
  return (
    <Card className="w-full h-[200px]">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-4 w-3/4 bg-dull-lavender-100 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-dull-lavender-100 rounded animate-pulse" />
          <div className="flex justify-between items-center">
            <div className="h-4 w-1/4 bg-dull-lavender-100 rounded animate-pulse" />
            <div className="h-8 w-8 bg-dull-lavender-100 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="max-w-md text-center space-y-6">
        <h2 className="text-2xl font-semibold text-blue-violet-800">No URLs Found</h2>
        <p className="text-gravel-500">
          Start by creating your first shortened URL! It's quick and easy.
        </p>
        <CreateUrlModal />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { urls = [], isLoading, error } = useGetAllUrls() as { urls?: Url[]; isLoading: boolean; error: Error | null };
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});
  const [copiedUrls, setCopiedUrls] = useState<{ [key: string]: boolean }>({});

  if (error) {
    setIsErrorModalOpen(true);
  }

  const togglePasswordVisibility = (urlId: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [urlId]: !prev[urlId],
    }));
  };

  if (!isLoading && urls.length === 0) {
    return (
      <div className="min-h-screen bg-dull-lavender-50">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-violet-800 mb-8">QuickShrink</h1>
          <EmptyState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-violet-800">QuickShrink</h1>
            <CreateUrlModal />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <UrlCardSkeleton key={index} />)
            ) : (
              urls.map((url, index) => (
                <motion.div
                  key={url.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-[200px] flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <div className="max-w-[200px] truncate" title={url.originalUrl}>
                          {url.originalUrl}
                        </div>
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <UpdateUrlModal url={url} urlId={String(url.id)} />
                          <DropdownMenuSeparator />
                          <DeleteUrlModal urlId={String(url.id)} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <a
                            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-violet-500 hover:underline"
                          >
                            {url.shortCode}
                          </a>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 w-8 p-0 ${copiedUrls[url.id] ? "text-blue-violet-500" : ""}`}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url.shortCode}`
                                );
                                setCopiedUrls(prev => ({ ...prev, [url.id]: true }));
                                setTimeout(() => {
                                  setCopiedUrls(prev => ({ ...prev, [url.id]: false }));
                                }, 2000);
                              }}
                            >
                              {copiedUrls[url.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary" className="bg-dull-lavender-100 text-dull-lavender-800">
                            {url.clickCount} clicks
                          </Badge>
                          {url.expirationDate && (
                            <span className="text-sm text-gravel-500">
                              Expires {format(new Date(url.expirationDate), "MMM dd, yyyy")}
                            </span>
                          )}
                        </div>

                        {url.password ? (
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <div className="w-24 mr-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-violet-200 scrollbar-track-transparent">
                                <span className="font-mono">
                                  {visiblePasswords[url.id] ? url.password : "••••••"}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePasswordVisibility(String(url.id))}
                                className="p-0 w-8 h-8 flex-shrink-0"
                              >
                                {visiblePasswords[url.id] ? (
                                  <EyeOff className="h-4 w-4 text-blue-violet-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-blue-violet-500" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center mt-2">
                            <Unlock className="h-4 w-4 text-water-leaf-500" />
                            <span className="ml-2 text-sm text-gravel-500">No password required</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </main>

      {error && (
        <ErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} error={error} />
      )}
    </div>
  );
}

