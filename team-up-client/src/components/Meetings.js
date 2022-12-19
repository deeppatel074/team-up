import React from "react";
import { useParams } from "react-router-dom";
import WorkspaceNavBar from "./WorkspaceNavBar";

function Meetings() {
  const { id } = useParams();
  return (
    <div>
      <WorkspaceNavBar data={{ id: id, active: `4` }} />
      <h2>Meetings Page</h2>
    </div>
  );
}

export default Meetings;
