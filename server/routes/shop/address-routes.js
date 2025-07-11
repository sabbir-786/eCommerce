import express from 'express';

import {
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress,
} from '../../controllers/shop/address-controller.js';

const router = express.Router();

// Add new address
router.post("/add", addAddress);

// Fetch all addresses for a user
router.get("/get/:userId", fetchAllAddress);

// Delete an address by userId and addressId
router.delete("/delete/:userId/:addressId", deleteAddress);

// Edit/update an address
router.put("/update/:userId/:addressId", editAddress);

export default router;
