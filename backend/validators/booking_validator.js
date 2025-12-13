const { z } = require('zod');

// Accept both cased variants and normalize later in controller
const bookingSchema = z.object({
  userId: z.string().min(1).optional(),
  userid: z.string().min(1).optional(),
  carId: z.string().min(1),
  carid: z.string().min(1).optional(),

  name: z.string().min(1, 'name is required'),
  phone: z.string().min(7).max(20),
  Cnic: z.union([z.string(), z.number()]).optional(),
  cnic: z.union([z.string(), z.number()]).optional(),

  pickup: z.string().min(1),
  dropoff: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  instructions: z.string().optional(),
  fare: z.number().nonnegative(),
  isDriver: z.boolean().optional(),
}).refine((data) => {
  // ensure either Cnic or cnic present
  return typeof data.Cnic !== 'undefined' || typeof data.cnic !== 'undefined';
}, { message: 'CNIC is required', path: ['Cnic'] });

module.exports = { bookingSchema };
