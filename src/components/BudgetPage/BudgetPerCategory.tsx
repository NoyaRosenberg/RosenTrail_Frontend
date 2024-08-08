import React from "react";

interface BudgetItem {
  category: string;
  amount: number;
}

interface BudgetPerCategoryProps {
  categories: BudgetItem[];
}

const BudgetPerCategory: React.FC<BudgetPerCategoryProps> = ({
  categories,
}) => {
  return (
    <div className="budget-per-category">
      <h2>Budget Per Category</h2>
      <div className="budget-sliders">
        {categories.map((item, index) => (
          <div key={index} className="slider-container">
            <span>{item.category}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={item.amount}
              className={`slider color-${index + 1}`}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPerCategory;
