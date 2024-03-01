import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import styles from './index.module.scss';

const Ingredients = (props) => {
  const { ingredients, handleChange, addIngredient, deleteIngredient } = props;

  const [newIngredient, setNewIngredient] = useState(false);
  const ref = useRef();
  const addIngredientThenScrollIntoView = () => {
    addIngredient();
    setNewIngredient(true);
  };
  useEffect(() => {
    if (newIngredient) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      setNewIngredient(false);
    }
  }, [newIngredient]);

  return (
    <div className={styles['ingredients_panel']}>
      <span className={styles['title']}>Ingredients</span>
      <div className={styles['title_item']}>
        <label htmlFor="">Name</label>
        <label htmlFor="">Amount</label>
        <span className={styles['hidden']}>
          <Button className="btn-danger">X</Button>
        </span>
      </div>
      {ingredients &&
        ingredients.map((ingredient, index) => {
          const ingredientID = `ingredient-${index}`;
          return (
            <div key={index} className={styles['panel_item']}>
              <input
                type="text"
                id={ingredientID}
                value={ingredient.name}
                onChange={(e) =>
                  handleChange({
                    ingredients: [
                      ...ingredients.slice(0, index),
                      { ...ingredient, name: e.target.value },
                      ...ingredients.slice(index + 1),
                    ],
                  })
                }
              />
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) =>
                  handleChange({
                    ingredients: [
                      ...ingredients.slice(0, index),
                      { ...ingredient, amount: e.target.value },
                      ...ingredients.slice(index + 1),
                    ],
                  })
                }
              />
              <Button
                className="btn-danger"
                onClick={() => deleteIngredient(index)}
              >
                X
              </Button>
            </div>
          );
        })}
      <div className={styles['add']}>
        <Button
          className="btn-primary"
          onClick={() => addIngredientThenScrollIntoView()}
        >
          Add Ingredient
        </Button>
      </div>
      <div className={styles['the-end']} ref={ref}></div>
    </div>
  );
};

export default Ingredients;
