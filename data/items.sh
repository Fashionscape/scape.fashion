#!/bin/bash

ITEMS_PATH="items.json"
STATS_PATH="stats.json"

set -e

import() {
  node tools/import.js $ITEMS_PATH

  stats
}

stats() {
  printf "Before:\n\n"
  test -f "$STATS_PATH" && cat "$STATS_PATH"

  node tools/stats.js "$STATS_PATH"

  printf "\nAfter:\n\n"
  test -f "$STATS_PATH" && cat "$STATS_PATH"
}

COMMAND="$1"
shift

case "$COMMAND" in
  import) import $@;;
  stats) stats $@;;
esac
