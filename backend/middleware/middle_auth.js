const jwt = require('jsonwebtoken');
// Prefer JWT_SECRET, but support legacy jwt_key for compatibility
const JWT_SECRET =  process.env.jwt_key ;

const isAurthenticated= async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization; 
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            const err = new Error('No token provided');
            err.status = 401;
            return next(err);
        }

        const token= authHeader.split(' ')[1];
        const decoded= jwt.verify(token, JWT_SECRET);
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
        error.status = 401;
        return next(error);
    }
}
const isAdmin= async(req,res,next)=>{
    try {
        if(!req.user.isAdmin){  
            console.log('Access denied. Admins only.',req.user);
            const err = new Error('Access denied. Admins only.');
            err.status = 403;
            return next(err);
        }
        next();
    } catch (error) {
        next(error);    
    }
}
const isDriver= async(req,res,next)=>{
    try {
        if(!req.user.isDriver){  
            const err = new Error('Access denied. Drivers only.');
            err.status = 403;
            return next(err);
        }   
        next();
    } catch (error) {
        next(error);    
    }
}

module.exports={isAdmin,isDriver,isAurthenticated};