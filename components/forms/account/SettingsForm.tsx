"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsFormValidation } from "@/lib/validations/UserValidation";
import { CustomButton } from "@/components/buttons/buttons";
import { wait } from "@/lib/Miscellaneous";
import { SaveUserData } from "@/lib/actions/UserActions";
import { toast } from "@/hooks/use-toast";

interface Props {
  name: string;
  email: string;
  image: string;
  id: string;
}

const SettingsForm = ({ name, email, image, id }: Props) => {
  const form = useForm<z.infer<typeof SettingsFormValidation>>({
    resolver: zodResolver(SettingsFormValidation),
    defaultValues: {
      name: name,
      email: email,
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof SettingsFormValidation>) => {
    try {
      const result = await SaveUserData(values);

      if (result?.error) {
        toast({
          title: result.title,
          description: result.error
        })
      } else {
        toast({
          title: "Settings Updated",
          description: "Your information has been updated successfully!",
        })
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Username</FormLabel>
              <FormControl className="">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your private email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton pending={isSubmitting} label="Submit" />
      </form>
    </Form>
  );
};

export default SettingsForm;
