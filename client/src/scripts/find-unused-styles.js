const fs = require('fs');
const path = require('path');
const glob = require('glob');

const STYLE_USAGE_REGEX = /styles\.([a-zA-Z0-9_]+)/g;
const STYLESHEET_REGEX = /const styles = StyleSheet.create\(({[\s\S]*?})\);/g;

const files = glob.sync('src/**/*.tsx');

let stylesInUse = new Set();
let styleDefinitions = {};

// Find all style usages
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = STYLE_USAGE_REGEX.exec(content)) !== null) {
    stylesInUse.add(match[1]);
  }
});

// Find all style definitions
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = STYLESHEET_REGEX.exec(content)) !== null) {
    const styleBlock = match[1];

    // Extract style names
    const styleNames = styleBlock
      .match(/(\w+):\s*{/g)
      .map(style => style.split(':')[0].trim());

    styleNames.forEach(styleName => {
      if (!stylesInUse.has(styleName)) {
        console.log(`Unused style "${styleName}" found in file "${file}"`);
      }
    });
  }
});
