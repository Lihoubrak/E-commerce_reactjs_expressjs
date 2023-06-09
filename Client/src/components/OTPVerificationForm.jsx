import React, { useState } from 'react';

const OTPVerificationForm = () => {
  const [otp, setOTP] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi OTP và email đến API để xác thực
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      // Xử lý response từ server
      if (response.ok) {
        // Hiển thị form đặt lại mật khẩu
        // Chuyển người dùng đến trang đặt lại mật khẩu
      } else {
        // Xử lý lỗi nếu có
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button type="submit">Xác thực OTP</button>
    </form>
  );
};

export default OTPVerificationForm;
PasswordResetForm