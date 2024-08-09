import FamilyHistoryTable from '../components/FamilyHistoryTable';
import FracturesTable from '../components/FracturesTable';


const RdfDataRender: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Patient Family History
            </h2>
            <FamilyHistoryTable />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 py-8">
            <h2 className="text-xl font-bold mb-4">Fractures</h2>
            <FracturesTable />
        </div>
    </div>
);
};

export default RdfDataRender;
