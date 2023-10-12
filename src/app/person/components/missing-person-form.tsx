"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const MissingPersonForm = () => {
  const [loading, isLoading] = useState(false);

  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: "שם הפרטי צריך להיות יותר מתו אחד" }),
    lastName: z
      .string()
      .min(1, { message: "שם המשפחה צריך להיות יותר מתו אחד" }),

    contactName: z
      .string()
      .min(1, { message: "שם הבעלים צריך יותר יותר מ-2 תווים" }),
    contactPhone: z.string().min(8, {
      message: "מספר הטלפון צריך להיות מספר ישראלי קווי או נייד תקין",
    }),
    lastSeen: z
      .string()
      .min(10, { message: "פרטי המיקום האחרון צריכים להיות תקינים" }),
    identifyingDetails: z
      .string()
      .min(6, { message: "הפרטים המזהיים צריכים להיות ארוכים מ6 תווים" }),
  });
  type MissingAnimalFormValues = z.infer<typeof formSchema>;
  const form = useForm<MissingAnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactName: "",
      contactPhone: "",
      lastSeen: "",
      identifyingDetails: "",
    },
  });

  const onSubmit = async (data: MissingAnimalFormValues) => {
    console.log(data);
    await axios.post("/api/person", data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 m-auto text-center"
          dir="rtl"
        >
          <div className="mb-4 flex flex-col gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם פרטי </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="לדוגמה: רועי"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="לדוגמה: משה"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם איש קשר </FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מספר הטלפון של איש קשר </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="לדוגמה: 0501111111"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastSeen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>איפה החיה נראתה לאחרונה?</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identifyingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>פרטי זיהוי של הנעדר</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            onClick={() => form.handleSubmit(onSubmit)}
            className="mx-auto"
            type="submit"
          >
            שלח
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MissingPersonForm;
