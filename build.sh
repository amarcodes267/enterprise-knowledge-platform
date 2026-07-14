#!/usr/bin/env bash
set -e

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing frontend dependencies..."
cd frontend

npm install

echo "Building React..."
npm run build

echo "Copying React build to Flask..."

rm -rf ../backend/static/assets

mkdir -p ../backend/static
mkdir -p ../backend/templates

cp -r dist/assets ../backend/static/
cp dist/index.html ../backend/templates/index.html

echo "Done!"