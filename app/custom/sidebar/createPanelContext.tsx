"use client";

import { createContext, useContext, useState } from "react";

const CreatePanelContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string;
}>({ open: false, setOpen: () => {}, token: "" });

export const CreatePanelProvider = ({ children, token }: { children: React.ReactNode; token: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <CreatePanelContext.Provider value={{ open, setOpen, token }}>
      {children}
    </CreatePanelContext.Provider>
  );
};

export const useCreatePanel = () => useContext(CreatePanelContext);
