"use client";

import { useRef, useEffect, useState } from "react";
import {
  Home,
  Settings,
  LayoutDashboard,
  PlusSquare,
  Clapperboard,
  Handshake,
  Camera,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreatePanel } from "./createPanelContext";

const navItems = [
  {
    title: "Home",
    icon: <Home className="!size-8 stroke-[1.5px]" />,
    href: "/home",
  },
  {
    title: "Trending",
    icon: <LayoutDashboard className="!size-8 stroke-[1.5px]" />,
    href: "/trending",
  },
  {
    title: "Settings",
    icon: <Settings className="!size-8 stroke-[1.5px]" />,
    href: "/settings",
  },
];

const AppSidebar = () => {
  const { open: createOpen, setOpen: setCreateOpen, token } = useCreatePanel();
  const [boardDialogOpen, setBoardDialogOpen] = useState(false);
  const [friendsDialogOpen, setFriendsDialogOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardImage, setBoardImage] = useState<File | null>(null);
  const [boardImagePreview, setBoardImagePreview] = useState<string | null>(null);
  const boardFileRef = useRef<HTMLInputElement>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!createOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setCreateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [createOpen, setCreateOpen]);

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="py-5">
                    <SidebarMenuButton asChild>
                      <a className="h-10 w-10" href={item.href}>
                        {item.icon}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="py-5">
                  <SidebarMenuButton
                    ref={toggleRef}
                    onClick={() => setCreateOpen(!createOpen)}
                  >
                    <PlusSquare className="!size-8 stroke-[1.5px]" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div
        ref={panelRef}
        className="fixed top-0 h-full w-80 bg-background border-r shadow-lg z-[5] flex flex-col gap-4 p-6 transition-[left,visibility] duration-500 ease-in-out"
        style={{
          left: createOpen
            ? "var(--sidebar-width)"
            : "calc(var(--sidebar-width) - 20rem)",
          visibility: createOpen ? "visible" : "hidden",
        }}
      >
        <div className = "flex items-center pb-2">
          <h1 className = "text-xl font-semibold p-2">Create</h1>
         
        </div>
        <div
          onClick={() => { setBoardDialogOpen(true); setCreateOpen(false); }}
          className="flex items-center gap-4 hover:bg-gray-100 rounded-md cursor-pointer transition p-2"
        >
          <div className="bg-gray-200 w-fit h-fit p-2 rounded-md">
            <Clapperboard className="stroke-[0.5px] text-blue-600 h-12 w-12" />
          </div>
          <div>
            <h2>Create New Board</h2>
            <p className="font-light text-xs text-muted-foreground">
              Organize a collection of your favorite movies by creating a board
            </p>
          </div>
        </div>
        <div
          onClick={async () => {
            setFriendsDialogOpen(true);
            setCreateOpen(false);
            setInviteLoading(true);
            try {
              const res = await fetch("/api/friend/invite", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await res.json();
              setInviteUrl(data.url || "");
            } catch {
              setInviteUrl("");
            } finally {
              setInviteLoading(false);
            }
          }}
          className="flex items-center gap-4 hover:bg-gray-100 rounded-md cursor-pointer transition p-2"
        >
          <div className="bg-gray-200 w-fit h-fit p-2 rounded-md">
            <Handshake className="stroke-[0.5px] text-pink-600 h-12 w-12" />
          </div>
          <div>
            <h2>Add Friends</h2>
            <p className="font-light text-xs text-muted-foreground">
              Connect with friends and share your favorite movies
            </p>
          </div>
        </div>
      </div>

      <Dialog open={boardDialogOpen} onOpenChange={setBoardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input
              ref={boardFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBoardImage(file);
                setBoardImagePreview(URL.createObjectURL(file));
              }}
            />
            {boardImagePreview ? (
              <div className="relative w-fit">
                <img src={boardImagePreview} alt="Preview" className="rounded-md max-h-40 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setBoardImage(null);
                    setBoardImagePreview(null);
                    if (boardFileRef.current) boardFileRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-background border rounded-full p-0.5 cursor-pointer hover:bg-zinc-100"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => boardFileRef.current?.click()}
                className="flex items-center border-2 gap-4 border-dashed w-full rounded-md p-2 text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <Camera size={18} className="stroke-[0.5px] h-10 w-10 text-green-800" />
                <div className="flex flex-col gap-1 font-figtree text-left">
                  <h1 className="font-semibold">Add cover photo</h1>
                  <p className="font-light text-sm text-muted-foreground">Give your board a cover image</p>
                </div>
              </button>
            )}
            <Input
              placeholder="Board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <Button className = "w-fit" disabled={!boardName.trim()} onClick={async () => {
              if (!boardName.trim()) return;
              try {
                const res = await fetch("/api/list", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ name: boardName.trim(), hasImage: !!boardImage }),
                });
                const json = await res.json();
                const data = json.data;

                if (data?.uploadUrl && boardImage) {
                  await fetch(data.uploadUrl, {
                    method: "PUT",
                    headers: { "Content-Type": boardImage.type },
                    body: boardImage,
                  });
                }

                setBoardName("");
                setBoardImage(null);
                setBoardImagePreview(null);
                if (boardFileRef.current) boardFileRef.current.value = "";
                setBoardDialogOpen(false);
              } catch (err) {
                console.error("[createBoard] error:", err);
              }
            }}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={friendsDialogOpen} onOpenChange={setFriendsDialogOpen}>
        <DialogContent>
          <DialogHeader >
          </DialogHeader>
          <div className="flex flex-col gap-4 font-figtree text-sm">
            <ol className="list-decimal list-inside space-y-3 text-sm">
              <li><span className="font-semibold">Share your link</span><br /><span className="text-muted-foreground">Your friends need to follow you using your link to message you</span></li>
              <li><span className="font-semibold">Your friends follow you</span><br /><span className="text-muted-foreground">Each link works for a few friends at a time but you can get as many as you need</span></li>
              <li><span className="font-semibold">Follow back!</span><br /><span className="text-muted-foreground">Once you're following each other, you can share ideas, goals and more via direct messages</span></li>
            </ol>
          </div>
          <div className="flex items-center gap-2">
            <Input readOnly value={inviteLoading ? "Generating link..." : inviteUrl} className="text-sm text-muted-foreground" />
            <Button
              variant="outline"
              size="sm"
              disabled={inviteLoading || !inviteUrl}
              onClick={() => navigator.clipboard.writeText(inviteUrl)}
            >
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppSidebar;
