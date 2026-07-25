const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace relative Navigates
code = code.replace(
  /<Route path="\*" element={<Navigate to="\.\/home" replace \/>} \/>/g,
  '<Route path="*" element={<CatchAllRedirect />} />'
);

code = code.replace(
  /<Route index element={<Navigate to="\.\/home" replace \/>} \/>/g,
  '<Route index element={<CatchAllRedirect />} />'
);

if (!code.includes('function CatchAllRedirect')) {
  code = code.replace(
    'function MainLayout() {',
    'function CatchAllRedirect() {\n  const { lang } = useParams<{ lang: string }>();\n  return <Navigate to={`/${lang || "en"}`} replace />;\n}\n\nfunction MainLayout() {'
  );
}

fs.writeFileSync('src/App.tsx', code);
