import Order from "../models/order.js";
import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, customerInfo } = req.body;
        const order = await Order.create({
            userId,
            items,
            totalPrice,
            customerInfo,
        });
        await Cart.findOneAndUpdate(
            { userId: userId },
            { $set: { products: [] } },
            { new: true }
        );
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const getOrders = async (req, res) => {
    try {
        const order = await Order.find();
        if (order.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "No orders found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const order = await Order.find({ userId });
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }
        return res.status(StatusCodes.OK).json(order.items);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
            new: true,
        });
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const validStatus = [
            "đang xử lý",
            "đã xác nhận",
            "đang vận chuyển",
            "đã giao",
            "đã huỷ",
        ];

        if (!validStatus.includes(status)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Invalid status" });
        }

        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }

        if (order.status === "đang vận chuyển" || order.status === "đã giao") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Không thể xóa đơn hàng đã vận chuyển, đã giao",
            });
        }
        if (order.status === "đã huỷ") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Không thể thay đổi trạng thái đơn hàng đã huỷ",
            });
        }
        order.status = status;
        await order.save();

        return res
            .status(StatusCodes.OK)
            .json({ message: "Order status updated successfully" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Order not found" });
        }

        if (
            order.status === "đang vận chuyển" ||
            order.status === "đã giao" ||
            order.status === "đã xác nhận"
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Không thể xóa đơn hàng đã vận chuyển, đã giao hoặc đã xác nhận",
            });
        }

        await Order.findByIdAndDelete(req.params.id);

        return res
            .status(StatusCodes.OK)
            .json({ message: "Huỷ đơn hàng thành công !" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
