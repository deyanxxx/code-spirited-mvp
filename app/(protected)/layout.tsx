import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/Logout";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";

export default async function Layout(props: { children: React.ReactNode }) {
  const user = await AuthGetCurrentUserServer();

  return (
    <div className="flex flex-col">
      <header className="bg-gradient-to-br from-[#FFD3A8] via-[#FFB370] to-[#FF8736]">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="cs logo"
              className="h-8 w-full"
              width={2294}
              height={450}
            />
          </Link>
          <nav className="space-x-4 hidden lg:flex">
            <Link
              href="/"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              About
            </Link>
            <Link
              href="/p2p-coding-bootcamp"
              className="hover:text-gray-900 text-gray-800 font-semibold"
            >
              P2P Coding Bootcamp
            </Link>
            {user && (
              <Link
                href="/profile"
                className="hover:text-gray-900 text-gray-800 font-semibold"
              >
                Profile
              </Link>
            )}
          </nav>
          <div className="flex space-x-3">
            {user ? (
              <Logout />
            ) : (
              <>
                <Link
                  href="/login"
                  className="border border-jaffa-600 px-4 py-2 rounded-full text-jaffa-600 hover:bg-jaffa-600 hover:text-white transition-all duration-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-jaffa-600 px-4 py-2 rounded-full text-white hover:bg-jaffa-800 transition-all duration-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
}
