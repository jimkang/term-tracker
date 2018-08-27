term-tracker
==================

A persistent record of terms used in documents that can be used for TF-IDF analysis or other purposes.The backing store is any [levelup](https://github.com/Level/levelup)-API-compatible (e.g. levelup, leveljs) DB.

Given an object, it will add to a text file record of terms. The object should look like this:

    {
      id: 'some-unique-id',
      text: 'Here is some text.'
    }

The record will track for each term:

- How many times the term was used.
- The object ids of the objects that used that term.

Installation
------------

    npm install term-tracker

Usage
-----

    var Tracker = require('term-tracker');
    var level = require('level');

    var db = level(__dirname + '/terms.db');
    Tracker({ db }, useTracker);

    function useTracker(error, tracker) {
      if (error) {
        console.log('Error creating tracker:', error);
        return;
      }

      var q = queue(1);
      // Adding more than one document at time is not supported.
      q.defer(tracker.track, { id: 'a', text: 'Hello, this is a body of text.' });
      q.defer(tracker.track, { id: 'b', text: 'Welcome to a term tracker that counts words in text.' });
      q.awaitAll(report);

      function report(error) {
        if (error) {
          console.log('Error adding documents:', error);
          return;
        }
        
        tracker.termsSortedByCount({ limit: 100 }, logTermsByCount);
        tracker.getTerm({ term: 'text' }, logEntry);
      }
    }

This should log something like:

    [
      { term: 'text', count: 2, refs: ['a', 'b'] },
      { term: 'hello', count: 1, refs: ['a'] }
    ]

And:
    
    { term: 'text', count: 2, refs: ['a', 'b'] }

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
