"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { MoreHorizontal, Lock, Unlock, Edit, Trash } from "lucide-react";
import { useState } from "react";

import { CreateUrlModal } from "@/components/create-url-modal";
import { ErrorModal } from "@/components/error-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UrlTableSkeleton } from "@/components/url-table-skeleton";
import { useGetAllUrls } from "@/hooks";
import { Url } from "@/types";

export default function Dashboard() {
  const { urls = [], isLoading, error } = useGetAllUrls() as { urls?: Url[], isLoading: boolean, error: Error | null };
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  if (error) {
    setIsErrorModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-blue-violet-800">QuickShrink Dashboard</h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <CreateUrlModal />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-violet-700">Original URL</TableHead>
                  <TableHead className="text-blue-violet-700">Short Code</TableHead>
                  <TableHead className="text-blue-violet-700">Expiration Date</TableHead>
                  <TableHead className="text-blue-violet-700">Click Count</TableHead>
                  <TableHead className="text-blue-violet-700">Password</TableHead>
                  <TableHead className="text-blue-violet-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <UrlTableSkeleton />
                ) : urls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-gravel-500 mb-4">No URLs found. Start by creating your first shortened URL!</p>
                        <CreateUrlModal />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                ) : (
                  urls.map((url, index) => (
                    <motion.tr
                      key={url.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <TableCell className="max-w-xs truncate" title={url.originalUrl}>
                        {url.originalUrl}
                      </TableCell>
                      <TableCell>
                        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url.shortCode}`} target="_blank" rel="noopener noreferrer"
                          className="text-blue-violet-500 hover:underline">
                          {url.shortCode}
                        </a>
                      </TableCell>
                      <TableCell>
                        {url.expirationDate ? format(new Date(url.expirationDate), "MMM dd, yyyy") : "No expiration"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-dull-lavender-100 text-dull-lavender-800">
                          {url.clickCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {url.password ? (
                          <Lock className="text-blue-violet-500" size={20} />
                        ) : (
                          <Unlock className="text-water-leaf-500" size={20} />
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-beauty-bush-500">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </main>

      {error && (
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          error={error}
        />
      )}
    </div>
  );
}
