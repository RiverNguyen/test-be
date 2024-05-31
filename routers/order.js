import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrderByUserId,
    getOrders,
    updateOrder,
    updateOrderStatus,
} from "../controllers/order.js";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId", getOrderByUserId);
router.put("/orders/update/:id", updateOrder);
router.put("/orders/update-status/:id", updateOrderStatus);
router.get("/orders/detail/:id", getOrderById);
router.delete("/orders/:id", deleteOrder);

export default router;
