#!/bin/bash

ts-node-dev --respawn --transpile-only -r dotenv/config ./app.ts dotenv_config_path=.env.dev