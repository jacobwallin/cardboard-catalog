import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import detectFormChanges from "../../detectFormChanges";

import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import FormButtons from "../../components/form/FormButtons";

import { createLoadingSelector } from "../../../../store/loading/reducer";

const updatingSetSelector = createLoadingSelector(["UPDATE_SET"]);

const loadingSelector = createLoadingSelector([
  "GET_ALL_LEAGUES",
  "GET_ALL_BRANDS",
]);

interface Props {
  createNew: boolean;
  handleCancel(): void;
  handleSubmit(
    name: string,
    year: number,
    description: string,
    leagueId: number,
    brandId: number,
    baseSubsetId: number | null
  ): void;
}

export default function SetForm(props: Props) {
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );
  const brands = useSelector(
    (state: RootState) => state.library.brands.allBrands
  );
  const leagues = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const loadingInitialData = useSelector((state: RootState) =>
    loadingSelector(state)
  );
  const updatingSet = useSelector((state: RootState) =>
    updatingSetSelector(state)
  );

  // controlled form data
  const [name, setName] = useState(singleSet.name);
  const [year, setYear] = useState(singleSet.year.toString());
  const [brandId, setBrandId] = useState(singleSet.brand.id);
  const [leagueId, setLeagueId] = useState(singleSet.league.id);
  const [description, setDescription] = useState(singleSet.description);
  const [baseSubsetId, setBaseSubsetId] = useState(singleSet.baseSubsetId || 0);

  function handleSubmit() {
    props.handleSubmit(
      name,
      +year,
      description,
      leagueId,
      brandId,
      baseSubsetId === 0 ? null : baseSubsetId
    );
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "name":
        setName(value);
        break;
      case "year":
        setYear(value);
        break;
      case "description":
        setDescription(value);
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    switch (event.target.name) {
      case "league":
        setLeagueId(+value);
        break;
      case "brand":
        setBrandId(+value);
        break;
      case "baseSubset":
        setBaseSubsetId(+value);
        break;
    }
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Set Name:</FieldTitle>
        <FieldData>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Set Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Set Year:</FieldTitle>
        <FieldData>
          <input
            name="year"
            type="number"
            value={year}
            placeholder="Enter Set Year"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Set Brand:</FieldTitle>
        <FieldData>
          <select
            name="brand"
            value={brandId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Set League:</FieldTitle>
        <FieldData>
          <select
            name="league"
            value={leagueId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            {leagues.map((league) => {
              return (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              );
            })}
          </select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Base Subset:</FieldTitle>
        <FieldData>
          <select
            name="baseSubset"
            value={baseSubsetId}
            onChange={handleSelectChange}
          >
            <option value={0}>Select Base Subset</option>
            {singleSet.subsets.map((subset) => {
              return (
                <option key={subset.id} value={subset.id}>
                  {subset.name}
                </option>
              );
            })}
          </select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Set Description:</FieldTitle>
        <FieldData>
          <textarea
            name="description"
            value={description}
            placeholder="Enter Set Description"
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </FieldData>
      </FieldContainer>
      <FormButtons
        handleCancel={props.handleCancel}
        handleSubmit={handleSubmit}
        disabled={
          updatingSet ||
          (props.createNew
            ? name === "" || year === ""
            : !detectFormChanges(
                [
                  singleSet.name,
                  singleSet.description,
                  singleSet.league.id,
                  singleSet.brand.id,
                  singleSet.year,
                  singleSet.baseSubsetId || 0,
                ],
                [name, description, leagueId, brandId, +year, baseSubsetId]
              ))
        }
      />
      {}
    </>
  );
}
