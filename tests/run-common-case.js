var test = require('tape');
var assertNoError = require('assert-no-error');
var Tracker = require('../index');
var tracker;

function runCommonCase(testCase, trackerOpts) {
  test(testCase.name, runTest);

  function runTest(t) {
    if (testCase.textProp) {
      trackerOpts.textProp = testCase.textProp;
    }
    if (testCase.createNewTrackerInTest) {
      tracker = Tracker(trackerOpts);
    }

    var termsSorted = tracker.getTermsSortedByCount();
    t.ok(
      termsSorted.every(
        (term, index) =>
          index === termsSorted.length - 1 ||
          term.count >= termsSorted[index + 1].count,
      ),
      'Sorted terms are in descending count order.',
    );

    testCase.expectedSalientTerms.forEach((termObj) =>
      t.ok(
        termsSorted.find((to) => to.term === termObj.term),
        `Expected term "${termObj.term}" found in sorted terms.`,
      ),
    );

    for (let term in testCase.expectedTerms) {
      t.deepEqual(
        tracker.getTerm({ term }),
        testCase.expectedTerms[term],
        'Term entry is correct.',
      );
    }
    if (testCase.docsToAdd) {
      testCase.docsToAdd.forEach(tracker.track);
    }
    if (testCase.expectedDocs) {
      for (var docId in testCase.expectedDocs) {
        t.deepEqual(
          tracker.getDocMeta({ id: docId }),
          testCase.expectedDocs[docId],
          'Doc entry is correct.',
        );
      }
    }
    tracker.save(checkSaveResult);

    function checkSaveResult(error) {
      assertNoError(t.ok, error, 'No error while calling query method.');
      t.end();
    }
  }
}

module.exports = runCommonCase;
