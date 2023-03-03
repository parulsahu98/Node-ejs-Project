import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    productList:[
        {
            productId: mongoose.Schema.ObjectId,
            productName: String,
            productPrice: Number,
            productImage: String
        }
    ]
})
export const Cart  = mongoose.model("cart",cartSchema);