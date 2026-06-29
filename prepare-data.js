const fs = require('fs');
const path = require('path');

const dir = __dirname;

function loadJSON(filename) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filename}`);
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveJSON(filename, data) {
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Saved ${filename} with ${data.length} items.`);
}

function interleave(arr1, arr2) {
  const result = [];
  const maxLen = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < arr1.length) result.push(arr1[i]);
    if (i < arr2.length) result.push(arr2[i]);
  }
  return result;
}

function processModule(destName, srcNames, isMerge = false) {
  let items = [];
  if (isMerge && srcNames.length === 2) {
    const arr1 = loadJSON(srcNames[0]);
    const arr2 = loadJSON(srcNames[1]);
    items = interleave(arr1, arr2);
  } else {
    items = loadJSON(srcNames[0]);
  }

  // Re-index the items
  const processed = items.map((item, index) => {
    return {
      id: index + 1,
      questionText: item.questionText,
      showProcess: item.showProcess,
      showAnswer: item.showAnswer
    };
  });

  saveJSON(destName, processed);
}

// 1. addition_subtraction: addition.json + subtraction.json
processModule('addition_subtraction.json', ['addition.json', 'subtraction.json'], true);

// 2. multiplication_division: multiplication.json + division.json
processModule('multiplication_division.json', ['multiplication.json', 'division.json'], true);

// 3. order_of_operations: GEMA.json
processModule('order_of_operations.json', ['GEMA.json']);

// 4. factors_multiples: factorsmultiples.json
processModule('factors_multiples.json', ['factorsmultiples.json']);

// 5. reducing_fractions: simplifyconvertfractions.json
processModule('reducing_fractions.json', ['simplifyconvertfractions.json']);

// 6. fraction_arithmetic: addsubfractions.json
processModule('fraction_arithmetic.json', ['addsubfractions.json']);

// 7. fdp_conversions: fractionstodecimalsperctanges.json
processModule('fdp_conversions.json', ['fractionstodecimalsperctanges.json']);

// 8. basic_algebra: algebra.json
processModule('basic_algebra.json', ['algebra.json']);

// 9. perimeter_area: areaperimeter.json
processModule('perimeter_area.json', ['areaperimeter.json']);

console.log('All modules prepared successfully!');
