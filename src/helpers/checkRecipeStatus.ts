export const checkAndUpdateRecipeStatus = (type:string, id:string) => {
  const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = inProgressRecipesJSON && JSON.parse(inProgressRecipesJSON);
  if (inProgressRecipes[type]
      && inProgressRecipes[type][id]) {
    return true;
  }
};
