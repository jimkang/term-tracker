/* global __dirname */

var test = require('tape');
var assertNoError = require('assert-no-error');
var Tracker = require('../index');

const storeFile = __dirname + '/fixtures/test.json';
var tracker;

var testCases = [
  {
    name: 'Initial state',
    createNewTrackerInTest: true,
    expectedTermsByCount: [],
    textProp: 'caption',
    docsToAdd: [
      {
        id: 'a',
        words: [
          'all',
          'three',
          'of',
          'these',
          'tailored',
          'to',
          'whatever',
          'your',
          'whatever',
          'your',
          'mattress',
          'needs',
          'are',
          'there',
          'all',
          'breathable',
          'so',
          'you',
          'can',
          'sleep',
          'cool',
          'keep',
          'a',
          'good',
          'temperature',
          'and',
          'as',
          'Jake',
          'alluded',
          'they',
          'all',
          'come',
          'in',
          'a',
          'little',
          'box',
          'that',
          'the',
          'mattress',
          'explodes',
          'out',
          'of',
          'with',
          'free',
          'shipping',
          'and',
          'returns',
          'in',
          'the',
          'United',
          'States',
          'of',
          'America',
          'and',
          'also',
          'Canada'
        ]
      }
    ]
  },
  {
    name: 'Add more records',
    createNewTrackerInTest: true,
    expectedTermsByCount: [
      { term: 'mattress', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'whatever', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'alluded', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'canada', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'little', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'three', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'box', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'needs', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'explodes', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'sleep', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'free', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'keep', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'shipping', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'temperature', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'returns', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'tailored', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'breathable', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'also', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'america', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'states', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'united', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'cool', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'come', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'jake', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'good', count: 1, countsInRefs: { a: 1 }, refs: ['a'] }
    ],
    expectedDocs: {
      b: {
        id: 'b',
        termCount: 16,
        countsPerTerm: {
          get: 1,
          application: 2,
          'didn\'t': 1,
          mean: 1,
          anything: 1,
          said: 1,
          acts: 1,
          less: 1,
          exhortation: 1,
          thumbs: 1,
          offer: 1,
          code: 1,
          $50: 1,
          mattress: 1,
          purchase: 1
        }
      }
    },
    docsToAdd: [
      {
        id: 'b',
        words: [
          'get',
          'out',
          'that',
          'application',
          'was',
          'that',
          'it',
          'didn\'t',
          'mean',
          'anything',
          'what',
          'I',
          'just',
          'said',
          'is',
          'it',
          'acts',
          'less',
          'of',
          'an',
          'application',
          'and',
          'more',
          'of',
          'an',
          'exhortation',
          'thumbs',
          'with',
          'the',
          'offer',
          'code',
          'for',
          '$50',
          'off',
          'your',
          'mattress',
          'purchase'
        ]
      },
      {
        id: 'c',
        words: [
          'get',
          'out',
          'that',
          'application',
          'was',
          'that',
          'it',
          'didn\'t',
          'mean',
          'anything',
          'what',
          'I',
          'just',
          'said',
          'is',
          'it',
          'acts',
          'less',
          'of',
          'an',
          'application',
          'and',
          'more',
          'of',
          'an',
          'exhortation',
          'thumbs',
          'with',
          'the',
          'offer',
          'code',
          'for',
          '$50',
          'off',
          'your',
          'mattress',
          'purchase'
        ]
      }
    ]
  },
  {
    name: 'Reopening',
    createNewTrackerInTest: true,
    expectedTermsByCount: [
      {
        term: 'application',
        count: 4,
        countsInRefs: { b: 2, c: 2 },
        refs: ['b', 'c']
      },
      {
        term: 'mattress',
        count: 4,
        countsInRefs: { a: 2, b: 1, c: 1 },
        refs: ['a', 'b', 'c']
      },
      {
        term: 'less',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'acts',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'didn\'t',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'said',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'offer',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'code',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'mean',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      { term: 'whatever', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      {
        term: 'anything',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      { term: 'get', count: 2, countsInRefs: { b: 1, c: 1 }, refs: ['b', 'c'] },
      { term: '$50', count: 2, countsInRefs: { b: 1, c: 1 }, refs: ['b', 'c'] },
      {
        term: 'purchase',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'thumbs',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      {
        term: 'exhortation',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      { term: 'breathable', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'jake', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'sleep', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'tailored', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'returns', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'canada', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'alluded', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'little', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'america', count: 1, countsInRefs: { a: 1 }, refs: ['a'] }
    ],
    expectedDocs: {
      a: {
        id: 'a',
        termCount: 27,
        countsPerTerm: {
          three: 1,
          tailored: 1,
          whatever: 2,
          mattress: 2,
          needs: 1,
          breathable: 1,
          sleep: 1,
          cool: 1,
          keep: 1,
          good: 1,
          temperature: 1,
          jake: 1,
          alluded: 1,
          come: 1,
          little: 1,
          box: 1,
          explodes: 1,
          free: 1,
          shipping: 1,
          returns: 1,
          united: 1,
          states: 1,
          america: 1,
          also: 1,
          canada: 1
        }
      },
      b: {
        id: 'b',
        termCount: 16,
        countsPerTerm: {
          get: 1,
          application: 2,
          'didn\'t': 1,
          mean: 1,
          anything: 1,
          said: 1,
          acts: 1,
          less: 1,
          exhortation: 1,
          thumbs: 1,
          offer: 1,
          code: 1,
          $50: 1,
          mattress: 1,
          purchase: 1
        }
      },
      c: {
        id: 'c',
        termCount: 16,
        countsPerTerm: {
          get: 1,
          application: 2,
          'didn\'t': 1,
          mean: 1,
          anything: 1,
          said: 1,
          acts: 1,
          less: 1,
          exhortation: 1,
          thumbs: 1,
          offer: 1,
          code: 1,
          $50: 1,
          mattress: 1,
          purchase: 1
        }
      }
    }
  }
];

testCases.forEach(runCase);

function runCase(testCase) {
  test(testCase.name, runTest);

  function runTest(t) {
    var trackerOpts = { storeFile };
    if (testCase.textProp) {
      trackerOpts.textProp = testCase.textProp;
    }
    if (testCase.createNewTrackerInTest) {
      tracker = Tracker(trackerOpts);
    }

    var termsSorted = tracker.getTermsSortedByCount();
    t.deepEqual(
      termsSorted,
      testCase.expectedTermsByCount,
      'Sorted terms are correct.'
    );
    if (testCase.docsToAdd) {
      testCase.docsToAdd.forEach(tracker.track);
    }
    if (testCase.expectedDocs) {
      for (var docId in testCase.expectedDocs) {
        t.deepEqual(
          tracker.getDocMeta({ id: docId }),
          testCase.expectedDocs[docId],
          'Doc entry is correct.'
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
