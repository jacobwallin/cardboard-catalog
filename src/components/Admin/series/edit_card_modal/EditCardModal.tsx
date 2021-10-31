import React from "react";
import { useDispatch } from "react-redux";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";

export default function EditCardModal() {
  const dispatch = useDispatch();

  function updateCard() {
    // dispatch update card
  }

  return (
    <ModalBackground>
      <ModalWindow>We are editing!</ModalWindow>
    </ModalBackground>
  );
}
