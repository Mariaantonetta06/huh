var express = require("express");
var db = require('./db-connections');
var app = express();
app.use(express.json());
 //static files are to be served from the public folder - for eg. html, images, css
 app.use(express.static("./public"));

 app.route('/testjson').get(function (req, res) {

    res.json({ message:'Welcome to my server'});
});

app.route('/testtext').get(function (req, res) {

    res.send("This message is not a json");
});


app.route("/restaurant").get(function (req,res){
    // SQL query to fetch all records from the 'RESTAURANT' table
    var sql =  "SELECT * FROM RESTAURANT_REVIEW.RESTAURANT";
    // Perform database query
    db.query(sql, function(error, result){ // Execute the query on the database
        if(error) // Check for any errors in the query
        {
            throw error; // If there is an error, throw it (this will crash the app)
        }
        else{
            res.json(result);// If the query is successful, send the results as a JSON response
        }
    });

});

//api to get restaurant based on a specific ID
app.route("/restaurant/:id").get(function (req,res){
    //code to perform the database query to a specific restaurant details
    var sql =  "SELECT * FROM RESTAURANT_REVIEW.RESTAURANT WHERE id = ?";
    var parameter = [req.params.id];

    //Perform database query
    db.query(sql, parameter, function(error, result){
        if(error)
        {
            throw error;
        }
        else{
            res.json(result);
        }
    });

});

//restaurant post to insert data
app.route("/restaurant").post(function (req,res){
    //sql to insert data into restaurant table
    var sql = "INSERT INTO RESTAURANT_REVIEW.RESTAURANT (name, address, description, rating, cuisine_type, opening_date, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var parameter = [req.body.name, req.body.address, req.body.description, req.body.rating, req.body.cuisine_type, req.body.opening_date, req.body.image_url];
    //Perform database query
    db.query(sql, parameter, function(error, result){
        if(error)
        {
            throw error;
        }
        else{
            res.json(result);
        }
    });

});

//restaurant put to update data
app.route("/restaurant/:id").put(function (req,res){
    var sql = "UPDATE RESTAURANT_REVIEW.RESTAURANT SET name = ?, address = ? , description = ?, rating = ? , cuisine_type = ?, opening_date = ?, image_url = ? WHERE ID = ?";

    var parameter = [req.body.name, req.body.address, req.body.description, req.body.rating, req.body.cuisine_type, req.body.opening_date, req.body.image_url, req.params.id]

    //Perform database query
    db.query(sql, parameter, function(error, result){
        if(error)
        {
            throw error;
        }
        else{
            res.json(result);
        }
    });

});


//restaurant delete 
app.route("/restaurant/:id").delete(function (req,res){
    var sql = "DELETE FROM RESTAURANT_REVIEW.RESTAURANT WHERE id = ?";
    var parameter = [req.params.id];
    //Perform database query
    db.query(sql, parameter, function(error, result){
        if(error)
        {
            throw error;
        }
        else{
            res.json(result);
        }
    });
    
});

app.listen(8080, "127.0.0.1");
console.log("Webserver is started on http://127.0.0.1:8080");