const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Route to save or update billing details for a user
router.post('/saveUsersBillingDetails', async (req, res) => {
    try {
        const { email, firstName, companyName, streetAddress, apartment, city, phoneNumber, emailAddress } = req.body;

        // Validate input fields
        if (!email || !firstName || !streetAddress || !city || !phoneNumber || !emailAddress) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Connect to the user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize the user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const billingCollection = userDb.collection('billingDetails'); // Billing details collection

        // Create a billing details object
        const billingDetails = {
            firstName,
            companyName: companyName || '', // Optional field
            streetAddress,
            apartment: apartment || '', // Optional field
            city,
            phoneNumber,
            emailAddress,
            updatedAt: new Date(), // Use updatedAt for the modification timestamp
        };

        // Use updateOne with upsert to update or insert if not existing
        const result = await billingCollection.updateOne(
            { email }, // Match by the user's email address
            { $set: billingDetails }, // Update the fields
            { upsert: true } // Insert a new document if no match is found
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Billing details updated successfully' });
        } else {
            res.status(201).json({ message: 'Billing details saved successfully' });
        }

    } catch (error) {
        console.error('Error saving or updating billing details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Route to get billing details for a user
router.get('/getUsersBillingDetails/:email', async (req, res) => {
    try {
        const { email } = req.params;

        // Connect to the user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize the user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const billingCollection = userDb.collection('billingDetails'); // Billing details collection

        // Fetch billing details from the user's database
        const billingDetails = await billingCollection.findOne({ email });

        if (billingDetails) {
            res.status(200).json(billingDetails);
        } else {
            res.status(404).json({ message: 'Billing details not found' });
        }
    } catch (error) {
        console.error('Error fetching billing details:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;
