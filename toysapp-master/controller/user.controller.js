import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import { Category } from "../model/category.model.js";
export const userIndex = (request,response,next)=>{
    return response.render('admin/user-index.ejs',{currentUser: '',categoryList: []});
}

export const signUpPage = (request,response,next)=>{
    return response.render("admin/user-signup.ejs",{currentUser: '',categoryList: []});
} 

export const signup = async (request,response,next)=>{
   const errors =  validationResult(request);
   if(!errors.isEmpty())
     return response.render('admin/user-error.ejs',{currentUser: '',categoryList: []});
   else{
      let password = request.body.password;      
      let saltKey = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password,saltKey);    
      User.create({
        email: request.body.email,
        password: encryptedPassword
      }).then(result=>{
        return response.redirect("/user");
      }).catch(err=>{
        return response.render("admin/user-error.ejs",{currentUser: '',categoryList: []});
      })
   }
}
   
export const signin = async (request,response,next)=>{
  let user = await User.findOne({email: request.body.email});        
  if(user){
    let validPassword = await bcrypt.compare(request.body.password,user.password);
    if(validPassword){
      request.session.currentUserId = user._id; 
      request.session.currentUserEmail = user.email;
      let categories = await Category.find();
      return response.render("admin/user-home.ejs",{currentUser: request.session,categoryList: categories});
    }
    else
     return response.redirect("/user"); 
  } 
  else
    return response.redirect("/user"); 
}
export const signout = (request,response,next)=>{
   request.session.currentUserId = null;
   request.session.currentUserEmail = null;
   request.session.destroy();
   return response.redirect("/user");   
}