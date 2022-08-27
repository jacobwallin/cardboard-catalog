import { Set } from "../../store/library/sets/types";
import { Subset } from "../../store/library/subsets/types";
import { Series } from "../../store/library/series/types";

export interface Crumb {
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

  link += `/${set.league.name.toLowerCase()}`;
  crumbs.push({
    link: link,
    title: String(set.league.name),
  });

  link += `/${set.year}`;
  crumbs.push({
    link: link,
    title: String(set.year),
  });

  // check if set name starts with the year and remove it to remove redundancy
  if (set.name.split(" ")[0] === String(set.year)) {
    crumbs.push({
      link: `/set/${set.id}${search}`,
      title: set.name.split(" ").slice(1).join(" "),
    });
  } else {
    crumbs.push({
      link: `/set/${set.id}${search}`,
      title: set.name,
    });
  }

  return crumbs;
}

export function createSubsetCrumbs(subset: Subset, search: string): Crumb[] {
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

  link += `/${subset.set.league.name.toLowerCase()}`;
  crumbs.push({
    link: link,
    title: String(subset.set.league.name),
  });

  link += `/${subset.set.year}`;
  crumbs.push({
    link: link,
    title: String(subset.set.year),
  });

  // check if set name starts with the year and remove it to remove redundancy
  if (subset.set.name.split(" ")[0] === String(subset.set.year)) {
    crumbs.push({
      link: `/set/${subset.set.id}${search}`,
      title: subset.set.name.split(" ").slice(1).join(" "),
    });
  } else {
    crumbs.push({
      link: `/set/${subset.set.id}${search}`,
      title: subset.set.name,
    });
  }

  crumbs.push({
    link: `/subset/${subset.id}${search}`,
    title: String(subset.name),
  });

  return crumbs;
}

export function createAdminSetCrumbs(set: Set) {
  let crumbs: Crumb[] = [];

  crumbs.push({
    link: "/admin",
    title: "Admin",
  });
  crumbs.push({
    link: `/admin/set/${set.id}`,
    title: `${set.name}`,
  });

  return crumbs;
}

export function createAdminSubsetCrumbs(subset: Subset): Crumb[] {
  let crumbs: Crumb[] = [];

  crumbs.push({
    link: "/admin",
    title: "Admin",
  });
  crumbs.push({
    link: `/admin/set/${subset.set.id}`,
    title: `${subset.set.name}`,
  });
  crumbs.push({
    link: `/admin/subset/${subset.id}`,
    title: `${subset.name}`,
  });

  return crumbs;
}

export function createAdminSeriesCrumbs(series: Series): Crumb[] {
  let crumbs: Crumb[] = [];

  crumbs.push({
    link: "/admin",
    title: "Admin",
  });
  crumbs.push({
    link: `/admin/set/${series.subset.set.id}`,
    title: `${series.subset.set.name}`,
  });
  crumbs.push({
    link: `/admin/subset/${series.subset.id}`,
    title: `${series.subset.name}`,
  });
  crumbs.push({
    link: `/admin/series/${series.id}`,
    title: `${series.name}`,
  });

  return crumbs;
}
