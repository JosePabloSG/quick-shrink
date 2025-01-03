"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
} from "@/components/ui/popover";
import useCreateUrl from "@/hooks/urls/commands/create/useCreateUrl";

export function CreateUrlModal() {
  const {
    register,
    onSubmit,
    handleAddNew,
    isAddModalOpen,
    setIsAddModalOpen,
    errors,
  } = useCreateUrl();

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddNew}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Create New URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New URL</DialogTitle>
          <DialogDescription>
            Enter the details for your new shortened URL.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="originalUrl">Original URL</Label>
              <Input
                id="originalUrl"
                type="url"
                {...register("originalUrl")}
              />
              {errors.originalUrl && (
                <p className="text-red-500 text-xs">{errors.originalUrl.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customAlias">Custom Alias</Label>
              <Input
                id="customAlias"
                {...register("customAlias")}
              />
              {errors.customAlias && (
                <p className="text-red-500 text-xs">{errors.customAlias.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>
            {errors.root && (
              <p className="text-red-500 text-xs mt-2">
                {errors.root.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Create URL</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}