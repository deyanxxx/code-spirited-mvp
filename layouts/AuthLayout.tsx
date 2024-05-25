// components/AuthLayout.tsx

import Loader from "@/components/Loader";
import React, { ReactNode, Suspense } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen antialiased bg-gradient-to-br from-[#FFD3A8] via-[#FFB370] to-[#FF8736]">
    <div className="w-full h-full">
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  </div>
);

export default AuthLayout;
