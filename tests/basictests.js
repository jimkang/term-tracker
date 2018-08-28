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
    expectedDocs: {
      a: {
        id: 'a',
        termCount: 71,
        countsPerTerm: {
          hey: 1,
          liked: 2,
          dead: 1,
          cells: 1,
          limited: 1,
          video: 1,
          game: 1,
          time: 1,
          dad: 1,
          it: 1,
          indeed: 1,
          metroidvania: 1,
          format: 1,
          love: 1,
          procedurally: 1,
          generation: 1,
          freed: 1,
          thinking: 1,
          inspect: 1,
          every: 1,
          last: 1,
          corner: 1,
          plus: 1,
          really: 2,
          enjoyed: 1,
          finding: 1,
          healing: 1,
          meats: 1,
          think: 1,
          kero: 1,
          blaster: 1,
          even: 1,
          though: 2,
          tried: 1,
          ios: 1,
          actiony: 1,
          touch: 1,
          controls: 1,
          on: 1,
          switch: 1,
          feels: 1,
          great: 1,
          fine: 1,
          details: 1,
          delightful: 1,
          the: 2,
          little: 1,
          guy: 1,
          blinking: 1,
          hit: 2,
          button: 1,
          start: 1,
          level: 1,
          monsters: 1,
          faces: 1,
          music: 1,
          cheerful: 2,
          effective: 1,
          smb2: 1,
          way: 1,
          first: 1,
          know: 2,
          going: 1,
          mean: 1
        }
      }
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
    },
    expectedDocs: {
      a: {
        id: 'a',
        termCount: 71,
        countsPerTerm: {
          hey: 1,
          liked: 2,
          dead: 1,
          cells: 1,
          limited: 1,
          video: 1,
          game: 1,
          time: 1,
          dad: 1,
          it: 1,
          indeed: 1,
          metroidvania: 1,
          format: 1,
          love: 1,
          procedurally: 1,
          generation: 1,
          freed: 1,
          thinking: 1,
          inspect: 1,
          every: 1,
          last: 1,
          corner: 1,
          plus: 1,
          really: 2,
          enjoyed: 1,
          finding: 1,
          healing: 1,
          meats: 1,
          think: 1,
          kero: 1,
          blaster: 1,
          even: 1,
          though: 2,
          tried: 1,
          ios: 1,
          actiony: 1,
          touch: 1,
          controls: 1,
          on: 1,
          switch: 1,
          feels: 1,
          great: 1,
          fine: 1,
          details: 1,
          delightful: 1,
          the: 2,
          little: 1,
          guy: 1,
          blinking: 1,
          hit: 2,
          button: 1,
          start: 1,
          level: 1,
          monsters: 1,
          faces: 1,
          music: 1,
          cheerful: 2,
          effective: 1,
          smb2: 1,
          way: 1,
          first: 1,
          know: 2,
          going: 1,
          mean: 1
        }
      },
      b: {
        id: 'b',
        termCount: 56,
        countsPerTerm: {
          kero: 1,
          blaster: 1,
          good: 2,
          feeling: 1,
          game: 1,
          it: 1,
          mostly: 1,
          shading: 1,
          pixel: 1,
          art: 1,
          no: 1,
          implying: 1,
          '3d': 1,
          even: 1,
          level: 1,
          nes: 1,
          games: 1,
          all: 1,
          flat: 1,
          almost: 1,
          like: 1,
          atari: 1,
          iconography: 1,
          delightful: 2,
          and: 2,
          second: 1,
          state: 2,
          two: 1,
          sprites: 1,
          hits: 1,
          spot: 1,
          the: 2,
          shocked: 1,
          look: 2,
          guys: 1,
          hit: 1,
          adorbs: 1,
          main: 1,
          guy: 1,
          face: 1,
          gets: 1,
          item: 1,
          also: 1,
          music: 1,
          calmly: 1,
          happy: 1,
          anyway: 1,
          worth: 1,
          playing: 1,
          feel: 1
        }
      },
      c: {
        id: 'c',
        termCount: 21,
        countsPerTerm: {
          href: 1,
          https: 1,
          open: 1,
          spotify: 1,
          com: 1,
          track: 1,
          '6yw4li4vwr4gc8gwkod7t7': 1,
          si: 1,
          '3iocvpfwq5kt2bly3tdjeg': 1,
          speed: 1,
          metal: 1,
          symphony: 1,
          br: 2,
          despite: 1,
          name: 1,
          like: 1,
          guitar: 1,
          virtuosos: 1,
          jamming: 1,
          castlevania: 1
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
