const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors'); 

server.use(cors());
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
    static: "./build"
});

const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
    })
);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
