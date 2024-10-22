import { Router } from "express";
import { userRouter } from "../model/user/user.route";

const router = Router();


// TODO 
const routes = [
    {
        path: "/authorization",
        route: userRouter
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router;