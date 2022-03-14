import React from "react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  name: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs(props: Props) {
  const { breadcrumbs } = props;
  return breadcrumbs.map((crumb) => {
    return <Link to={crumb.url}>{crumb.name}</Link>;
  });
}
