import React, { useState, useEffect } from 'react';
import Mentor from 'app/components/Mentor/Mentor';
import MENTOR_DATA from 'app/data/mentorData';

const MentorPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(MENTOR_DATA);
  }, []);

  return (
    <div className="home-page">
      {data.map((mentor) => (
        <Mentor key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorPage;
