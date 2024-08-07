import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
        },
        gallery: {
            type: Array,
        },
        description: {
            type: String,
        },
        discount: {
            type: Number,
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        countInStock: {
            type: Number,
            default: 0,
        },
        tags: {
            type: Array,
        },
        attributes: [
            {
                color: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ValueAttribute",
                },
                sizes: [
                    {
                        size: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "ValueAttribute",
                        },
                        quantity: {
                            type: Number,
                            default: 0,
                        },
                    },
                ],
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
