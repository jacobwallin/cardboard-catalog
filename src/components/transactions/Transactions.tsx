import React from "react";
import { Routes, Route } from "react-router-dom";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Main from "./main/Main";
import AddCards from "./add/AddCards";
import RemoveCards from "./remove/RemoveCards";
import Trade from "./trade/Trade";
import SalePurchase from "./sale-purchase/SalePurchase";
import ViewTransaction from "./view/ViewTransaction";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="add" element={<AddCards />} />
          <Route path="remove" element={<RemoveCards />} />
          <Route path="trade" element={<Trade />} />
          <Route
            path="sale"
            element={<SalePurchase transactionType="SALE" />}
          />
          <Route
            path="purchase"
            element={<SalePurchase transactionType="PURCHASE" />}
          />
          <Route path=":transactionId" element={<ViewTransaction />} />
        </Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
