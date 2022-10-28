import { Router } from "express";
import { appEndpoint } from "./endpoints/app";
import { UsersHandler } from "./handlers/users";

const router: Router = Router()

//Routes
router.get("/", appEndpoint.home);

//users routes
router.post("/users", new UsersHandler().create);
router.get("/users/:user", new UsersHandler().get);

export { router };
