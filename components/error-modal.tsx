import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  error: Error
}

export function ErrorModal({ isOpen, onClose, error }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Error Occurred</DialogTitle>
          <DialogDescription>
            An error occurred while fetching the URLs. Please try again later.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-beauty-bush-50 border border-beauty-bush-200 rounded p-3 mt-2">
          <p className="text-beauty-bush-800 text-sm">{error.message}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

