# wiki-table-to-chart

## Notes/assumptions/considerations for future dev
- So the first consideration for future dev is to write a brand new html to json method because the one I'm using doesn't handle tables within tables very well. For the purpose of this exercise I am assuming only 'flat' tables are going to be used.
- As there can be multiple tables on a page it would be nice to have the titles of the tables - using the library I chose to use this wasn't really feasible. If I used a full webscraper I could probably look for h2/h3 tags preceding table tags to figure out which is which. I chose not to because I didn't want to spend too long on such a feature. I _briefly_ looked into xray's scope param however it didn't really do what I'd like as wikipedia doesn't group areas of content.
- so it works fine for the example table given about high jump records buuut testing other URLs for more wack data upended the whole thing...

--------

## How to run
### Frontend
`client` folder
#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

### Backend
`server` folder
#### Project setup
```
npm install
```
#### Compiles and hot-reloads for development
```
npm run serve
```
