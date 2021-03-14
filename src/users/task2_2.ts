// import Joi = require('joi');
//
// module.exports = Joi.object().keys({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     title: Joi.string().required(),
//     isActive: Joi.boolean().required(),
// });
//
// const schema = require('./employees.post.schema');
//
// app.post('./employees', validateSchema(schema), function (req, res) {
//     let employee = req.body;
//     employee.id = uuid.v4();
//     data.push(employee);
//     res.status(204).location(`/employees/${employee.id}`).send();
// });
//
//
//
// // error mapping
// function errorResponse(schemaErrors) {
//     const errors = schemaErrors.map(error => {
//         let { path, message } = error;
//         return { path, message };
//     });
//
//     return {
//         status: 'failed',
//         errors
//     }
// }
//
//
// // create validation middleware
// function validateSchema(schema) {
//     return (req, res, next) => {
//         const { error } = schema.validate(req.body, {
//             abortEarly: false,
//             allowUnknown: false,
//         });
//
//         if (error.isJoi) {
//             res.status(400).json(errorResponse(error.details));
//         } else {
//             next();
//         }
//     }
// };