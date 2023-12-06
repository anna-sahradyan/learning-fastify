const fastify = require("fastify")({logger: true});
const PORT = 5000;
 const items = require("./Items");

fastify.get('/items', (req, reply) => {
    reply.send(items);
});
fastify.get('/items/:id', (req, reply) => {

    let {id} = req.params;
    reply.send(items)

});
const start = async () => {
    try {
        await fastify.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();
