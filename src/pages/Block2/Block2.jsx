import { useState } from 'react';
import CustomInput from '@/components/common/CustomInput';
import ButtonIcon from '@/components/common/ButtonIcon';

const Block2 = () => {


  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access all form values here using the state variables
  };


  return (
    <div className="flex flex-col items-center mt-8">
<div className="py-4 px-6" >       <ButtonIcon
        title="Add preference"
        bg="bg-green-500" onClick={openModal}
      /></div>



      <div className="shadow-md sm:rounded-lg">
        <table className="text-sm text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-base text-white uppercase bg-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Preferred working hours
              </th>
              <th scope="col" className="px-6 py-3">
                Number of days available per week
              </th>
              <th scope="col" className="px-6 py-3">
                Preference for very early classes
              </th>
              <th scope="col" className="px-6 py-3">
                Preference for very late classes
              </th>
              <th scope="col" className="px-6 py-3">
                Date de création
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">9 hours</td>
              <td className="px-6 py-4 whitespace-nowrap">5 days</td>
              <td className="px-6 py-4 whitespace-nowrap">Yes</td>
              <td className="px-6 py-4 whitespace-nowrap">No</td>
              <td className="px-6 py-4 whitespace-nowrap">2023-05-15</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
            {/* Example Row 2 */}
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">12 hours</td>
              <td className="px-6 py-4 whitespace-nowrap">3 days</td>
              <td className="px-6 py-4 whitespace-nowrap">No</td>
              <td className="px-6 py-4 whitespace-nowrap">Yes</td>
              <td className="px-6 py-4 whitespace-nowrap">2023-06-12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
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
