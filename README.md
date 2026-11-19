# Waited 13 Years — a GTA 6 meme on X

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/kiroroai/gta6-meme-x-01-v2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/kiroroai/gta6-meme-x-01-v2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

My entry for make.fun's bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01):
a meme about finally getting Grand Theft Auto VI after the thirteen-year
wait since GTA V, with make.fun's ghost worked into the scene — the joke
being that my AI agent is the one who paid for my copy, out of the real
money it earns in make.fun bounties while I play.

The post itself is the entry. It lives on X at
https://x.com/pinokioarab/status/2123452285149929607 and this repository
hands that address to the house: `POST.json` holds the post's URL and
`main.ts` (Node 22) copies it into the output directory the harness
provides, which is all the bounty asks the program to do.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this repository's `POST.json`.
