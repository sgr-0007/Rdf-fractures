import React from 'react';
const Dashboard: React.FC = () => {

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto mt-8 space-y-8">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Child Abuse Overview</h2>
          <p>Child abuse is a global issue with severe long-term effects on children. In the UK, the NSPCC reported concerns about physical abuse in 6,441 children in 2021/22, highlighting the urgent need for better tools to identify and address suspected abuse.</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Fracture Log</h2>
          <p>A semantically enriched tool to record data on fractures and related injuries in children, focusing on suspected child abuse. The tool will support clinicians, researchers, and trainers by standardizing the recording of critical incidents, contributing to the broader ELECTRICA initiative.</p>
        </section>

        {/* <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="statistic-card p-4 bg-gray-200 rounded shadow-md">
              <h3 className="text-lg font-bold">Total Reports</h3>
              <p className="text-2xl">6,441</p>
            </div>
            <div className="statistic-card p-4 bg-gray-200 rounded shadow-md">
              <h3 className="text-lg font-bold">Fracture Cases</h3>
              <p className="text-2xl">1,234</p>
            </div>
            <div className="statistic-card p-4 bg-gray-200 rounded shadow-md">
              <h3 className="text-lg font-bold">Resolved Cases</h3>
              <p className="text-2xl">4,567</p>
            </div>
          </div>
        </section> */}
      </main>


    </div>
  );
}

export default Dashboard;
