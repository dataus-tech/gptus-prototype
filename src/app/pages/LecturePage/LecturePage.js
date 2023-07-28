import React, { useState, useEffect } from 'react';
import UserService from 'app/services/user.service';
import Lecture from 'app/components/Lecture/Lecture';
import LECTURE_DATA from 'app/data/lectureData';
import { useSelector } from 'react-redux';

const LecturePage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('username');

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(LECTURE_DATA);
  }, []);

  useEffect(() => {
    if (accessToken && isLoggedIn) {
      UserService.getUserProfile(accessToken)
        .then((response) => {
          if (response.status === 200) {
            const { username } = response.data;
            if (!userName) {
              localStorage.setItem('username', username);
            }
          }
        })
        .catch(() => {
          window.location.reload();
        });
    }
  }, [userName, accessToken, isLoggedIn]);

  return (
    <div className="home-page">
      {data.map((lecture) => (
        <Lecture key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
};

export default LecturePage;
