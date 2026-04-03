import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

// Yup schema for validation
const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address')
      .required('Email is required')
});

const Forgetpassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleForget = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/forgetpassword/", { email: data.email }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.success) {
                alert(response.data.success);
                navigate('/resetpassword');
            } else {
                alert('Error: ' + (response.data.error || 'Unknown error'));
            }

        } catch (error) {
            alert('Request failed: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#00849a', height: '80vh' }}>
            <div className="container mb-3">
                <div className="row justify-content-center">
                    <div className="col-md-6" style={{ marginTop: '60px' }}>
                        <div className="card mt-5">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Forget Password</h3>
                                <form onSubmit={handleSubmit(handleForget)}>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <FontAwesomeIcon icon={faAt} />
                                            </div>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter email"
                                                {...register('email')}
                                            />
                                        </div>
                                        {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                    </div>

                                    <div className="text-center mt-3">
                                        {loading ? (
                                            <ClipLoader size={24} color={"#007bff"} />
                                        ) : (
                                            <button type="submit" className="btn btn-primary btn-block form-control">
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </form>

                                <div className="mt-3 text-center">
                                    <small>
                                        Don't have an account? <Link to="/signup">Register here</Link>
                                    </small>
                                    <br />
                                    <small>
                                        Already have an account? <Link to="/login">Login</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgetpassword;
