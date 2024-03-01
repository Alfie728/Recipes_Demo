import React from 'react';
import styles from './index.module.scss';
import { classNameStyled } from '@/utils';
import Button from '@/components/Button';

const Header = (props) => {
  const { header_info, id, deleteRecipe, className, ...rest } = props;

  return (
    <div className={styles['recipe_header']}>
      <h3 className={styles['recipe_title']}>{header_info}</h3>
      <div>
        <Button
          className={'btn-danger'}
          onClick={(e) => {
            e.stopPropagation();
            deleteRecipe(id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Header;
