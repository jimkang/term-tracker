var commonCases = require('./common-cases');
var runCommonCase = require('./run-common-case');

var testCases = [
  commonCases.initialStateCase,
  Object.assign({}, commonCases.moreRecordsCase, {
    createNewTrackerInTest: false,
  }),
];

testCases.forEach((testCase) => runCommonCase(testCase, {}));
