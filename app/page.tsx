import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect('/authentication/sign-up')
  } else {
    redirect('/conversations')
  }

  return (
    <main className='p-2 h-full flex flex-col justify-between'>
    <h1></h1>
  </main>
  );
}
