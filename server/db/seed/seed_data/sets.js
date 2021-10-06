const sets = [
  {
    name: "2021 Set 1",
    release_date: "2021-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 1,
  },
  {
    name: "2021 Set 2",
    release_date: "2021-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 6,
  },
  {
    name: "2021 Set 3",
    release_date: "2021-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 11,
  },
  {
    name: "2021 Set 4",
    release_date: "2021-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 16,
  },
  {
    name: "2021 Set 5",
    release_date: "2021-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 21,
  },
  {
    name: "2020 Set 1",
    release_date: "2020-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 26,
  },
  {
    name: "2020 Set 2",
    release_date: "2020-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 31,
  },
  {
    name: "2020 Set 3",
    release_date: "2020-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 36,
  },
  {
    name: "2020 Set 4",
    release_date: "2020-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 41,
  },
  {
    name: "2020 Set 5",
    release_date: "2020-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 46,
  },
  {
    name: "2019 Set 1",
    release_date: "2019-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 51,
  },
  {
    name: "2019 Set 2",
    release_date: "2019-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 56,
  },
  {
    name: "2019 Set 3",
    release_date: "2019-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 61,
  },
  {
    name: "2019 Set 4",
    release_date: "2019-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 66,
  },
  {
    name: "2019 Set 5",
    release_date: "2019-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 71,
  },
  {
    name: "2018 Set 1",
    release_date: "2018-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 76,
  },
  {
    name: "2018 Set 2",
    release_date: "2018-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 81,
  },
  {
    name: "2018 Set 3",
    release_date: "2018-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 86,
  },
  {
    name: "2018 Set 4",
    release_date: "2018-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
    baseSubsetId: 91,
  },
  {
    name: "2018 Set 5",
    release_date: "2018-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
    baseSubsetId: 96,
  },
];

module.exports = sets;
