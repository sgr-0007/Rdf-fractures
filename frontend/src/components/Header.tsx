import React from 'react';
// import logo from "../assets/fracturelog.png";

const Header: React.FC = () => {
  return (
    <div className="w-full flex items-center bg-black p-4">
      {/* <img src={logo} alt="Fracture log" className="h-8 mr-4" /> */}
      <h1 className="text-xl font-bold text-white">Fracture Log</h1>
    </div>
  );
}

export default Header;
