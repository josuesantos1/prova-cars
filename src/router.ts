import { Router } from "express";
import { appEndpoint } from "./endpoints/app";

const router: Router = Router()

//Routes
router.get("/", appEndpoint.home);

export { router };
