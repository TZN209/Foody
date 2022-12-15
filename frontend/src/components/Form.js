import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/user';

export default function Form() {
    const location = useLocation();
    const navigate = useNavigate();
    const [invalidUser, setInvalidUser] = useState('');
    const [busy, setBusy] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: '',
    });

    const { token, id } = queryString.parse(location.search);

    const verifyToken = async () => {
        try {
            const { data } = await axios(`${baseUrl}/verify-token?token=${token}&id=${id}`);
            setBusy(false);
        } catch (error) {
            if (error?.response?.data) {
                const { data } = error.response;
                if (!data.success) return setInvalidUser(data.error);
                return console.log(error.response.data);
            }
            console.log(error);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;

        setNewPassword({ ...newPassword, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = newPassword;
        if (password.trim().length < 8 || password.trim().length > 20) {
            return setError('Mật khẩu phải dài từ 8 đến 20 ký tự');
        }
        if (password !== confirmPassword) {
            return setError('Mật khẩu không hợp lệ!');
        }

        try {
            setBusy(true);
            const { data } = await axios.post(`${baseUrl}/reset-password?token=${token}&id=${id}`, { password });
            setBusy(false);

            if (data.success) {
                navigate('/reset-password', { replace: true });
                setSuccess(true);
            }
        } catch (error) {
            setBusy(false);
            if (error?.response?.data) {
                const { data } = error.response;
                if (!data.success) return setError(data.error);
                return console.log(error.response.data);
            }
            console.log(error);
        }
    };

    if (success)
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Đặt lại mật khẩu thành công!</h1>
            </div>
        );

    if (invalidUser)
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">{invalidUser}</h1>
            </div>
        );

    if (busy)
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Vui lòng đợi trong giây lát</h1>
            </div>
        );

    return (
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">Đặt lại mật khẩu</h1>
            <form onSubmit={handleSubmit} className="shadow w-full rounded-lg p-10">
                {error && <p className="text-center p-2 mb-3 bg-red-500 text-white">{error}</p>}
                <div className="space-y-8">
                    <div>
                        <h4>Mật khẩu mới</h4>
                        <input
                            type="password"
                            placeholder="********"
                            name="password"
                            onChange={handleOnChange}
                            className="px-3 password-lg h-10 w-full border-gray-500 border-2 rounded"
                        />
                    </div>
                    <div>
                        <h4>Xác nhận mật khẩu</h4>
                        <input
                            type="password"
                            placeholder="********"
                            name="confirmPassword"
                            onChange={handleOnChange}
                            className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Đặt lại mật khẩu"
                        className="bg-orange-500 w-full py-3 text-white rounded"
                    />
                </div>
            </form>
        </div>
    );
}
