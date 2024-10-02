"use client";

import { loginSocial } from "@/actions/loginSocial";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from 'react-icons/fa'

export const LoginGithub = () => {
  return (
    <div
      onClick={() => loginSocial("github")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-black rounded-md p-4 flex justify-center items-center">
      <FaGithub size={25} className="text-white" />
    </div>
  );
};

export const LoginGoogle = () => {
  return (
    <div
      onClick={() => loginSocial("google")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-green-800 rounded-md p-4 flex justify-center items-center">
      <FaGoogle size={25} className="text-white" />
    </div>
  )
}

export const LoginWithSocials = () => {
  return (
    <div className="flex gap-4 w-full">
      <LoginGithub />
      <LoginGoogle />
    </div>
  )
}