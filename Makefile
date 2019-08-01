PROJECT=seafile-editor

dist: clean transpile postdist

transpile:
	@echo "--> Compile dist"
	export NODE_ENV=production && node_modules/@babel/cli/bin/babel.js src --out-dir dist
	@echo ""

postdist:
	@echo "--> Copy css and remove config.js"
	# cp -r src/css dist && rm dist/config.js
	# cp -r src/assets dist

clean:
	@echo '--> Cleaning dist'
	# rm -rf dist/* 2> /dev/null
	@echo ""


.PHONY: transpile postdist clean
