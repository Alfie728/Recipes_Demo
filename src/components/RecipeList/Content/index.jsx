import React from 'react';
import styles from './index.module.scss';
import { classNameStyled } from '@/utils';
import { info } from 'sass';
import Instructions from './Instructions';
import Ingredients from './Ingredients';

const Content = (props) => {
  const { cookTime, servings, instructions, ingredients, className, ...rest } =
    props;

  return (
    <div className={styles['panel']}>
      <div>
        <span className={styles['title']}>Cook Time:</span>
        <span className={styles['info']}>{cookTime}</span>
      </div>

      <div>
        <span className={styles['title']}>Servings:</span>
        <span className={styles['info']}>{servings}</span>
      </div>

      <Instructions instructions={instructions} />
      <Ingredients ingredients={ingredients} />
    </div>
  );
};

export default Content;
