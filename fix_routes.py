import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# I will just write a new App.tsx file content because replacing this heavily nested structure using regex is fragile.
