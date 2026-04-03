import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAt, faLock, faImage, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
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
  profile_picture: Yup.mixed()
    .required('Profile picture is required')
    .test('fileSelected', 'File not selected', (value) => value && value[0])
    .test('fileSize', 'File too large', (value) => value && value[0] && value[0].size <= 2000000)
    .test('fileType', 'Invalid file type', (value) => value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type)),
  usertype: Yup.string().required('User type is required'),
});

  const navigate=useNavigate()
  const [backendErrors, setBackendErrors] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', data.name);
    formDataToSend.append('email', data.email);
    formDataToSend.append('password', data.password);
    formDataToSend.append('profile_picture', data.profile_picture[0]);
    formDataToSend.append('usertype', data.usertype);
  
    try {
      const response = await axios.post('http://localhost:8000/signupuser/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Assuming the response contains errors if any
      if (response.data.errors) {
        toast.error(response.data.errors,{theme:'colored'})
        // Set backend errors to show them in the form
        setBackendErrors(response.data.errors);
      } else {
        navigate("/login")
        toast.success('User signed up successfully:',{theme:'colored'});
        setBackendErrors({});
      }
    } catch (error) {
      toast.error("Error: ", error,{theme:"colored"});
      // In case of network error or unexpected issues, you can log them or set a global error message
      setBackendErrors({ global: 'An error occurred, please try again later.' });
    }
  };
  

  return (
    <div style={{ backgroundColor: '#00849a', height: '120vh' }}>
      <div className="d-flex justify-content-center align-items-center mb-5 mt-4" style={{ height: '100%' }}>
        <div className="border p-4 rounded shadow-lg w-50" style={{ backgroundColor: 'white' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faUser} /></div>
                <input type="text" className="form-control" placeholder="Enter Your Name" {...register('name')} />
              </div>
              {errors.name && <small className="text-danger">{errors.name.message}</small>}
              {backendErrors.name && <small className="text-danger">{backendErrors.name}</small>}
            </div>
            
            <div className="form-group mt-4">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faAt} /></div>
                <input type="email" className="form-control" placeholder="Enter Your Email" {...register('email')} />
              </div>
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
              {backendErrors.email && <small className="text-danger">{backendErrors.email}</small>}
            </div>

            <div className="form-group mt-4">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faLock} /></div>
                <input type="password" className="form-control" placeholder="Enter Your Password" {...register('password')} />
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
              {backendErrors.password && <small className="text-danger">{backendErrors.password}</small>}
            </div>
            
            <div className="form-group mt-4">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faLock} /></div>
                <input type="password" className="form-control" placeholder="Confirm Your Password" {...register('confirmPassword')} />
              </div>
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
              {backendErrors.confirmPassword && <small className="text-danger">{backendErrors.confirmPassword}</small>}
            </div>

            <div className="form-group mt-4">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faImage} /></div>
                <input type="file" className="form-control" {...register('profile_picture')} />
              </div>
              {errors.profile_picture && <small className="text-danger">{errors.profile_picture.message}</small>}
              {backendErrors.profile_picture && <small className="text-danger">{backendErrors.profile_picture}</small>}
            </div>
            
            <div className="form-group mt-4">
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faUserTag} /></div>
                <select className="form-control" {...register('usertype')}>
                  <option value="User">User</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Businessman">Businessman</option>
                </select>
              </div>
              {errors.usertype && <small className="text-danger">{errors.usertype.message}</small>}
              {backendErrors.usertype && <small className="text-danger">{backendErrors.usertype}</small>}
            </div>

            {backendErrors.global && <div className="text-center text-danger">{backendErrors.global}</div>}

            <button type="submit" className="btn btn-primary mt-4 w-100">Sign Up</button>
          </form>
          <div className="mt-3 text-center">
            <small>
              Already have an account? <Link to="/login">Login here</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;