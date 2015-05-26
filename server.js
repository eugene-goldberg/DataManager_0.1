// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var multer  = require('multer');
var bodyParser     = require('body-parser');
var myParser = require("excel-file-parser");
var methodOverride = require('method-override');

// configuration ===========================================

// Add headers
//app.use(function (req, res, next) {
//
//    // Website you wish to allow to connect
//    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true);
//
//    // Pass to next layer of middleware
//    next();
//});
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        fileName = file.name;
        done=true;
    }
}));


app.post('/api/files',function(req,res){
    var tabname = req.body.tabName;
    var metadataFields = {
        originalDocumentName: req.body.originalDocumentName,
        subjectCategory: req.body.subjectCategory,
        subject: req.body.subject,
        documentAuthor: req.body.documentAuthor,
        dateDocumentProduced: req.body.dateDocumentProduced,
        dateDocumentReceived: req.body.dateDocumentReceived,
        documentSubmitter: req.body.documentSubmitter,
        documentReviewer: req.body.documentReviewer,
        dataFields: req.body.dataFields
};
    myParser.excelFileParser(fileName, tabname, metadataFields);
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app