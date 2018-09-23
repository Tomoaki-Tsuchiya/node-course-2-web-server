const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

//registering paritals should be before app.set('view engine')
hbs.registerPartials(__dirname + '/views/partials')
//関数の戻り値を{{fn_Name}}として呼び出す
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
hbs.registerHelper('getUserName', () => {
    return 'Tomo';
})

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date(),toString;
    var log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', '\n' + log, (err) => {
        console.log(err);
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs',{
        pageTitle: 'Now Under Maintenance...',
        pageContent: 'Sorry, this website is under mentainance...'
    })
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Tomo',
    //     place: 'Ricoh',
    //     favorite: [
    //         'curry',
    //         'hamburgers'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome!'
        //name: 'Tomo'
        //これはhbs.regsiterHelperで代替できる
        //currentYear: new Date().getFullYear()
    })

});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page2'
        //これはhbs.regsiterHelperで代替できる
        //currentYear: new Date().getFullYear()        
        //name: 'Tomo'
    });
});

// /bad json is sent back to nofity some error has occurred
app.get('/bad', (req,res) => {
    res.send({
        type: 'Error',
        error: {
            errorCode: 7870,
            errorMessage: 'You have bullied me!! I will curse you'
        }
    });
})

app.listen(port, () => {
    console.log(`app is listening... at ${port}`);
});