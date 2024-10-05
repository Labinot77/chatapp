
import { auth } from "@/auth";
import ChatLabel from "@/components/chat/ChatLabel";
import SendInput from "@/components/chat/SendInput";
import { getUserData } from "@/lib/actions/UserActions";

const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  const friendToken = searchParams.token as string;
  const user = await auth()

  if (!user?.user) return <h1>Not authorized</h1>

  const data = await getUserData(user?.user?.id as string)

  if (!data) return <h1>Cannot find the data</h1>

  return (
    <main className="w-full h-full flex flex-col justify-between">
      <ChatLabel name={data.name} image={data.image} />

    {/* CHAT  */}
      <div className="h-full w-full mt-2 overflow-y-auto">
        <h1>{friendToken}</h1>
      </div>

      <SendInput />
    </main>
  );
};

export default page;
