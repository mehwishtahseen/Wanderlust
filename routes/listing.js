const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../model/listing.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400,errMsg);
    } else {
      next();
    }
  };
  
//Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
      const allListings = await Listing.find({});
      res.render("listings/index.ejs", { allListings });
    })
);
  
  //New ROUTE
  
  router.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listings/show.ejs", { listing });
    })
  );
  
  
  //create Route
  
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
      const newListing = await new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listing");
    })
  );
  //Edit Route
  
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs", { listing });
    })
  );
  
  //Update Route
  
  router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
     
      let { id } = req.params;
      // let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      // if (typeof req.file !== "undefined") {
      //   let url = req.file.path;
      //   let filename = req.file.filename;
      //   listing.image = { url, filename };
      //   await listing.save();
      // }
      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      res.redirect(`/listings/ ${id}`);
    })
  );
  
  //Delete Route
  
  router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let deleteListing = await Listing.findByIdAndDelete(id);
      console.log(deleteListing);
      res.redirect("/listings");
    })
  );
  
  module.exports = router;