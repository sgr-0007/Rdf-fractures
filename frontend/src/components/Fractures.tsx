import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
    skullFracture: string;
    facialFracture: string;
    cervicalSpineFracture: string;
    thoracicSpineFracture: string;
    lumbarSpineFracture: string;
    sacralSpineFracture: string;
    leftRibFracture: string;
    rightRibFracture: string;
    sternumFracture: string;
    leftPelvisFracture: string;
    rightPelvisFracture: string;
    leftShoulderFracture: string;
    rightShoulderFracture: string;
    leftArmFracture: string;
    rightArmFracture: string;
    leftLowerLimbFracture: string;
    rightLowerLimbFracture: string;
};

const Fractures: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/api/fractures/insert', data)
         .then((response) => {
              console.log(response);
              toast.success('Fractures data submitted successfully');

            }
            )
            .catch((error) => {
              console.log(error);
              toast.error('Failed to submit Fractures data');

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
                            <label className="label">Where is the fracture on the skull bone</label>
                            <select className="select select-bordered" {...register('skullFracture')}>
                                <option value="">Select...</option>
                                {skullFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Where is the fracture/dislocation on the facial bone?</label>
                            <select className="select select-bordered" {...register('facialFracture')}>
                                <option value="">Select...</option>
                                {facialFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the cervical spine, select the bone from the list below</label>
                            <select className="select select-bordered" {...register('cervicalSpineFracture')}>
                                <option value="">Select...</option>
                                {cervicalSpineFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the thoracic spine, select the bone from the list below</label>
                            <select className="select select-bordered" {...register('thoracicSpineFracture')}>
                                <option value="">Select...</option>
                                {thoracicSpineFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the lumbar spine, select the bone from the list below</label>
                            <select className="select select-bordered" {...register('lumbarSpineFracture')}>
                                <option value="">Select...</option>
                                {lumbarSpineFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the sacral spine or coccyx, select the bone from the list below</label>
                            <select className="select select-bordered" {...register('sacralSpineFracture')}>
                                <option value="">Select...</option>
                                {sacralSpineFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the left ribs, select the specific rib location from the list below</label>
                            <select className="select select-bordered" {...register('leftRibFracture')}>
                                <option value="">Select...</option>
                                {leftRibFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the right ribs, select the specific rib location from the list below</label>
                            <select className="select select-bordered" {...register('rightRibFracture')}>
                                <option value="">Select...</option>
                                {rightRibFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the left pelvis, select the specific bone from the list below</label>
                            <select className="select select-bordered" {...register('leftPelvisFracture')}>
                                <option value="">Select...</option>
                                {leftPelvisFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the right pelvis, select the specific bone from the list below</label>
                            <select className="select select-bordered" {...register('rightPelvisFracture')}>
                                <option value="">Select...</option>
                                {rightPelvisFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the sternum, select the bone from the list below</label>
                            <select className="select select-bordered" {...register('sternumFracture')}>
                                <option value="">Select...</option>
                                {sternumFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the left shoulder girdle, select the specific bone from the list below</label>
                            <select className="select select-bordered" {...register('leftShoulderFracture')}>
                                <option value="">Select...</option>
                                {leftShoulderFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the right shoulder girdle, select the specific bone from the list below</label>
                            <select className="select select-bordered" {...register('rightShoulderFracture')}>
                                <option value="">Select...</option>
                                {rightShoulderFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the left arm/wrist/hand, select the specific bone from below</label>
                            <select className="select select-bordered" {...register('leftArmFracture')}>
                                <option value="">Select...</option>
                                {leftArmFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the right arm/wrist/hand, select the specific bone from below</label>
                            <select className="select select-bordered" {...register('rightArmFracture')}>
                                <option value="">Select...</option>
                                {rightArmFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the left lower limb, select the specific bone from below</label>
                            <select className="select select-bordered" {...register('leftLowerLimbFracture')}>
                                <option value="">Select...</option>
                                {leftLowerLimbFractureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">If the fracture is in the right lower limb, select the specific bone from below</label>
                            <select className="select select-bordered" {...register('rightLowerLimbFracture')}>
                                <option value="">Select...</option>
                                {rightLowerLimbFractureOptions.map((option) => (
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
}

export default Fractures;





