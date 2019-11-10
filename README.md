# kk6gpv-flask
goal will be to re-create kk6gpv.net as a flask site

[![build status](https://img.shields.io/circleci/build/gh/areed145/kk6gpv-flask)](https://circleci.com/gh/areed145/kk6gpv-flask)     [![size](https://img.shields.io/github/repo-size/areed145/kk6gpv-flask)](https://github.com/areed145/kk6gpv-flask)     [![Coverage Status](https://coveralls.io/repos/github/areed145/kk6gpv-flask/badge.svg?branch=master)](https://coveralls.io/github/areed145/kk6gpv-flask?branch=master)

## stack
- python
- mongodb
- flask
- boostrap
- plotly
- mapbox
- datashader
- mqtt

## structure
- weather
    - station
    - aviation
    - blips
    - soundings
    - random
- iot
    - home assistant
    - vibration protocol
- aprs
    - prefix
    - entry
    - radius
- flying
    - aircraft
    - paragliding
    - sailplane
    - n5777v
- photos
    - travel
    - flickr gallery
- oil & gas
     - doggr application

## todo
- UI
- rebuild flickr photo gallery functionality
- move gallery listing to db
- figure out how to add raster layers to maps (leaflet? instaead of plotly for mapbox)
- builder like blog for writing about projects
- details pages for APRS info
- styling
- optimize deployment

## done
- add old mongodb data (delete incorrect, load correct)
- move to kubernetes cluster
- incorporate fetchers
- incorporate Plotly.react in other plots
- port DOGGR data
- convert time queries to date range
- connect to mongodb
- live updating plots
- rebuild flickr gallery functionality
- add weather maps
- multi-services in kubernetes?
- add station weather plots
- move to local mongodb
