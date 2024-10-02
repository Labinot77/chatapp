"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SettingsFormValidation } from "@/lib/validations/UserValidation"

interface Props {
  name: string
  email: string
  image: string
  id: string
}

const SettingsForm = ({ name, email, image, id}: Props) => {
  const form = useForm<z.infer<typeof SettingsFormValidation>>({
    resolver: zodResolver(SettingsFormValidation),
    defaultValues: {
      name: "",
      email: "",

    }
  })
  const { isSubmitting } = form.formState
  const onSubmit = async () => {
    console.log()
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder={name} {...field} />
            </FormControl>
         
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default SettingsForm