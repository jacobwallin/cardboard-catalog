import React, { useEffect } from "react";

import YearCard from "./YearCard";

const dummyData = [
  { year: 2017, cardCount: 102 },
  { year: 2018, cardCount: 655 },
  { year: 2019, cardCount: 99 },
  { year: 2020, cardCount: 402 },
];

const CollectionYears = () => {
  useEffect(() => {
    // dipatch thunk for getting cards by year
  }, []);

  return (
    <div>
      {dummyData.map((yearData) => {
        return <YearCard key={yearData.year} yearData={yearData} />;
      })}
    </div>
  );
};

export default CollectionYears;
