test:
	rm -rf tests/fixtures/test.json
	node tests/basictests.js

prettier:
	prettier --single-quote --write "**/*.js"

pushall:
	git push origin master && npm publish
