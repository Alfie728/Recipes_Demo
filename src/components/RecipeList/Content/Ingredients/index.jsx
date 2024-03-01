import React from 'react';
import styles from './index.module.scss';

const Ingredients = (props) => {
  const { ingredients, className, ...rest } = props;

  return (
    <div className={styles['ingredient']}>
      <span className={styles['ingredient_title']}>Ingredients: </span>
      <div className={styles['ingredient_grid_item']}>
        {Array.isArray(ingredients) &&
          ingredients.map((ingredient, index) => {
            return (
              <React.Fragment key={index}>
                <span className={styles['ingredient_name']}>
                  {ingredient.name}
                </span>
                <span className={styles['ingredient_amount']}>
                  {ingredient.amount}
                </span>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Ingredients;
