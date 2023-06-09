import React, { useState } from 'react';

const NewPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi mật khẩu mới đến API để đặt lại mật khẩu
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // Xử lý response từ server
      if (response.ok) {
        // Hiển thị thông báo thành công
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
        type="password"
        placeholder="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Xác nhận mật khẩu mới"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Đặt lại mật khẩu</button>
    </form>
  );
};

export default NewPasswordForm;
