import React from 'react';
import { Link } from 'react-router-dom';

const DummyCard = () => {
  return (
    <div className="card">
      <Link to={'/lecture/1'} className="preview-link">
        <img
          src="/images/lectureSampleImage.png"
          className="card-img-top"
          alt="강의 샘플 이미지"
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default DummyCard;
