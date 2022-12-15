const User = require('../model/user');
const ResetToken = require('../model/resetToken');

const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');

exports.isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) return sendError(res, 'Yêu cầu không hợp lệ!');

    if (!isValidObjectId(id)) return sendError(res, 'Người dùng không hợp lệ!');

    const user = await User.findById(id);
    if (!user) return sendError(res, 'người dùng không tìm thấy');

    const resetToken = await ResetToken.findOne({ owner: user._id });
    if (!resetToken) return sendError(res, 'Không tìm thấy mã thông báo đặt lại!');

    const isValid = await resetToken.compareToken(token);
    if (!isValid) return sendError(res, 'Đặt lại mã thông báo không hợp lệ!');

    req.user = user;
    next();
};
