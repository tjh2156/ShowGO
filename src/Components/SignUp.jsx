import 'index.css';
import 'Components/SignUp.css';
import Checkmark from 'Assets/Checkmark.svg';
import X from 'Assets/X.svg';
import Placeholder from 'Assets/Placeholder.svg';
import {Link} from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {

    const [isUser, setIsUser] = useState(0);

    return(
        <div>
            <button id='back'>
                <Link to='/login'>Back</Link>
            </button>
            <div id='content'>
                <div class='section_1'>
                    <h1>Get Tickets To All Your Favorites</h1>
                    <h2 className='subtext'>Or Maybe Something New...</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id='formContainer'>
                        <span>
                            <label class='item_50'>Who Are You?</label>
                            <span class='item_40' id='userOptions'>
                                <button>User</button>
                                <button>Venue</button>
                                {/* className={isUser ? '' : 'button-enabled'} onClick={setIsUser(false)} */}
                            </span>
                        </span>
                        <br></br>

                        <span>
                            <label class='item_50'>Display Name</label>
                            <input class='item_40'></input>
                            <img class='item_10' src={Placeholder} alt=""/>
                        </span>
                        <br></br>

                        <span>
                            <label class='item_50'>Username</label>
                            <input class='item_40'></input>
                            <img class='item_10' src={Checkmark} alt=""/>
                        </span>
                        <br></br>

                        <span>
                            <label class='item_50'>Password</label>
                            <input class='item_40'></input>
                            <img class='item_10' src={X} alt=""/>
                        </span>
                        <span class='validation'>
                            <p class='item_90 text-invalid' id='alphanumeric'>Only Alphanumeric characters</p>
                            <img class='item_10 img_small ' src={X} alt=""/>
                        </span>
                        <span class='validation'>
                            <p class='item_90 text-valid' id='passwordLength'>At least 6 characters long</p>
                            <img class='item_10 img_small ' src={X} alt=""/>
                        </span>
                        <br></br>
                        <span style={{justifyContent: 'center'}}>
                            <button class='button-disabled'>Sign Up</button>
                        </span>
                    </div>


                </div>
                <div class='section_2'>
                    <svg id="ticket" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 967 970">
                        <path d="M271.146 702.702C224.412 657.349 159.327 644.731 109.243 666.675L53.0387 612.131C33.001 592.685 22.9819 582.962 18.635 572.145C14.8116 562.629 13.9793 552.559 16.2571 543.377C18.847 532.939 27.3424 524.229 44.3328 506.809L493.325 46.4514C510.316 29.0294 518.811 20.3199 529.2 17.4508C538.34 14.9259 548.451 15.4815 558.093 19.0317C569.053 23.0685 579.072 32.7916 599.11 52.2373L655.307 106.775C634.693 157.318 649.134 221.876 695.868 267.229C742.602 312.582 807.681 325.194 857.763 303.249L913.961 357.786C934 377.233 944.018 386.955 948.365 397.773C952.189 407.29 953.021 417.355 950.742 426.539C948.153 436.977 939.659 445.687 922.667 463.109L473.675 923.466C456.685 940.886 448.189 949.597 437.8 952.466C428.661 954.989 418.549 954.438 408.907 950.886C397.947 946.849 387.929 937.127 367.89 917.68L311.7 863.15C332.315 812.608 317.88 748.055 271.146 702.702Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default SignUp;