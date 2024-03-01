import React, { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import RecipeList from '@/components/RecipeList';
import EditorPanel from '@/components/EditorPanel';

const recipesKey = import.meta.env.VITE_RECIPES_KEY;
const selectedRecipeIDKey = import.meta.env.VITE_SELECTED_RECIPE_ID_KEY;
const lastSelectedRecipeIDKey = import.meta.env
  .VITE_LAST_SELECTED_RECIPE_ID_KEY;

const sampleRecipes = [
  {
    id: uuidV4(),
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '2:45',
    instructions: ['Put salt on Chicken', 'Put chicken in oven', 'Eat chicken'],
    ingredients: [
      {
        id: uuidV4(),
        name: 'Chicken',
        amount: '2 Pounds',
      },
      {
        id: uuidV4(),
        name: 'Salt',
        amount: '1 Tbs',
      },
    ],
  },
  {
    id: uuidV4(),
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: ['Put paprika on Pork', 'Put pork in oven', 'Eat pork'],
    ingredients: [
      {
        id: uuidV4(),
        name: 'Pork',
        amount: '2 Pounds',
      },
      {
        id: uuidV4(),
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ],
  },
  {
    id: uuidV4(),
    name: 'Plain Apple Pai',
    servings: 10,
    cookTime: '3:45',
    instructions: ['Put apples in pie', 'Put pie in oven', 'Eat pie'],
    ingredients: [
      {
        id: uuidV4(),
        name: 'Pork',
        amount: '2 Pounds',
      },
      {
        id: uuidV4(),
        name: 'Paprika',
        amount: '2 Tbs',
      },
    ],
  },
];

const App = () => {
  const [recipes, setRecipes] = useState(() => {
    const localData = localStorage.getItem(recipesKey);
    return localData ? JSON.parse(localData) : sampleRecipes;
  });
  React.useEffect(() => {
    localStorage.setItem(recipesKey, JSON.stringify(recipes));
  }, [recipes]);

  const [selectedRecipeID, setSelectedRecipe] = useState(() => {
    const localData = localStorage.getItem(selectedRecipeIDKey);
    return localData ? JSON.parse(localData) : null;
  });
  useEffect(() => {
    localStorage.setItem(selectedRecipeIDKey, JSON.stringify(selectedRecipeID));
  }, [selectedRecipeID]);

  const [lastSelectedRecipeID, setLastSelectedRecipeID] = useState(() => {
    const localData = localStorage.getItem(lastSelectedRecipeIDKey);
    return localData ? JSON.parse(localData) : null;
  });
  useEffect(() => {
    localStorage.setItem(
      lastSelectedRecipeIDKey,
      JSON.stringify(lastSelectedRecipeID)
    );
  }, [lastSelectedRecipeID]);

  function selectRecipe() {
    return recipes.find((recipe) => recipe.id === selectedRecipeID);
  }

  function styleLastSelection(id) {
    if (!selectedRecipeID && id === lastSelectedRecipeID) {
      setLastSelectedRecipeID(null);
    }

    if (selectedRecipeID && id !== selectedRecipeID) {
      setLastSelectedRecipeID(selectedRecipeID);
    }
    setSelectedRecipe(id);
  }

  function addRecipe(id) {
    const newRecipe = {
      id: uuidV4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: ['New Instruction 1', 'New Instruction 2'],
      ingredients: [
        {
          id: uuidV4(),
          name: 'New Ingredient',
          amount: '1 Tbs',
        },
      ],
    };
    styleLastSelection(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function deleteRecipe(id) {
    if (selectedRecipeID != null && selectedRecipeID === id) {
      setSelectedRecipe(null);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function editRecipe(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  return (
    <>
      <RecipeList
        recipes={recipes}
        selectedRecipeID={selectedRecipeID}
        lastSelectedRecipeID={lastSelectedRecipeID}
        styleLastSelection={styleLastSelection}
        addRecipe={addRecipe}
        deleteRecipe={deleteRecipe}
      />
      {selectedRecipeID && (
        <EditorPanel
          selectRecipe={selectRecipe}
          styleLastSelection={styleLastSelection}
          editRecipe={editRecipe}
        />
      )}
    </>
  );
};

export default App;
