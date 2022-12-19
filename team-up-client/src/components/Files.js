import React from "react";
import { useParams } from "react-router-dom";
import WorkspaceNavBar from "./WorkspaceNavBar";
function Files() {
  const { id } = useParams();
  return (
    <div>
      <WorkspaceNavBar data={{ id: id, active: `3` }} />
      <h2>Files Page</h2>
    </div>
  );
}

export default Files;
