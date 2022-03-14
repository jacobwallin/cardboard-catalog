import { Set } from "../../store/library/sets/types";
import { SubsetState } from "../../store/library/subsets/types";

interface Crumb {
  link: string;
  title: string;
}

export default function createCrumbs(pageNames: string[]): Crumb[] {
  let link = "";

  return pageNames.map((pageName) => {
    link += `/${pageName}`;
    return {
      link: link,
      title: `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`,
    };
  });
}

export function createSetCrumbs(set: Set, search: string): Crumb[] {
  let crumbs: Crumb[] = [];
  let link = "";

  // link to collection or database
  if (search === "?view=coll") {
    link += "/collection";
    crumbs.push({
      link: link,
      title: "Collection",
    });
  } else {
    link += "/browse";
    crumbs.push({
      link: link,
      title: "Browse",
    });
  }

  link += `/${set.year}`;
  crumbs.push({
    link: link,
    title: String(set.year),
  });

  link += `/${set.id}`;
  crumbs.push({
    link: `/set/${set.id}${search}`,
    title: set.name,
  });

  return crumbs;
}

export function createSubsetCrumbs(
  subset: SubsetState,
  search: string
): Crumb[] {
  let crumbs: Crumb[] = [];
  let link = "";

  // link to collection or database
  if (search === "?view=coll") {
    link += "/collection";
    crumbs.push({
      link: link,
      title: "Collection",
    });
  } else {
    link += "/browse";
    crumbs.push({
      link: link,
      title: "Browse",
    });
  }

  link += `/${subset.set.year}`;
  crumbs.push({
    link: link,
    title: String(subset.set.year),
  });

  crumbs.push({
    link: `/set/${subset.set.id}${search}`,
    title: String(subset.set.name),
  });

  crumbs.push({
    link: `/subset/${subset.id}${search}`,
    title: String(subset.name),
  });

  return crumbs;
}
