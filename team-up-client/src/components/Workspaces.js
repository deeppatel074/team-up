import '../App.css';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Workspaces() {
    const [ws, setWS] = useState(undefined);
    useEffect(() => {
        const getWS = async () => {
            const userID = Cookies.get("user");
            const idToken = await firebase.auth().currentUser.getIdToken();
            const header = {
                headers: {
                    "Authorization": "Bearer " + idToken
                }
            };
            try {
                const { data } = await axios.get(`http://localhost:4000/users/${userID}/workspace`, header);
                setWS(data);
            } catch (e) {
                console.log(e);
            }
        }
        getWS();
    }, []);

    console.log(ws);

    let op = <h2>No Workspaces</h2>;

    if (ws && ws.length != 0) {
        op = ws.map((d) => {
            const h = <h2><Link to={`/workspace/${d._id}`}>{d.name}</Link></h2>
            const mem = <h4>{d.members.length} members</h4>
            return (
                <div key={d._id}>
                    {h}
                    {mem}
                </div>
            )
        })
    }

    return (
        <div>
            {op}
            {/* <h2>No Workspaces</h2> */}
        </div>
    );
}

export default Workspaces;