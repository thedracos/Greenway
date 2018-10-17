import React from 'react';

const Loan = props => {
    function ordinalSuffixOf(i) {
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

    function onDelete() {
        if (confirm('Are you sure you want to delete this loan?')) {
            props.deleteLoan({id: props.id, userId: props.userId});
        }
    }


    return (
        <li className="flex-item">
            <div style={{textAlign: 'center'}}>{props.name}</div>
            <hr/>
            <div><label>Minimum Payment:</label> ${props.minimumPayment}</div>
            <div>Bill due on or before the {ordinalSuffixOf(props.dayBillDue)}</div>
            <div><label>Balance:</label> ${props.balance}</div>
            <div><label>APR:</label> {props.apr}%</div>
            <div><label>Autopay:</label> {props.autopay ? <span style={{color: '#1CB330'}}>On</span> : <span style={{color: '#C0392B'}}>Off</span>}</div>
            <div><a href={props.website}>{props.website}</a></div>
            <div style={{textAlign: 'right'}}><button onClick={() => props.showUpdateLoanForm(props)}>update</button> <button onClick={onDelete}>delete</button></div>
        </li>
    );

}

export default Loan;