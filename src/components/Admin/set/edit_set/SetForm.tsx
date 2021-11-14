import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import detectFormChanges from "../../detectFormChanges";

import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";
import FormContainer from "../../components/form/FormContainer";

import { createLoadingSelector } from "../../../../store/loading/reducer";

const updatingSetSelector = createLoadingSelector(["UPDATE_SET", "CREATE_SET"]);

const loadingSelector = createLoadingSelector([
  "GET_ALL_LEAGUES",
  "GET_ALL_BRANDS",
]);

interface Props {
  createNew: boolean;
  handleCancel(): void;
  handleSubmit(
    name: string,
    release_date: string | null,
    year: number,
    description: string,
    leagueId: number,
    brandId: number,
    complete: boolean
  ): void;
}

export default function SetForm(props: Props) {
  const singleSet = useSelector((state: RootState) => state.library.sets.set);
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
  const [name, setName] = useState(props.createNew ? "" : singleSet.name);
  const [year, setYear] = useState(
    props.createNew ? "" : String(singleSet.year)
  );
  const [releaseDate, setReleaseDate] = useState(
    props.createNew ? "" : singleSet.release_date || ""
  );
  const [complete, setComplete] = useState(
    props.createNew ? false : singleSet.complete
  );
  const [brandId, setBrandId] = useState(
    props.createNew ? 0 : singleSet.brand.id
  );
  const [leagueId, setLeagueId] = useState(
    props.createNew ? 0 : singleSet.league.id
  );
  const [description, setDescription] = useState(
    props.createNew ? "" : singleSet.description
  );

  function handleSubmit() {
    props.handleSubmit(
      name,
      releaseDate === "" ? null : releaseDate,
      +year,
      description,
      leagueId,
      brandId,
      complete
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
      case "releaseDate":
        setReleaseDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "complete":
        setComplete(!complete);
        break;
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
    }
  }

  return (
    <FormContainer>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
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
        <FieldTitle>Year:</FieldTitle>
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
        <FieldTitle>Release Date</FieldTitle>
        <FieldData>
          <input
            name="releaseDate"
            type="date"
            value={releaseDate}
            placeholder=""
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Brand</FieldTitle>
        <FieldData>
          <select
            name="brand"
            value={brandId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            <option value={0}>Select Brand</option>
            {brands
              .sort((brandA, brandB) => {
                if (brandA.name < brandB.name) return -1;
                if (brandA.name > brandB.name) return 1;
                return 0;
              })
              .map((brand) => {
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
        <FieldTitle>League</FieldTitle>
        <FieldData>
          <select
            name="league"
            value={leagueId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            <option value={0}>Select League</option>
            {leagues
              .sort((leagueA, leagueB) => {
                if (leagueA.name < leagueB.name) return -1;
                if (leagueA.name > leagueB.name) return 1;
                return 0;
              })
              .map((league) => {
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
        <FieldTitle>Description</FieldTitle>
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
      {!props.createNew && (
        <FieldContainer>
          <FieldTitle>Completed</FieldTitle>
          <FieldData>
            <input
              type="checkbox"
              name="complete"
              checked={complete}
              onChange={handleInputChange}
            />
          </FieldData>
        </FieldContainer>
      )}
      <FormButtons
        handleCancel={props.handleCancel}
        handleSubmit={handleSubmit}
        disabled={
          updatingSet ||
          (props.createNew
            ? name === "" || brandId === 0 || leagueId === 0 || year === ""
            : !detectFormChanges(
                [
                  singleSet.name,
                  singleSet.description,
                  singleSet.league.id,
                  singleSet.brand.id,
                  singleSet.release_date,
                ],
                [name, description, leagueId, brandId, releaseDate]
              ))
        }
      />
      {}
    </FormContainer>
  );
}
