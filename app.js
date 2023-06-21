//set up the server
const express = require("express");
const logger = require("morgan");
const db = require("./db/db_connection");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const DEBUG = true;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// for parsing 
app.use(bodyParser.urlencoded({ extended: true }));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/views/index.html" );
// });
app.get( "/", ( req, res ) => {
    res.render('index');
});

const read_visualizer_all_sql = `
    SELECT amount,menu_name, price, menu_id
    FROM menu m
`

// define a route for the visualizer list page
app.get( "/visualizer", ( req, res ) => {
    // res.sendFile( __dirname + "/views/visualizer.html" );
    db.execute(read_visualizer_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = { menuorder : results };
            res.render('visualizer', data);
        }
    });
});


const read_details_all_sql = `
    SELECT 
        m.menu_id, m.menu_name, m.menu_desc, m.price, m.order_type, m.amount, GROUP_CONCAT(a.addons_type SEPARATOR ', ') AS addons
    FROM menu m
    LEFT JOIN addons a 
        ON m.menu_id = a.menu_id
    WHERE m.menu_id = ?
    GROUP BY m.menu_id 
    ORDER BY m.menu_id
`
// define a route for the visualizer detail page
app.get( "/visualizer/:id", ( req, res, next ) => {
    // res.sendFile( __dirname + "/views/detail.html" );
    db.execute(read_details_all_sql, [req.params.id], (error, results) => {
         if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            const addons = results[0].addons ? results[0].addons.split(', ') : [];            
            let data = {menu: results[0], addons: addons}; // results is still an array, get first (only) element, array of addons is also passed in
            res.render('detail', data); 
        }
    });
});

// define a route for assignment DELETE
const delete_menu_sql = `
    DELETE m, a
    FROM menu m
    LEFT JOIN addons a
        ON m.menu_id = a.menu_id
    WHERE a.menu_id = ?;
`

const delete_drinks_sql = `
    DELETE 
    FROM menu
    WHERE menu_id = ?
`

app.get("/visualizer/:id/delete", ( req, res ) => {
    if (req.params.id == 2 || req.params.id == 3) {
        db.execute(delete_drinks_sql, [req.params.id], (error, results) => {
            console.log(req.params.id);
            if (DEBUG)
                console.log(error ? error : results);
            if (error)
                res.status(500).send(error); //Internal Server Error
            else {
                res.redirect("/visualizer");
            }
        });
    }

    else {
        db.execute(delete_menu_sql, [req.params.id], (error, results) => {
            console.log(req.params.id);
            if (DEBUG)
                console.log(error ? error : results);
            if (error)
                res.status(500).send(error); //Internal Server Error
            else {
                res.redirect("/visualizer");
            }
        });
    }    
});

// define a route for menu CREATE
const create_menu_sql = `
    INSERT INTO menu 
        (amount, menu_name, price, menu_desc, order_type)
    VALUES 
        (?, ?, ?, ?, ?);
`


app.post("/visualizer", ( req, res ) => {
    console.log(req.body);
    db.execute(create_menu_sql, [req.body.amount, req.body.menu_name, req.body.price, req.body.description, req.body.order_type], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (menu_id) of the newly inserted row.
            res.redirect(`/visualizer/${results.insertId}`);
        }
    });
});

// define a route for assignment UPDATE
const update_menu_sql = `
    UPDATE
        menu, addons
    SET
        order_type = ?,
        amount = ?, 
        addons_type = ?
    WHERE
        menu.menu_id = ?
`

const delete_addons_sql = `
    DELETE
    FROM 
        addons
    WHERE
        menu_id = ?
`

app.post("/visualizer/:id", ( req, res ) => { 
    console.log("reqbod:");
    console.log(req.body); 
    console.log("param id:");
    console.log(req.params.id);
    db.execute(update_menu_sql, [req.body.ingredients, req.body.amount, req.body.addons, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else { 
            res.redirect(`/visualizer/${req.params.id}`);
        }
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
});