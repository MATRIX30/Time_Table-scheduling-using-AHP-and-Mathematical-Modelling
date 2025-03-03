import { NextAuthUserType } from "@/types";
import { User } from "next-auth";
import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User extends UserType {}
  interface AdapterUser extends UserType {}
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
