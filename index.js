var natural = require('natural');
var findWhere = require('lodash.findwhere');
var curry = require('lodash.curry');
var fs = require('fs-extra');
var stopwords = require('./data/nltk-stop-words.json')
  .concat(require('./data/stopwords-json-stop-words.json'))
  .concat(require('./data/extra-stop-words.json'));

var tokenizer = new natural.WordTokenizer();

// Storage format: It's a JSON file with an array of these things:
// {
//   term: 'something',
//   count: 3,
//   countsInRefs: {
//     docIdA: 1,
//     docIdB: 2
//   },
//   refs: [ docIdA, docIdB ]
// }

function TermTracker({ storeFile, textProp = 'text' }) {
  fs.ensureFileSync(storeFile);
  var storeContents = fs.readFileSync(storeFile, { encoding: 'utf8' });
  if (storeContents) {
    var { trackos, docMetadata } = JSON.parse(storeContents);
  }
  if (!trackos) {
    trackos = [];
  }
  if (!docMetadata) {
    docMetadata = [];
  }

  return {
    track,
    getTermsSortedByCount,
    getTerm,
    getDocMeta,
    save
  };

  function track(doc) {
    var text = doc[textProp];
    if (!text) {
      return;
    }
    var terms = tokenizer.tokenize(text);
    terms = terms.filter(shouldInclude).map(normalize);
    terms.forEach(curry(updateTracko)(doc));

    trackos.sort(aGoesBeforeB);

    var metadatum = {
      id: doc.id,
      termCount: terms.length,
      countsPerTerm: {}
    };
    terms.forEach(countTermInMetadatum);
    docMetadata.push(metadatum);

    function countTermInMetadatum(term) {
      var count = metadatum.countsPerTerm[term];
      if (isNaN(count)) {
        count = 0;
      }
      count += 1;
      metadatum.countsPerTerm[term] = count;
    }
  }

  function updateTracko(doc, term) {
    var tracko = findWhere(trackos, { term });
    if (!tracko) {
      tracko = {
        term,
        count: 0,
        countsInRefs: {},
        refs: []
      };
      trackos.push(tracko);
    }
    tracko.count += 1;
    var refCount = tracko.countsInRefs[doc.id];
    if (refCount === undefined) {
      refCount = 0;
    }
    refCount += 1;
    if (tracko.refs.indexOf(doc.id) === -1) {
      tracko.refs.push(doc.id);
    }
    tracko.countsInRefs[doc.id] = refCount;
  }

  function getTerm({ term }) {
    return findWhere(trackos, { term });
  }

  function getDocMeta({ id }) {
    return findWhere(docMetadata, { id });
  }

  function getTermsSortedByCount(opts) {
    return trackos.slice(0, (opts && opts.limit) || 25);
  }

  function save(done) {
    fs.writeFile(
      storeFile,
      JSON.stringify({ trackos, docMetadata }, null, 2),
      { encoding: 'utf8' },
      done
    );
  }
}

function aGoesBeforeB(a, b) {
  if (a.count > b.count) {
    return -1;
  } else {
    return 1;
  }
}

function shouldInclude(term) {
  return term.length > 1 && stopwords.indexOf(term) === -1;
}

function normalize(term) {
  return term.toLowerCase();
}

module.exports = TermTracker;
