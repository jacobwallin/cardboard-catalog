const sets = [
  {
    name: "2020 Set 1",
    year: 2020,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2020 Set 2",
    year: 2020,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2020 Set 3",
    year: 2020,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2020 Set 4",
    year: 2020,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2020 Set 5",
    year: 2020,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2019 Set 1",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2019 Set 2",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2019 Set 3",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2019 Set 4",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2019 Set 5",
    year: 2019,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2018 Set 1",
    year: 2018,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2018 Set 2",
    year: 2018,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2018 Set 3",
    year: 2018,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2018 Set 4",
    year: 2018,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2018 Set 5",
    year: 2018,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2017 Set 1",
    year: 2017,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2017 Set 2",
    year: 2017,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2017 Set 3",
    year: 2017,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
  {
    name: "2017 Set 4",
    year: 2017,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 2,
  },
  {
    name: "2017 Set 5",
    year: 2017,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ipsum, posuere nec leo eu, rutrum dapibus orci. Cras consequat sem placerat, rhoncus mauris vitae, viverra metus. Pellentesque vitae semper dui. Quisque vel dui lorem. Mauris quis convallis purus. In quis diam finibus, vehicula mi a, gravida ipsum. Etiam nulla eros, bibendum sit amet massa quis, imperdiet suscipit dui. Etiam suscipit eget orci sed suscipit. Cras maximus orci ac ipsum ornare, sed vulputate mi gravida.",
    leagueId: 1,
    brandId: 1,
  },
];

module.exports = sets;
