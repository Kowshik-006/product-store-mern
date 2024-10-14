import mongoose from "mongoose";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
const getProducts = asyncHandler(async(req,res)=>{
    try{
        const products = await Product.find();
        if(!products){
            res.status(404).json({success: false, message: "No products found"});
        }
        res.status(200).json({success: true, data: products});
    }catch(error){
        console.error("Error in getting products: ", error);
        res.status(500).json({success: false, message: "Server error"});
    }
});

const getProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({success: false, message: "Invalid product id"});
    }
    try{
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, data: product});
    }catch(error){
        console.error("Error in getting specific product: ", error);
        res.status(500).json({success: false, message: "Server error"});
    }
});

const createProduct = asyncHandler(async(req,res)=>{
    const {name, price, image} = req.body;
    if(!name || !price || !image){
        res.status(400).json({message: "All fields are required"});
    }
    try{
        const product = await Product.create({
            name,
            price,
            image
        });
        res.status(201).json({success: true, data: product});
    }
    catch(error){
        console.error("Error in creating product: ", error);
        res.status(500).json({success: false, message: "Server error"});
    }
});

const deleteProduct = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({success: false, message: "Invalid product id"});
    }
    try{
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({success: false, message: "Product not found"});
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});

    }catch(error){
        console.error("Error in deleting product: ", error);
        res.status(500).json({success: false, message: "Server error"});
    }
});

const updateProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid product id"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        console.error("Error in updating product: ", error);
        res.status(500).json({success: false, message: "Server error"});
    }
});


export {getProducts, getProduct, createProduct, deleteProduct, updateProduct};