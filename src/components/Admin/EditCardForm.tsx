import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import detectFormChanges from "../../utils/detectFormChanges";
import {
  EditFormLine,
  EditFormContainer,
  EditFormButtons,
} from "./components/EditForm";

interface Props {
  cardId: number;
}

export default function EditCardForm(props: Props) {
  const dispatch = useDispatch();

  const card = useSelector(
    (state: RootState) =>
      state.library.subsets.singleSubset.series[0].cards.find(
        (card) => card.cardDataId === props.cardId
      )!
  );

  const [isEditing, setIsEditing] = useState(false);
  const [nameField, setNameField] = useState(card.card_datum.name);
  const [numberField, setNumberField] = useState(card.card_datum.number);

  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "nameField":
        setNameField(event.target.value);
        break;
      case "numberField":
        setNumberField(event.target.value);
        break;
    }
  }

  return (
    <div>
      <EditFormContainer>
        <EditFormLine
          title="Card Name: "
          data={card.card_datum.name}
          editing={isEditing}
          input={
            <input
              name="nameField"
              type="text"
              value={nameField}
              // disabled={isUpdating}
              placeholder="Enter Set Name"
              onChange={handleInputChange}
            />
          }
        />
        <EditFormButtons
          isEditing={isEditing}
          isUpdating={false}
          handleEditStateChange={handleEditStateChange}
          handleFormSubmit={() => {
            return;
          }}
          changesMade={detectFormChanges(
            [nameField, numberField],
            [card.card_datum.name, card.card_datum.number]
          )}
        />
      </EditFormContainer>
    </div>
  );
}
