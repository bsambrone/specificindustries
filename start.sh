#!/bin/bash
cd "$(dirname "$0")"
npm install --silent && npm run dev -- -p 3000
