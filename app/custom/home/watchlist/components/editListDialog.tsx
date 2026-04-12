"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditListDialogProps {
  name: string;
  listId: string;
  token: string;
}

const EditListDialog = ({ name, listId, token }: EditListDialogProps) => {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState(name);

  const handleSave = async () => {
    if (!listName.trim()) return;
    try {
      await fetch(`/api/list/${listId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: listName.trim() }),
      });
      setOpen(false);
    } catch (err) {
      console.error("Failed to update list:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group px-4 py-2 text-sm text-zinc-500 transition cursor-pointer flex items-center gap-1 rounded-md border-2 hover:border-green-700 hover:text-white hover:bg-green-700">
          <Pencil className="w-4 h-4 text-green-700 group-hover:text-white transition" />
          Edit List
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <Button className="w-fit" disabled={!listName.trim()} onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditListDialog;
