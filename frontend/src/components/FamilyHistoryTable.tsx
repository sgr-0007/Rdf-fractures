import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';  // Import Lottie
import animationData from '../assets/loaderlottie.json';  // Your Lottie animation JSON
import {
    sexOptions,
    livesAtHomeOptions,
    broughtInByOptions,
    safeguardingOptions,
    socialServicesOptions,
    complaintOptions,
    canWalkOptions,
    preExistingConditionsOptions,
    FamilyHistoryOption
} from '../data/FamilyHistoryData';

const options: FamilyHistoryOption[] = [
    ...sexOptions,
    ...livesAtHomeOptions,
    ...broughtInByOptions,
    ...safeguardingOptions,
    ...socialServicesOptions,
    ...complaintOptions,
    ...canWalkOptions,
    ...preExistingConditionsOptions
];

// Create a mapping from value to label
const labelMap = options.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as { [key: string]: string });

const getLabel = (value: string) => {
    const extractedValue = value.split('/').pop();
    return extractedValue ? labelMap[extractedValue] || extractedValue : value;
};

const getSubject = (value: string) => {
    return value.split('/').pop();
};

const FamilyHistoryTable: React.FC<{ onDataFetched: (data: any[]) => void }> = ({ onDataFetched }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Lottie options for the animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    useEffect(() => {
        axios.post('http://localhost:5000/api/familyhistory/fetch')
            .then(response => {
                const fetchedData = response.data.results.bindings.map((item: any) => ({
                    subject: getSubject(item.subject.value),
                    predicate: item.mappedPredicate.value,
                    object: getLabel(item.object.value),
                }));
                setData(fetchedData);
                onDataFetched(fetchedData); // Pass data up to parent
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
            <div className="flex justify-center items-center">
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto p-4">
            <table className="table table-zebra mb-4">
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
                            <td>{item.subject}</td>
                            <td>{item.predicate}</td>
                            <td>{item.object}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyHistoryTable;
