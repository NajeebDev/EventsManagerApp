const User = require("../Models/UserModel")

const restrictTo =  (...roles)=>{
    return async(request, response,next)=>{

    
    // roles is an array ['admin' ,'supervisor']
    const user = await User.findById(request.id).select('-password');

    if(!roles.includes(user.role)){
        return response.status(404).json({msg: 'You dont have the permission for this action, Authorization Denied'})
    }
    next()
    }
}

module.exports = restrictTo;