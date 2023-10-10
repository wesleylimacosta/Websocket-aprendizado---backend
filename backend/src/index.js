
//Para ambiente de desenvolvimento
const http = require('http');
const socketio = require('socket.io');
const {logger} = require('./util');
const Routes = require('./routes');
const PORT = 3000;

const handler = function (req, res) {
    const defaultRoute = async (req,res) => res.end('Hello World');
    const routes = new Routes(io);
    const chosen = routes[req.method.toLowerCase()] || defaultRoute;

    return chosen.apply(routes,[req,res]);
}

const server = http.createServer(handler);
const io = socketio(server,{
    cors: {
        origin: '*',
        
        credentials: false,
    }
});
io.on('connection', socket => logger.info("Connected", socket.id));

const startServer = () => {
    const { address, port} = server.address();
   logger.info(`Server is running at port http://${address}:${PORT}`);
}

server.listen(PORT, startServer)
