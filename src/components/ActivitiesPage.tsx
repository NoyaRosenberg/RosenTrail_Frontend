import { SetStateAction, useState } from "react";
import "../styles/EditTrip.css";

const ActivitiesPage = () => {
  const [city, setCity] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState([
    {
      name: "Central Park",
      description: "Most visited urban park in the United States",
      image: "IMG_0316.jpeg",
    },
    {
      name: "Bryant Park",
      description: "Relax, play, eat",
      image: "IMG_0037.jpeg",
    },
    {
      name: "Roof Top Bar",
      description: "Eat and enjoy the view",
      image: "IMG_0129.jpeg",
    },
    {
      name: "Vessel",
      description: "Landmark in New York",
      image: "IMG_9899.jpeg",
    },
    {
      name: "Pizza Place",
      description: "Best pizza in town",
      image: "IMG_0048.jpeg",
    },
    {
      name: "Grand Central",
      description: "Historic train station",
      image: "IMG_9957.jpeg",
    },
    {
      name: "Skyline View",
      description: "Beautiful cityscape",
      image: "IMG_9880.jpeg",
    },
  ]);

  const handleCityChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCity(e.target.value);
  };

  const toggleActivity = (activity: string) => {
    setActivities((prev: string[]) =>
      prev.includes(activity)
        ? prev.filter((a: string) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSearch = () => {
    console.log("Searching for:", city, activities);
    setRecommendations([]);
    // Perform search and update recommendations
  };

  return (
    <div className="edit-trip-container">
      <div className="edit-trip-header">
        <h1>Wonderplan</h1>
        <h3 className="community-trips-link">Community trips</h3>
      </div>
      <div className="search-section">
        <h2>Search For Attractions In New York:</h2>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleCityChange}
        />
        <div className="activities">
          <button
            onClick={() => toggleActivity("Junk Food")}
            className={activities.includes("Junk Food") ? "active" : ""}
          >
            Junk Food
          </button>
          <button
            onClick={() => toggleActivity("Museums & Theatres")}
            className={
              activities.includes("Museums & Theatres") ? "active" : ""
            }
          >
            Museums & Theatres
          </button>
          <button
            onClick={() => toggleActivity("Fancy Restaurants")}
            className={activities.includes("Fancy Restaurants") ? "active" : ""}
          >
            Fancy Restaurants
          </button>
          <button
            onClick={() => toggleActivity("View Buildings")}
            className={activities.includes("View Buildings") ? "active" : ""}
          >
            View Buildings
          </button>
          <button
            onClick={() => toggleActivity("Art & Cultural")}
            className={activities.includes("Art & Cultural") ? "active" : ""}
          >
            Art & Cultural
          </button>
          <button
            onClick={() => toggleActivity("Kid Friendly")}
            className={activities.includes("Kid Friendly") ? "active" : ""}
          >
            Kid Friendly
          </button>
          <button
            onClick={() => toggleActivity("Amusement Parks")}
            className={activities.includes("Amusement Parks") ? "active" : ""}
          >
            Amusement Parks
          </button>
          <button
            onClick={() => toggleActivity("Outdoor Walks")}
            className={activities.includes("Outdoor Walks") ? "active" : ""}
          >
            Outdoor Walks
          </button>
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="recommendations-section">
        <h3>Recommendations For Attractions:</h3>
        <p>By clicking on one, you can add it to your trip</p>
        <div className="recommendations">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <img src={`/public/${rec.image}`} alt={rec.name} />
              <h4>{rec.name}</h4>
              <p>{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
