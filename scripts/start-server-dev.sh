#!/bin/bash

# For more info on paths resolution, see:
#  - https://stackoverflow.com/questions/63744943/absolute-path-in-the-tsconfig-dose-not-work

ts-node-dev --respawn --transpile-only --prefer-ts true \
  -P tsconfig.json \
  -r tsconfig-paths/register \
  -r dotenv/config \
  ./app.ts dotenv_config_path=config/.env.dev