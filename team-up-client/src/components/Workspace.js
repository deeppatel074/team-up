import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "../App.css";

function Workspace() {
  const [ws, setWS] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const getWS = async (id) => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4000/workspace/${id}`,
          header
        );
        setWS(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getWS(id);
  }, [id]);

  let name = "Not Found";
  if (ws) name = ws.name;

  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
}

export default Workspace;
