import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Edit } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUrl } from "@/hooks";
import { Url } from "@/types";

interface Props {
  url: Url;
  urlId: string;
}

export default function UpdateUrlModal({ url, urlId }: Props) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, errors, onSubmit } =
    useUpdateUrl({
      setIsOpen: setIsEditModalOpen,
      UrlId: urlId,
    });

  return (
    <>
      <DropdownMenuItem className="flex items-center ml-2 cursor-pointer" onSelect={(e) => {
        e.preventDefault();
        setIsEditModalOpen(true);
      }}>
        <Edit className="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenuItem >
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Departamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="originalUrl">Original Url</Label>
                <Input
                  defaultValue={url.originalUrl}
                  id="originalUrl"
                  {...register("originalUrl")}
                />
                {errors.originalUrl && (
                  <p className="text-red-500 text-xs">{errors.originalUrl.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customAlias">Short Code</Label>
                <Input
                  defaultValue={url.customAlias || url.shortCode}
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
                  defaultValue={url.password ?? ""}
                  id="password"
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
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}