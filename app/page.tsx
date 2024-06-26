"use client";

import { useState } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BoxReveal from "@/components/magicui/box-reveal";
import LetterPullup from "@/components/magicui/letter-pullup";
import { SeparateAway } from "@/components/magicui/separate-away";

type ModalProps = {
  onClose: () => void;
};


const AnalyticsModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Analytics Information</h2>
        <p className="text-gray-700">
          To View Analytics, You need to create an account and Login!!!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Modal component for schedule management
const ScheduleModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Manage Schedule</h2>
        <p className="text-gray-700">
          To Manage the Schedule as a Super Admin, You need to have an account, and then Login!!!
        </p>
        <button
          onClick={onClose}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 mt-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const openAnalyticsModal = () => {
    setShowAnalyticsModal(true);
  };

  const closeAnalyticsModal = () => {
    setShowAnalyticsModal(false);
  };

  const openScheduleModal = () => {
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
  };

  return (
    <main className="flex min-h-screen flex-col h-full font-roboto">
      <Header />
      
      <section className="py-20 md:py-32 h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
            <BoxReveal boxColor="#f39420">
            <SeparateAway
              upper_text="Hello, SuperAdmin"
              lower_text=" "
              className=" text-2xl md:text-5xl lg:text-6xl font-bold  mb-4"
            />
            </BoxReveal>
              {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Hello, SuperAdmin
              </h1> */}
              <p className="text-gray-700 text-lg md:text-xl mb-8">
                Manage your institution's operations with our comprehensive admin
                dashboard. From scheduling to analytics, empower your team with the
                tools they need to succeed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={openAnalyticsModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
                >
                  View Analytics
                </button>
                <button
                  onClick={openScheduleModal}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
                >
                  Manage Schedule
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://media.istockphoto.com/id/1428470293/vector/business-reporting-dashboard-concept-illustration.jpg?s=612x612&w=0&k=20&c=5kq8vvEkXEfxjWZLVCMIbCf-x3XSvXYQsE-BkWpeH0U="
                alt="Dashboard Illustration"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {showAnalyticsModal && <AnalyticsModal onClose={closeAnalyticsModal} />}
      {showScheduleModal && <ScheduleModal onClose={closeScheduleModal} />}

      <Footer />
    </main>
  );
};

export default Home;


// import Footer from "@/components/Footer";
// import Header from "@/components/Header";


// export const fetchCache = "force-no-store";

// export default function Home() {
 
//   return (
//     <main className="flex min-h-screen flex-col h-full font-roboto">
//       <Header />
//       {/* <Preferences/> */}
      
//       <section className="py-20 md:py-32 h-screen">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div>
            
           
//             {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-4">
//             Manage Your School Timetable
//             </h1> */}
//             {/* <LetterPullup className="text-muted-foreground text-lg md:text-xl mb-8" words="Our intuitive school timetable app empowers you to effortlessly create personalized schedules and manage your academic responsibilities with ease." /> */}
//             <p className="text-muted-foreground text-lg md:text-xl mb-8">
//             Our intuitive school timetable app empowers you to effortlessly create personalized schedules and manage your academic responsibilities with ease.
//                 </p>
//           </div>
//           <div>
//           </div>
//         </div>
//       </div>
//     </section>
//       <Footer />
//     </main>
//   );
// }
