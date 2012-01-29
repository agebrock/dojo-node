VERSION=release-1.7.1
all:
	echo "FETCHING DOJO - ${VERSION}"
	mkdir ./src -p
	mkdir ./node_modules -p
	rm -rf src/*
	wget -P src "http://download.dojotoolkit.org/${VERSION}/dojo-${VERSION}-src.tar.gz"
	tar -xvf ${PWD}/src/dojo-${VERSION}-src.tar.gz
	mv dojo-${VERSION}-src src/current

clean:
	rm -rf src
	rm -rf node_modules

	
test: all
	node test/test.js
