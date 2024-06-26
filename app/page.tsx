"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const fetchCache = "force-no-store";

export default function Home() {
 
  return (
    <main className="flex min-h-screen flex-col h-full font-roboto">
      <Header />
      {/* <Preferences/> */}
      
      <section className="py-20 md:py-32 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-4">
            Manage Your School Timetable
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Our intuitive school timetable app empowers you to effortlessly create personalized schedules and manage your academic responsibilities with ease.
                </p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </main>
  );
}
