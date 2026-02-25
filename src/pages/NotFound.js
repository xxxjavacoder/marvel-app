import ErrorMessage from "../components/errorMessage/ErrorMessage";
import {NavLink} from 'react-router-dom';

function NotFound() {

    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <NavLink style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': 'black', 'textDecoration': 'none'}} to="/">Back to main page</NavLink>
            </div>
        </div>
    );
}

export default NotFound;
