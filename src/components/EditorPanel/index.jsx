import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import styles from './index.module.scss';
import { v4 as uuidV4 } from 'uuid';
import Instructions from './Instructions';
import Ingredients from './Ingredients';

const EditorPanel = (props) => {
  const { selectRecipe, styleLastSelection, editRecipe } = props;

  const recipe = selectRecipe();
  const { id, name, cookTime, servings, instructions, ingredients } = recipe;

  function handleChange(changes) {
    editRecipe(id, { ...recipe, ...changes });
  }

  function addInstruction() {
    handleChange({
      instructions: [...instructions, ''],
    });
  }

  function addIngredient() {
    handleChange({
      ingredients: [
        ...ingredients,
        {
          id: uuidV4(),
          name: '',
          amount: '',
        },
      ],
    });
  }

  function deleteIngredient(index) {
    handleChange({
      ingredients: ingredients.filter((_, i) => i !== index),
    });
  }

  function deleteInstruction(index) {
    handleChange({
      instructions: instructions.filter((_, i) => i !== index),
    });
  }

  return (
    <div className={styles['container']}>
      <div className={styles['container_header']}>
        <span className={styles['container_title']}>Edit Recipe</span>
        <Button className="btn-danger" onClick={() => styleLastSelection(null)}>
          X
        </Button>
      </div>

      <div className={styles['sample_panel']}>
        <div className={styles['panel_item']}>
          <label htmlFor="editor_name">Name</label>
          <input
            type="text"
            id="editor_name"
            value={name}
            onChange={(e) => handleChange({ name: e.target.value })}
          />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="cook_time">Cook Time</label>
          <input
            type="text"
            id="cook_time"
            value={cookTime}
            onChange={(e) => handleChange({ cookTime: e.target.value })}
          />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="servings">Servings</label>
          <input
            type="text"
            id="servings"
            value={servings}
            onChange={(e) => handleChange({ servings: e.target.value })}
          />
        </div>

        <Instructions
          instructions={instructions}
          handleChange={handleChange}
          addInstruction={addInstruction}
          deleteInstruction={deleteInstruction}
        />

        <Ingredients
          ingredients={ingredients}
          handleChange={handleChange}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
