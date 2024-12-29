#!/usr/bin/env bash
cd "$(dirname "$0")"
set -o errexit   # abort on nonzero exit status
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes

COMMAND_NAME="awslocal"
BUCKET_NAME="app-data"

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Checking if the command exists
if ! command_exists "$COMMAND_NAME"; then
    echo "Error: $COMMAND_NAME is not available in your system's. Install it using 'uv tool install awscli-local'"
    echo "If uv command does not exists please install it from uv website"
    exit 1
fi

$COMMAND_NAME s3api create-bucket --bucket $BUCKET_NAME
$COMMAND_NAME s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file://bucket-cors.json