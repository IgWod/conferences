#!/bin/bash

# Install JaveScript dependencies
npm install

# Enter venv
python3 -m venv venv
source venv/bin/activate

# Install python dependencies
pip install -r requirements.txt

# Generate HTML files from templates using Jinja
python3 scripts/generate_html.py

# Exit venv
deactivate

# Generate CSS files for created HTML files
npx tailwindcss -i ./templates/input.css.tailwind -o ./docs/css/output.css --minify

