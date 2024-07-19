"use client";
import Logout from "./Logout";
import Login from "./Login";
import { Session } from "next-auth";
interface UserProps {
  user: Session["user"];
}
const User = ({ user }: UserProps) => {
  return <div>{user ? <Logout user={user} /> : <Login />}</div>;
};

export default User;
