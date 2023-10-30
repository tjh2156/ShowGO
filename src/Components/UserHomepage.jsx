import 'index.css';
import styles from 'Components/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBar from 'Components/SearchBar';

export default function UserHomepage(props) {
    const [loggedIn, setLoggedIn] = props.loggedIn;
    const [loggedInUserVenue, setLoggedInUserVenue] = props.loggedInUserVenue;
    setLoggedInUserVenue("nathanielendick");
    setLoggedIn(true);
    return (
        <div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div class={styles.content}>
                <div class={styles.section_1}>
                    <SearchBar id={styles.searchbar}/>
                </div>
                <div class={styles.section_2}>
                <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    

                </div>
            </div>

        </div>
    )
}