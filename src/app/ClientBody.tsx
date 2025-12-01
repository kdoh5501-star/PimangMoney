"use client";

import { AuthProvider } from "./AuthProvider";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}

