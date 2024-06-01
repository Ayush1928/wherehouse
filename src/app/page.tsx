"use client"
import NewRowForm from "@/components/NewRowForm";
import SheetDataTable from "@/components/SheetDataTable";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 bg-slate-900 space-y-12">
      <SheetDataTable />
      <NewRowForm />
    </main>
  );
}
