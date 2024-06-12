"use client";
import { getPreferences } from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Preferences from "@/components/preferences";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const fetchCache = 'force-no-store';

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
    <main className="flex min-h-screen flex-col">
      <Header/>
      <Preferences/>
      <Footer/>
    </main>
  );
}
