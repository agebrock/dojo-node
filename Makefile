VERSION=release-1.7.2
install:
	echo "FETCHING DOJO - ${VERSION}"
	mkdir -p ./src 
	mkdir -p ./node_modules 
	rm -rf src/*
	wget -P src "http://download.dojotoolkit.org/${VERSION}/dojo-${VERSION}-src.tar.gz"
	tar -xvf ${PWD}/src/dojo-${VERSION}-src.tar.gz
	mv dojo-${VERSION}-src src/current

clean:
	rm -rf src
	rm -rf node_modules

	
test: all
	node test/test.js
