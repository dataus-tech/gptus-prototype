import React, { useState, useEffect } from 'react';
import Tag from 'app/components/Tag/Tag';
import TAG_DATA from 'app/data/tagData';
import css from 'app/components/Tags/Tags.module.css';

interface TagType {
  id: number;
  tag: string;
}

const Tags = () => {
  const [data, setData] = useState<TagType[]>([]);
  useEffect(() => {
    setData(TAG_DATA);
  }, []);

  return (
    <div className={css.container}>
      {data.map((tag) => (
        <Tag key={tag.id} tag={tag.tag} />
      ))}
    </div>
  );
};

export default Tags;
