const form = document.getElementById("search-form");
const recipesList = document.getElementById("recipes-list");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Зчитуємо введені інгредієнти
  const ingredients = document.getElementById("ingredients").value.split(",");
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
    ","
  )}&number=5&apiKey=99f0a760ddb34cf6904d0517fb9cfd7a`;

  try {
    const response = await fetch(apiUrl);
    const recipes = await response.json();

    // Додаємо рецепти до списку
    recipesList.innerHTML = recipes
      .map(
        (recipe) =>
          `<li>
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <a href="https://spoonacular.com/recipes/${recipe.title
              .replace(/\s+/g, "-")
              .toLowerCase()}-${
            recipe.id
          }" target="_blank">Переглянути рецепт</a>
          </li>`
      )
      .join("");
  } catch (error) {
    recipesList.innerHTML =
      "<li>Сталася помилка при завантаженні рецептів.</li>";
  }
});
