import { body, validationResult } from  "express-validator";

const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        })
    }

    next();
}

export const createProductValidator = [
    body("title").isString().withMessage("Title must be a string"),
    body("description").isString().withMessage("Description must be a string"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").optional().isIn(['USD', 'EUR', 'GBP', 'JPY', 'CNY', "INR"]).withMessage("Invalid currency"),
    validateResult
]