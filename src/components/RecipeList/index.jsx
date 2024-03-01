import { classNameStyled } from '@/utils';
import styles from './index.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Header from '@/components/RecipeList/Header';
import Content from '@/components/RecipeList/Content';

const RecipeList = (props) => {
  const {
    recipes,
    selectedRecipeID,
    lastSelectedRecipeID,
    styleLastSelection,
    addRecipe,
    deleteRecipe,
    recipeListClassNames,
  } = props;

  const classNames = classNameStyled(recipeListClassNames, styles, 'container');

  const [newRecipe, setNewRecipe] = useState(false); // scrollIntoView
  const ref = useRef();
  const addRecipeThenScrollIntoView = () => {
    addRecipe();
    setNewRecipe(true);
  };

  useEffect(() => {
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
              lastSelectedRecipeID={lastSelectedRecipeID}
              styleLastSelection={styleLastSelection}
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
    styleLastSelection,
    deleteRecipe,
    ...rest
  } = props;

  const [ifSelected, setSelectedStyling] = useState(false);
  const [ifLastSelected, setLastSelectedStyling] = useState(false);
  const [recipeClassNameList, setRecipeClassNameList] = useState(['recipe']);
  const [recipeClassNames, setRecipeClassNames] = useState();

  function addClassName(className) {
    removeClassName(className);
    setRecipeClassNameList((list) => [...list, className]);
  }

  function removeClassName(className) {
    setRecipeClassNameList((list) => list.filter((name) => name !== className));
  }

  useEffect(() => {
    ifSelected ? addClassName('selected') : removeClassName('selected');
  }, [ifSelected]);

  useEffect(() => {
    ifLastSelected
      ? addClassName('last-selected')
      : removeClassName('last-selected');
  }, [ifLastSelected]);

  useEffect(() => {
    id === selectedRecipeID
      ? setSelectedStyling(true)
      : setSelectedStyling(false);
  }, [id, selectedRecipeID]);

  useEffect(() => {
    id === lastSelectedRecipeID
      ? setLastSelectedStyling(true)
      : setLastSelectedStyling(false);
  }, [id, lastSelectedRecipeID]);

  useEffect(() => {
    setRecipeClassNames(
      classNameStyled(className, styles, recipeClassNameList.join(' '))
    );
  }, [recipeClassNameList]);

  return (
    <div className={styles['recipe_container']}>
      <div
        className={recipeClassNames}
        onClick={() => {
          styleLastSelection(id);
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
