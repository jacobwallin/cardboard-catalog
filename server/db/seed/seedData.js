const brands = [
  {
    name: "Topps",
  },
  {
    name: "Dunress",
  },
  {
    name: "Panini",
  },
];

const sets = [
  {
    name: "Topps Base Set",
    year: 2020,
    BrandId: 1,
  },
  {
    name: "Topps Special Set",
    year: 2020,
    BrandId: 1,
  },
  {
    name: "Topps Base Set",
    year: 2018,
    BrandId: 1,
  },
];

const teams = [
  {
    name: "Chicago Cubs",
  },
  {
    name: "Chicago White Sox",
  },
  {
    name: "St. Louis Cardinals",
  },
];

const cards = [
  { name: "Wadsworth Wickendon", number: 35, TeamId: 3, SetId: 1 },
  { name: "Ketty D'Elia", number: 149, TeamId: 3, SetId: 2 },
  { name: "Marlene Huzzay", number: 301, TeamId: 1, SetId: 1 },
  { name: "Vassily Wolstenholme", number: 104, TeamId: 3, SetId: 2 },
  { name: "Garik Eadmeades", number: 139, TeamId: 3, SetId: 2 },
  { name: "Efren Carletti", number: 326, TeamId: 1, SetId: 2 },
  { name: "Ophelia Butterworth", number: 416, TeamId: 2, SetId: 1 },
  { name: "Aleece MacTeggart", number: 124, TeamId: 2, SetId: 3 },
  { name: "Paddie Skains", number: 405, TeamId: 3, SetId: 1 },
  { name: "Allene Lovelace", number: 86, TeamId: 3, SetId: 2 },
  { name: "Valenka Guidera", number: 333, TeamId: 3, SetId: 2 },
  { name: "Cecil Hornig", number: 352, TeamId: 1, SetId: 1 },
  { name: "Pattie Bowmen", number: 225, TeamId: 3, SetId: 3 },
  { name: "Dov Haukey", number: 373, TeamId: 1, SetId: 2 },
  { name: "Madelaine Hazeley", number: 329, TeamId: 1, SetId: 1 },
  { name: "Shaine Langeley", number: 8, TeamId: 1, SetId: 1 },
  { name: "Tynan McCerery", number: 486, TeamId: 2, SetId: 2 },
  { name: "Kass Bourdon", number: 133, TeamId: 1, SetId: 2 },
  { name: "Jessi Northcott", number: 58, TeamId: 3, SetId: 1 },
  { name: "Bobbie De Laci", number: 386, TeamId: 1, SetId: 1 },
  { name: "Raimund Tregensoe", number: 140, TeamId: 3, SetId: 2 },
  { name: "Clywd Brailey", number: 189, TeamId: 3, SetId: 2 },
  { name: "Myer McCosker", number: 307, TeamId: 1, SetId: 3 },
  { name: "Gwynne Rastall", number: 269, TeamId: 2, SetId: 3 },
  { name: "Malissia Scutter", number: 455, TeamId: 1, SetId: 3 },
  { name: "Corry Ewells", number: 321, TeamId: 1, SetId: 2 },
  { name: "Jermaine Meineck", number: 474, TeamId: 1, SetId: 2 },
  { name: "Sterling Shefton", number: 460, TeamId: 1, SetId: 1 },
  { name: "Noach Hartwell", number: 166, TeamId: 3, SetId: 1 },
  { name: "Rockie Ruttgers", number: 332, TeamId: 2, SetId: 3 },
  { name: "Lucina Sorbey", number: 165, TeamId: 3, SetId: 2 },
  { name: "Ban Floyed", number: 236, TeamId: 2, SetId: 2 },
  { name: "Fanny Bestman", number: 387, TeamId: 2, SetId: 1 },
  { name: "Jessie Kearn", number: 388, TeamId: 3, SetId: 1 },
  { name: "Andeee Kinton", number: 309, TeamId: 2, SetId: 1 },
  { name: "Tessie Shotton", number: 28, TeamId: 2, SetId: 2 },
  { name: "Zerk Toler", number: 257, TeamId: 3, SetId: 2 },
  { name: "Kary Davydenko", number: 187, TeamId: 3, SetId: 1 },
  { name: "Noelyn Hullock", number: 115, TeamId: 2, SetId: 1 },
  { name: "Conny Fayer", number: 330, TeamId: 3, SetId: 1 },
  { name: "Janka Neads", number: 450, TeamId: 2, SetId: 3 },
  { name: "Ari Penton", number: 461, TeamId: 1, SetId: 1 },
  { name: "Aldin Carne", number: 302, TeamId: 3, SetId: 3 },
  { name: "Janis Januszewski", number: 107, TeamId: 2, SetId: 2 },
  { name: "Matilda Thurlby", number: 89, TeamId: 3, SetId: 3 },
  { name: "Aimee Shilliday", number: 74, TeamId: 2, SetId: 2 },
  { name: "Tricia O'Dowd", number: 109, TeamId: 2, SetId: 1 },
  { name: "Vinnie Gelder", number: 100, TeamId: 2, SetId: 2 },
  { name: "Iosep Headingham", number: 97, TeamId: 2, SetId: 1 },
  { name: "Hedwig Fairhead", number: 98, TeamId: 3, SetId: 1 },
  { name: "Tonya Brundle", number: 81, TeamId: 3, SetId: 3 },
  { name: "Lorelle Askey", number: 482, TeamId: 1, SetId: 1 },
  { name: "Vere Wallace", number: 165, TeamId: 3, SetId: 2 },
  { name: "Ainslee Petyakov", number: 76, TeamId: 2, SetId: 2 },
  { name: "Jacinda Woodsford", number: 370, TeamId: 2, SetId: 1 },
  { name: "Ola Dalston", number: 361, TeamId: 1, SetId: 2 },
  { name: "Pieter Timbridge", number: 251, TeamId: 1, SetId: 3 },
  { name: "Lenee Forsyde", number: 330, TeamId: 2, SetId: 2 },
  { name: "Anatollo Halm", number: 398, TeamId: 1, SetId: 1 },
  { name: "Damita Metheringham", number: 260, TeamId: 2, SetId: 2 },
  { name: "Sloan Vasilkov", number: 392, TeamId: 1, SetId: 3 },
  { name: "Carleen Crankhorn", number: 159, TeamId: 3, SetId: 3 },
  { name: "Hyacinthie Lunk", number: 194, TeamId: 2, SetId: 2 },
  { name: "Koo Etchells", number: 59, TeamId: 3, SetId: 1 },
  { name: "Nicki Beszant", number: 204, TeamId: 3, SetId: 2 },
  { name: "Ninnette O'Lehane", number: 94, TeamId: 3, SetId: 2 },
  { name: "Marlyn Eldred", number: 424, TeamId: 3, SetId: 2 },
  { name: "Jacqueline Orgel", number: 496, TeamId: 3, SetId: 3 },
  { name: "Aloysia Bottby", number: 379, TeamId: 2, SetId: 1 },
  { name: "Brandea Thatcham", number: 74, TeamId: 1, SetId: 3 },
  { name: "Violetta Remon", number: 68, TeamId: 2, SetId: 3 },
  { name: "Nikola Martine", number: 416, TeamId: 1, SetId: 1 },
  { name: "Ernest Shills", number: 172, TeamId: 2, SetId: 3 },
  { name: "Beitris Manclark", number: 122, TeamId: 3, SetId: 3 },
  { name: "Jilli Sinclar", number: 117, TeamId: 1, SetId: 3 },
  { name: "Celene Bangley", number: 171, TeamId: 3, SetId: 1 },
  { name: "Dukie Shaul", number: 218, TeamId: 2, SetId: 2 },
  { name: "Penelopa Arkwright", number: 195, TeamId: 1, SetId: 1 },
  { name: "Crissy Belsey", number: 72, TeamId: 1, SetId: 2 },
  { name: "Dino Auchterlony", number: 246, TeamId: 2, SetId: 1 },
  { name: "Edithe Sunley", number: 195, TeamId: 1, SetId: 1 },
  { name: "Olivie MacSweeney", number: 213, TeamId: 1, SetId: 2 },
  { name: "Ora Covolini", number: 496, TeamId: 2, SetId: 3 },
  { name: "Anders Euston", number: 498, TeamId: 1, SetId: 2 },
  { name: "Elana Sharpley", number: 20, TeamId: 2, SetId: 2 },
  { name: "Pearline Christofe", number: 142, TeamId: 2, SetId: 3 },
  { name: "Lacie Batrick", number: 97, TeamId: 3, SetId: 1 },
  { name: "Tobi Gosnell", number: 315, TeamId: 3, SetId: 3 },
  { name: "Prince Bransom", number: 469, TeamId: 1, SetId: 1 },
  { name: "Nissy Jenoure", number: 253, TeamId: 3, SetId: 3 },
  { name: "Geneva Cran", number: 248, TeamId: 2, SetId: 1 },
  { name: "Shanon Meaker", number: 394, TeamId: 3, SetId: 3 },
  { name: "Adan Kefford", number: 313, TeamId: 2, SetId: 1 },
  { name: "Eleonore Biggs", number: 190, TeamId: 3, SetId: 1 },
  { name: "Colver Curragh", number: 385, TeamId: 3, SetId: 1 },
  { name: "Danyette Rickwood", number: 348, TeamId: 2, SetId: 1 },
  { name: "Zorine O'Deegan", number: 20, TeamId: 1, SetId: 2 },
  { name: "Herschel Kelleway", number: 143, TeamId: 2, SetId: 3 },
  { name: "Rosamond Forseith", number: 330, TeamId: 1, SetId: 1 },
  { name: "Marlon Hemstead", number: 388, TeamId: 3, SetId: 1 },
];

module.exports = {
  brands,
  sets,
  teams,
  cards,
};
