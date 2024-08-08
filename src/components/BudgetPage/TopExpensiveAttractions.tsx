import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Attraction {
  name: string;
  cost: number;
}

interface TopExpensiveAttractionsProps {
  attractions: Attraction[];
}

const TopExpensiveAttractions: React.FC<TopExpensiveAttractionsProps> = ({
  attractions,
}) => {
  return (
    <div className="top-expensive-attractions">
      <h2>Top 5 Expensive Attractions</h2>
      <ul className="top-expensive-list">
        {attractions.map((attraction, index) => (
          <li key={index} className="top-expensive-item">
            {attraction.name}
            <div className="top-expensive-indicator">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopExpensiveAttractions;
