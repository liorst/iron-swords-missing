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

const MissingAnimalForm = () => {
  const [loading, isLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, { message: "שם החיה צריך להיות יותר מתו אחד" }),
    animalType: z.string(),
    contactName: z
      .string()
      .min(1, { message: "שם הבעלים צריך יותר יותר מ-2 תווים" }),
    contactPhone: z.string().min(8, {
      message: "מספר הטלפון צריך להיות מספר ישראלי קווי או נייד תקין",
    }),
    lastSeen: z.string().optional(),
    identifyingDetails: z.string().optional(),
  });
  type MissingAnimalFormValues = z.infer<typeof formSchema>;
  const form = useForm<MissingAnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      animalType: "",
      contactName: "",
      contactPhone: "",
      lastSeen: "",
      identifyingDetails: "",
    },
  });

  const onSubmit = async (data: MissingAnimalFormValues) => {
    console.log(data);
    await axios.post("/api/animals", data);
  };

  const animalTypes = ["כלב", "חתול", "סוס", "ציפור"];

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם החיה הנעדרת </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="לדוגמה: רוקי"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="animalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>סוג בעל החיים הנעדר</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="בחר את סוג בעל החיים"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {animalTypes?.map((type, i) => (
                        <SelectItem key={i} value={type}>
                          {type}
                        </SelectItem>
                      ))}

                      <SelectItem value="other">{"אחר"}</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FormLabel>פרטי זיהוי של החיה</FormLabel>
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

export default MissingAnimalForm;
