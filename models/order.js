import mongoose from "mongoose";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};

const orderItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        items: [orderItemSchema],
        orderNumber: {
            type: String,
            auto: true,
            unique: true,
        },
        customerInfo: {
            type: {
                customerName: {
                    type: String,
                    required: true,
                },
                customerPhone: {
                    type: String,
                    required: true,
                },
            },
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: [
                "đang xử lý",
                "đã xác nhận",
                "đang vận chuyển",
                "đã giao",
                "đã huỷ",
            ],
            default: "đang xử lý",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
orderSchema.pre("save", function (next) {
    if (!this.orderNumber) {
        this.orderNumber = generateOrderNumber();
    }
    next();
});
export default mongoose.model("Order", orderSchema);
