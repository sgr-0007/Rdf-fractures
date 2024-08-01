import React, { useState } from 'react';
import FamilyHistory from '../components/FamilyHistory';
import Fractures from '../components/Fractures';


const ChildDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('family');

  return (
    <div className="p-4">
      <div className="tabs">
        <button
          className={` tab tab-bordered ${activeTab === 'family' ? 'bg-black text-white rounded shadow-md hover:bg-gray-800' : ' bg-gray-400 text-white rounded shadow-md'}`}
          onClick={() => setActiveTab('family')}
        >
         Patient Family History
        </button>
        <button
          className={`tab tab-bordered ${activeTab === 'personal' ? 'bg-black text-white rounded shadow-md hover:bg-gray-800' : ' bg-gray-400 text-white rounded shadow-md'}`}
          onClick={() => setActiveTab('personal')}
        >
          Fractures
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'family' && (
          <div>
            <FamilyHistory />
            </div>
        )}
        {activeTab === 'personal' && (
          <div>
            <Fractures/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChildDetails;
