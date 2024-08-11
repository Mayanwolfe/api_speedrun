const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create Item
router.post('/create', async (req, res) => {
    try {
      console.log('POST',req.params, req.body)
        const { name, quantity } = req.body;
        const newItem = new Item({ name, quantity });
        await newItem.save();
        const items = await Item.find();
        res.status(201).json({new_item: newItem, full_list: items });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create item', error: err.message });
    }
});

// Get All Items
router.get('/get', async (req, res) => {
    try {
      console.log('GET',req.params, req.body)
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch items', error: err.message });
    }
});

// Update Item
router.put('/update', async (req, res) => {
    try {
      console.log('PUT',req.params, req.body)
        const updatedItem = await Item.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update item', error: err.message });
    }
});

// Delete Item
router.delete('/delete', async (req, res) => {
    try {
      console.log('DELETE',req.params, req.body)
        const deletedItem = await Item.findByIdAndDelete(req.body.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete item', error: err.message });
    }
});

module.exports = router;
