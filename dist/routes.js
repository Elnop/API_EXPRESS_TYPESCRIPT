"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
function setupRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const routes = yield (0, promises_1.readdir)(`${__dirname}/routes`);
        for (const routeFileName of routes) {
            console.log(`loading ${routeFileName}`);
            let route = require(__dirname + "/routes/" + routeFileName);
            let routeCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let routeRes = yield route.run(req.query, req.body);
                    let status = routeRes.status ? routeRes.status : 200;
                    res.status(status).send(routeRes.message);
                }
                catch (error) {
                    console.error(error);
                    res.status(500).send("server error");
                }
            });
            switch (route.type) {
                case "all":
                    app.all(route.name, routeCallback);
                case "get":
                    app.get(route.name, routeCallback);
                    break;
                case "post":
                    app.post(route.name, routeCallback);
                    break;
                case "put":
                    app.put(route.name, routeCallback);
                    break;
                case "delete":
                    app.delete(route.name, routeCallback);
                    break;
                default:
                    console.error(`can't use type ${route.type}`);
                    break;
            }
            console.log(`route (${route.type}) ${route.name} OK`);
        }
    });
}
exports.default = setupRoutes;
