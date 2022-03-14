import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import { fetchAllSetData } from "../../store/library/sets/thunks";

import BrowseHeader from "../Collection/header/BrowseHeader";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import SelectYear from "./select_year/SelectYear";
import SelectSet from "./select_set/SelectSet";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Browse() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <BrowseHeader title="Browse Database" />
        <Switch>
          <Route exact path={`${path}`}>
            <SelectYear />
          </Route>
          <Route exact path={`${path}/:year`}>
            <SelectSet />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
