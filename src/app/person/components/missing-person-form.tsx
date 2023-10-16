"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addPerson } from "@/actions";

const between = (min: number, max: number) =>
  z.string().min(min, `לפחות ${min} תווים`).max(max, `עד ${max} תווים`);
const phone = z
  .string()
  .min(8, "מספר הטלפון חייב להכיל לפחות 8 תווים")
  .max(15, "מספר הטלפון יכול להכיל עד 15 תווים");
const name = between(2, 50);
const details = between(2, 500);

const MissingPersonForm = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    first_name: name,
    last_name: name,
    contact_name: name,
    contact_phone: phone,
    last_seen: details,
    identifying_details: details,
    image: z.string(),
    notes: z.string().optional(),
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
      image: "",
      notes: "",
    },
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const onSubmit = async (formData: MissingAnimalFormValues) => {
    if (!uploadedFile) {
      alert("אנא העלו תמונה");
      return;
    }
    setLoading(true);
    try {
      const _formData = new FormData();
      _formData.append("image", uploadedFile);
      for (const [key, value] of Object.entries(formData)) {
        _formData.append(key, value);
      }
      // Submit the form data to your API
      const person = await addPerson(_formData);
      alert(
        `הדיווח נקלט בהצלחה! מזהה הדיווח שלך הוא ${person.id} אנחנו נעבור על הפרטים ונאמת אותם בהקדם האפשרי, תודה!,`,
      );
    } catch (e) {
      console.error(e);
      alert("אירעה שגיאה בעת שמירת הנעדר, אנא נסו שנית מאוחר יותר");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 m-auto"
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
                      placeholder="לדוגמה: ישראל"
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
                  <FormLabel>שם משפחה</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="לדוגמה: ישראלי"
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
                  <FormLabel>שם איש הקשר</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
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
                  <FormLabel>מספר הטלפון של איש הקשר</FormLabel>
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תמונה</FormLabel>
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
              name="last_seen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>איפה הנעדר נראה לאחרונה?</FormLabel>
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
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הערות</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mx-auto" type="submit">
            שלח
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MissingPersonForm;
