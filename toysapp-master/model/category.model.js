import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true
    }
},{
    versionKey: false
});

export const Category = mongoose.model('category',categorySchema); 