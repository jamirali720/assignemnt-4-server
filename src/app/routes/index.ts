import { Router } from "express";
import sportsRouter from "../sports/sports.routes";
import paymentRouter from "../payment/payment.router";
import ordersRouter from "../orders/order.routes";
import teamRouter from "../team/team.routes";

//Define routes
const router = Router();

const moduleRoutes = [  
  {
    path: "/sports",
    route: sportsRouter,
  },
  {
    path: "/sports",
    route:  paymentRouter,
  },
  {
    path: "/orders",
    route:  ordersRouter,
  },
  {
    path: "/teams",
    route:  teamRouter,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
