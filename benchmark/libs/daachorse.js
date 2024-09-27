const { Automaton } = require("../../");

exports.default = function run(keywords, text) {
  const automaton = new Automaton(keywords);
  const results = automaton.find(text);

  return results.length;
};
