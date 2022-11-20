const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const spawn = require('child_process').spawn;
const TAFFY = require( 'taffydb' ).taffy;

const elements = require('./data/elemetsProd.json');
const app = express();

var db = TAFFY([
    {
      'data': [[], []],
      'name': 'configuration'
    }
  ]);

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 3000;

app.get('/', (req, res) => {
    res.redirect('/workplace');
})

app.get('/workplace', (req, res) => {
    res.render('workplace', { elements });
})

app.post('/workplace', async (req, res) => {
    var config = JSON.parse(req.body.dataForSending);
    console.log(req.body.dataForSending);
    var pageID = Math.random().toString(36).slice(2);
    await db({name: 'configuration'}).update({data: config.data, pageID: pageID, frequency: config.frequency, shape: config.shape, voltage: config.voltage});
    res.redirect(302, `/showdata/${pageID}`);
})

app.get('/showdata/:id', async (req, res) => {
    var config = await db().first();
    console.log(JSON.stringify(config));
    if (config.pageID === 'not_relevant' || req.params.id !== config.pageID) {
        res.redirect('/workplace');
    } else {
        var configurator = await spawn("python", ["./configurator.py", JSON.stringify(config)]);
        await db({name: 'configuration'}).update({pageID: 'not_relevant'});
        await configurator.stdout.on("data", function(data){
            var collectedData
            collectedData = data.toString();
            res.render('showdata', { collectedData });
        });
    }
})

app.post('/showdata', async (req, res) => {
    var config = await db().first();
    var pageID = Math.random().toString(36).slice(2);
    await db({name: 'configuration'}).update({pageID: pageID});
    res.redirect(302, `/showdata/${pageID}`);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})