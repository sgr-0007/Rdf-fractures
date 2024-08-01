import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between bg-black p-4">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl font-bold text-white cursor-pointer hover:text-gray-400">Fracture Log</h1>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/childdetails" className="text-white hover:text-gray-400">Record</Link>
        <Link to="/rdfdatarender" className="text-white hover:text-gray-400">View</Link>
      </div>
    </div>
  );
}

export default Header;
