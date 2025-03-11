import List from "../components/List";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../components/Skeleton.css";
import { IndexContext } from "../context/index.context";
import {
  getAllRecipes,
  getAllRecipesOfOneAuthor,
} from "../service/api/recipe.service";

function DashboardPage() {
  const { authorId } = useParams();
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setIndexNumber } = useContext(IndexContext);

  useEffect(() => {
    if (authorId) {
      getAllRecipesOfOneAuthor(authorId).then((response) => {
        setAllRecipes(response.data);
        setIsLoading(false);
      });
    } else {
      getAllRecipes().then((response) => {
        setAllRecipes(response.data);
        setIsLoading(false);
      });
    }
  }, []);

  const setNthChildIndex = (index, isLeftColumn) => {
    if (isLeftColumn) {
      const sequence = [1, 3, 5, 7];
      setIndexNumber(sequence[index % 4]);
    } else {
      const sequence = [2, 4, 6, 8];
      setIndexNumber(sequence[index % 4]);
    }
  };

  return (
    <div className="allRecipeWrapper">
      <div className="grid-container">
        {isLoading ? (
          <div>
            <div className="grid-container">
              <div className="skeleton skeletonRecipeCard"></div>
              <div className="skeleton skeletonRecipeCard"></div>
              <div className="skeleton skeletonRecipeCard"></div>
              <div className="skeleton skeletonRecipeCard"></div>
              <div className="skeleton skeletonRecipeCard"></div>
              <div className="skeleton skeletonRecipeCard"></div>
            </div>
          </div>
        ) : (
          allRecipes && (
            <div className="recipe-columns">
              <div className="left-column">
                {allRecipes
                  .filter((_, index) => index % 2 === 0)
                  .map((recipe, index) => (
                    <div
                      key={recipe._id}
                      className={`findTheChild nth-of-type-${(index % 4) + 1}`}
                    >
                      <Link
                        to={`/user/${recipe.author._id}/recipes/${recipe._id}`}
                        className="listItem-link"
                        onClick={() => setNthChildIndex(index, true)}
                      >
                        <List recipe={recipe} className="listItem-container" />
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="right-column">
                {allRecipes
                  .filter((_, index) => index % 2 === 1)
                  .map((recipe, index) => (
                    <div
                      key={recipe._id}
                      className={`findTheChild nth-of-type-${(index % 4) + 1}`}
                    >
                      <Link
                        to={`/user/${recipe.author._id}/recipes/${recipe._id}`}
                        className="listItem-link"
                        onClick={() => setNthChildIndex(index, false)}
                      >
                        <List recipe={recipe} className="listItem-container" />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
