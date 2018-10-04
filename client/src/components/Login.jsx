import React from 'react';

const Login = props => {
  return (
    <div>
      <h1>Slytherin</h1>
      <form>
        <div>
          <label>Username:</label><br />
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="text" name="password" />
        </div><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;