#!/bin/bash

# Usage:
# ./items.sh import oldschool # or runescape
# ./items.sh stats oldschool # or runescape

GAME=$2

if [ "$GAME" != "oldschool" ] && [ "$GAME" != "runescape" ]; then
  echo "Only oldschool,runescape are valid arguments";
  exit;
fi

ITEMS_PATH="items-$GAME.json"
STATS_PATH="stats-$GAME.json"

set -e

import() {
  node tools/import.js $ITEMS_PATH $GAME

  stats
}

stats() {
  printf "Before:\n\n"
  test -f "$STATS_PATH" && cat "$STATS_PATH"

  node tools/stats.js "$STATS_PATH" "$ITEMS_PATH"

  printf "\nAfter:\n\n"
  test -f "$STATS_PATH" && cat "$STATS_PATH"
}

COMMAND="$1"
shift

case "$COMMAND" in
  import) import $@;;
  stats) stats $@;;
esac
