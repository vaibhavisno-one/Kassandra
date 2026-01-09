import Link from "next/link";
import { Search, Moon, User } from "lucide-react";
import Image from "next/image";




export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-center pt-3 px-4 ">
          <div className="flex items-center justify-between w-full pl-20 max-w-4xl px-4 py-4 bg-gray-200/10 backdrop-blur-lg rounded-xl border border-black/5 shadow-lg">
            <div className="flex items-center justify-between w-full ">
                <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold">Kassandra</span>
                </Link>
            </div>
            <div>
                <div className="flex items-center justify-between gap-6 text-[20px] mt-6 text-black pr-40 font-medium ml-4 ">
                    <Link href="/dashboard" className="hover:text-gray-400 transition-colors">Dashboard</Link>
                    <Link href="/blogs" className="hover:text-gray-400 transition-colors">Documentation</Link>
                    <Link href="/faq" className="hover:text-gray-400 transition-colors">FAQ</Link>
                </div>



            </div>
          </div>
        </nav>
    );
}
