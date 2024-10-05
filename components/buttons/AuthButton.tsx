"use client"

import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";

const AuthButton = ({label, pending}: {label: string, pending: boolean}) => {
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium`}
    >
      {pending ? <CgSpinner /> : label}
    </Button>
  );
};

export default AuthButton;