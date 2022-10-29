import { Router } from "express";
import { appEndpoint } from "./endpoints/app";
import { CarsHandler } from "./handlers/cars";
import { UsersHandler } from "./handlers/users";
import { Auth } from "./libraries/middlewares/auth";

const router: Router = Router()
const authMiddle = new Auth();

//Routes
router.get("/", appEndpoint.home);

//users routes
router.post("/users", new UsersHandler().create);
router.post("/signin", new UsersHandler().login);

//cars routes
router.get("/cars/:car", new CarsHandler().get);

// authorization
router.use(authMiddle.authorization)
router.post("/cars", new CarsHandler().create);
router.put("/cars/:car", new CarsHandler().update);
router.delete("/cars/:car", new CarsHandler().delete);

router.get("/users/:user", new UsersHandler().get);
router.put("/users/:user", new UsersHandler().update);
router.delete("/users/:user", new UsersHandler().delete);


export { router };
