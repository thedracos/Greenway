import React from 'react';
import moment from 'moment';

const Paid = props => {
    return (
        <li className="flex-item made-payment">
            <div style={{textAlign: 'center'}}>{props.loan.name}</div>
            <hr/>
            <div><label>Amount of last payment:</label> ${props.loan.minimumPayment}</div>
            <div><label>Date of last payment:</label> {moment(props.loan.updatedAt).format('LL')}</div>
            <div><label>Autopay:</label> {props.loan.autopay ? <span style={{color: '#1CB330'}}>On</span> : <span style={{color: '#C0392B'}}>Off</span>}</div>
            <div><a href={props.loan.website}>{props.loan.website}</a></div>
        </li>
    );
}

export default Paid;