import { Router } from "express";
import sportsRouter from "../sports/sports.routes";



const router = Router();

const moduleRoutes = [  
  {
    path: "/sports",
    route: sportsRouter,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
