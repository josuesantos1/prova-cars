import { Router } from "express";
import path from "path";
import multer from 'multer'
import crypto from 'crypto';

import { appEndpoint } from "./endpoints/app";
import { CarsHandler } from "./handlers/cars";
import { FilesHandler } from "./handlers/files";
import { UsersHandler } from "./handlers/users";
import { Auth } from "./libraries/middlewares/auth";
// import { upload } from "./libraries/middlewares/upload";

const router: Router = Router()
const authMiddle = new Auth();

//Routes
router.get("/", appEndpoint.home);

//users routes
router.post("/users", new UsersHandler().create);
router.post("/signin", new UsersHandler().login);

//cars routes
router.get("/cars/:car", new CarsHandler().get);
router.get("/cars", new CarsHandler().listing);

// authorization
router.use(authMiddle.authorization)
router.post("/cars", new CarsHandler().create);
router.put("/cars/:car", new CarsHandler().update);
router.delete("/cars/:car", new CarsHandler().delete);

router.get("/users", new UsersHandler().get);
router.put("/users", new UsersHandler().update);
router.delete("/users", new UsersHandler().delete);


export { router };
