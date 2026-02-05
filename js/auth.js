// 登录注册通用工具函数
// 发送邮箱验证码（Supabase内置，注册/重置密码自动触发）
async function sendResetCode(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    alert('发送验证码失败：' + error.message);
    return false;
  }
  alert('重置密码验证码已发送至你的邮箱！');
  return true;
}

// 重置密码
async function resetPassword(email, token, newPassword) {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'recovery'
  });
  if (error) {
    alert('验证码验证失败：' + error.message);
    return false;
  }
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (updateError) {
    alert('密码重置失败：' + updateError.message);
    return false;
  }
  alert('密码重置成功！请重新登录');
  window.location.href = 'login.html';
  return true;
}

// 校验用户登录状态（页面守卫）
function authGuard(redirect = true) {
  if (!currentUser && redirect) {
    alert('请先登录！');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// 校验管理员权限
function adminGuard() {
  if (!isAdmin) {
    alert('权限不足！');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}
