const express = require('express');
const logger = require('winston');

/**
 * setup
 */
const PROJECT_ROOT_DIR = process.cwd();
const STATIC_DIR = `${PROJECT_ROOT_DIR}/target`;

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || PORT);

app.use(require('morgan')('dev'));
app.use(express.static(STATIC_DIR));

/**
 * router
 */
const router = new express.Router();

router.get('*',(req,res)=>{
    res.sendFile(`${STATIC_DIR}/index.html`);
})

app.use(router);