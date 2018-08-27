term-tracker
==================

A persistent record of terms used in documents that can be used for TF-IDF analysis or other purposes.
The backing store is just a JSON file, which is loaded entirely in memory. It's nice and simple and will work for, say, personal blogs, but it's not for gigabytes of data.

Installation
------------

    npm install term-tracker

Usage
-----

    var Tracker = require('term-tracker');

    var tracker = Tracker({ storeFile: __dirname + '/data/terms.json', textProp: 'body' });

		tracker.track({
			id: 'a',
			caption: `Hey, I liked Dead Cells. I'm a limited-video-game-time dad. It is indeed a Metroidvania, a format that I love, but the procedurally generation freed me from thinking I had to inspect every last corner. Plus, I really enjoyed finding healing meats again.

	I think I liked Kero Blaster even more, though. I had tried it on iOS before, but it's just too actiony for touch controls. On Switch, it feels great, and all the fine details are delightful. The little guy blinking when you hit the button to start the level, monsters faces when their hit. The music is really cheerful in that effective SMB2 way, though at first you don't know it's going to be cheerful, if you know what I mean.`
		});

		tracker.track({
			id: 'b',
			text: `Kero Blaster is just such a good-feeling game. It's mostly no-shading pixel art. No implying 3D, even at the level NES games did. All flat, almost like Atari, but the iconography is just so delightful. And the second state of those two-state sprites hits the spot. The shocked look of guys when they've been hit is adorbs. The look on the main guy's face when he gets an item: also delightful! And the music is so calmly happy.

	Anyway, worth playing to feel good!`
		});

		console.log(tracker.getTerm({ term: 'good' }));
		console.log(tracker.getTerm({ term: 'button' }));
		console.log(tracker.getTermsSortedByCount({ limit: 10 }));
		tracker.save(reportError);
		
		function reportError(error) {
			console.log('Error saving term tracker:', error);
		}

Output:

		{ term: 'good', count: 2, countsInRefs: { b: 2 }, refs: ['b'] }
    { term: 'button', count: 1, countsInRefs: { a: 1 }, refs: ['a'] }
		[
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
      { term: 'know', count: 2, countsInRefs: { a: 2 }, refs: ['a'] }
		]
		
The next time you instantiate `Tracker`, the documents 'a' and 'b' will already be accounted for; you do not need to add them again.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2018 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
