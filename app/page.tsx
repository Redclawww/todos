import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center gap-5">
    <Link href="/client-todo" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
      1. Client Todos
    </Link>
    <Link href="/server-file-todo" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
      2. Server File Todos
    </Link>
    <Link href="/client-file-todo" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
      3. Client File Todos
    </Link>
      </div>
    </div>
  );
}
