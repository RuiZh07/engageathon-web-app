import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MdOutlinePersonOutline, MdMailOutline } from 'react-icons/md';
import IconTitle from '../../components/IconTitle/IconTitle';
import MainButton from '../../components/MainButton/MainButton';
import './SignUp.scss'; 

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContinue = async () => {
        if (!firstName || !lastName || !email) {
            alert('All fields are required.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch(`https://app.engageathon.com/api/auth/userlogin/temp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const userData = {
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name,
                };

                localStorage.setItem('userData', JSON.stringify(userData));

                console.log('Sign up successful:', result);
                navigate('/home');

            } else {
                alert(result.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please check your network connection.');
        }
    };

    return (
        <div className="sign-up-screen-container">
            <div className="form-container">
                <IconTitle />
                <div className="sign-up-container">
                    <h1 className="begin-text">Let's Begin</h1>
                    <p className="enter-text">Enter your email below to get started!</p>
                    <div className="user-input-container">
                        <MdOutlinePersonOutline size={30} color="#CBCBCB" className="icon" />
                        <input
                            className="user-input"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="user-input-container">
                        <MdOutlinePersonOutline size={30} color="#CBCBCB" className="icon" />
                        <input
                            className="user-input"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="user-input-container">
                        <MdMailOutline size={28} color="#CBCBCB" className="icon" />
                        <input
                            className="user-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="continue-button-container">
                        <MainButton title="Continue" onClick={handleContinue} />
                    </div>
                </div>
            </div>
        </div>
    );
}
