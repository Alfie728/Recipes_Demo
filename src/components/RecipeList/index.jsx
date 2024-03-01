import { classNameStyled } from '@/utils';
import styles from './index.module.scss';
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Header from '@/components/RecipeList/Header';
import Content from '@/components/RecipeList/Content';

const RecipeList = (props) => {
  const {
    recipes,
    selectedRecipeID,
    lastSelectedRecipeID,
    trackRecipeSelection,
    addRecipe,
    deleteRecipe,
    recipeListClassNames,
  } = props;

  const classNames = classNameStyled(recipeListClassNames, styles, 'container');

  const [newRecipe, setNewRecipe] = React.useState(false); // scrollIntoView
  const ref = React.useRef();
  const addRecipeThenScrollIntoView = () => {
    addRecipe();
    setNewRecipe(true);
  };

  React.useEffect(() => {
    if (newRecipe) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      });
      setNewRecipe(false);
    }
  }, [newRecipe]);

  return (
    <div className={classNames}>
      <div className={styles['title']}>Alfie's Recipe Book</div>
      <div className={styles['add']}>
        <Button
          className={'btn-big'}
          onClick={() => {
            addRecipeThenScrollIntoView();
          }}
        >
          Add Recipe
        </Button>
      </div>

      <div>
        {recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              {...recipe}
              className={styles['recipe']}
              selectedRecipeID={selectedRecipeID}
              trackRecipeSelection={trackRecipeSelection}
              lastSelectedRecipeID={lastSelectedRecipeID}
              deleteRecipe={deleteRecipe}
            />
          );
        })}
      </div>

      <div className={styles['add']}>
        <Button
          className={'btn-big'}
          onClick={() => {
            addRecipeThenScrollIntoView();
          }}
        >
          Add Recipe
        </Button>
      </div>
      <div className={styles['the-end']} ref={ref}></div>
    </div>
  );
};

const Recipe = (props) => {
  const {
    id,
    name,
    servings,
    cookTime,
    instructions,
    ingredients,
    className,
    selectedRecipeID,
    lastSelectedRecipeID,
    trackRecipeSelection,
    deleteRecipe,
    ...rest
  } = props;

  const [selected, setSelected] = useState(false);
  const [lastSelected, setLastSelected] = useState(false);
  const [recipeClassName, setRecipeClassName] = useState();
  const [recipeClassNameList, setRecipeClassNameList] = useState(['recipe']);

  function addClassName(className) {
    removeClassName(className);
    setRecipeClassNameList((list) => [...list, className]);
  }

  function removeClassName(className) {
    setRecipeClassNameList((list) => list.filter((name) => name !== className));
  }

  useEffect(() => {
    selected ? addClassName('selected') : removeClassName('selected');
  }, [selected]);

  useEffect(() => {
    lastSelected
      ? addClassName('last-selected')
      : removeClassName('last-selected');
  }, [lastSelected]);

  useEffect(() => {
    id === selectedRecipeID ? setSelected(true) : setSelected(false);
  }, [id, selectedRecipeID]);

  useEffect(() => {
    id === lastSelectedRecipeID
      ? setLastSelected(true)
      : setLastSelected(false);
  }, [id, lastSelectedRecipeID]);

  useEffect(() => {
    setRecipeClassName(
      classNameStyled(className, styles, recipeClassNameList.join(' '))
    );
  }, [recipeClassNameList]);

  return (
    <div className={styles['recipe_container']}>
      <div
        className={recipeClassName}
        onClick={() => {
          trackRecipeSelection(id);
        }}
      >
        <Header header_info={name} id={id} deleteRecipe={deleteRecipe} />
        <Content
          cookTime={cookTime}
          servings={servings}
          instructions={instructions}
          ingredients={ingredients}
        />
      </div>
    </div>
  );
};

export default RecipeList;
