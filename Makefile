test:
	rm -rf tests/fixtures/test.json
	node tests/basictests.js
	rm -rf tests/fixtures/test.json
	node tests/preparsed-words-tests.js

prettier:
	prettier --single-quote --write "**/*.js"

pushall:
	git push origin master && npm publish
