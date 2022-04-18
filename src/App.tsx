import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import Navbar from "./components/navbar/Navbar";
import { Collection, PageNotFound, Admin } from "./components/Views";
import Transactions from "./components/transactions/Transactions";
import Browse from "./components/browse/Browse";
import Login from "./components/login/Login";
import SetPage from "./components/Collection/set_page/SetPage";
import SubsetPage from "./components/Collection/subset_page/SubsetPage";
import Profile from "./components/profile/Profile";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const user = useSelector((state: RootState) => state.user.userData);
  const userFetched = useSelector((state: RootState) => state.user.userFetched);

  return (
    <AppContainer>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        {userFetched &&
          (user.id === 0 ? (
            <Login />
          ) : (
            <Routes>
              {user.isAdmin && <Route path="/admin/*" element={<Admin />} />}
              <Route path="/" element={<Collection />} />
              <Route path="collection/*" element={<Collection />} />
              <Route path="set/:setId" element={<SetPage />} />
              <Route path="subset/:subsetId" element={<SubsetPage />} />
              <Route path="browse/*" element={<Browse />} />
              <Route path="transactions/*" element={<Transactions />} />
              <Route path="profile/*" element={<Profile />} />
              <Route path="404" element={<PageNotFound />} />
              <Route element={<PageNotFound />} />
            </Routes>
          ))}
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
