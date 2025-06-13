function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">Don't have an account? <a href="#">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
