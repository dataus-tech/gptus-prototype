import React from 'react';
import css from 'app/components/Tag/Tag.module.css';

interface TagType {
  tag: string;
}

const Tag = (props: TagType) => {
  const { tag } = props;
  return <div className={css.tag}>{tag}</div>;
};

export default Tag;
