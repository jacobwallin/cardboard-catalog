import React from "react";

interface Breadcrumb {
  name: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs(props: Props) {}
