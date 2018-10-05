import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onSubmitHandler(event) {
    console.log('onSubmitHandler',this.state)
    fetch('/api/users/login',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(data => {
      this.setState({
        name: '',
        password: ''
      });
      console.log(data)
    });
    event.preventDefault();
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name] : event.target.value
    }, () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <h1>Slytherin</h1>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <input value={this.state.name} type="text" name="name" placeholder="Username" onChange={this.onChangeHandler} required/>
          </div>
          <div>
            <input value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.onChangeHandler} required/>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }

}


export default Login;