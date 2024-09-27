const {
  Automaton,
  MATCH_KIND_STANDARD,
  MATCH_KIND_LEFTMOST_LONGEST,
  MATCH_KIND_LEFTMOST_FIRST,
  createAutomaton,
} = require("./");

// standard match
const patternsStandard = ["bcd", "ab", "a"];
const automatonStandard = new Automaton(patternsStandard, MATCH_KIND_STANDARD);

console.log("Standard find:", automatonStandard.find("abcd"));

// leftmost longest match
const patternsLeftmostLongest = ["ab", "a", "abcd"];
const automatonLeftmostLongest = new Automaton(
  patternsLeftmostLongest,
  MATCH_KIND_LEFTMOST_LONGEST
);

console.log("Leftmost longest find:", automatonLeftmostLongest.find("abcd"));

// Test leftmost first match
const patternsLeftmostFirst = ["ab", "a", "abcd"];
const automatonLeftmostFirst = new Automaton(
  patternsLeftmostFirst,
  MATCH_KIND_LEFTMOST_FIRST
);

console.log("Leftmost first find:", automatonLeftmostFirst.find("abcd"));

// createAutomaton
const patternsCreateAutomaton = ["ab", "a", "abcd"];
const automatonCreateAutomaton = createAutomaton(
  patternsCreateAutomaton,
  MATCH_KIND_LEFTMOST_LONGEST
);

console.log("Create automaton find:", automatonCreateAutomaton.find("abcd"));
