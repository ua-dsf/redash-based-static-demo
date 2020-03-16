redash-based-static-demo
========================

A demonstration of different ways to embed / pull data from redash into a client-side only visualization system

## Running locally
```
npm install
npm run serve
```
Note that, for CORS reasons, this will only load the cached `data/example.csv`.
To load live data, you need to deploy the system and access it via WebDAV.

## Running via WebDAV
```
bash pushToDE.sh
```
This relies on icommands, and can be a little finnicky; if it misbehaves, you
might need to upload the relevant files manually (be careful about
`node_modules`; it can be big, and you really only need a couple files inside
that directory!)

Also note that this is very WIP; we still haven't configured the redash server
to allow embedding / serving data that involves query parameters.

## Technology used
This is mostly example code to show what is possible; none of this is mandatory:

- [GoldenLayout](https://golden-layout.com/) (makes user-controlled layouts somewhat painless)
- [uki.js](https://github.com/alex-r-bigelow/uki) (an MVC framework designed to work well with d3.js)
