"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { UserLoginValidation } from "@/lib/validations/UserValidation";
import AuthButton from "@/components/buttons/AuthButton";
import { login } from "@/lib/actions/auth/login";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const LoginForm = () => {
  const form = useForm<z.infer<typeof UserLoginValidation>>({
    resolver: zodResolver(UserLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof UserLoginValidation>) => {
    try {
      const result = await login(values)

      if (result?.error) {
      toast({
        title: result.error,
        description: result.description,
      })
      } else {
        toast({
          title: result.title,
          description: result.description,
        })

        if (result.redirect) {
          router.push(result.redirect)
        }
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong!",
      })
    }
  }
  return (
    <Form {...form}>
    <form 
    onSubmit={form.handleSubmit(onSubmit)}
    className="flex p-3 flex-col gap-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="px-2" placeholder="example@email.com" 
              type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input className="px-2" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <AuthButton label="Sign In" pending={isSubmitting}/>
    </form>
  </Form>
  )
}

export default LoginForm