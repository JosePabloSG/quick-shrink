"use client";

import { format } from "date-fns";
import { MoreHorizontal, Lock, Unlock, BarChart2, QrCode, Edit, Trash, Plus } from "lucide-react";
import { useState } from "react";

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
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UrlTableSkeleton } from "@/components/url-table-skeleton";
import { useGetAllUrls } from "@/hooks";

interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias: string | null;
  expirationDate: string | null;
  clickCount: number;
  isPasswordProtected: boolean;
  isActive: boolean;
}

export default function Dashboard() {
  const { urls = [], isLoading, error } = useGetAllUrls() as { urls?: Url[], isLoading: boolean, error: Error | null };
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleStatusToggle = (id: string) => {
    console.log("Toggle status for URL with ID:", id);
  };

  if (error) {
    setIsErrorModalOpen(true);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gravel-900">QuickShrink Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <Button className="bg-blue-violet-500 hover:bg-blue-violet-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New URL
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Bulk Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete Selected</DropdownMenuItem>
            <DropdownMenuItem>Deactivate Selected</DropdownMenuItem>
            <DropdownMenuItem>Export Selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short Code</TableHead>
              <TableHead>Custom Alias</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Click Count</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <UrlTableSkeleton />
            ) : urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <p className="text-gravel-500 mb-4">No URLs found. Start by creating your first shortened URL!</p>
                  <Button className="bg-blue-violet-500 hover:bg-blue-violet-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create New URL
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell className="max-w-xs truncate" title={url.originalUrl}>
                    {url.originalUrl}
                  </TableCell>
                  <TableCell>
                    <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url.shortCode}`} target="_blank" rel="noopener noreferrer"
                      className="text-blue-violet-500 hover:underline">
                      {url.shortCode}
                    </a>
                  </TableCell>
                  <TableCell>{url.customAlias}</TableCell>
                  <TableCell>
                    {url.expirationDate ? format(new Date(url.expirationDate), "MMM dd, yyyy") : "No expiration"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-dull-lavender-100 text-dull-lavender-800">
                      {url.clickCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {url.isPasswordProtected ? (
                      <Lock className="text-blue-violet-500" size={20} />
                    ) : (
                      <Unlock className="text-water-leaf-500" size={20} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <QrCode size={20} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={url.isActive}
                      onCheckedChange={() => handleStatusToggle(url.id)}
                      className="data-[state=checked]:bg-blue-violet-500"
                    />
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
                        <DropdownMenuItem>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          <span>Analytics</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <QrCode className="mr-2 h-4 w-4" />
                          <span>Generate QR Code</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-beauty-bush-500">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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

