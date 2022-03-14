import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import * as Styled from "./styled";
import createCrumbs, {
  createSetCrumbs,
  createSubsetCrumbs,
  createAdminSetCrumbs,
  createAdminSubsetCrumbs,
  createAdminSeriesCrumbs,
  Crumb,
} from "./createCrumbs";

export default function Breadcrumbs() {
  const location = useLocation();

  const [pageNames, setPageNames] = useState<string[]>([]);

  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([]);

  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);
  const series = useSelector((state: RootState) => state.library.series.series);

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
      case "admin":
        if (pageNames.length > 1) {
          switch (pageNames[1]) {
            case "set":
              if (+pageNames[2] === set.id)
                setBreadcrumbs(createAdminSetCrumbs(set));
              break;
            case "subset":
              if (+pageNames[2] === subset.id)
                setBreadcrumbs(createAdminSubsetCrumbs(subset));
              break;
            case "series":
              if (+pageNames[2] === series.id)
                setBreadcrumbs(createAdminSeriesCrumbs(series));
              break;
          }
        } else {
          setBreadcrumbs([
            {
              link: "/admin",
              title: "Admin",
            },
          ]);
        }
        break;
      default:
        setBreadcrumbs(createCrumbs(pageNames));
        break;
    }
  }, [set, subset, series, pageNames, location]);

  return (
    <Styled.BreadcrumbsContainer>
      {breadcrumbs.length > 1 &&
        breadcrumbs.map((crumb, index) => {
          return (
            <React.Fragment key={crumb.link}>
              {index !== 0 && <span style={{ color: "gray" }}>{` / `}</span>}
              {index !== breadcrumbs.length - 1 ? (
                <Styled.BreadcrumbLink to={crumb.link}>
                  {crumb.title}
                </Styled.BreadcrumbLink>
              ) : (
                <span style={{ color: "gray" }}>{crumb.title}</span>
              )}
            </React.Fragment>
          );
        })}
    </Styled.BreadcrumbsContainer>
  );
}
