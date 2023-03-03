export const isVerified = (request,response,next)=>{
    if(request.session.currentUserId)
      next();
    else
      response.redirect('/user');  
}