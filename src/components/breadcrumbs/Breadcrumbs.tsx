import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import * as Styled from "./styled";
import createCrumbs, {
  createSetCrumbs,
  createSubsetCrumbs,
} from "./createCrumbs";

interface Crumb {
  link: string;
  title: string;
}

export default function Breadcrumbs() {
  const location = useLocation();

  const [pageNames, setPageNames] = useState<string[]>([]);

  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([]);

  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);

  useEffect(() => {
    setPageNames(location.pathname.split(/[/]/).slice(1));
  }, [location]);

  useEffect(() => {
    switch (pageNames[0]) {
      case "set":
        if (+pageNames[1] === set.id) {
          setBreadcrumbs(createSetCrumbs(set, location.search));
        }
        break;
      case "subset":
        if (+pageNames[1] === subset.id) {
          setBreadcrumbs(createSubsetCrumbs(subset, location.search));
        }
        break;
      default:
        setBreadcrumbs(createCrumbs(pageNames));
        break;
    }
  }, [set, subset, pageNames, location]);

  return (
    <Styled.BreadcrumbsContainer>
      {breadcrumbs.length > 1 &&
        breadcrumbs.map((crumb, index) => {
          return (
            <>
              {index !== 0 && <span style={{ color: "gray" }}>{` / `}</span>}
              {index !== breadcrumbs.length - 1 ? (
                <Styled.BreadcrumbLink to={crumb.link}>
                  {crumb.title}
                </Styled.BreadcrumbLink>
              ) : (
                <span style={{ color: "gray" }}>{crumb.title}</span>
              )}
            </>
          );
        })}
    </Styled.BreadcrumbsContainer>
  );
}
