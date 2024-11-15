#!/bin/bash
export $(cat .env | xargs)

exec "$@"
