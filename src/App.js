import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css';

import Navbar from 'app/components/Navbar/Navbar';
import Routes from 'app/components/Routes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
};

export default App;
