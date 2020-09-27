import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {}

export default function SubsetHeader(props: any) {
  const librarySubset = useSelector((state: RootState) => state.library.subset);

  return (
    <div className="subset-header">
      <label htmlFor="cars">Filter by parallel series:</label>
      <select id="cars" name="cars" onChange={props.handleSeries}>
        <option value={0}>Show All</option>
        {librarySubset.series.map((series) => {
          return (
            <option key={series.id} value={series.id}>
              {series.name}
            </option>
          );
        })}
      </select>
      {props.selectedSeriesId !== 0 && (
        <button onClick={props.handleShowAll}>
          {props.showAllCards ? "Hide Missing Cards" : "Show Missing Cards"}
        </button>
      )}
    </div>
  );
}
