const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const ContactModel = require("../../models/Contact");

// @route get api/contacts/
// @desc get all contacts
// @access Public
router.get("/", (req, res) => {

  //ContactModel.find({createdBy:req.user.id},function (err, contact) {
    ContactModel.find(function (err, contact) {
    if (err) {
    console.log(err);
    }
    else {
    res.json(contact);
    }
    });

});

// @route post api/contacts/create
// @desc create new contact
// @access Public
router.post("/create", (req, res) => {

    let contact = new ContactModel(req.body);
    //contact.createdBy=req.user.id;
    contact.save()
  .then(game => {
  res.status(200).json({ 'contact': 'Contact Added Successfully' });
  })
  .catch(err => {
  res.status(400).send("Something Went Wrong");
  });
    
  });

// @route post api/contacts/update
// @desc update existing contact
// @access Public
router.post("/update/:id", (req, res) => {

  ContactModel.findById(req.params.id, function (err, contact) {
    if (!contact)
    return next(new Error('Unable To Find contact With This Id'));
    else {
      contact.name = req.body.name;
      contact.gender = req.body.gender;
      contact.phone = req.body.phone;
    
      contact.save().then(contact => {
    res.json('Contact Updated Successfully');
    })
    .catch(err => {
    res.status(400).send("Unable To Update Contact");
    });
    }
    });
  
});

// @route get api/contacts/delete
// @desc delete contact by id 
// @access Public
router.get("/delete/:id", (req, res) => {

  ContactModel.findByIdAndRemove({ _id: req.params.id }, function (err, contact) {
    if (err) res.json(err);
    else res.json('Contact Deleted Successfully');
    });

});



module.exports = router;
