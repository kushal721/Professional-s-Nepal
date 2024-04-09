import React, { useEffect, useState } from "react";
import NavbarComp from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Favorite.css"; // Import CSS file for styling

const Favorite = () => {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState([]);
  console.log("favorite", favorites);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user?.token) return; // Check if user or token is null or undefined

        const response = await fetch(
          "http://localhost:4000/api/favorites/getAllFavorites",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]); // Fetch favorites when user object changes

  const removeFromFavorites = async (userId, designId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/favorites/removeFavorites",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ userId, designId }), // Send both userId and designId in the request body
        }
      );

      if (response.ok) {
        // Filter out the removed favorite from the state
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (favorite) =>
              favorite.userId !== userId || favorite.designId !== designId
          )
        );
        console.log("Favorite removed successfully");
        alert("Favorite removed successfully");
      } else {
        console.error("Failed to remove favorite");
        alert("Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      <NavbarComp />
      <div className="favorite-container">
        <h1 className="favorite-heading">Favorite Designs</h1>
        <ul className="favorite-list">
          {favorites.map((favorite) => (
            <li key={favorite._id} className="favorite-item">
              <div className="profe-img-container">
                <img src="/r1.png" alt="Design photo" />
              </div>
              <div className="desc">
                <h3 className="design-name">{favorite.design?.designName}</h3>
                <p className="design-detail">Area: {favorite.design?.area}</p>
                <p className="design-detail">
                  Estimate Cost: {favorite.design?.estimateCost}
                </p>
                <p className="design-detail">
                  Rating: ★ {favorite.design?.rating}
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() =>
                  removeFromFavorites(favorite.userId, favorite.designId)
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorite;
