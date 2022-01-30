const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { times } = require("lodash");

async function reviewExists(req, res, next) {
  const {reviewId} = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found"
  })
}

async function destroy (req, res) {
  const {reviewId} = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204)
}

async function update (req, res) {
   const time = new Date().toISOString();
  const {reviewId} = req.params;
  await service.update(req.body.data, reviewId)
  const dataWithNoTimes = await service.readUpdateWithCritic(reviewId)
  const data = {...dataWithNoTimes, created_at: time, updated_at: time}
  res.json({data})
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
