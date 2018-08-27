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
    expectedTerms: {
      cells: undefined
    },
    textProp: 'caption',
    docsToAdd: [
      {
        id: 'a',
        caption: `Hey, I liked Dead Cells. I'm a limited-video-game-time dad. It is indeed a Metroidvania, a format that I love, but the procedurally generation freed me from thinking I had to inspect every last corner. Plus, I really enjoyed finding healing meats again.

I think I liked Kero Blaster even more, though. I had tried it on iOS before, but it's just too actiony for touch controls. On Switch, it feels great, and all the fine details are delightful. The little guy blinking when you hit the button to start the level, monsters faces when their hit. The music is really cheerful in that effective SMB2 way, though at first you don't know it's going to be cheerful, if you know what I mean.`
      }
    ]
  },
  {
    name: 'Add more records',
    createNewTrackerInTest: true,
    expectedTermsByCount: [
      { term: 'really', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'liked', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'the', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'hit', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'cheerful', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'know', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'though', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'mean', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'touch', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'hey', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'controls', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'dad', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'on', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'indeed', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'switch', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'format', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'feels', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'procedurally', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'great', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'freed', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'fine', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'inspect', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'details', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'last', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'delightful', count: 1, countsInRefs: { a: 1 }, refs: ['a'] }
    ],
    expectedTerms: {
      cells: { term: 'cells', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      game: { term: 'game', count: 1, countsInRefs: { a: 1 }, refs: ['a'] }
    },
    docsToAdd: [
      {
        id: 'b',
        text: `Kero Blaster is just such a good-feeling game. It's mostly no-shading pixel art. No implying 3D, even at the level NES games did. All flat, almost like Atari, but the iconography is just so delightful. And the second state of those two-state sprites hits the spot. The shocked look of guys when they've been hit is adorbs. The look on the main guy's face when he gets an item: also delightful! And the music is so calmly happy.

Anyway, worth playing to feel good!`
      },
      {
        id: 'c',
        text:
          '<a href="https://open.spotify.com/track/6YW4Li4VWR4gc8gwKOd7t7?si=3IOCvPfwQ5KT2BLy3tDjeg">Speed Metal Symphony</a><br><br>Despite the name, it\'s more like guitar virtuosos jamming on some Castlevania.'
      }
    ]
  },
  {
    name: 'Reopening',
    createNewTrackerInTest: true,
    expectedTermsByCount: [
      { term: 'the', count: 4, countsInRefs: { a: 2, b: 2 }, refs: ['a', 'b'] },
      {
        term: 'delightful',
        count: 3,
        countsInRefs: { a: 1, b: 2 },
        refs: ['a', 'b']
      },
      { term: 'hit', count: 3, countsInRefs: { a: 2, b: 1 }, refs: ['a', 'b'] },
      {
        term: 'blaster',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      { term: 'it', count: 2, countsInRefs: { a: 1, b: 1 }, refs: ['a', 'b'] },
      {
        term: 'like',
        count: 2,
        countsInRefs: { b: 1, c: 1 },
        refs: ['b', 'c']
      },
      { term: 'good', count: 2, countsInRefs: { b: 2 }, refs: ['b'] },
      { term: 'really', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'state', count: 2, countsInRefs: { b: 2 }, refs: ['b'] },
      { term: 'know', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'though', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'look', count: 2, countsInRefs: { b: 2 }, refs: ['b'] },
      { term: 'guy', count: 2, countsInRefs: { a: 1, b: 1 }, refs: ['a', 'b'] },
      {
        term: 'even',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      { term: 'br', count: 2, countsInRefs: { c: 2 }, refs: ['c'] },
      { term: 'cheerful', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      { term: 'liked', count: 2, countsInRefs: { a: 2 }, refs: ['a'] },
      {
        term: 'kero',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      { term: 'and', count: 2, countsInRefs: { b: 2 }, refs: ['b'] },
      {
        term: 'level',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      {
        term: 'music',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      {
        term: 'game',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      { term: 'second', count: 1, countsInRefs: { b: 1 }, refs: ['b'] },
      { term: 'button', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      { term: 'castlevania', count: 1, countsInRefs: { c: 1 }, refs: ['c'] }
    ],
    expectedTerms: {
      cells: { term: 'cells', count: 1, countsInRefs: { a: 1 }, refs: ['a'] },
      game: {
        term: 'game',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      blaster: {
        term: 'blaster',
        count: 2,
        countsInRefs: { a: 1, b: 1 },
        refs: ['a', 'b']
      },
      symphony: {
        term: 'symphony',
        count: 1,
        countsInRefs: { c: 1 },
        refs: ['c']
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
    for (var term in testCase.expectedTerms) {
      t.deepEqual(
        tracker.getTerm({ term }),
        testCase.expectedTerms[term],
        'Term entry is correct.'
      );
    }
    if (testCase.docsToAdd) {
      testCase.docsToAdd.forEach(tracker.track);
    }
    tracker.save(checkSaveResult);

    function checkSaveResult(error) {
      assertNoError(t.ok, error, 'No error while calling query method.');
      t.end();
    }
  }
}
