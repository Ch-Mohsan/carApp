const User=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_key=process.env.JWT_SECRET;
const signup = async (req, res) => {
    try {
        const { username, password, phone, isAdmin, isDriver } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, phone, isAdmin, isDriver });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const login= async(req,res)=>{
    try {
     const {username,password}=req.body;   
     console.log({username,password}) 
        const user= await User.findOne({username});
        console.log(user)
        if(!user){
            console.log('User not found');
            return res.status(400).send('Invalid credentials');
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
                        return res.status(400).json({ message: 'Invalid credentials' });
                }
        const userData={id:user._id,username:user.username,phone:user.phone,isAdmin:user.isAdmin,isDriver:user.isDriver};

 
        const token= jwt.sign({id:user._id,username:user.username},jwt_key,{expiresIn:'5d'});
        res.status(200).json({ message:"user logged in", userData, token } );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}


module.exports = { signup, login };