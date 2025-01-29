import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import MainButton from '../../components/MainButton/MainButton';
import IconTitle from '../../components/IconTitle/IconTitle';
import './SuperBowlSurvey.scss';


export default function SuperBowlSurvey () {
    const [surveyQuestion, setSurveyQuestion] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Access the location state 
    const location = useLocation();
    const { completedActivityId, email } = location.state || {};

    console.log("Received Data:", { completedActivityId, email }); 

    useEffect(() => { 
        const fetchSurveyQuestion = async () => {
            try {
                const response = await fetch(`https://app.engageathon.com/api/activityreportfetch/${completedActivityId}/`)
                const data = await response.json();
                if (data.questions && Array.isArray(data.questions)) {
                    setSurveyQuestion(data.questions);
                } else {
                    console.error('Invalid or missing questions array:', data);
                }
            } catch (error) {
                console.error('Error fetching survey questions:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyQuestion();
    }, [completedActivityId]);

    // Handle change in answers
    const handleAnswerChange = (questionIndex, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: value,
        }));
    };
    console.log("answer", answers);

    // Handle submitting the survey
    const handleSubmit = async () => {
        try {
            if (!completedActivityId || !email) {
                console.error('Required data is missing.');
                return;
            }
            const payload = {
                answers,
                activity_id: completedActivityId,
                email,
            }
            const response = await fetch(`https://app.engageathon.com/api/activityreport/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Survey submitted successfully');
                navigate('/superbowl-activity', { state: { completedActivityId, email } });
            } else {
                console.error('Error submitting survey');
            }
        } catch (error) {
            console.error("Error to submit survey", error.message)
        }
        
    }

    // Render different input types based on question content
    const renderInput = (question, index) => {
        if (question.includes("1-5 scale")) {
            return (
                <div className="scaleOptions">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <label key={num}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={num}
                                checked={answers[index] === num}
                                onChange={() => handleAnswerChange(index, num)}
                            />
                            {num}
                        </label>
                    ))}
                </div>
            );
        } else if (question.includes("Yes/No")) {
            // Yes/No question (radio buttons)
            return (
                <div className="yesNoOptions">
                    <label>
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value="Yes"
                            checked={answers[index] === "Yes"}
                            onChange={() => handleAnswerChange(index, "Yes")}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value="No"
                            checked={answers[index] === "No"}
                            onChange={() => handleAnswerChange(index, "No")}
                        />
                        No
                    </label>
                </div>
            );
        } else {
            return (
                <div className="openEnded">
                    <textarea
                        name={`question-${index}`}
                        value={answers[index] || ""}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder="Your answer here"
                        className="openEndedInput"
                    />
                </div>
            );
        }
    };

    return (
        <div className="container">
            <IconTitle />
            <div className="superBowlRateContainer">
                <h3 className="rateText">Rate your<br />experience</h3>
            </div>
            
            <div className="surveyContainer">
                {loading ? (
                    <div className="loading-text">Loading...</div>
                ) : Array.isArray(surveyQuestion) && surveyQuestion.length > 0 ? (
                    surveyQuestion.map((question, index) => (
                        <div key={index} className="surveyQuestion">
                            <p>{question}</p>
                            {renderInput(question, index)}
                        </div>
                    ))
                 ) : (
                    <div className="loading-text">No questions available</div>
                 )}
            </div>
            <div className="superBowlSubmitContainer">
                <MainButton title="Submit" onClick={handleSubmit} />
            </div>

        </div>
    );
}