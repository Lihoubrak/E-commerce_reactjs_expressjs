import React, { useState } from 'react';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi email đến API để nhận OTP
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      // Xử lý response từ server
      if (response.ok) {
        // Hiển thị form xác thực OTP
        // Chuyển người dùng đến trang xác thực OTP
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Gửi OTP</button>
    </form>
  );
};

export default PasswordResetForm;
