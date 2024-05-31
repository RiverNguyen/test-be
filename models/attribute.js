import mongoose, { Schema } from "mongoose";
const ValueAttributeSchema = new Schema(
    {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
        },
    },
    { timestamps: false, versionKey: false }
);
ValueAttributeSchema.pre("save", function (next) {
    if (this.isNew) {
        this.label = this.value;
    }
    next();
});
export const ValueAttributeModel = mongoose.model(
    "ValueAttribute",
    ValueAttributeSchema
);

const AttributeSchema = new Schema(
    {
        value: {
            type: String,
            required: true,
            unique: true,
        },
        label: {
            type: String,
        },
        values: [
            {
                type: Schema.Types.ObjectId,
                ref: "ValueAttribute",
            },
        ],
    },
    { timestamps: false, versionKey: false }
);
AttributeSchema.pre("save", function (next) {
    if (this.isNew) {
        this.label = this.value;
    }
    next();
});

export default mongoose.model("Attribute", AttributeSchema);
