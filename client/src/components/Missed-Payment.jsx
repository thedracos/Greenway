import React from 'react';
import moment from 'moment';

const MissedPayment = props => {
    let billDate = () =>  {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let dayBillDue = props.loan.dayBillDue;
        let billDueDate = new Date().setDate(dayBillDue);
        let previousBillDueDate = new Date();
        previousBillDueDate.setMonth(currentMonth - 1);
        previousBillDueDate.setDate(dayBillDue);
        if (billDueDate < currentDate) {
            return [moment(billDueDate).fromNow(), moment(billDueDate).format('LL')];
        }
        return [moment(previousBillDueDate).fromNow(), moment(previousBillDueDate).format('LL')];
    }

    return (
        <li className="flex-item missed-payment">
            <div style={{textAlign: 'center'}}>{props.loan.name}</div>
            <hr/>
            <div><label>Minimum Payment:</label> ${props.loan.minimumPayment}</div>
            <div><label>Your payment was due:</label> {billDate()[0]}</div>
            <div><label>Date payment was due:</label> {billDate()[1]}</div>
            <div><label>Autopay:</label> {props.loan.autopay ? <span style={{color: '#1CB330'}}>On</span> : <span style={{color: '#C0392B'}}>Off</span>}</div>
            <div><a href={props.loan.website}>{props.loan.website}</a></div>
            <div style={{textAlign: 'right'}}><button onClick={() => props.makePayment({loanId: props.loan.id, balance: props.loan.balance - props.loan.minimumPayment, payment: props.loan.minimumPayment, paymentDate: new Date()})}>Pay Now</button></div>
        </li>
    );
}

export default MissedPayment;