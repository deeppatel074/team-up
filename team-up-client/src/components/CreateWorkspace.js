import '../App.css';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';

function CreateWorkspace() {
    let navigate = useNavigate();

    const createWs = async (e) => {
        try {
            e.preventDefault();
            let wpName = document.getElementById("wsName").value;
            wpName = wpName.trim();
            const param = {
                name: wpName
            };
            if (wpName.length < 5) alert("Name must be at least 5 letters long");
            else {
                const idToken = await firebase.auth().currentUser.getIdToken();
                const header = {
                    headers: {
                        "Authorization": "Bearer " + idToken
                    }
                };
                const { data } = await axios.post('http://localhost:4000/workspace/', param, header);
                console.log(data);
                document.getElementById("wsName").value = "";
                navigate(`/workspace/${data._id}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    let form = (
        <form id='newWs' onSubmit={createWs}>
            <label>
                Name
            </label>
            <input id='wsName' name='wsName' type='text'></input>
            <br />
            <button className='button'>Create</button>
        </form>
    );
    return (
        <div>
            <h2>Create New Workspace</h2>
            {form}
        </div>
    );
}

export default CreateWorkspace;