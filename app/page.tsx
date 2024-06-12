import { getPreferences } from "@/actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const pref = await getPreferences();
  console.log(pref);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/preferences"}>Preferences</Link>
    </main>
  );
}


