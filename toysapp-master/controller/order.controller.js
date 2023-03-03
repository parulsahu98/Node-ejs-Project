import { Order } from "../model/order.model.js"

export const save = (request,response,next)=>{
    Order.create({
        userId: request.session.currentUserId,
        total: request.body.total*1,
        contactPersonName : request.body.contactPersonName,
        contactNumber: request.body.contactNumber,
        deliveryAddress: request.body.deliveryAddress,
        paymentMode: 'CASH',
        itemList: JSON.parse(request.body.itemList)
    }).then(result=>{
        return response.status(200).json({message: 'Order placed Successfully'});
    }).catch(err=>{
        return response.status(200).json({message: 'Oops! something went wrong'});
    })
}