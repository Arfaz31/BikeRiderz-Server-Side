import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    cc: z.number().min(1, 'CC must be a positive number'),
    year: z.number().min(1900, 'Year must be a valid year'),
    model: z.string().min(1, 'Model is required'),
    brand: z.string().min(1, 'Brand is required'),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    pricePerHour: z
      .number()
      .min(0, 'Price per hour must be a positive number')
      .optional(),
    cc: z.number().min(1, 'CC must be a positive number').optional(),
    year: z.number().min(1900, 'Year must be a valid year').optional(),
    model: z.string().min(1, 'Model is required').optional(),
    brand: z.string().min(1, 'Brand is required').optional(),
  }),
});

export const BikeValidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
