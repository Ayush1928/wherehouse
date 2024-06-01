"use client"
import { titilliumWeb } from "@/app/font";
import { FunctionComponent } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios";
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface INewRowFormProps {
}

const formSchema = z.object({
    id: z.preprocess((val) => Number(val), z.number().min(1, {
        message: "ID must be greater than 1.",
    })),
    avatarName: z.string().min(2, {
        message: "Avatar name must be greater than 2 characters.",
    }),
    performanceScore: z.preprocess((val) => Number(val), z.number().min(0, {
        message: "Score must be greater than 0.",
    }))
}).required({
    id: true,
    avatarName: true,
    performanceScore: true,
})

const NewRowForm: FunctionComponent<INewRowFormProps> = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            avatarName: "",
            performanceScore: 0,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const baseURL = process.env.BASE_URL || "https://wherehouse-server.onrender.com/api"
        try {
            const res = await axios.post(`${baseURL}/writeToSheet`, {
                sheetData: [[
                    values.id.toString(),
                    values.avatarName,
                    values.performanceScore.toString(),
                ]]
            })
            console.log(res)
            if (res.status === 200) {
                toast.success("Row added succefully.", {
                    position: "top-right"
                });
            }
        } catch (error) {
            toast.error("Error adding row! Try again later.", {
                position: "top-right"
            })
        }
    }


    return (
        <main className="w-[70vw] flex flex-col space-y-4">
            <h1 className={`${titilliumWeb.className} text-3xl font-bold w-full text-white`}>Add New Row</h1>
            <div className="bg-slate-800 rounded-md p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 items-center">
                        <div className="flex w-full items-center justify-evenly min-w-full">
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem className="w-1/4">
                                        <FormLabel className="text-xl text-slate-100">ID</FormLabel>
                                        <FormControl>
                                            <Input className="w-full bg-slate-100" type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatarName"
                                render={({ field }) => (
                                    <FormItem className="w-1/4">
                                        <FormLabel className="text-xl text-slate-100">Avatar Name</FormLabel>
                                        <FormControl>
                                            <Input className="w-full bg-slate-100" type="text" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="performanceScore"
                                render={({ field }) => (
                                    <FormItem className="w-1/4">
                                        <FormLabel className="text-xl text-slate-100">Performace Score</FormLabel>
                                        <FormControl>
                                            <Input className="w-full bg-slate-100" type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="px-4 py-2 text-[16px] w-fit bg-slate-100 text-slate-900 hover:bg-slate-300" type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default NewRowForm;
