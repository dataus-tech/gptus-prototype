import React from 'react';
import { Link } from 'react-router-dom';
import css from 'app/components/Mentor/Mentor.module.css';

interface MentorType {
  mentor: {
    id: number;
    authorId: number;
    authorImage: string;
    authorName: string;
    createdAt: string;
    body: string;
    title: string;
  };
}

const Mentor = (props: MentorType) => {
  const { id, authorId, authorImage, authorName, createdAt, body, title } =
    props.mentor;

  return (
    <div className={css['mentor-container']}>
      <div className="article-preview">
        <div className={css['profile']}>
          <div className={css['profile-box']}>
            <Link to={`/profile/${authorId}`}>
              <img
                className={css['author-profile-img']}
                src={authorImage}
                alt="강사 프로필 사진"
              />
            </Link>
            <div className={css['author-box']}>
              <Link className={css['author']} to={`/mentor/${authorId}`}>
                {authorName}
              </Link>
              <div className={css['date']}>{createdAt}</div>
            </div>
          </div>
        </div>

        <Link to={`/mentor/${id}`} className="preview-link">
          <h1>{title}</h1>
          <p>{body}</p>
          <span>Read more...</span>
        </Link>
      </div>
    </div>
  );
};

export default Mentor;
