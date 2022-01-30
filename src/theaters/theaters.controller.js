const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const path = require("path");

// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length)
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   next();
// }

// function bodyHasAllProperty(req, res, next) {
//     const { data: { title, runtime_in_minutes, rating, description, image_url } = {} } = req.body;
//     if (!title || title === "") {
//         next({
//             status: 400,
//             message: "A 'title' property is required.",
//           });
//     }
//     if (!description || description === "") {
//         next({
//             status: 400,
//             message: "A 'description' property is required.",
//           });
//     }
//     if (!runtime_in_minutes || runtime_in_minutes < 0){
//         next({
//             status: 400,
//             message: "A 'runtime' property is required and must be above zero.",
//           });
//         }
//     if (!Number.isInteger(runtime_in_minutes)){
//         next({
//             status: 400,
//             message: "The 'price' property must an integer.",
//           });
        
//     }
//     if (!image_url || image_url == ""){
//         next({
//             status: 400,
//             message: "image_url",
//           });
//     }
    
    
//     return next();
    
//   }

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