import styles from "./styles.module.css";
import recipeBook from "./assets/recipe-book.png";
import { useState } from "react";

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("https://oyster-app-osg6d.ondigitalocean.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: userPrompt }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={recipeBook} className={styles.icon} alt="Recipe Book" />
      <h3>RecipeGPT</h3>
      <h2>Please enter ingredients separated by commas</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="What's in your pantry?"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <input type="submit" value="Generate Recipes" />
      </form>
      <h4>{sqlQuery}</h4>
      <h5>Made by Jonathan Myers</h5>
      <a href="https://www.flaticon.com/free-icons/recipe" title="recipe icons">Recipe icons created by Freepik - Flaticon</a>
    </main>
  );
}
