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
import { addPerson } from "@/actions";
import { useRouter } from "next/navigation";

const MissingPersonForm = () => {
  const [loading, isLoading] = useState(false);

  const formSchema = z.object({
    first_name: z
      .string()
      .min(1, { message: "שם הפרטי צריך להיות יותר מתו אחד" }),
    last_name: z
      .string()
      .min(1, { message: "שם המשפחה צריך להיות יותר מתו אחד" }),

    contact_name: z
      .string()
      .min(1, { message: "שם איש הקשר צריך להיות יותר מתו אחד " }),
    contact_phone: z.string().min(8, {
      message: "מספר הטלפון צריך להיות מספר ישראלי קווי או נייד תקין",
    }),
    last_seen: z
      .string()
      .min(5, { message: "פרטי המיקום האחרון צריכים להיות תקינים" }),
    identifying_details: z
      .string()
      .min(6, { message: "הפרטים המזהיים צריכים להיות ארוכים מ6 תווים" }),
  });
  type MissingAnimalFormValues = z.infer<typeof formSchema>;
  const form = useForm<MissingAnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      contact_name: "",
      contact_phone: "",
      last_seen: "",
      identifying_details: "",
    },
  });
  const router = useRouter();

  const [file, setFile] = useState(null);
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (formData: MissingAnimalFormValues) => {
    console.debug(formData);
    console.info("Form submitted", formData);
    const _formData = new FormData();
    // console.info(file?.constructor.name)
    _formData.append("image", file);
    console.info(_formData);
    for (const [key, value] of Object.entries(formData)) {
      _formData.append(key, value);
    }

    // Submit the form data to your API
    const person = await addPerson(_formData);

    console.info("Success");
    alert(
      `הדיווח נקלט בהצלחה! מזהה הדיווח שלך הוא ${person.id} אנחנו נעבור על הפרטים ונאמת אותם בהקדם האפשרי, תודה!,`,
    );
    router.push("/");
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
              name="first_name"
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
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם משפחה </FormLabel>
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
              name="contact_name"
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תמונה </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      name="image"
                      placeholder=""
                      onChange={handleChangeFile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_phone"
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
              name="last_seen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>איפה הנעדר נראת/ה לאחרונה?</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identifying_details"
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
