const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

router
  .route('/search/:searchText')
  .get(eventController.getSearchResults);

router
  .route('/department/:id')
  .get(eventController.getEventByDepartment);

module.exports = router;