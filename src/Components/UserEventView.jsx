import 'index.css';
import styles from 'Components/UserEventView.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { useContext, useEffect } from 'react';
import { MyContext } from 'App';

export default function UserEventView(props) {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    
    const id = useParams().id;
    const location = useLocation();
    const eventJSON = !location.state ? {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        ticket_price: 0.00,
        end_date: 'Jan 01 1970 12:00 AM',
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0}
         : location.state.eventJSON;

//TODO insert event data in, fix routing (use event id, routing should go back to tickets or events based on prev screen), 

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home'>{"Back"}</Link>
            </button>
            <div className={'item_10'}>
                <h1 id={styles.name}>{eventJSON.name}</h1>
            </div>
            <div className={styles.section_2 + ' item_90'}>
                <div className={styles.event_fields + ' item_60'}>
                    <table id={styles.table_fields}>
                        <tr>
                            <td>Venue:</td>
                            <td>{eventJSON.venue.username}</td>
                        </tr>
                        <tr>
                            <td>Start Date:</td>
                            <td>{eventJSON.startDate}</td>
                        </tr>
                        <tr>
                            <td>End Date:</td>
                            <td>{eventJSON.endDate}</td>
                        </tr>
                        <tr>
                            <td>Capacity:</td>
                            <td>{eventJSON.max_attendees}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{eventJSON.venue.address}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.image_section + ' item_40'}>
                    <div>
                        <img id={styles.image} src={ShowGoLogo}/>
                        <p class={styles.p}>{'$' + eventJSON.ticket_price} / Ticket</p>
                    </div>
                    <button className='button-enabled'>
                        <Link className='link-active' to={'/home/event/' + id + '/checkout'} state={{eventJSON: eventJSON}}>Buy Ticket</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}