import 'index.css';
import styles from 'Components/Other/CSS/SignUp.module.css';
import Checkmark from 'Assets/Checkmark.svg';
import X from 'Assets/X.svg';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import {Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import { MyContext } from 'App';
import Resizer from "react-image-file-resizer";

/*
    SignUp displays a page where a user or venue can enter details to create a new account. Upon clicking 'Sign Up',
    if the details are valid, a user or venue will be added to the database respectively and they will be navigated to
    their respective homepage.
*/
export default function SignUp() {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const setLoggedIn = loggedInState[1];
    const setUserType = userTypeState[1];
    const setUser = userState[1];
    const navigator = useNavigate();

    const [error, setError] = useState("");
    var timeout = null;
    const [selectedType, setSelectedType] = useState(null); //'user' or 'venue'
    const [userNameValid, setUsernameValid] = useState(false); //state to check username validity
    const [passwordChecks, setPasswordChecks] = useState([false, false, false, false]); //password requirements
    const [showPassword, setShowPassword] = useState(false); //Show password toggle
    const [pfpSelection, setPfpSelection] = useState(null);

    //Updates the error message with the given timeout length in ms
    function updateError(message, ms) {
        if(timeout) {
            clearTimeout();
        }
        setError(message);
        timeout = setTimeout(() =>{
            setError("");
        }, ms);
    }

    /*
        Checks if the username selected in valid upon clicking off of the username textbox.
        Valid implies the username has not been selected by any existing users/venues and meets validation requirements
        set in the SRS.
        */
    async function checkUsernameValid() {
        var username = document.getElementById(styles.username).value;
        if(username === "" || selectedType == null) return;
        var [check1, check2] = [true, true];
        await fetch('http://localhost:8080/venues/' + username, {
            method: 'GET',
        }).then(response => {
                if (response.ok) {
                    check1 = false;
                }
            });
        await fetch('http://localhost:8080/user/' + username, {
            method: 'GET',
        }).then(response => {
                if (response.ok) {
                    check2 = false;
                }
            });
        setUsernameValid((check1 && check2) ? true : false);
        
    }

    //Checks if a password is valid based on all the password criteria specified by the SRS
    function checkPasswordValid() {
        var password = document.getElementById(styles.password).value;
        setPasswordChecks([/^[a-zA-Z0-9!?#$&*]+$/.test(password), password.match(/[!?#$&*]/), password.match(/[A-Z]/), (password.length >= 8 && password.length <= 40)]);
    }

    //If all fields are valid, signs up a user. Otherwise, returns an error
    function signUp() {
        //Simulate Sign Up being disabled if all validation isn't met
        if (!(selectedType && userNameValid && passwordChecks.every(v => v))) return;

        const username = document.getElementById(styles.username).value;
        const name = document.getElementById(styles.name).value
        const password = document.getElementById(styles.password).value;
        
        //Selects body data based on user type
        var requestOptions;
        if(selectedType === 'venue') {
            const location = document.getElementById(styles.location).value;
            const hide_location = document.getElementById(styles.hide_location).checked;
            const description = document.getElementById(styles.description).value;
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username, 
                    name: name,
                    password: password,
                    pfp: pfpSelection,
                    location: location,
                    hide_location: hide_location,
                    description: description
                })
            };
        } else {
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username, 
                    name: name,
                    password: password,
                    pfp: pfpSelection,
                })
            };
        }
        //Adds the user/venue to the database then logs in the user if successful
        fetch('http://localhost:8080/' + (selectedType === 'venue' ? 'venues' : 'users'), requestOptions)
            .then(response => {
                return response.ok ? response.json() : null;
            }).then(data => {
                if (data) {
                    setLoggedIn(true);
                    setUserType(selectedType);
                    setUser(data);
                    navigator(selectedType === 'user' ? '/home' : '/venuehome');
                } else {
                    updateError("Error creating user. Try again later.", 2500);
                }
            });
    }

    //Handles profile picture input. Converts the image to base64 to allow it to be stored and resizes to 300x300.
    async function handleImage (event) {
        const file = event.target.files[0];
        
        if (!file) {
            setPfpSelection(null);
            return;
        };

        //Resize image to reduce load times
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
            setPfpSelection(uri);
            }, 'base64');
    }

    return(
        <div>
            <button id={styles.back}>
                <Link to='/login'>Back</Link>
            </button>
            <div id={styles.content}>
                <div id={styles.section_1}>
                    <h1>Get Tickets To All Your Favorites</h1>
                    <h2 className='subtext'>Or Maybe Something New...<br/></h2>
                    <div id={styles.formContainer}>
                        <label className={styles.label + ' ' + styles.col_1}>Who Are You? *</label>
                        <span id={styles.user_type} className={styles.col_2}>
                            <button className={(selectedType === 'user' ? 'button_enabled' : '')} onClick={() => {setSelectedType('user')}}>User</button>
                            <button className={(selectedType === 'venue' ? 'button_enabled': '')} onClick={() => {setSelectedType('venue')}}>Venue</button>
                        </span>

                        <label className={styles.label + ' ' + styles.col_1}>Profile Picture</label>
                        <input accept="image/*" className={styles.input + ' ' + styles.col_2_3} title=" " type="file" onChange={handleImage}/>
                        <img id={styles.pfp_display} className={styles.col_2 + ' img_medium'} src={pfpSelection ? pfpSelection : ShowGoLogo} alt=""/>

                        <label className={styles.label + ' ' + styles.col_1}>Display Name *</label>
                        <input id={styles.name} maxLength='40' className={styles.input + ' ' + styles.col_2_3}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Username *</label>
                        <input id={styles.username} maxLength='20' className={styles.input + ' ' + styles.col_2} onBlur={() => checkUsernameValid()}></input>
                        <img className={styles.col_3} src={userNameValid ? Checkmark : X} alt=""/>

                        <label className={styles.label + ' ' + styles.col_1}>Password *</label>
                        <input  maxLength='40' type={showPassword ? 'text' : 'password'} className={styles.input + ' ' + styles.col_2} id={styles.password} onChange={() => checkPasswordValid()}></input>
                        <img className={styles.col_3} src={passwordChecks.every(v => v) ? Checkmark : X} alt=""/>
                        
                        <p className={styles.col_2 + ' ' + styles.p + ' ' + (passwordChecks[0] ? 'text_valid' : 'text_invalid')}>No spaces</p>
                        <img className={styles.col_3 + ' img_small'} src={passwordChecks[0] ? Checkmark : X} alt=""/>
                        <p className={styles.col_2 + ' ' + styles.p + ' ' + (passwordChecks[1] ? 'text_valid' : 'text_invalid')}>One special character (!,?,#,$,%,&,*),</p>
                        <img className={styles.col_3 + ' img_small'} src={passwordChecks[1] ? Checkmark : X} alt=""/>
                        <p className={styles.col_2 + ' ' + styles.p + ' ' + (passwordChecks[2] ? 'text_valid' : 'text_invalid')}>One capital letter</p>
                        <img className={styles.col_3 + ' img_small'} src={passwordChecks[2] ? Checkmark : X} alt=""/>
                        <p className={styles.col_2 + ' ' + styles.p + ' ' + (passwordChecks[3] ? 'text_valid' : 'text_invalid')}>Between 8-40 characters</p>
                        <img className={styles.col_3 + ' img_small'} src={passwordChecks[3] ? Checkmark : X} alt=""/>
                        <button id={styles.toggle_password} className={styles.col_2 + ' ' + (showPassword ? 'button_enabled' : '')} onClick={() => setShowPassword(!showPassword)}>Show Password</button>

                        {selectedType === 'venue' ? 
                        (<>
                            <label className={styles.label + ' ' + styles.col_1}>Location</label>
                            <input maxLength='100' id={styles.location} className={styles.input + ' ' + styles.col_2_3}></input>

                            <label className={styles.label + ' ' + styles.col_1}>Hide Location?</label>
                            <input id={styles.hide_location} className={styles.input + ' ' + styles.col_2_3} type="checkbox" name='hideLocation' />

                            <label className={styles.label + ' ' + styles.col_1}>Venue Description</label>
                            <input  maxLength='255' id={styles.description} className={styles.input + ' ' + styles.col_2_3}></input>
                        </>)
                        : <></>}
                        <p className={styles.p + " " + styles.col_2_3} id={styles.error}>{error ? error : ""}</p>
                        <span id={styles.sign_up_button}>
                            <button className={selectedType && userNameValid && passwordChecks.every(v => v) ? 'button_enabled' : 'button_disabled'} onClick={() => signUp()}>Sign Up</button>
                        </span>
                    </div>
                </div>
                <div id={styles.section_2}>
                    <svg id={styles.ticket} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 967 970">
                        <path d="M271.146 702.702C224.412 657.349 159.327 644.731 109.243 666.675L53.0387 612.131C33.001 592.685 22.9819 582.962 18.635 572.145C14.8116 562.629 13.9793 552.559 16.2571 543.377C18.847 532.939 27.3424 524.229 44.3328 506.809L493.325 46.4514C510.316 29.0294 518.811 20.3199 529.2 17.4508C538.34 14.9259 548.451 15.4815 558.093 19.0317C569.053 23.0685 579.072 32.7916 599.11 52.2373L655.307 106.775C634.693 157.318 649.134 221.876 695.868 267.229C742.602 312.582 807.681 325.194 857.763 303.249L913.961 357.786C934 377.233 944.018 386.955 948.365 397.773C952.189 407.29 953.021 417.355 950.742 426.539C948.153 436.977 939.659 445.687 922.667 463.109L473.675 923.466C456.685 940.886 448.189 949.597 437.8 952.466C428.661 954.989 418.549 954.438 408.907 950.886C397.947 946.849 387.929 937.127 367.89 917.68L311.7 863.15C332.315 812.608 317.88 748.055 271.146 702.702Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}