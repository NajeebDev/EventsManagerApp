const express = require("express");
const Events = require("../Models/EventModel");
const Users = require("../Models/UserModel");
const passport = require("passport");
const authenticate = require("../middleware/authenticate");
const restrictTo = require("../middleware/restrictTo");
const Category = require("../Models/CategoryModel");
const sendEmail = require("../Utilities/sendEmail");
// const Logo = require("../../frontend/src/Images/logo.png")
const fileUpload = require("express-fileupload");


const router = express.Router();
router.use(fileUpload());


//start New Event
router.post("/startNewEvent", authenticate, async (request, response) => {

    const userId = request.user._id;

    let {
        name,
        description,
        location,
        language,
        member,
        eventtype,
        date,
        time,
        category,
    } = request.body;

    try {
        const dateEventstarted = new Date(date);
        const [hours, minutes] = time.split(':');
        dateEventstarted.setHours(hours);
        dateEventstarted.setMinutes(minutes);

        if (request.files === null) {
            const event = new Events({
                event_name: name.trim(),
                description,
                location: location.trim(),
                language,
                member,
                eventtype,
                dateEventstarted,
                user_id: request.user._id,
                category_id: category,
            });

            console.log(event)
            await event.save();

            return response.send("you have created your Event");

        }

        const file = request.files.file;
        const newPath = `${Date.now()}-${userId}-${file.name}`;

        file.mv(`${__dirname}/../../frontend/public/uploads/${newPath}`, async (err) => {
            if (err) {
                console.log(err)
                return response.status(500).send(err)
            }
            const event = new Events({

                event_name: name.trim(),
                event_photo: `/uploads/${newPath}`,
                description,
                location: location.trim(),
                language,
                member,
                eventtype,
                dateEventstarted,
                user_id: request.user._id,
                category_id: category,
            });

            await event.save();
            response.json({ msg: "you have created your Event", event });

        });


    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'error with create event', error });
    }
});


//Delete Event
router.delete("/deleteEvent/:id", authenticate, async (req, res) => {
    try {
        await Events.findByIdAndRemove(req.params.id);
        res.send("deleted");
        console.log(req.params.id);
    } catch (err) {
        console.log(err);
    }
});


router.post(
    "/update",
    authenticate,
    restrictTo("admin", "superuser"),
    (req, res) => {
        Events.findByIdAndUpdate(req.body.id, {
            event_name: req.body.event_name,
            event_admin: req.body.event_admin,
            event_photo: req.body.event_photo,
            description: req.body.description,
            location: req.body.location,
            language: req.body.language,
            member: req.body.member,
            dateEventstarted: req.body.dateEventstarted,
        })
            .then((data) => {
                console.log(data);
                res.send("updated");
            })
            .catch((err) => {
                console.log(err);
            });
    }
);


// View all Events
router.get("/viewAll", async (request, response) => {
    try {
        const events = await Events.find().populate("category_id user_id").sort("-dateEventcreated");

        if (!events) {
            return response.status(500).send({ msg: "Server error" });
        }
        response.send(events);
    } catch (error) {
        response.status(500).send({ msg: "Server error" });
    }
});


// View one Event
router.get("/viewOneEvent/:id", async (request, response) => {

    try {
        const events = await Events.findById({ _id: request.params.id })
            .populate("category_id user_id").sort("-dateEventcreated");

        if (!events) {
            return response.status(500).send({ msg: "Server error" });
        }
        return response.send(events);

    } catch (error) {
        response.status(500).send({ msg: "Server error" });
    }
});


// View all Events by Location
router.get("/viewByCity", async (request, response) => {
    try {
        const events = await Events.aggregate([
            {
                $group: {
                    _id: { location: "$location" },
                    event_photo: { $first: "$event_photo" },
                    count: { $sum: 1 },
                },
            },
        ]).sort("-dateEventcreated");

        if (!events) {
            return response.status(500).send({ msg: "No events" });
        }
        return response.send(events);
    } catch (error) {
        response.status(500).send({ msg: "Server error" + error });
    }
});


// View Events by seected Location
router.get("/viewBySelectedLocation/:city", async (request, response) => {
    try {
        const events = await Events.find({ location: request.params.city }).sort("-dateEventcreated");

        console.log(events);

        if (!events) {
            return response.status(500).send({ msg: "Server error" });
        }
        return response.send(events);
    } catch (error) {
        response.status(500).send({ msg: error });
    }
});


