import React from 'react';

// Import all the icons
import WineBar from '../../assets/icons/wine_bar.png';
import lunchDining from '../../assets/icons/lunch_dining.png';
import addPhoto from '../../assets/icons/add_a_photo.png';
import awardStar from '../../assets/icons/award_star.png';
import photoFrame from '../../assets/icons/photo_frame.png';
import genres from '../../assets/icons/genres.png'; 
import phoneCamera from '../../assets/icons/smartphone_camera.png';
import videoFront from '../../assets/icons/video_camera_front.png';
import photoCameraFront from '../../assets/icons/photo_camera_front.png';

const ActivityIcon = ({ activityName }) => {
    // Define a mapping of activity names to their corresponding icons
    const activityIcons = {
        "Beverage Station": WineBar,
        "Food Station": lunchDining,
        "Photo Booth": addPhoto,
        "Feature Station": awardStar,
        "Photo at LED Screen": photoFrame,
        "Say Hi to the DJ": genres,
        "Snapshot with Veniece": phoneCamera,
        "Testimonial with Camera Crew": videoFront,
        "Photo at step/repeat banner": photoCameraFront,
    };

    // If the activity name exists in the mapping, return the corresponding icon
    if (activityIcons[activityName]) {
        return (
            <div className="activityIconBackground">
                <img src={activityIcons[activityName]} className="activityIcons" alt={activityName} />
            </div>
        );
    }

    // If no match is found, return null
    return null;
};

export default ActivityIcon;
