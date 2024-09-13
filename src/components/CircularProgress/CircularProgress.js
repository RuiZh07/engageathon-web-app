// CircularProgress.js
import React from 'react';
import './CircularProgress.scss';

const CircularProgress = ({ percentage }) => {
    const radius = 70; 
    const strokeWidth = 7;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="circular-progress">
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                    className="circle-bg"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="circle-progress"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset: offset }}
                />
                <text x="50%" y="50%" className="circle-text" transform="rotate(90 60 60)">
                    {percentage}%
                </text>
            </svg>
        </div>
    );
};

export default CircularProgress;
