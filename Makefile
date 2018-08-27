test:
	mkdir -p tests/fixtures/test.db
	rm -rf tests/fixtures/test.db/*
	node tests/basictests.js

prettier:
	prettier --single-quote --write "**/*.js"

pushall:
	git push origin master && npm publish
