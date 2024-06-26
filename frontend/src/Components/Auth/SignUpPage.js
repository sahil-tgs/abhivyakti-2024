import React, { useEffect, useState } from 'react';
import '../../css/Login.css';
import logo from "../../assets/EventPageAsst/logoPlaceHolder.svg";
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Footer from '../Footer';
import LogoComponent from '../../assets/LogoComponent.js';
import {  toast } from 'react-toastify';



const url = process.env.REACT_APP_HOST || 'https://abhivyakti-2024-m1j7.vercel.app';

const SignUpPage = () => {
    // const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // const navigateTo = useNavigate();
    const navigate = useNavigate();

    useEffect(() => {
        const footerHeight = document.querySelector('.footer').offsetHeight;
        document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
        window.scrollTo(0, 0);
        if (localStorage.getItem("access_token")) {
            navigate("/home");
        }
    }, [])

    // const handleNameChange = (e) => {
    //     e.preventDefault();
    //     setUserName(e.target.value);
    // }
    // const handleEmailChange = (e) => {
    //     setUserEmail(e.target.value);
    // }
    // const handlePasswordChange = (e) => {
    //     setUserPassword(e.target.value);
    // }
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${url}/api/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                
                // console.log(data)
                toast.error(data.msg);
              
                return;
            }
            setLoading(false);
            setError(null);

            console.log(data)
            toast.success("Account Created!");

            navigate('/login');

        }
        catch (error) {
            setLoading(false);
            setError(error.message);
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='LoginSignUp SignUp'>
                <div className='loginContainer'>
                    <div className='bgImageLogin'>
                        <div className='logoLogin'>
                            <LogoComponent />
                        </div>
                    </div>

                    <div className='LoginSignUpForm'>
                        <div className='SignupFormArea'>
                            <h1 className='signUpHeading'>Create an account</h1>
                            <form className='SignupForm' onSubmit={handleSubmit}>
                                <div className='loginInputs'>
                                    <label htmlFor='nameForm' className='loginLabel'>
                                        Full Name
                                    </label>
                                    <input
                                        className='loginInput'
                                        name='nameForm'
                                        placeholder='Enter Your Name'
                                        // value={userName}
                                        // onChange={handleNameChange}
                                        id='username'
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='loginInputs'>
                                    <label htmlFor='emailForm' className='loginLabel'>
                                        Email
                                    </label>
                                    <input
                                        className='loginInput'
                                        name='emailForm'
                                        placeholder='bt22cse@iiitn.ac.in'
                                        // value={userEmail}
                                        // onChange={handleEmailChange}
                                        onChange={handleChange}
                                        required
                                        id='email'
                                    />
                                </div>
                                <div className='loginInputs'>
                                    <label htmlFor='phoneForm' className='loginLabel'>
                                        Phone No.
                                    </label>
                                    <input
                                        className='loginInput'
                                        type='number'
                                        name='phoneForm'
                                        // value={userEmail}
                                        // onChange={handleEmailChange}
                                        onChange={handleChange}
                                        required
                                        id='phone'
                                    />
                                </div>
                                <div className='loginInputs'>
                                    <label htmlFor='collegeForm' className='loginLabel'>
                                        College/School Name
                                    </label>
                                    <input
                                        className='loginInput'
                                        name='collegeForm'
                                        placeholder='IIIT Nagpur'
                                        // value={userEmail}
                                        // onChange={handleEmailChange}
                                        onChange={handleChange}
                                        id='college'
                                        required
                                    />
                                </div>

                                <div className='loginInputs'>
                                    <label htmlFor='passwordForm' className='loginLabel'>
                                        Password
                                    </label>
                                    <div className='passwordInputDiv'>
                                        <input
                                            className='passwordInput'
                                            name='passwordForm'
                                            type={`${showPassword ? 'text' : 'password'}`}
                                            placeholder='Enter Your Password'
                                            // value={userPassword}
                                            // onChange={handlePasswordChange}
                                            onChange={handleChange}
                                            id='password'
                                            required
                                        />
                                        {(showPassword ?
                                            <VisibilityOffOutlinedIcon
                                                className='EyeIcon'
                                                onClick={() => { setShowPassword(false) }}
                                            />
                                            :
                                            <VisibilityOutlinedIcon
                                                className='EyeIcon'
                                                onClick={() => { setShowPassword(true) }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* <button className='submitButton' type='submit' >
                                    Create account
                                </button> */}
                                <button disabled={loading} className='submitButton' type='submit'>{loading ? 'loading...' : 'Create account'}</button>
                            </form>
                            <div className='SignUpToLogin'>
                                <span>
                                    Already have an account?
                                </span>
                                <span className='linkToLogin' onClick={() => { navigate(`/login`) }}>
                                    Log In
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignUpPage