const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET || 'dev_secret_change_me';

const isAurthenticated= async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization; 
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:'No token provided'});
        }

        const token= authHeader.split(' ')[1];
        const decoded= jwt.verify(token,jwt_key);
        // Support both payload shapes: { id, username } or { userData: { ... } }
        const payload = decoded.userData || decoded;
        req.user={
            id: payload.id,
            username: payload.username,
            isAdmin: !!payload.isAdmin,
            isDriver: !!payload.isDriver,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({message:'Invalid token',error:error.message});
    }
}
const isAdmin= async(req,res,next)=>{
    try {
        if(!req.user.isAdmin){  
            console.log('Access denied. Admins only.',req.user);
            return res.status(403).json({message:'Access denied. Admins only.'});
        }
        next();
    } catch (error) {
        next(error);    
    }
}
const isDriver= async(req,res,next)=>{
    try {
        if(!req.user.isDriver){  
            return res.status(403).json({message:'Access denied. Drivers only.'});
        }   
        next();
    } catch (error) {
        next(error);    
    }
}

module.exports={isAdmin,isDriver,isAurthenticated};