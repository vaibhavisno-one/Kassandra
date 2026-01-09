import Link from "next/link";
import { Search, Moon, User } from "lucide-react";
import Image from "next/image";




export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-center  px-4 ">
          <div className="flex items-center justify-between w-full pl-20 max-w-5xl px-2 py-2 bg-gray-200/10 backdrop-blur-lg rounded-xl ">
            <div className="flex items-center justify-between w-full ">
                <Link href="/" className="flex items-center">
                <img className="w-20 h-8 md:w-34 md:h-10 inline-block" src="/logo.png" alt="stock icon" />
                
                </Link>
            </div>
            <div>
                <div className="flex items-center justify-between gap-6 text-[20px] mt-3 text-black pr-40 font-medium ml-4 ">
                    <Link href="/dashboard" className="hover:text-gray-400 transition-colors">Dashboard</Link>
                    <Link href="/documentation" className="hover:text-gray-400 transition-colors">Documentation</Link>
                    <Link href="/faq" className="hover:text-gray-400 transition-colors">FAQ</Link>
                </div>



            </div>
          </div>
        </nav>
    );
}
