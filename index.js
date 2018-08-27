var Sublevel = require('level-sublevel');
var util = require('util');
var sb = require('standard-bail');
var natural = require('natural');

var tokenize = (new natural.WordTokenizer).tokenize;

function TermTracker({ db, textProp = 'text' }) {
	var sblDb = Sublevel(db);
	var entriesByTerm = sblDb.sublevel('entriesByTerm');
	var termsByCount = sblDb.sublevel('termsByCount');
	var docsById = sblDb.sublevel('docsById');

	return {
		track,
		getTermsSortedByCount,
		getTerm
	};

	async function track(doc, done) {
		var terms = tokenize(doc[textProp]);
		try {
			await incrementTermCountsPromise(terms);
			await updateTermEntries(terms, doc);
		} catch (error) {
			// This isn't going to have a meaningful stack. :[
			done(error);
		}
  }

	// These must be done in serial.
	function incrementTermCounts(terms, done) {
	}

	// These can be done in parallel.
	function updateTermEntries(terms, docs, done) {
	}

		// Update the counts and the entries.

		forgivingGet(entriesByTerm, doc.id, sb(updateEntry, done));

		function updateEntry(entry) {
			if (!entry) {
				entriesByTerm.put(doc.
		if (existingEntry) {
			
		entriesByTerm.get(branchOnEntry);

		funcio
	}
}

function forgivingGet(db, id, done) {
	db.get(id, evaluateResult);

	function evaluateResult(error, record) {
		if (!error || error.type === 'NotFoundError') {
			done(null, record);
		}
		else {
			done(error, record);
		}
	}
}
