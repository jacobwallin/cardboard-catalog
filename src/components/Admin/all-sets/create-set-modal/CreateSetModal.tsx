import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ModalBackground from "../../components/modal/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import ModalButtons from "../../components/modal/ModalButtons";
import InputContainer from "../../components/modal/InputContainer";
import StyledLabel from "../../components/modal/StyledLabel";
import StyledTextInput from "../../components/modal/StyledTextInput";
import StyledTextArea from "../../components/modal/StyledTextArea";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import { fetchLeagues } from "../../../../store/library/leagues/thunks";
import { fetchBrands } from "../../../../store/library/brands/thunks";
import { createSet } from "../../../../store/library/sets/thunks";

const createSetSelector = createLoadingSelector(["CREATE_SET"]);

interface Props {
  handleCancel(): void;
}

export default function CreateSetModal(props: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
    dispatch(fetchBrands());
  }, []);

  const createSetLoading = useSelector((state: RootState) =>
    createSetSelector(state)
  );

  const leagues = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const brands = useSelector(
    (state: RootState) => state.library.brands.allBrands
  );

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [leagueId, setLeagueId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  function handleTextInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        break;
      case "year":
        setYear(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.id) {
      case "leagueId":
        setLeagueId(+event.target.value);
        break;
      case "brandId":
        setBrandId(+event.target.value);
        break;
    }
  }

  function handleSubmit() {
    // dispatch thunk to create set
    dispatch(createSet({ name, year: +year, description, leagueId, brandId }));
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <InputContainer>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledTextInput
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={handleTextInputChange}
            disabled={createSetLoading}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="year">Year</StyledLabel>
          <StyledTextInput
            name="year"
            id="year"
            type="number"
            value={year}
            onChange={handleTextInputChange}
            disabled={createSetLoading}
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="description">Description</StyledLabel>
          <StyledTextArea
            name="description"
            id="description"
            value={description}
            disabled={createSetLoading}
            onChange={handleTextInputChange}
            style={{ height: "120px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </InputContainer>
        <InputContainer>
          <select id="leagueId" value={leagueId} onChange={handleSelectChange}>
            <option value={0}>Select League</option>
            {leagues.map((league) => {
              return (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              );
            })}
          </select>
        </InputContainer>
        <InputContainer>
          <select id="brandId" value={brandId} onChange={handleSelectChange}>
            <option value={0}>Select Brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        </InputContainer>
        <ModalButtons
          disabled={false}
          handleSubmit={handleSubmit}
          handleCancel={props.handleCancel}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
