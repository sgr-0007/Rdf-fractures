import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../assets/loaderlottie.json';

interface FracturesTableProps {
    onDataFetched: (data: any[]) => void; // Callback to pass data to the parent
}

const FracturesTable: React.FC<FracturesTableProps> = ({ onDataFetched }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg',
    };

    useEffect(() => {
        axios.post('http://localhost:5000/api/fractures/fetch')
            .then(response => {
                // Sort the data by recordId (extracted from subject)
                const sortedData = response.data.results.bindings.sort((a: any, b: any) => {
                    const recordIdA = a.subject.value.split('/').pop();
                    const recordIdB = b.subject.value.split('/').pop();
                    return recordIdA.localeCompare(recordIdB);
                });

                setData(sortedData);
                onDataFetched(sortedData); // Pass data up to parent component
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, [onDataFetched]);

    if (loading) {
        return (
            <div>
                <Lottie options={defaultOptions} height={100} width={100} />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getSubject = (value: string) => {
        const extractedValue = value.split('/').pop();
        return extractedValue;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Record ID</th>
                        <th>Predicate</th>
                        <th>Object</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{getSubject(item.subject.value)}</td>
                            <td>{item.mappedPredicate.value}</td>
                            <td>{item.mappedObject.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FracturesTable;
