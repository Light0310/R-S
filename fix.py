import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
"""                className="w-full"
                {route.view === 'secret-seo-admin' && (
                  <SecretSeoAdmin />
                )}
              >""", 
"""                className="w-full"
              >
                {route.view === 'secret-seo-admin' && (
                  <SecretSeoAdmin />
                )}"""
)

with open("src/App.tsx", "w") as f:
    f.write(content)
