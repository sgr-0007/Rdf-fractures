import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FamilyHistoryTable: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.post('http://localhost:5000/api/familyhistory/fetch')
            .then(response => {
                setData(response.data.results.bindings);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Predicate</th>
                        <th>Object</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.subject.value}</td>
                            <td>{item.predicate.value}</td>
                            <td>{item.object.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyHistoryTable;
