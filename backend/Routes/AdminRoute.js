const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/authenticate")
const restrictTo = require('../middleware/restrictTo');
const User = require('../Models/UserModel');
const Events = require('../Models/EventModel')
const router = express.Router()

// @root get admin/dashboard 
router.get('/dashboard', authenticate, restrictTo('admin'), async (request, response) => {
    try {
        const user = await User.findById(request.id).select('-password');
        if (!user) {
            return response.status(500).json({ msg: 'Server error' })
        }
        response.json({ msg: ` welcome back  ${user.firstName} ` })

    } catch (error) {

        return response.status(500).json({ msg: 'Server error' })
    }
});



router.delete('/delUser', authenticate, restrictTo('admin'), async (request, response) => {
    try {
        const user = await User.findById(request.body.id);

        if (!user) {
            return response.status(404).json({ msg: ' user not found  ' })
        }

        await User.findByIdAndRemove(request.body.id)

        response.send("user is deleted ")
    } catch (error) {
        console.log(error);
    }
})



router.put('/updateUser/:id', authenticate, restrictTo('admin'), async (request, response) => {
    try {
        const { firstName, lastName, email, password, gender } = request.body

        const user = await User.findById(request.params.id);

        if (!user) {

            return response.status(404).json({ msg })

        }

        await User.findByIdAndUpdate((request.params.id),
            { $set: { firstName, lastName, email, password, gender } })

        response.send("user is updated")
    } catch (error) {
        console.log(error);

        response.send("you can not update the user")

    }

})



router.delete('/eventDelete', authenticate, restrictTo('admin'), async (req, res) => {
    // Make sure user own the event 
    try {
        const event = await Events.findByIdAndRemove(req.body.id);
        console.log('the user id : ', req.id);

        if (!event) {
            return res.status(404).json({ msg: ' event not found  ' })
        }
        console.log('user id is : ', event.user_id);


        res.send("deleted")
    }

    catch (err) {
        console.log(err);
    }
})




module.exports = router