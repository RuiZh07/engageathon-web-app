import React from 'react';
import './Chip.scss'; 

const Chip = ({ label }) => {
  return (
    <div className="chip-container">
      <div className="chip-gradient">
        <div className="chip-content">
          <span className="chip-label">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default Chip;
