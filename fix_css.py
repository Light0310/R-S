import re

with open("src/index.css", "r") as f:
    content = f.read()

# Fix WhatsApp floating icon centering
content = content.replace(".whatsapp-floating svg {", ".whatsapp-floating svg {\n      position: relative;\n      z-index: 2;")

with open("src/index.css", "w") as f:
    f.write(content)
