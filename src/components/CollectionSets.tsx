import React from "react";

import { useParams } from "react-router-dom";

interface ParamTypes {
  year: string;
}

const CollectionSets: React.FC = () => {
  const { year } = useParams();

  return <div>All sets for the year{year}</div>;
};

export default CollectionSets;
