import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUrl } from "@/hooks";

import { DropdownMenuItem } from "../ui/dropdown-menu";

interface Props {
  urlId: string
}

export default function DeleteUrlModal({ urlId }: Props) {
  const {
    handleDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
  } = useDeleteUrl({ urlId: urlId });

  return (
    <>
      <DropdownMenuItem
        className="text-beauty-bush-500 cursor-pointer"
        onSelect={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <Trash className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this URL? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}