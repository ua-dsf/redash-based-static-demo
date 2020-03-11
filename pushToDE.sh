#!/bin/bash

# root stuff
irsync -v package.json i:redash-demo/package.json
irsync -v controller.js i:redash-demo/controller.js
irsync -v index.html i:redash-demo/index.html
# (small) directories
irsync -rv img i:redash-demo/img
irsync -rv style i:redash-demo/style
irsync -rv utils i:redash-demo/utils
irsync -rv views i:redash-demo/views
# libraries... are apparently too long per this bug: https://github.com/irods/irods/issues/4123
# So for now I have to manually update these in the DE. Yes, really.
# irsync -v node_modules/uki/dist/uki.esm.js i:redash-demo/node_modules/uki/dist/uki.esm.js
# irsync -v node_modules/d3/dist/d3.min.js i:node_modules/d3/dist/d3.min.js
# irsync -v node_modules/less/dist/less.min.js i:node_modules/less/dist/less.min.js
# irsync -v node_modules/jquery/dist/jquery.min.js i:node_modules/jquery/dist/jquery.min.js
# irsync -v node_modules/golden-layout/dist/goldenlayout.min.js i:node_modules/golden-layout/dist/goldenlayout.min.js
