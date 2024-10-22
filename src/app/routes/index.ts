import { Router } from "express";

const router = Router();


// TODO 
const routes = [
    {
        path: "/",
        route: 
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router;