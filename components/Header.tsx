import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/Logout";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import HeaderClient from "@/components/HeaderClient";
import { revalidatePath } from "next/cache";

const Header = async () => {
  const user = await AuthGetCurrentUserServer();

  if (user) {
    revalidatePath("/");
  }

  return (
    <HeaderClient user={user} />
  );
};

export default Header;
