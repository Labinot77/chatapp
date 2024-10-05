import { auth } from "@/auth";
import { LoginWithSocials } from "@/components/buttons/SocialLoginButton";
import RegisterForm from "@/components/forms/account/RegisterForm";
import Link from "next/link";
import { redirect } from "next/navigation";


const SignUp = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full flex mt-40 justify-center h-screen">
      <section className="flex flex-col w-[27rem]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Register</h1>
        <small className="w-full text-center">Already have an account? <br />
          <Link className="text-purple-600 font-bold hover:underline" href="/authentication/sign-in">
          Sign in
          </Link>
          </small>
        <RegisterForm />
        <LoginWithSocials />
      </section>
    </div>
  );
};

export default SignUp;