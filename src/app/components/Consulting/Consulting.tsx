import React from 'react';
import { Link } from 'react-router-dom';
import css from 'app/components/Consulting/Consulting.module.css';

interface ConsultingType {
  consulting: {
    id: number;
    authorId: number;
    authorImage: string;
    authorName: string;
    createdAt: string;
    body: string;
    title: string;
  };
}

const Consulting = (props: ConsultingType) => {
  const { id, authorId, authorImage, authorName, createdAt, body, title } =
    props.consulting;

  return (
    <div className={css['consulting-container']}>
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
              <Link className={css['author']} to={`/profile/${authorId}`}>
                {authorName}
              </Link>
              <div className={css['date']}>{createdAt}</div>
            </div>
          </div>
        </div>

        <Link to={`/consulting/${id}`} className="preview-link">
          <h1>{title}</h1>
          <p>{body}</p>
          <span>Read more...</span>
        </Link>
      </div>
    </div>
  );
};

export default Consulting;
