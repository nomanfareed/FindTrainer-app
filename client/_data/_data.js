const { names, focus, address } = require("./_data_template");

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
const generate2Focus = () => {
  let max = focus.length - 1;
  let min = 0;
  return [focus[randomNumber(min, max)]];
};

exports.randomUsers = () => {
  return names.map((e) => {
    const name = `${e}U`;
    return {
      name,
      profileUrl: "https://ibb.co/wQcgHv4",
      gender: 1,
      role: 0,
    };
  });
};

Date.prototype.formatMMDDYYYY = function () {
  return this.getMonth() + 1 + "/" + this.getDate() + "/" + this.getFullYear();
};

exports.randomTrainers = () => {
  return names.map((e) => {
    const name = `${e}T`.toLowerCase();
    return {
      name,
      gender: 1,
      role: 1,
      focus: generate2Focus(),
      created: Date.now(),
      ...address[randomNumber(0, address.length - 1)],
      profileUrl: null,
      avgRatingScore: randomNumber(0, 5),
      totalRatings: randomNumber(3, 100),
      onlineTraining: randomNumber(0, 1) === 1 ? true : false,
    };
  });
};
//git rm -r --cached node_modules
