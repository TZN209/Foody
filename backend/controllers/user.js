const User = require('../model/user');
const VerificationToken = require('../model/verificationToken');
const ResetToken = require('../model/resetToken');
const { sendError, createRandomBytes } = require('../utils/helper');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const {
    generateOTP,
    mailTransport,
    generateEmailTemplate,
    plainEmailTemplate,
    generatePasswordResetTemplate,
} = require('../utils/mail');
const { isValidObjectId } = require('mongoose');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return sendError(res, 'Email này đã tồn tại!');

    const newUser = new User({
        name,
        email,
        password,
    });

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP,
    });

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
        from: 'emailverification@gmail.com',
        to: newUser.email,
        subject: 'Xác minh tài khoản email của bạn',
        html: generateEmailTemplate(OTP),
    });

    res.json({
        success: true,
        user: {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
            verified: newUser.verified,
        },
    });
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) return sendError(res, 'email hoặc mật khẩu bị thiếu!');

        const user = await User.findOne({ email });
        if (!user) return sendError(res, 'Không tìm thấy người dùng!');

        const isMatched = await user.comparePassword(password);
        if (!isMatched) return sendError(res, 'email hoặc mật khẩu không khớp!');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({
            success: true,
            user: { name: user.name, email: user.email, id: user._id, token },
        });
    } catch (error) {
        sendError(res, error.message, 500);
    }
};

exports.verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp.trim()) return sendError(res, 'Yêu cầu không hợp lệ, thiếu tham số!');

    if (!isValidObjectId(userId)) return sendError(res, 'ID người dùng không hợp lệ!');

    const user = await User.findById(userId);
    if (!user) return sendError(res, 'Xin lỗi, không tìm thấy người dùng!');

    if (user.verified) return sendError(res, 'Tài khoản này đã được xác minh!');

    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token) return sendError(res, 'Xin lỗi, không tìm thấy người dùng!');

    const isMatched = await token.compareToken(otp);
    if (!isMatched) return sendError(res, 'Vui lòng cung cấp otp hợp lệ!');

    user.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    mailTransport().sendMail({
        from: 'emailverification@gmail.com',
        to: user.email,
        subject: 'Thư chào mừng',
        html: plainEmailTemplate('Email đã xác minh thành công!', 'Cảm ơn để kết nối với chúng tôi!!!'),
    });
    res.json({
        success: true,
        message: 'email của bạn đã được xác minh.',
        user: { name: user.name, email: user.email, id: user._id },
    });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, 'Vui lòng cung cấp một email hợp lệ!');

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 'Không tìm thấy người dùng, yêu cầu không hợp lệ!');

    const token = await ResetToken.findOne({ owner: user._id });
    if (token) return sendError(res, 'Chỉ sau một giờ, bạn mới có thể yêu cầu mã thông báo khác!');

    const randomBytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
    await resetToken.save();

    mailTransport().sendMail({
        from: 'securty@gmail.com',
        to: user.email,
        subject: 'Đặt lại mật khẩu',
        html: generatePasswordResetTemplate(`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`),
    });

    res.json({
        success: true,
        message: 'Liên kết đặt lại mật khẩu được gửi đến email của bạn.',
    });
};

exports.resetPassword = async (req, res) => {
    const { password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'người dùng không tìm thấy!');

    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) return sendError(res, 'Mật khẩu mới phải khác mật khẩu cũ!');

    if (password.trim().length < 8 || password.trim().length > 20)
        return sendError(res, 'Mật khẩu phải dài từ 8 đến 20 ký tự!');

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    mailTransport().sendMail({
        from: 'securty@gmail.com',
        to: user.email,
        subject: 'Đặt lại mật khẩu thành công',
        html: plainEmailTemplate('Đặt lại mật khẩu thành công', 'Bây giờ bạn có thể đăng nhập bằng mật khẩu mới!'),
    });

    res.json({ success: true, message: 'Đặt lại mật khẩu thành công' });
};
