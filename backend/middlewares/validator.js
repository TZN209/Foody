const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tên bị thiếu!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Tên không hợp lệ, tên phải dài từ 3 đến 20 ký tự!'),
    check('email').normalizeEmail().isEmail().withMessage('Email không hợp lệ!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Mật khẩu trống!')
        .isLength({ min: 8, max: 20 })
        .withMessage('Mật khẩu phải dài từ 8 đến 20 ký tự!'),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) return next();

    res.status(400).json({ success: false, error: error[0].msg });
};
