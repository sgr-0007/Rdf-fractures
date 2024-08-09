import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    skullFractureOptions,
    facialFractureOptions,
    cervicalSpineFractureOptions,
    thoracicSpineFractureOptions,
    lumbarSpineFractureOptions,
    sacralSpineFractureOptions,
    leftRibFractureOptions,
    rightRibFractureOptions,
    rightPelvisFractureOptions,
    leftPelvisFractureOptions,
    sternumFractureOptions,
    leftShoulderFractureOptions,
    rightShoulderFractureOptions,
    leftArmFractureOptions,
    rightArmFractureOptions,
    leftLowerLimbFractureOptions,
    rightLowerLimbFractureOptions,
} from '../data/FractureData';

type FormData = {
    recordId: string;
    skullFracture: { value: string; label: string }[];
    facialFracture: { value: string; label: string }[];
    cervicalSpineFracture: { value: string; label: string }[];
    thoracicSpineFracture: { value: string; label: string }[];
    lumbarSpineFracture: { value: string; label: string }[];
    sacralSpineFracture: { value: string; label: string }[];
    leftRibFracture: { value: string; label: string }[];
    rightRibFracture: { value: string; label: string }[];
    sternumFracture: { value: string; label: string }[];
    leftPelvisFracture: { value: string; label: string }[];
    rightPelvisFracture: { value: string; label: string }[];
    leftShoulderFracture: { value: string; label: string }[];
    rightShoulderFracture: { value: string; label: string }[];
    leftArmFracture: { value: string; label: string }[];
    rightArmFracture: { value: string; label: string }[];
    leftLowerLimbFracture: { value: string; label: string }[];
    rightLowerLimbFracture: { value: string; label: string }[];
};

const Fractures: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        axios.post('https://rdf-fractures.onrender.com/api/fractures/insert', data)
            .then((response) => {
                console.log(response);
                toast.dark('Fractures data submitted successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to submit Fractures data');
            });
    };

    const customStyles = {
        
        singleValue: (provided: any) => ({
            ...provided,
            color: 'black',
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
                                <label className="label">Record ID</label>
                                <input
                                    className="input input-bordered"
                                    {...register('recordId', { required: 'Record ID is required' })}
                                />
                                {errors.recordId && <span className="text-red-500">{errors.recordId.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Where is the fracture on the skull bone</label>
                                <Controller
                                    control={control}
                                    name="skullFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={skullFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">Where is the fracture/dislocation on the facial bone?</label>
                                <Controller
                                    control={control}
                                    name="facialFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={facialFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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
                                <label className="label">If the fracture is in the cervical spine, select the bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="cervicalSpineFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={cervicalSpineFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the thoracic spine, select the bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="thoracicSpineFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={thoracicSpineFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the lumbar spine, select the bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="lumbarSpineFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={lumbarSpineFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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
                                <label className="label">If the fracture is in the sacral spine or coccyx, select the bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="sacralSpineFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={sacralSpineFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the left ribs, select the specific rib location from the list below</label>
                                <Controller
                                    control={control}
                                    name="leftRibFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={leftRibFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the right ribs, select the specific rib location from the list below</label>
                                <Controller
                                    control={control}
                                    name="rightRibFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={rightRibFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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
                                <label className="label">If the fracture is in the left pelvis, select the specific bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="leftPelvisFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={leftPelvisFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the right pelvis, select the specific bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="rightPelvisFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={rightPelvisFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the sternum, select the bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="sternumFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={sternumFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the left shoulder girdle, select the specific bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="leftShoulderFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={leftShoulderFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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

                    {step === 5 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <div className="form-control">
                                <label className="label">If the fracture is in the right shoulder girdle, select the specific bone from the list below</label>
                                <Controller
                                    control={control}
                                    name="rightShoulderFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={rightShoulderFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the left arm/wrist/hand, select the specific bone from below</label>
                                <Controller
                                    control={control}
                                    name="leftArmFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={leftArmFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the right arm/wrist/hand, select the specific bone from below</label>
                                <Controller
                                    control={control}
                                    name="rightArmFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={rightArmFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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

                    {step === 6 && (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                            <div className="form-control">
                                <label className="label">If the fracture is in the left lower limb, select the specific bone from below</label>
                                <Controller
                                    control={control}
                                    name="leftLowerLimbFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={leftLowerLimbFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">If the fracture is in the right lower limb, select the specific bone from below</label>
                                <Controller
                                    control={control}
                                    name="rightLowerLimbFracture"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={rightLowerLimbFractureOptions}
                                            styles={customStyles}
                                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                                            value={field.value}
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
}

export default Fractures;
