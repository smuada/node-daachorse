import test from "ava";

import {
  Automaton,
  MATCH_KIND_STANDARD,
  MATCH_KIND_LEFTMOST_LONGEST,
  MATCH_KIND_LEFTMOST_FIRST,
  createAutomaton,
} from "../index.js";

test("Automaton", (t) => {
  // standard match
  const patternsStandard = ["bcd", "ab", "a"];
  const automatonStandard = new Automaton(
    patternsStandard,
    MATCH_KIND_STANDARD
  );

  t.deepEqual(automatonStandard.find("abcd"), ["a", "bcd"]);

  // leftmost longest match
  const patternsLeftmostLongest = ["ab", "a", "abcd"];
  const automatonLeftmostLongest = new Automaton(
    patternsLeftmostLongest,
    MATCH_KIND_LEFTMOST_LONGEST
  );

  t.deepEqual(automatonLeftmostLongest.find("abcd"), ["abcd"]);

  // Test leftmost first match
  const patternsLeftmostFirst = ["ab", "a", "abcd"];
  const automatonLeftmostFirst = new Automaton(
    patternsLeftmostFirst,
    MATCH_KIND_LEFTMOST_FIRST
  );

  t.deepEqual(automatonLeftmostFirst.find("abcd"), ["ab"]);

  // createAutomaton
  const patternsCreateAutomaton = ["ab", "a", "abcd"];
  const automatonCreateAutomaton = createAutomaton(
    patternsCreateAutomaton,
    MATCH_KIND_LEFTMOST_LONGEST
  );

  t.deepEqual(automatonCreateAutomaton.find("abcd"), ["abcd"]);
});
