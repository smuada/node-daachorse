use daachorse::{CharwiseDoubleArrayAhoCorasick, CharwiseDoubleArrayAhoCorasickBuilder, MatchKind};
use napi::Result;
use napi_derive::napi;

#[napi]
pub struct Automaton {
  pma: CharwiseDoubleArrayAhoCorasick<usize>,
  match_kind: MatchKind,
  patterns: Vec<String>,
}

#[napi]
impl Automaton {
  #[napi(constructor)]
  pub fn new(patterns: Vec<String>, match_kind: Option<u8>) -> Result<Self> {
    let match_kind = match_kind
      .map(MatchKind::from)
      .unwrap_or(MatchKind::Standard);
    Ok(Self {
      pma: CharwiseDoubleArrayAhoCorasickBuilder::new()
        .match_kind(match_kind)
        .build(&patterns)
        .map_err(|e| napi::Error::from_reason(e.to_string()))?,
      match_kind,
      patterns,
    })
  }

  #[napi]
  pub fn find(&self, haystack: String) -> Vec<String> {
    let pattern_ids = match self.match_kind {
      MatchKind::Standard => self
        .pma
        .find_iter(haystack)
        .map(|m| m.value())
        .collect::<Vec<_>>(),
      MatchKind::LeftmostLongest | MatchKind::LeftmostFirst => self
        .pma
        .leftmost_find_iter(haystack)
        .map(|m| m.value())
        .collect::<Vec<_>>(),
    };

    pattern_ids
      .into_iter()
      .map(|i| self.patterns[i].clone())
      .collect()
  }
}

#[napi]
pub fn create_automaton(patterns: Vec<String>, match_kind: Option<u8>) -> Result<Automaton> {
  Automaton::new(patterns, match_kind)
}

#[napi]
pub const MATCH_KIND_STANDARD: u8 = MatchKind::Standard as u8;

#[napi]
pub const MATCH_KIND_LEFTMOST_LONGEST: u8 = MatchKind::LeftmostLongest as u8;

#[napi]
pub const MATCH_KIND_LEFTMOST_FIRST: u8 = MatchKind::LeftmostFirst as u8;
