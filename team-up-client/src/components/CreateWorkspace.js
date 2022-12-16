import '../App.css';
import axios from 'axios';

const createWs = async (e) => {
    try {
        e.preventDefault();
        let wpName = document.getElementById("wsName").value;
        wpName = wpName.trim();
        if (wpName.length < 5) alert("Name must be at least 5 letters long");
        else {
            // fix this
            const res = await axios.post('http://localhost:4000/workspace/', { name: wpName });
            console.log(res)
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