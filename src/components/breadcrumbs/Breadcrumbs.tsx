import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link, useLocation } from "react-router-dom";
import * as Styled from "./styled";

interface Crumb {
  link: string;
  title: string;
}

export default function Breadcrumbs() {
  const location = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([]);

  useEffect(() => {
    // split pathname and update links
    const splitPathname = location.pathname.split("/").slice(1);
    console.log("WE SPLIT IT:", splitPathname);
  }, [location]);

  return (
    <Styled.BreadcrumbsContainer>
      {breadcrumbs.map((crumb) => {
        return (
          <Styled.BreadcrumbLink to={crumb.link}>
            {crumb.title}
          </Styled.BreadcrumbLink>
        );
      })}
    </Styled.BreadcrumbsContainer>
  );
}
