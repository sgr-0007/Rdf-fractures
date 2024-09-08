import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import Lottie from 'react-lottie';
import animationData from '../assets/loaderlottie.json';

// Combine all options into a single array
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
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: 'svg',
};
// Create a mapping from value to label
const labelMap = options.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as { [key: string]: string });

const FamilyHistoryTable: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.post('http://localhost:5000/api/familyhistory/fetch')
            .then(response => {
                const sortedData = response.data.results.bindings.sort((a: any, b: any) => {
                    const recordIdA = a.subject.value.split('/').pop();
                    const recordIdB = b.subject.value.split('/').pop();
                    return recordIdA.localeCompare(recordIdB);
                   
                });

                setData(sortedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>
            <Lottie options={defaultOptions}
                height={100}
                width={100}
            />
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getLabel = (value: string) => {
        const extractedValue = value.split('/').pop();
        return extractedValue ? labelMap[extractedValue] || extractedValue : value;
    };

    const getSubject = (value: string) => {
        return value.split('/').pop();
    };

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
                            <td>{getSubject(item.subject.value)}</td>
                            <td>{item.mappedPredicate.value}</td>
                            <td>{getLabel(item.object.value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyHistoryTable;
