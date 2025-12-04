const { z } = require('zod');

// Define the schema for user authentication
const authSchema = z.object({
    username: z.string().min(6, 'Username must be at least 6 characters long'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits long').optional(),   
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

module.exports = { authSchema };
