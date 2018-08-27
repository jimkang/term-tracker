/* global __dirname */

var test = require('tape');
var assertNoError = require('assert-no-error');
var Tracker = require('../index');
var level = require('level');
var util = require('util');

const dbLocation = __dirname + '/fixtures/test.db';
var db;

var testCases = [
  {
    name: 'Initial state',
    openDBInTest: true,
    expectedTermsByCount: [],
    expectedTerms: {
      cells: null
    },
    textProp: 'caption',
    docsToAdd: [
      { id: 'a', caption: `Hey, I liked Dead Cells. I'm a limited-video-game-time dad. It is indeed a Metroidvania, a format that I love, but the procedurally generation freed me from thinking I had to inspect every last corner. Plus, I really enjoyed finding healing meats again.

I think I liked Kero Blaster even more, though. I had tried it on iOS before, but it's just too actiony for touch controls. On Switch, it feels great, and all the fine details are delightful. The little guy blinking when you hit the button to start the level, monsters faces when their hit. The music is really cheerful in that effective SMB2 way, though at first you don't know it's going to be cheerful, if you know what I mean.` }
    ]
  },
  {
    name: 'Add more records',
    expectedTermsByCount: [],
    expectedTerms: {
      cells: null,
      game: { }
    },
    docsToAdd: [
      { id: 'b', text: `Kero Blaster is just such a good-feeling game. It's mostly no-shading pixel art. No implying 3D, even at the level NES games did. All flat, almost like Atari, but the iconography is just so delightful. And the second state of those two-state sprites hits the spot. The shocked look of guys when they've been hit is adorbs. The look on the main guy's face when he gets an item: also delightful! And the music is so calmly happy.

Anyway, worth playing to feel good!` },
      { id: 'c', text: '<a href="https://open.spotify.com/track/6YW4Li4VWR4gc8gwKOd7t7?si=3IOCvPfwQ5KT2BLy3tDjeg">Speed Metal Symphony</a><br><br>Despite the name, it\'s more like guitar virtuosos jamming on some Castlevania.' }
    ],
    closeDBAfterTests: true
  },
  {
    name: 'Reopening',
    openDBInTest: true,
    expectedTermsByCount: [],
    expectedTerms: {
      cells: null,
      game: {},
      Symphony: {}
    },
    closeDBAfterTests: true 
  }
];

testCases.forEach(runCase);

function runCase(testCase) {
  test(testCase.name, runTest);

  async function runTest(t) {
    if (testCase.openDBInTest) {
      db = level(dbLocation, { valueEncoding: 'json' });
    }

    var trackerOpts = { db };
    if (testCase.textProp) {
      trackerOpts.textProp = testCase.textProp;
    } 
    var tracker = Tracker(trackerOpts);

    try {
      var termsSorted = await util.promisify(tracker.termsSortedByCount)();
      t.deepEqual(termsSorted, testCase.expectedTermsByCount, 'Sorted terms are correct.');
      for (var term in testCase.expectedTerms) {
        let entry = await util.promisify(tracker.getTerm)({ term: 'text' });
        t.deepEqual(entry, testCase.expectedTerms[term], 'Term entry is correct.');
      }
      for (let i = 0; i < testCase.docsToAdd.length; ++i) {
        await util.promisify(tracker.track)(testCase.docsToAdd[i]);
        t.pass(`Added doc with id ${testCase.docsToAdd[i].id}.`);
      }
    } catch (error) {
      assertNoError(t.ok, error, 'No error while calling query method.');
    }
    
    if (testCase.closeDbAfterTests) {
      db.close(t.end);
    } else {
      t.end();
    }
  }
}
