import { useState, } from 'react';
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";

import ProfileInfo from "../profile/ProfileInfo";
import UpdatePassword from "../profile/UpdatePassword";
import Block2 from "../Block2/Block2";
import Block3 from "../Block3/Block3";
import ButtonIcon from '@/components/common/ButtonIcon';





export default function LandingPage() {




  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Erreur lors du parsing JSON :", error);
    }
  } else {
    console.log("Aucune valeur trouvée pour 'user' dans le localStorage.");
  }

  const isLoggedIn = user !== null && token !== null;

  const [activeBlock, setActiveBlock] = useState(1); // Par défaut, le Block 1 est actif


  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className=" text-center pt-5 ">
            <div>
              <h1 className=" text-4xl font-bold mb-2">Teacher Employment Application</h1>
              <p className="text-lg text-gray-600">With a superbly crafted schedule, the school year would be even more beautiful.</p>
              <div className="space-x-4 mt-6">
                <div className="flex items-center justify-center gap-5 ">
                  <ButtonIcon
                    title="Account"
                    bg="bg-black" onClick={() => setActiveBlock(1)}
                  />
                  <ButtonIcon title="Preferences" onClick={() => setActiveBlock(2)} bg="bg-black" />
                  <ButtonIcon title="Time Table" onClick={() => setActiveBlock(3)} bg="bg-black" />
                </div>
              </div>
              <div className="container flex flex-wrap mx-auto items-center">
                {!isLoggedIn && (
                  <div className="flex justify-center mt-12 w-full">
                    <div className="text-center pt-12">
                      <span className="text-6xl" role="img" aria-label="cross emoji">
                        ⚠️
                      </span>
                      <p className="mt-4">
                        Please sign in or register to view this content.
                      </p>
                    </div>
                  </div>
                )}

                {/* Afficher les blocs seulement si l'utilisateur est connecté */}
                {isLoggedIn && (
                  <>
                    {/* Block 1 */}
                    {activeBlock === 1 && (
                      <div className="container flex flex-wrap mx-auto items-center">
                        <ProfileInfo />
                        <UpdatePassword />
                      </div>
                    )}

                    {/* Block 2 */}
                    {activeBlock === 2 && (
                      <div className="flex flex-col items-center justify-center space-y-24 text-center">
                        <Block2 />
                      </div>
                    )}

                    {/* Block 3 */}
                    {activeBlock === 3 && (
                      <div className="container flex flex-wrap mx-auto items-center">
                        <Block3 />
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">

            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">Class Scheduling</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily manage your class schedule and never miss a lesson.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">Assignment Tracking</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep track of your assignments and deadlines with ease.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Collaborative Scheduling
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coordinate schedules with your teachers and classmates for
                  seamless collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 School Timetable. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
