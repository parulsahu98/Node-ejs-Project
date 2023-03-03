import { Cart } from "../model/cart.model.js";
import { Category } from "../model/category.model.js";
import { Product } from "../model/product.model.js"
export const loadData = async (request,response,next)=>{
    let currentUserId = request.session.currentUserId;
    let cartItems = await Cart.findOne({userId: currentUserId})
    let cartItemList = [];
    for(let index=0; index<cartItems.productList.length; index++){
        let item = cartItems.productList[index].toJSON();
        item.qty = 1;
        cartItemList.push(item);
    }
    
    return response.status(200).json({itemList: cartItemList});
}
export const cartItem = async (request,response,next)=>{
    let currentUserId = request.session.currentUserId;
    let cartItems = await Cart.findOne({userId: currentUserId})
    let categories = await Category.find();
    
    return response.render("admin/view-cart.ejs",{
         currentUser: request.session,
         cartItemList: cartItems.productList,
         categoryList: categories        
    });
}
export const addToCart = async (request,response,next)=>{
    let product = await Product.findById(request.params.productId);
    let currentUserId = request.session.currentUserId;
    let user  = await Cart.findOne({userId: currentUserId});
    if(user){
      let index = 0;
      for( ; index<user.productList.length; index++){
        if(user.productList[index].productId == request.params.productId){
            console.log("Alread added...");
            return response.status(200).json({message: 'Alread added'});
        }
      }
      if(index == user.productList.length){
           user.productList.push({
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImage
          });
          let status = await Cart.create(user);
          return response.status(200).json({message: 'Successfully added in cart'}); 
      }   
    }
    else{
        let result = await Cart.create({
            userId: currentUserId,
            productList:[{
                productId: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productImage: product.productImage
              }
            ]
        })
        let status = await Cart.create(user);

        return response.status(200).json({message: 'Successfully added in cart'});
    }
}