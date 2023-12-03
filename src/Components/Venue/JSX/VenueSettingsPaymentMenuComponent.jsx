import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from 'App';

/*
    VenueSettingsPayment component subpage allows the venue to modify and update their payment information
    associated with their account. No actual backend API request is called, as this page is purely 
    decorational.
*/

const VenueSettingsPaymentMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [error, setError] = useState('');

    const [data, setData] = useState({
        card_name: '',
        card_number: '',
        cvv: '',
        expr_date: ''
    })

    /*
        validateInformation function validates the information stored in the data constant's sub variables,
        and returns true if valid. Otherwise, returns false.
    */

    function validateInformation(){
        var valid_info = true;
        const card_number = data.card_number;
        const card_name = data.card_name;
        const expiration_date = data.expr_date;
        const split = expiration_date.split('/');
        const cvv = data.cvv;
        if(card_number.length >= 15){
            valid_info = false;
            setError('Invalid Card Number')
        }
        if(!/^[a-zA-z]{2,} [a-zA-z]{2,}/.test(card_name)){
            valid_info = false;
            setError('Invalid Card Name')
        }
        var temp = (new RegExp('(0[1-9]|10|11|12)/(20[0-9]{2})')).test(expiration_date);

        if(!temp || new Date(split[1], split[0]) > new Date()){
            valid_info = false;
            setError('Invalid Expiration Date')
        }
        if(cvv.length >= 3){
            valid_info = false
            setError('Invalid CVV Number')
        }

        return valid_info;
    }

    /*
        submitInformation function asynchronously checks if the information submitted is valid by
        calling validateInformation, and sets a success message using the setError constant. 
    */
    async function submitInformation(){
        var check = validateInformation()
        if(check){
            setError('Payment information successfully updated.')
        }
        
    }

    /*
        handleInput constant determines the event target and value detected, and updates the corresponding
        sub variable using the setData constant.
    */
    const handleInput = (event) =>{
        const val = event.target.value;
        setData({
            ...data,
            [event.target.name]: val
        }
        );
    }

    /*
        handleSubmit constant handles when the "Save" button is selected, and calls the submitInformation
        function to validate the information.
    */
    const handleSubmit = (event) =>{
        event.preventDefault();
        submitInformation();
    }

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.payment_container}>
            <h1>Payment Methods</h1>
            <span>
                <label>Card Name</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>Card Number</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>CVV</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>Expiration Date</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            {error?<label>{error}</label>:null}   
            <div className={styles.container_buttons}>
                    <button className={styles.button1} onClick={handleSubmit}>Save</button>
                    <button className={styles.button2} onClick={ console.log('Navigating back to home')}>
                    <Link to='/venuehome'>Cancel</Link></button>
            </div>
        </div>
    )
}
export default VenueSettingsPaymentMenuComponent;