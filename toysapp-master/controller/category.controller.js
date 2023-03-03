import { Category } from "../model/category.model.js";
export const addCategory = (request,response,next)=>{
    return response.render('admin/category.ejs',{message: ''});
}
export const save = (request,response,next)=>{
  Category.create({
    categoryName: request.body.categoryName
  }).then(result=>{
    return response.render('admin/category.ejs',{message: 'Category Saved'});
    //return response.status(201).json({status: true,result: result});
  }).catch(err=>{
    console.log(err);
  });
}
export const list = (request,response,next)=>{
   Category.find().then(result=>{
      return response.render('admin/category-list.ejs',{categoryList: result});
   }).catch(err=>{
    console.log(err);
   });
}
export const remove = (request,response,next)=>{
  Category.deleteOne({_id: request.params.id})
  .then(result=>{
    return response.redirect('/category/list');
  })
  .catch(err=>{
    console.log(err);
  })
}
export const editCategory = (request,response,next)=>{
  Category.findById(request.params.id)
  .then(result=>{
    if(result)
     return response.render('admin/category_update.ejs',{category: result});
  }).catch(err=>{
    console.log(err);
  });   
}
export const update = (request,response,next)=>{
  // request.body = {_id: 43dfdsf43fefdsfd, categoryName: 'Ele. Toys'}
  const cid = request.body._id; // cid = 43dfdsf43fefdsfd
  delete request.body._id;  //request.body = {categoryName: 'Ele. Toys'}
  Category.updateOne({_id: cid},{
    $set: request.body
  }).then(result=>{
    return response.redirect("/category/list");
  }).catch(err=>{
    console.log(err);
  })
}