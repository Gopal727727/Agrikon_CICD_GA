import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAt, faLock} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
   
    email: Yup.string()
        .email('Please enter a valid email address')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email must be in a valid format (e.g., user@example.com)'
        )
        .required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
   
});

const Resetpassword = () => {
  
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/resetpassword/', {
            email: data.email,
            password: data.password,
            otp: data.otp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert(response.data.success); 
    } catch (error) {
       alert((error.response?.data?.error || error.message));

    }
};


    return (
        <div style={{ backgroundColor: '#00849a', height: '120vh' }}>
            <div className="d-flex justify-content-center align-items-center mb-5 mt-4" style={{ height: '100%' }}>
                <div className="border p-4 rounded shadow-lg w-50" style={{ backgroundColor: 'white' }}>
                    <h2 className="text-center mb-4">Reset password</h2>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">


                        <div className="form-group mt-4">
                            <div className="input-group">
                                <div className="input-group-text"><FontAwesomeIcon icon={faAt} /></div>
                                <input type="email" className="form-control" placeholder="Enter Your Email" {...register('email')} />
                            </div>

                        </div>
                         <div className="form-group mt-4">
                            <div className="input-group">
                                <div className="input-group-text"><FontAwesomeIcon icon={faUser} /></div>
                                <input type="number" className="form-control" placeholder="Enter you otp" {...register('otp')} />
                            </div>

                        </div>

                        <div className="form-group mt-4">
                            <div className="input-group">
                                <div className="input-group-text"><FontAwesomeIcon icon={faLock} /></div>
                                <input type="password" className="form-control" placeholder="Enter Your Password" {...register('password')} />
                            </div>
                            {errors.password && <small className="text-danger">{errors.password.message}</small>}

                        </div>

                        <div className="form-group mt-4">
                            <div className="input-group">
                                <div className="input-group-text"><FontAwesomeIcon icon={faLock} /></div>
                                <input type="password" className="form-control" placeholder="Confirm Your Password" {...register('confirmPassword')} />
                            </div>
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}

                        </div>
                        <button type="submit" className="btn btn-primary mt-4 w-100">Reset</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Resetpassword;
