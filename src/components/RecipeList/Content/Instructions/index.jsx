import React from 'react';
import styles from './index.module.scss';

const Instructions = (props) => {
  const { instructions, className, ...rest } = props;

  return (
    <div className={styles['instruction']}>
      <span className={styles['instruction_title']}>Instructions: </span>
      {Array.isArray(instructions) &&
        instructions.map((instruction, index) => {
          return (
            <span key={index} className={styles['instruction_item']}>
              {instruction}
            </span>
          );
        })}
    </div>
  );
};

export default Instructions;
