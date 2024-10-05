import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect('/authentication/sign-up')
  } else {
    redirect('/t/chat')
  }



  return (
    <main className='p-2 h-full flex flex-col justify-between'>
    <div>
      <h1>Main page</h1>
    </div>
  </main>
  );
}
