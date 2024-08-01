import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
        sex: string;
        dov: string;
        livesAtHome: string;
        broughtInBy: string;
        safeguarding: string;
        socialServices: string;
        hospitalVisits: number;
        complaint: string;
        history: string;
        incidentDate: string;
        canWalk: string;
        preExistingConditions: string;
    };

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/api/familyhistory/insert', data)
         .then((response) => {
              console.log(response);
              toast.success('Family History data submitted successfully');
            }
            )
            .catch((error) => {
              console.log(error);
              toast.error('Failed to submit Family History data');
            }
            );
    };

    return (
        <div className="card shadow-lg compact bg-base-100">
            <div className="card-body">
                <ToastContainer />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">Record ID</label>
                            <input
                                className="input input-bordered"
                                {...register('recordId', { required: 'Record ID is required' })}
                            />
                            {errors.recordId && <span className="text-red-500">{errors.recordId.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">Date of Birth</label>
                            <Controller
                                control={control}
                                name="dob"
                                render={({ field }) => <input type="date" className="input input-bordered" {...field} />}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Sex</label>
                            <select className="select select-bordered" {...register('sex')}>
                                <option value="">Select...</option>
                                {sexOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Who lives at home with the patient?</label>
                            <select className="select select-bordered" {...register('livesAtHome')}>
                                <option value="">Select...</option>
                                {livesAtHomeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">Date of Visit</label>
                            <Controller
                                control={control}
                                name="dov"
                                render={({ field }) => <input type="date" className="input input-bordered" {...field} />}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Who was with the child when they were brought in?</label>
                            <select className="select select-bordered" {...register('broughtInBy')}>
                                <option value="">Select...</option>
                                {broughtInByOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Did this hospital visit trigger a safeguarding protocol?</label>
                            <select className="select select-bordered" {...register('safeguarding')}>
                                <option value="">Select...</option>
                                {safeguardingOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Is the family known to Social Services?</label>
                            <select className="select select-bordered" {...register('socialServices')}>
                                <option value="">Select...</option>
                                {socialServicesOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Total number of hospital visits since birth</label>
                            <input type="number" className="input input-bordered" {...register('hospitalVisits')} />
                        </div>

                        <div className="form-control">
                            <label className="label">Presenting complaint for the current hospital visit</label>
                            <select className="select select-bordered" {...register('complaint')}>
                                <option value="">Select...</option>
                                {complaintOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">History</label>
                            <textarea className="textarea textarea-bordered" {...register('history')} />
                        </div>

                        <div className="form-control">
                            <label className="label">When did this incident happen/when was the issue first noticed?</label>
                            <Controller
                                control={control}
                                name="incidentDate"
                                render={({ field }) => <input type="date" className="input input-bordered" {...field} />}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Is the child normally able to walk/cruise?</label>
                            <select className="select select-bordered" {...register('canWalk')}>
                                <option value="">Select...</option>
                                {canWalkOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Select pre-existing conditions</label>
                            <select className="select select-bordered" {...register('preExistingConditions')}>
                                <option value="">Select...</option>
                                {preExistingConditionsOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FamilyHistory;

