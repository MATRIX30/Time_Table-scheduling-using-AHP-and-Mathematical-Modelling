import React, { useState, useEffect } from 'react';
import CustomInput from '@/components/common/CustomInput';
import ButtonIcon from '@/components/common/ButtonIcon';
import { URL_SERVER } from '@/constants/constants';

const Block2 = () => {


  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };





  const [teacherPreferences, setTeacherPreferences] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch(URL_SERVER + "/preference", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const preferences = await response.json();
        setTeacherPreferences(preferences);
      } catch (error) {
        console.error('Erreur lors de la récupération des préférences :', error);
        // Handle errors, e.g., show an error message to the user
      }
    };

    fetchPreferences();
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount





  const [earlyCoursesPreference, setEarlyCoursesPreference] = useState('');
  const [lateCoursesPreference, setLateCoursesPreference] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [preferredWorkingHours, setPreferredWorkingHours] = useState('');

  const handleEarlyCoursesPreferenceChange = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setEarlyCoursesPreference(value);
    }
  };

  const handleLateCoursesPreferenceChange = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setLateCoursesPreference(value);
    }
  };

  const handleDaysPerWeekChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 7) {
      setDaysPerWeek(value);
    }
  };

  const handlePreferredWorkingHoursChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value % 3 === 0 && value < 15) {
      setPreferredWorkingHours(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      console.error("Aucune donnée utilisateur trouvée dans localStorage");
      return;
    }

    // const user = JSON.parse(userString);l
    const formData = {
      teacher: "60d5ecb8b392d7881236a8a0",   // Remplacez par l'ID du professeur approprié
      courseOnMorning: 1,
      courseOnEvening: 1,
      havingDayOff: 1,
      preferredNumberOfHour: 3,
    };

    try {

      const response = await fetch(URL_SERVER + "/preference", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!response.ok) {
      //   throw new Error('Erreur lors de la création des préférences d\'enseignant');
      // }

      const listpreference = await response.json();
      console.log("Nouvelle préférence d'enseignant créée :", listpreference);
      // Ici vous pourriez mettre à jour l'état de votre composant ou effectuer d'autres actions après la création réussie

      closeModal();  // Fermer le modal après soumission réussie
    } catch (error) {
      console.error('Erreur lors de la création des préférences d\'enseignant :', error);
      // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
    }







  };


  return (
    <div className="flex flex-col items-center mt-8">
      <div className="py-4 px-6" >       <ButtonIcon
        title="Add preference"
        bg="bg-gray-700" onClick={openModal}
      /></div>



      <div className="shadow-md sm:rounded-lg w-full">
        <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-base text-white uppercase bg-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number of course on Morning
              </th>
              <th scope="col" className="px-6 py-3">
                Number of course on Evening
              </th>
              <th scope="col" className="px-6 py-3">
                NUmber Dayoff
              </th>
              <th scope="col" className="px-6 py-3">
                Preference Number of Hour
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Date de création
              </th> */}
            </tr>
          </thead>
          <tbody>

            {teacherPreferences.map(preference => (
              <tr key={preference._id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">{preference.courseOnMorning}</td>
                <td className="px-6 py-4 whitespace-nowrap">{preference.courseOnEvening}</td>
                {/*               
              <td className="px-6 py-4 whitespace-nowrap">{preference.earlyClasses ? 'Yes' : 'No'}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{preference.havingDayOff}</td>
                <td className="px-6 py-4 whitespace-nowrap">{preference.preferredNumberOfHour}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{preference.createdAt}</td> */}
                {/* Example button for deletion */}
                {/* <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td> */}
              </tr>
            ))}





          </tbody>
        </table>

      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-4 relative">
            <button className="absolute top-2 right-2 text-red-600" onClick={closeModal}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-2 text-black">Course Details</h2>
            <form onSubmit={handleSubmit}>

              <div className="space-y-6">
                {/* Early classes preference */}
                <CustomInput
                  label="Preference for very early classes (0 to 10)"
                  value={earlyCoursesPreference}
                  onChange={handleEarlyCoursesPreferenceChange}
                  type="number"
                  min={0}
                  max={10}
                  step={1}
                />

                {/* Late classes preference */}
                <CustomInput
                  label="Preference for very late classes (0 to 10)"
                  value={lateCoursesPreference}
                  onChange={handleLateCoursesPreferenceChange}
                  type="number"
                  min={0}
                  max={10}
                  step={1}
                />

                {/* Number of available days per week */}
                <CustomInput
                  label="Number of days available per week (0 to 7)"
                  value={daysPerWeek}
                  onChange={handleDaysPerWeekChange}
                  type="number"
                  min={0}
                  max={7}
                  step={1}
                />

                {/* Preferred working hours */}
                <CustomInput
                  label="Preferred working hours (multiple of 3, less than 15)"
                  value={preferredWorkingHours}
                  onChange={handlePreferredWorkingHoursChange}
                  type="number"
                  min={0}
                  max={15}
                  step={3}
                />
              </div>


              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>




            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Block2;
