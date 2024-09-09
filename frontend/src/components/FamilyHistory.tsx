import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select from 'react-select'
import { useRecordId } from '../hooks/RecordIdContext';

import {
    sexOptions,
    livesAtHomeOptions,
    broughtInByOptions,
    safeguardingOptions,
    socialServicesOptions,
    complaintOptions,
    canWalkOptions,
    preExistingConditionsOptions,
} from '../data/FamilyHistoryData';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FamilyHistory: React.FC = () => {
    type FormData = {
        recordId: string;
        dob: string;
        sex: { value: string; label: string };
        dov: string;
        livesAtHome: { value: string; label: string }[];
        broughtInBy: { value: string; label: string }[];
        safeguarding: { value: string; label: string };
        socialServices: { value: string; label: string };
        hospitalVisits: number;
        complaint: { value: string; label: string }[];
        history: string;
        incidentDate: string;
        canWalk: { value: string; label: string };
        preExistingConditions: { value: string; label: string }[];
    };

    const { register, handleSubmit, control, reset } = useForm<FormData>();
    const [step, setStep] = useState(1);
    const { setRecordId } = useRecordId();
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const generateRecordId = () => {
        const uniquePart = Math.random().toString(36).substr(2, 9).toUpperCase(); // Generate a random string and convert to uppercase
        return `RAFCE${uniquePart}`;
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        const generatedRecordId = generateRecordId();
        data.recordId = generatedRecordId;
        setRecordId(generatedRecordId); // Set the generated recordId in context

        axios.post('http://localhost:5000/api/familyhistory/insert', data)
            .then((response) => {
                console.log(response);
                toast.dark('Family History data submitted successfully');
                reset();
                setStep(1);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to submit Family History data');
            });
    };
    const customStyles = {

        singleValue: (provided: any) => ({
            ...provided,
            color: 'black'
        }),

        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'black' : state.isFocused ? 'gray' : 'white',
            color: state.isSelected ? 'white' : 'black',
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: 'black',
            color: 'white',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: 'white',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: 'white',
            ':hover': {
                backgroundColor: 'gray',
                color: 'black',
            },
        }),
    };

    return (
        <div className="card shadow-lg compact bg-base-100">
            <div className="card-body">
                <ToastContainer />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="form-control">
                                <label className="label" htmlFor="dob">
                                    Date of Birth
                                </label>
                                <Controller
                                    control={control}
                                    name="dob"
                                    render={({ field }) => (
                                        <input
                                            id="dob" // Add the id to match the label's htmlFor attribute
                                            type="date"
                                            className="input input-bordered"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="sex-select">Sex</label>
                                <Controller
                                    control={control}
                                    name="sex"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            inputId="sex-select"  // Unique id for linking the label
                                            options={sexOptions}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            value={field.value}
                                            styles={customStyles}
                                            aria-label="Sex" // Direct aria-label for testing and accessibility
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='wholives-select'>Who lives at home with the patient?</label>
                                <Controller
                                    control={control}
                                    name="livesAtHome"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            inputId='wholives-select'
                                            closeMenuOnSelect={false}
                                            options={livesAtHomeOptions}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                            styles={customStyles}
                                            aria-label='who lives at home' // Direct aria-label for testing and accessibility

                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between">

                                <button type="button" className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <div className="form-control">
                                <label className="label" htmlFor='dov'>Date of Visit</label>
                                <Controller
                                    control={control}
                                    name="dov"
                                    render={({ field }) => <input id='dov' type="date" className="input input-bordered" {...field} />}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='broughtinby-select'>Who was with the child when they were brought in?</label>
                                <Controller
                                    control={control}
                                    name="broughtInBy"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            inputId='broughtinby-select'
                                            closeMenuOnSelect={false}
                                            options={broughtInByOptions}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                            styles={customStyles}
                                            aria-label='who was with the child' // Direct aria-label for testing and accessibility

                                        />
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Did this hospital visit trigger a safeguarding protocol?</label>
                                <Controller
                                    control={control}
                                    name="safeguarding"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={safeguardingOptions}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            value={field.value}
                                            styles={customStyles}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded shadow-md hover:bg-gray-700" onClick={prevStep}>Previous</button>
                                <button type="button" className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <div className="form-control">
                                <label className="label" htmlFor='socialservices-select'>Is the family known to Social Services?</label>
                                <Controller
                                    control={control}
                                    name="socialServices"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            inputId='socialservices-select'
                                            options={socialServicesOptions}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            value={field.value}
                                            styles={customStyles}
                                            aria-label='Is the family known' // Direct aria-label for testing and accessibility
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='hospitalvisits'>Total number of hospital visits since birth</label>
                                <input id='hospitalvisits' type="number" className="input input-bordered" {...register('hospitalVisits')} />
                            </div>
                            <div className="form-control">
                                <label className="label">Presenting complaint for the current hospital visit</label>
                                <Controller
                                    control={control}
                                    name="complaint"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={complaintOptions}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                            styles={customStyles}

                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded shadow-md hover:bg-gray-700" onClick={prevStep}>Previous</button>
                                <button type="button" className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <div className="form-control">
                                <label className="label" htmlFor='History'>History</label>
                                <textarea id='History' className="textarea textarea-bordered" {...register('history')} />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='incidentdate'>When did this incident happen/when was the issue first noticed?</label>
                                <Controller
                                    control={control}
                                    name="incidentDate"
                                    render={({ field }) => <input id='incidentdate' type="date" className="input input-bordered" {...field} />}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='walk-select'>Is the child normally able to walk/cruise?</label>
                                <Controller
                                    control={control}
                                    name="canWalk"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            inputId='walk-select'
                                            options={canWalkOptions}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            value={field.value}
                                            styles={customStyles}
                                            aria-label='Is the child normally able to walk or cruise' // Direct aria-label for testing and accessibility
                                        />
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Select pre-existing conditions</label>
                                <Controller
                                    control={control}
                                    name="preExistingConditions"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={preExistingConditionsOptions}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                            styles={customStyles}

                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded shadow-md hover:bg-gray-700" onClick={prevStep}>Previous</button>
                                <button type="submit" className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800">Submit</button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
};

export default FamilyHistory;
