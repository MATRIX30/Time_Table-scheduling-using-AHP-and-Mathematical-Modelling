"use client";
import { getPreferences } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const fetchPreferences = async () => {
    // const fetchPref = await fetch("/api/preferences");
    // const pref = await fetchPref.json();
    // console.log(pref);
    const pref = await getPreferences()
    return pref;
  };
  const [preferences, setPreferences] = useState([]);
  useEffect(() => {
    fetchPreferences().then((pref) => {
      setPreferences(pref);
    });
  }, []);
  console.log({preferences})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/preferences"}>Preferences</Link>
    </main>
  );
}
