import React from 'react';

const Loan = props => {
    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    return (
        <li className="flex-item">
            <div style={{textAlign: 'center'}}>{props.name}</div>
            <hr/>
            <div>Minimum Payment: ${props.minimumPayment}</div>
            <div>Bill due on or before the {ordinal_suffix_of(props.dayBillDue)}</div>
            <div>Balance: ${props.balance}</div>
            <div>APR: {props.apr}%</div>
            <div>Autopay: {props.autopay ? <span style={{color: 'light green'}}>On</span> : <span style={{color: '#C0392B'}}>Off</span>}</div>
            <div><a href={props.website}>{props.website}</a></div>
        </li>
    );
}

export default Loan;