// View all Events by Category
router.get("/viewByCategory", async (request, response) => {
    try {
        const events = await Events.aggregate([
            {
                $lookup: {
                    from: "categories",
                    foreignField: "_id",
                    localField: "category_id",
                    as: "category",
                },
            },
            {
                $group: { _id: "$category", count: { $sum: 1 } },
            },
        ]).sort("-dateEventcreated");

        if (!events) {
            return response.status(500).send({ msg: "Server error" });
        }
        return response.send(events);
    } catch (error) {
        response.status(500).send({ msg: "Server error" });
    }
});


// View Events by selected Category
router.get('/viewBySelectedCategory/:id', async (request, response) => {
    console.log(12321321);

    try {
        const events = await Events.find({ category_id: request.params.id })
            .populate('category_id user_id').sort("-dateEventcreated")

        if (!events) {
            return response.status(500).send({ msg: 'Server error' })
        }
        response.send(events)

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })

    }
});


// Attend/Join Event
router.get('/attendEvents/:id', authenticate, async (request, response) => {

    try {
        const event = await Events.findByIdAndUpdate(request.params.id,
            // pushing user id to EventSchema and avoid duplicates
            { $addToSet: { participants: request.user._id } },
            { new: true }
        )

        const user = await Users.findByIdAndUpdate(request.user._id,
            // pushing event id to UserSchema and avoid duplicates
            { $addToSet: { attendEvents: event._id } },
            { new: true }
        )

        if (!event) {
            return response.status(500).send({ msg: 'Server error event not saved' })
        }

        // const message2 = "
        //     <div>
        //     <img src= '/../../frontend/src/Images/logo.png' />
        //     <p>Thank you for using Events Manager App</p>
        //     <img src={{event.event_id.photo}} />
        //     <p> `${event.event_id.firstName} ${event.event_id.lastName} welcomes you to`</p>
        //     <h2>`${event.event_name}`</h2>
        //     <div/>
        //     ";
        // const logo = `${__dirname}/../../frontend/logos/logo.png`

        const message = `Welcome to ${event.event_name} Events`

        await sendEmail({
            email: user.email,
            subject: `attended the event ${event.event_name}`,
            text: message,
            // html: `<img src= "${logo}" />`


        })

        response.json({ event, user, msg: 'you recived the email regarding attending event' })

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});


// Leave Event
router.get('/leaveEvents/:id', authenticate, async (request, response) => {

    try {
        const event = await Events.findByIdAndUpdate(request.params.id,
            { $pull: { participants: request.user._id } },
            { new: true }
        )

        const user = await Users.findByIdAndUpdate(request.user._id,
            { $pull: { attendEvents: event._id } },
            { new: true }
        );

        if (!event) {
            return response.status(500).send({ msg: 'Server error event not saved' })
        }

        const message = `you have leaved the event ${event.event_name}`

        await sendEmail({
            email: user.email,
            subject: `leaved the event ${event.event_name}`,
            text: message
        })

        response.json({ event, user, msg: 'you recived the email regarding leaving event' })

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});


// Save Event
router.get('/savedEvents/:id', authenticate, async (request, response) => {

    try {
        const event = await Events.findById(request.params.id)

        const user = await Users.findByIdAndUpdate(request.user._id,
            // pushing event id to UserSchema and avoid duplicates
            { $addToSet: { savedEvents: event._id } },
            { new: true }
        )

        if (!event) {
            return response.status(500).send({ msg: 'Server error' })
        }
        response.send(user)

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});


// Unsave Event
router.get('/unsavedEvents/:id', authenticate, async (request, response) => {

    try {
        const event = await Events.findById(request.params.id)

        const user = await Users.findByIdAndUpdate(request.user._id,
            // delete event id from UserSchema
            { $pull: { savedEvents: event._id } },
            { new: true }
        )

        if (!event) {
            return response.status(500).send({ msg: 'Server error' })
        }
        response.send(user)

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});


// Show Saved Events
router.get('/showSavedEvents', authenticate, async (request, response) => {

    try {
        const event = await Users.findById(request.user._id)
            .populate('savedEvents')

        if (!event) {
            return response.status(500).send({ msg: 'Server error' })
        }
        response.send(event.savedEvents)

    } catch (error) {
        response.status(500).send({ msg: 'Server error' })
    }
});

module.exports = router;