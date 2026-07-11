const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const securityScript = `
  <!-- Security -->
  <script>!function(){document.addEventListener("contextmenu",function(e){e.preventDefault()}),document.addEventListener("keydown",function(e){if("F12"===e.key||123===e.keyCode)return e.preventDefault(),!1;if((e.ctrlKey||e.metaKey)&&e.shiftKey&&("I"===e.key||"i"===e.key||"J"===e.key||"j"===e.key))return e.preventDefault(),!1;if((e.ctrlKey||e.metaKey)&&("U"===e.key||"u"===e.key))return e.preventDefault(),!1;if((e.ctrlKey||e.metaKey)&&("S"===e.key||"s"===e.key))return e.preventDefault(),!1}),setInterval(function(){var e=new Date;debugger;new Date-e>100&&console.clear()},1e3)}();</script>
`;

if (!content.includes('contextmenu')) {
    content = content.replace('</head>', securityScript + '</head>');
    fs.writeFileSync('index.html', content, 'utf8');
    console.log("Security script added");
}
