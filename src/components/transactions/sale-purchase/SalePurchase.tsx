import React, { useState } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Step from "../shared/transaction-step/Step";
import { StepContainer } from "../shared/transaction-step/styled";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm, { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import SalePurchaseForm from "./sale-purchase-form/SalePurchaseForm";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import { FormData } from "./sale-purchase-form/SalePurchaseForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { PageContainer } from "./styled";
import SelectedCards from "../select-cards-form/selected-cards/SelectedCards";
import { SelectedCardsTitle } from "../shared/SelectedCardsTitle";
const addTradeStatusSelector = createStatusSelector("ADD_TRANSACTION");

interface Props {
  transactionType: "SALE" | "PURCHASE";
}

export default function SalePurchase(props: Props) {
  const { transactionType } = props;
  const dispatch = useDispatch();
  // track current step of sale or purchase data entry use is on
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCards, setSelectedCards] = useState<CardFormData[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<CardData[]>([]);
  const [transactionSubmitted, setTransactionSubmitted] =
    useState<boolean>(false);

  const addTransactionStatus = useSelector((state: RootState) =>
    addTradeStatusSelector(state)
  );

  function returnToPreviousStep(stepNumber: number) {
    setCurrentStep(stepNumber);
  }

  function handleSoldCardsChange(selectedCards: CardFormData[]) {
    setSelectedCards(selectedCards);
  }

  function submitSoldCards(cardData: CardData[]) {
    setSelectedCardData(cardData);
    setCurrentStep(2);
  }

  function submitSale(transactionDetails: FormData) {
    // step 2 will be shown as completed
    setCurrentStep(3);

    if (transactionType === "SALE") {
      dispatch(
        addTransaction(
          {
            type: "SALE",
            ...transactionDetails,
            userCardsRemoved: selectedCards.map((userCard) => userCard.cardId),
          },
          false
        )
      );
    } else {
      dispatch(
        addTransaction(
          {
            type: "PURCHASE",
            ...transactionDetails,
            cardsAdded: selectedCardData,
          },
          false
        )
      );
    }

    setTransactionSubmitted(true);
  }

  // redirect to transaction page once sale or purchase is successfully created
  if (addTransactionStatus === "SUCCESS" && transactionSubmitted) {
    return <Redirect to="/transactions" />;
  }

  return (
    <>
      <TransactionsHeader
        title={transactionType === "SALE" ? "Enter Sale" : "Enter Purchase"}
      />
      <StepContainer>
        <Step
          currentStepNumber={currentStep}
          number={1}
          title={transactionType === "SALE" ? "Cards Sold" : "Cards Purchased"}
          returnToStep={returnToPreviousStep}
        />
        <Step
          currentStepNumber={currentStep}
          number={2}
          title="Submit"
          returnToStep={returnToPreviousStep}
        />
      </StepContainer>

      {currentStep === 1 &&
        (transactionType === "SALE" ? (
          <AddCardsForm
            selectFrom="COLLECTION"
            cardData={selectedCards}
            setCardData={handleSoldCardsChange}
            submit={submitSoldCards}
            title="Select Cards Sold"
            canEditSelectedCards={false}
          />
        ) : (
          <AddCardsForm
            selectFrom="DATABASE"
            cardData={selectedCards}
            setCardData={handleSoldCardsChange}
            submit={submitSoldCards}
            title="Select Cards Purchased"
            canEditSelectedCards={false}
          />
        ))}
      {currentStep === 2 && (
        <PageContainer>
          <SalePurchaseForm
            handleSubmit={submitSale}
            transactionType={transactionType}
          />
          <SelectedCardsTitle>
            {transactionType === "SALE" ? "Cards Sold" : "Cards Purchased"}
          </SelectedCardsTitle>
          <SelectedCards cardData={selectedCards} preventGradeChanges={true} />
        </PageContainer>
      )}
    </>
  );
}
