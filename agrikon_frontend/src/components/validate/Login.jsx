import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 import { toast } from 'react-toastify';




const Login = () => {
    // Yup schema for validation
    const validationSchema = Yup.object({
        email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address')
        .required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const islogin=useSelector(state=>state.login)
    console.log(islogin)
    const navigate = useNavigate();
     
    useEffect(() => {
        if (islogin) {
            navigate('/'); 
        }
    }, [islogin]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleLogin = async (data) => {
        try {
            const response = await fetch(import.meta.env.VITE_login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const result = await response.json();
            localStorage.setItem('authToken', result.token.access);
            localStorage.setItem('usertype', result.usertype);
            localStorage.setItem('userid', result.userid);
            localStorage.setItem("username",result.username)
            toast.success('Login successful',{theme:'colored'});
            navigate('/'); 
        } catch (error) {
            toast.error('Login error: ' + error.message,{theme:'colored'});
        }
    };

    return (
        <div style={{ backgroundColor: '#00849a', height: '80vh' }}>
            <div className="container mb-3">
                <div className="row justify-content-center">
                    <div className="col-md-6" style={{ marginTop: '60px' }}>
                        <div className="card mt-5">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Login</h3>
                                <form onSubmit={handleSubmit(handleLogin)}>
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

                                    <div className="form-group mt-3">
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <FontAwesomeIcon icon={faLock} />
                                            </div>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                {...register('password')}
                                            />
                                        </div>
                                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-primary btn-block form-control">
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-3 text-center">
                                    <small>
                                        Don't have an account? <Link to="/signup">Register here</Link>
                                    </small>
                                    <br />
                                    <small>
                                        Forget Password? <Link to="/forgetpassword">Reset</Link>
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

export default Login;