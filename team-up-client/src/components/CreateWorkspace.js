import '../App.css';
import axios from 'axios';
import firebase from 'firebase/compat/app';

const createWs = async (e) => {
    try {
        e.preventDefault();
        let wpName = document.getElementById("wsName").value;
        wpName = wpName.trim();
        const data = {
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
            const res = await axios.post('http://localhost:4000/workspace/', data, header);
            console.log(res);
            document.getElementById("wsName").value = "";
            alert(wpName + " Workspace created!");
        }
    }
    catch (err) {
        console.log(err);
    }
}

function CreateWorkspace() {
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