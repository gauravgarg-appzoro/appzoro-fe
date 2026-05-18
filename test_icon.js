require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { LuMoveRight } = require('./components/OptimizedIcons.js');

try {
    console.log("LuMoveRight is:", typeof LuMoveRight);
    if (!LuMoveRight) {
        console.error("LuMoveRight is undefined! Export failed.");
        process.exit(1);
    }
    const str = ReactDOMServer.renderToString(React.createElement(LuMoveRight, {}));
    console.log('Renders cleanly!', str.substring(0, 50) + "...");
} catch(e) {
    console.error('Render error:', e);
}
