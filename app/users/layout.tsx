import Sidebar from "@/components/sidebar/Sidebar";
import { getUsers } from "@/lib/actions/UsersActions";
import UserList from "./components/UserList";
import { getCurrentUser } from "@/lib/actions/UserActions";

export default async function UsersLayout({
  children,
}: {children: React.ReactNode}) {
  const users = await getUsers();
  const currentUser = await getCurrentUser()

  return (
    // <Sidebar>
      <div className="h-full">
        <UserList 
        currentUser={currentUser!}
        items={users!}
         />
        {children}
      </div>
    // </Sidebar>
  );
}