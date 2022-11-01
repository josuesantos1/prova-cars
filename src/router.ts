import { Router } from "express";
import cors from 'cors'


import { appEndpoint } from "./endpoints/app";
import { CarsHandler } from "./handlers/cars";
import { FilesHandler } from "./handlers/files";
import { UsersHandler } from "./handlers/users";
import { Auth } from "./libraries/middlewares/auth";
import { upload } from "./libraries/middlewares/upload";
// import { upload } from "./libraries/middlewares/upload";

const router: Router = Router()
const authMiddle = new Auth();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

router.use(cors(corsOptions))

//Routes
router.get("/", appEndpoint.home);

//users routes
router.post("/users", new UsersHandler().create);
router.post("/signin", new UsersHandler().login);

//cars routes
router.get("/cars/:car", new CarsHandler().get);
router.get("/cars", new CarsHandler().listing);

// file
router.get("/files/:file", new FilesHandler().view)

// authorization
router.use(authMiddle.authorization)
router.post("/cars", new CarsHandler().create);
router.put("/cars/:car", new CarsHandler().update);
router.delete("/cars/:car", new CarsHandler().delete);

router.get("/users", new UsersHandler().get);
router.put("/users", new UsersHandler().update);
router.delete("/users", new UsersHandler().delete);

router.post("/files", upload.single('image'), new FilesHandler().upload)

export { router };
