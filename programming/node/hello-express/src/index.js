var says = [
    "Gone the saint",
    "Past is past",
    "Back is back",
    "Live in fortune",
];

var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({ defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
console.log(__dirname + "/public");

app.get("/", (req, res) => {
    // res.type("text/plain");
    // res.send("Sk. Ag.");
    res.render("home");
});

app.get("/about", (req, res) => {
    // res.type("text/plain");
    // res.send("About Us");
    var randomSay = says[Math.floor(Math.random()*says.length)];
    res.render("about", {say: randomSay});
});

app.get("/reqhead", (req, res) => {
    var s = "";
    for (var c in req.headers) {
        s += c + " -> " + req.headers[c] + "\n";
    }
    res.type("text/plain");
    res.send(s);
});

app.use( (req, res) => {
    // res.type("text/plain");
    res.status(404);
    // res.send("404 - Not Found");
    res.render("404");
});

app.use( (err, req, res, next) => {
    console.error(err.stack);
    // res.type("text/plain");
    res.status(500);
    // res.send("500 - Server Error");
    res.render("500");
});

app.listen(app.get("port"), () => {
    console.log("Express started on http://localhost:" + 
        app.get("port") + "; press Ctrl-C to terminate");
});
