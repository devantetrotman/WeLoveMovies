const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const path = require("path");

  async function movieExists(req, res, next) {
    const theater = await theatersService.read(req.params.movieId);
    if (theater) {
      res.locals.movie = theater;
      return next();
    }
    next({ status: 404, message: `Theater cannot be found.` });
  }
  
  async function list(req, res) {
    const data = await theatersService.list();
    res.json({ data });
  }
  
    function read(req, res) {
      const { theater: data } = res.locals;
      res.json({ data });
    }
  
  
  module.exports = {
      read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
      list: asyncErrorBoundary(list),
    };
