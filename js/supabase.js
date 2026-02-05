// 替换为你的Supabase项目信息
const SUPABASE_URL = "https://kkeadjqzxqmqrvmzclwe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZWFkanF6eHFtcXJ2bXpjbHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDE3MzIsImV4cCI6MjA4NTc3NzczMn0.Ox7W5-xF2qfi-UXggb7oMa8SHBR_oBw9BV_-WwnqEc8";

// 初始化Supabase客户端
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 全局用户状态
let currentUser = null;
let isAdmin = false;

// 监听用户登录状态
supabase.auth.onAuthStateChange(async (event, session) => {
  currentUser = session?.user || null;
  if (currentUser) {
    // 判断是否为管理员（替换为你的管理员UID）
    isAdmin = currentUser.id === "YOUR_ADMIN_UID";
    // 更新页面导航栏
    updateAuthUI();
  } else {
    isAdmin = false;
    updateAuthUI();
    // 未登录时跳转到登录页（除登录/注册页外）
    const excludePages = ['login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (!excludePages.includes(currentPage)) {
      window.location.href = 'login.html';
    }
  }
});

// 更新登录状态UI
function updateAuthUI() {
  const authLinks = document.getElementById('auth-links');
  if (authLinks) {
    if (currentUser) {
      authLinks.innerHTML = `
        <a href="profile.html" class="text-white hover:text-orange-500">${currentUser.email.split('@')[0]}</a>
        <button onclick="logout()" class="text-white hover:text-orange-500 ml-4">退出登录</button>
        ${isAdmin ? '<a href="admin.html" class="text-white hover:text-orange-500 ml-4">管理员后台</a>' : ''}
      `;
    } else {
      authLinks.innerHTML = `
        <a href="login.html" class="text-white hover:text-orange-500">登录</a>
        <a href="register.html" class="text-white hover:text-orange-500 ml-4">注册</a>
      `;
    }
  }
}

// 退出登录
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) alert('退出登录失败：' + error.message);
  else window.location.href = 'login.html';
}
