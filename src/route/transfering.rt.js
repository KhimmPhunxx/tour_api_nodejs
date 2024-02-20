const ct = require("../controller/transfering.ct");

const transfering = (app,base_route) => {
    app.get(base_route, ct.getAll);
    app.get(base_route + "/:id", ct.getOne);
    app.post(base_route, ct.create);
    app.put(base_route, ct.update);
    app.delete(base_route + "/:id", ct.remove);
}
module.exports = transfering;