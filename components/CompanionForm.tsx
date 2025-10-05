"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";
import { useTheme } from "next-themes";
import { BookOpen, Clock, Mic, Sparkles } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.'}),
    subject: z.string().min(1, { message: 'Subject is required.'}),
    topic: z.string().min(1, { message: 'Topic is required.'}),
    voice: z.string().min(1, { message: 'Voice is required.'}),
    style: z.string().min(1, { message: 'Style is required.'}),
    duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Companion name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter the companion name"
                                        {...field}
                                        className="pl-10 h-11 bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Subject</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger 
                                            className="pl-10 h-11 bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border capitalize"
                                        >
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    value={subject}
                                                    key={subject}
                                                    className="capitalize"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivates & Integrals"
                                    {...field}
                                    className="min-h-[120px] bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Voice</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mic className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger 
                                            className="pl-10 h-11 bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border"
                                        >
                                            <SelectValue
                                                placeholder="Select the voice"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Style</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground flex items-center justify-center">
                                        <span className="text-xs">Aa</span>
                                    </div>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger 
                                            className="pl-10 h-11 bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border"
                                        >
                                            <SelectValue
                                                placeholder="Select the style"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="formal">
                                                Formal
                                            </SelectItem>
                                            <SelectItem value="casual">
                                                Casual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        placeholder="15"
                                        {...field}
                                        className="pl-10 h-11 bg-background dark:bg-card border-border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50 dark:border-border"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    >
                        Build Your Companion
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CompanionForm