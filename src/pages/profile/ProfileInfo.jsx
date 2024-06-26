import React from 'react';

function ProfileInfo() {
  return (
    <div className="w-full md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className={'flex'}>

        </div>
      </div>
      <div className="py-6">Informations</div>
      <div className="flex flex-wrap py-1">
        <div className="pr-6 md:pr-24 pb-2 text-gray-400">Nom :</div>
        <div>userData.nom</div>
      </div>
      <div className="flex flex-wrap py-1">
        <div className="pr-6 md:pr-20 pb-2 text-gray-400">Prenom :</div>
        <div>userData.prenom</div>
      </div>
      <div className="flex flex-wrap py-1">
        <div className="pr-6 md:pr-20 pb-2 text-gray-400">Matricule :</div>
        <div>userData.matricule</div>
      </div>

      <div className="flex flex-wrap py-1">
        <div className="pr-6 md:pr-24 pb-2  text-gray-400">Email :</div>
        <div>userData.email</div>
      </div>
      <div className="flex flex-wrap py-1">
        <div className="pr-6 md:pr-24 pb-2  text-gray-400">Grade :</div>
        <div>userData.Grade</div>
      </div>
      {/* <div className="flex flex-wrap py-1">
                <div className="pr-6 md:pr-10 pb-2  text-gray-400">Mots utilisés :</div>
                <div>{userData.creditRestant}</div>
            </div> */}
    </div>
  );
}

export default ProfileInfo;
