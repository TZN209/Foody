const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is missing!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Invalid name, name must be 3 to 20 charaters long!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be 8 to 20 characters long!'),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) return next();

    res.status(400).json({ success: false, error: error[0].msg });
};