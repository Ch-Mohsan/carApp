const User=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_key=process.env.JWT_SECRET;
const signup = async (req, res, next) => {
    try {
        const { username, password, phone, isAdmin, isDriver } = req.body;
        if (!username || !password) {
            const err = new Error('Username and password are required');
            err.status = 400;
            return next(err);
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const err = new Error('Username already exists');
            err.status = 409;
            return next(err);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, phone, isAdmin, isDriver });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
        next(error);
    }
}
const login= async(req,res,next)=>{
    try {
     const {username,password}=req.body;   
     console.log({username,password}) 
        const user= await User.findOne({username});
        console.log(user)
        if(!user){
            console.log('User not found');
            const err = new Error('Invalid credentials');
            err.status = 400;
            return next(err);
        }
                // Compare against hash; if stored is plaintext, fall back and migrate
                let isMatch = false;
                try {
                    isMatch = await bcrypt.compare(password, user.password);
                    console.log(isMatch)
                } catch {}
                // If not a bcrypt hash and plaintext matches, auto-migrate to hashed
                const looksPlaintext = typeof user.password === 'string' && !user.password.startsWith('$2');
                if (!isMatch && looksPlaintext && password === user.password) {
                    isMatch = true;
                    // Auto-migrate: hash and save the plaintext password
                    try {
                        const newHash = await bcrypt.hash(user.password, 10);
                        user.password = newHash;
                        await user.save();
                    } catch (e) {
                        console.warn('Password migration failed:', e?.message || e);
                    }
                }
                if(!isMatch){
                    console.log('Invalid password');
                    const err = new Error('Invalid credentials');
                    err.status = 400;
                    return next(err);
                }
        const userData={id:user._id,username:user.username,phone:user.phone,isAdmin:user.isAdmin,isDriver:user.isDriver};

        // Include role flags in JWT so middleware can authorize admin/driver routes
        const token= jwt.sign({
            id: user._id,
            username: user.username,
            isAdmin: !!user.isAdmin,
            isDriver: !!user.isDriver,
        },jwt_key,{expiresIn:'5d'});
        res.status(200).json({ message:"user logged in", userData, token } );
    } catch (error) {
        next(error);
        
    }
}
const logout= async(req,res)=>{
    try {
        res.status(200).json({message:'User logged out successfully'});
    }
    catch (error) {
        next(error);
    }
}
const getAllUsers= async(req,res)=>{
    try {
        const users= await User.find({}); 
        if(!users){
            next(new Error('No users found'));
            return;
        }  
        res.status(200).json({users});
    } catch (error) {
        next(error);
    }
}

const getUserBYID=async (req,res)=>{
try {
    const userId=req.params.id;
    const user= await User.findById(userId);
    if(!user){
        next(new Error('User not found'));
        return;
    }
    res.status(200).json({user});
} catch (error) {
    next(error)
    
}

} 
const deletAllUsers= async(req,res)=>{
    try {
        const result= await User.deleteMany({});
        res.status(200).json({message:'All users deleted successfully', result});
    } catch (error) {
        next(error);
    }
}   
const deleteByID= async(req,res)=>{
    try {
        const userId=req.params.id; 
        const deletedUser= await User.findByIdAndDelete(userId);
        if(!deletedUser){
            next(new Error('User not found'));
            return;
        }
        res.status(200).json({message:'User deleted successfully',deletedUser});
    } catch (error) {
        next(error);
    }
}
const updateByID= async(req,res,)=>{
    try {
        const userId=req.params.id; 
        const updateData=req.body;
        const updatedUser= await User.findByIdAndUpdate(userId,updateData,{new:true});
        if(!updatedUser){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User updated successfully', updatedUser});
    } catch (error)
    {
        next(error);
    
    }
}


module.exports = { signup, login, logout, getAllUsers, getUserBYID, deleteByID, deletAllUsers, updateByID };