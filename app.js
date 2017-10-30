const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./config/session.js')(app);

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(favicon('public/images/favicon.ico'));

const routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, () => console.log(`It's port ${port} and ALLLLL'S WELLLLL!`));
