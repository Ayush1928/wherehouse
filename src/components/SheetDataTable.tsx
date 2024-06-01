"use client"
import { titilliumWeb } from "@/app/font";
import { DataSet } from "@/lib/types";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "./ui/button";
import { toast } from "react-toastify";

interface ISheetDataTableProps {
}

const SheetDataTable: FunctionComponent<ISheetDataTableProps> = () => {
    const baseURL = process.env.BASE_URL || "https://wherehouse-server.onrender.com/api"
    const [sheetData, setSheetData] = useState<DataSet | null>(null);

    const fetchSheetData = async (clicked: boolean) => {
        try {
            const response = await axios.get(`${baseURL}/readSheet`);
            const data = response.data as DataSet;
            setSheetData(data);
            if (clicked && data) {
                toast.success("Sheet updated successfully.", {
                    position: "top-right"
                });
            }
        } catch (error) {
            console.error("Error fetching sheet data:", error);
        }
    }

    useEffect(() => {
        fetchSheetData(false);
    }, [])

    return (
        <main className="flex justify-center items-center flex-col gap-y-8">
            <h1 className={`${titilliumWeb.className} text-4xl font-bold text-white`}>Google Sheets Data</h1>
            {!sheetData ? (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[70vh] w-[70vw] rounded-xl bg-slate-800" />
                </div>
            ) : (
                <div className="rounded-md px-8 py-1 bg-slate-800">
                    <Table className="w-[65vw] font-bold bg-slate-800">
                        <TableHeader className="border-b-[3px] border-b-slate-900">
                            <TableRow className="hover:bg-slate-700 border-b-[4px]">
                                {sheetData[0].map((header, index) => (
                                    <TableHead key={index} className={`w-[100px] text-center text-lg text-slate-300 py-3 ${index === 0 ? 'rounded-l-md' : index === 2 ? 'rounded-r-md' : ''}`}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="m-2 text-gray-100">
                            {sheetData.slice(1).map((row, rowIndex) => (
                                <TableRow key={rowIndex} className="hover:bg-slate-700 border-b-[3px] border-b-slate-900">
                                    {row.map((cell, cellIndex) => (
                                        <TableCell key={cellIndex} className={`text-center text-[16px] py-3  ${cellIndex === 0 ? 'rounded-l-md' : cellIndex === 2 ? 'rounded-r-md' : ''}`}>
                                            {cell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Button onClick={() => fetchSheetData(true)} className="px-4 py-2 text-lg bg-slate-100 text-slate-900 hover:bg-slate-300 font-bold">Sync Sheet</Button>
        </main>
    );
};

export default SheetDataTable;
