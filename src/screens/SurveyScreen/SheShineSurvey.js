import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainButton from '../../components/MainButton/MainButton';
import './SheShineSurvey.scss';
import IconTitle from '../../components/IconTitle/IconTitle';

const QUESTIONS = [
    {
        text: "Is this your first time attending the conference?",
        options: ["Yes", "No"],
        name: "question_1",
        type: "multiple-choice",
    },
    {
        text: "How would you rate the overall experience of the conference?",
        options: ["Excellent", "Good", "Average", "Poor"],
        name: "question_2",
        type: "multiple-choice",
    },
    {
        text: "How satisfied were you with the quality of the presenters and facilitators?",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
        name: "question_3",
        type: "multiple-choice",
    },
    {
        text: "Do you feel the topics discussed during the conference were relevant to your personal and professional growth?",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
        name: "question_4",
        type: "multiple-choice",
    },
    {
        text: "How would you rate the value of the conference in relation to the cost of attendance?",
        options: ["Excellent Value", "Good Value", "Fair Value", "Poor Value", "Not Sure"],
        name: "question_5",
        type: "multiple-choice",
    },
    {
        text: "Was the conference location convenient and accessible for you?",
        options: ["Yes", "No", "Neutral"],
        name: "question_6",
        type: "multiple-choice",
    },
    {
        text: "How likely are you to recommend this conference to others?",
        options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
        name: "question_7",
        type: "multiple-choice",
    },
    {
        text: "What additional topics or themes would you like to see covered in future conferences?",
        name: "question_8",
        type: "open-ended",
    },
    {
        text: "How satisfied were you with the event's logistics (registration, seating, timing, etc.)?",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        name: "question_9",
        type: "multiple-choice",
    },
    {
        text: "Would you attend an ongoing series of either online or in-person workshop sessions, discussions, activities/events that we host throughout the year leading up to next year's conference?",
        name: "question_10",
        type: "open-ended",
    },
    {
        text: "Any additional comments or suggestions for improving future conferences?",
        name: "question_11",
        type: "open-ended",
    },
];


export default function SheShineSurvey() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [responses, setResponses] = useState({
        question_1: '',
        question_2: '',
        question_3: '',
        question_4: '',
        question_5: '',
        question_6: '',
        question_7: '',
        question_8: '',
        question_9: '',
        question_10: '',
        question_11: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('userData'); 
                if (userData) {
                    const { email } = JSON.parse(userData);
                    setEmail(email); 
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            email: email, 
        }));
    }, [email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses((prevResponses) => ({
            ...prevResponses,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formBody = Object.keys(responses)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(responses[key])}`)
            .join('&');

            console.log("Form Body:", formBody);
        try {
            const response = await fetch('https://app.engageathon.com/api/report/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                navigate('/congratulations');
            } else {
                console.error('Error:', response.statusText);
                
            }
        } catch (error) {
            console.error('Network error:', error);

        }
    };

    return (
        <div className="sign-up-screen-container">
            <IconTitle />
            <div className="feedbackContentContainer">
                <div className="greatJobContainer">
                    <h1 className="rateText">Rate your<br />experience</h1>
                    <div style={{ marginTop: '15px', marginBottom: '20px' }}>
                        <p className="shareText">Share your experience to help us improve and earn extra rewards</p>
                    </div>
                </div>
                
            </div>

            <form className="surveyForm">
            {QUESTIONS.map((question, index) => (
                <div key={index}>
                     <br />
                    <label>{question.text}</label>
                    {question.type === "multiple-choice" ? (
                        question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="answerChoices"> 
                                <input
                                    type="radio"
                                    id={`${question.name}_${optionIndex}`}
                                    name={question.name}
                                    value={option}
                                    onChange={handleChange}
                                    required={optionIndex === 0}
                                />
                                <label htmlFor={`${question.name}_${optionIndex}`}>{option}</label>
                            </div>
                        ))
                    ) : (
                        <input
                            type="text"
                            name={question.name}
                            value={responses[question.name] || ''}
                            onChange={handleChange}
                            placeholder="Type your answer here..."
                            className="rectangleInput"
                        />
                    )}
                </div>
            ))}
            <div className="submitButtonContainer">
                <MainButton title="Submit" onClick={handleSubmit} />
            </div>
        </form>
        <p className="endSurveyTextOne">Thank you for completing the survey.</p>
        <p className="endSurveyText">These questions will help gather feedback on the conference’s organization, content and value. </p>
        </div>
    );
}