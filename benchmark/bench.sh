#!/bin/bash

echo "Running time benchmarks with hyperfine..."
hyperfine --export-markdown BENCHMARKS-10k.md \
  --parameter-list lib fastscan,daachorse,node-aho-corasick \
  'bun bench.js {lib} 10000'
hyperfine --export-markdown BENCHMARKS-100k.md \
  --parameter-list lib fastscan,daachorse,node-aho-corasick \
  'bun bench.js {lib} 100000'
# hyperfine --export-markdown BENCHMARKS-500k.md \
#   --parameter-list lib fastscan,daachorse,node-aho-corasick \
#   'bun bench.js {lib} 500000'

