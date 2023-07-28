import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from 'app/pages/Register/Register';
import Home from 'app/pages/Home/Home';
import Settings from 'app/pages/Settings/Settings';
import LectureDetail from 'app/pages/LectureDetail/LectureDetail';
import ConsultingPage from 'app/pages/ConsultingPage/ConsultingPage';
import ConsultingDetail from 'app/pages/ConsultingDetail/ConsultingDetail';
import MentorPage from 'app/pages/MentorPage/MentorPage';
import MentorDetail from 'app/pages/MentorDetail/MentorDetail';
import FindId from 'app/pages/FindId/FindId';
import FindPassword from 'app/pages/FindPassword/FindPassword';
import LecturePage from 'app/pages/LecturePage/LecturePage';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lecture" element={<LecturePage />} />
      <Route path="/consulting" element={<ConsultingPage />} />
      <Route path="/mentor" element={<MentorPage />} />
      <Route path="/mentor/:id" element={<MentorDetail />} />
      <Route path="/consulting/:id" element={<ConsultingDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/lecture/:id" element={<LectureDetail />} />
      <Route path="/findId" element={<FindId />} />
      <Route path="/findPw" element={<FindPassword />} />
    </Routes>
  );
};

export default MainRouter;
