import React from "react";

interface Props {
  count: number;
  sort: string;
  sortProducts: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<Props> = ({ count, sort, sortProducts }) => {
  return (
    <div className="filter">
      <div className="filter-result">{count} Products</div>
      <div className="filter-sort">
        Order{" "}
        <select value={sort} onChange={sortProducts}>
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
