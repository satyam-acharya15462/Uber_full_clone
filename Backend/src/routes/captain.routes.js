import express from 'express';
import { body } from 'express-validator';
import  { Register_Captain } from '../controllers/captain.controller.js';
const router = express.Router();


router
.route('/register')
.post([
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstname').isLength({ min: 3 }).withMessage('The first name should be at least 3 characters long'),
    body('fullName.lastname').isLength({ min: 3 }).withMessage('The last name should be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('The password should be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('The color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('The number plate should be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 2 }).withMessage('The capacity should be at least 2 people'),
    body('vehicle.vehicle_type').isLength({ min: 3 }).withMessage('The vehicle type should be at least 3 characters long')
], Register_Captain);

export default router;