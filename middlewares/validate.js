
const validate = (schema) => async (req, res, next) => {
    try {
        // console.log("Middleware: validate");
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        const status = 422;
        const error = {
            status,
            message,
            extraDetails,
        };
        next(error);
    }
};

module.exports = validate;