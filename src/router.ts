import { Router } from "express";
import { appEndpoint } from "./endpoints/app";
import { CarsHandler } from "./handlers/cars";
import { UsersHandler } from "./handlers/users";

const router: Router = Router()

//Routes
router.get("/", appEndpoint.home);

//users routes
router.post("/users", new UsersHandler().create);
router.get("/users/:user", new UsersHandler().get);
router.put("/users/:user", new UsersHandler().update);
router.delete("/users/:user", new UsersHandler().delete);

//cars routes
router.post("/cars", new CarsHandler().create);
router.get("/cars/:car", new CarsHandler().get);
router.put("/cars/:car", new CarsHandler().update);
router.delete("/cars/:car", new CarsHandler().delete);

export { router };
