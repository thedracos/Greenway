import React from 'react';
import moment from 'moment';

const UpcomingPayment = props => {
    let billDate = () =>  {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let dayBillDue = props.loan.dayBillDue;
        let billDueDate = new Date().setDate(dayBillDue);
        let nextBillDueDate = new Date();
        nextBillDueDate.setMonth(currentMonth + 1);
        nextBillDueDate.setDate(dayBillDue);
        if (billDueDate >= currentDate) {
            return moment(billDueDate).format('LL')
        } 
        return moment(nextBillDueDate).format('LL')
    }

    return (
        <li className="flex-item upcoming-payment">
            <div style={{textAlign: 'center'}}>{props.loan.name}</div>
            <hr/>
            <div><label>Minimum Payment:</label> ${props.loan.minimumPayment}</div>
            <div><label>Payment Due:</label> {billDate()}</div>
            <div><label>Autopay:</label> {props.loan.autopay ? <span style={{color: '#1CB330'}}>On</span> : <span style={{color: '#C0392B'}}>Off</span>}</div>
            <div><a href={props.loan.website}>{props.loan.website}</a></div>
            <div style={{textAlign: 'right'}}><button onClick={() => props.makePayment({loanId: props.loan.id, balance: props.loan.balance - props.loan.minimumPayment, payment: props.loan.minimumPayment, paymentDate: new Date()})}>Pay Now</button></div>
        </li>
    );
}

export default UpcomingPayment;