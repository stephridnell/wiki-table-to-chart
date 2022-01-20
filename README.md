# wiki-table-to-chart

## Notes/assumptions/considerations for future dev
- Took a very scrappy approach to this - that's generally how I work on smallish new features, i like to get it working and out to the user then i can clean up the code retroactively. If I spend too much time in the planning stage thinking about OO and design patterns then I'll get really in the weeds and my perfectionism will take over so a scrappy, get-it-working kind of a approach is best for me when wanting to get value to the user quickly. I didn't write any tests, I know TDD is so hot right now but I've never really been good at getting around it.
- So the first consideration for future dev is to write a brand new html to json method because the one I'm using doesn't handle tables within tables very well. For the purpose of this exercise I am assuming only 'flat' tables are going to be used.
- As there can be multiple tables on a page it would be nice to have the titles of the tables - using the library I chose to use this wasn't really feasible. If I used a full webscraper I could probably look for h2/h3 tags preceding table tags to figure out which is which. I chose not to because I didn't want to spend too long on such a feature. I _briefly_ looked into xray's scope param however it didn't really do what I'd like as wikipedia doesn't group areas of content.
- it works fine for the example table given about high jump records buuut testing other URLs for more wack data upended the whole thing...
- my 'wow' feature is a) it looks pretty dope, i designed these blocky buttons for a game i made and now i use them all the time heh and b) the ability to toggle the type of chart and which field to display on the category axis

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
