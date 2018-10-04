import React, {Component} from 'react';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            nextCheckDate: '',
            lastCheckAmount: '',
            payFrequency: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
    }

    onSubmitHandler (event) {
        console.log('hello');
        fetch('/addExpense', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(data => {
            for(var state in this.state) {
                this.onChange({target: {name: state, value: ''}});
            }
        });
        event.preventDefault();
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    confirmPasswordChangeHandler(event) {
        if (event.target.value !== this.state.password) {
            event.target.setCustomValidity("Passwords Don't Match");
        } else {
            event.target.setCustomValidity("");
        }                
    }

    render () {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <input value={this.state.username} onChange={this.onChangeHandler} placeholder="Username" type="text" name="username" required />
                <br/>
                <br/>
                <label>
                    Amount of last pay check: <br/>
                    $<input value={this.state.lastCheckAmount} type="number" onChange={this.onChangeHandler} name="lastCheckAmount" min="0.00" step="0.01" placeholder="e.g. 1000.00" required />
                </label>
                <br/>
                <br/>
                <label>
                    Date of next pay check: <br/>
                    <input value={this.state.nextCheckDate} type="date" onChange={this.onChangeHandler} name="nextCheckDate" required />
                </label>
                <br/>
                <br/>
                <label>
                    How often are you paid: <br/>
                    <select name="payFrequency" onChange={this.onChangeHandler} required>
                        <option value="">Please select an option</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>
                <br/>
                <br/>
                <input name="password" value={this.state.password} placeholder="password" type="password" onChange={this.onChangeHandler} required />
                <br/>
                <br/>
                <input onChange={this.confirmPasswordChangeHandler} type="password" placeholder="confirm password" required />
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default SignUp;