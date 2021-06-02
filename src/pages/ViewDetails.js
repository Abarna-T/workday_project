import React from "react";
import EditPersonalDetails from "../components/editDetails/EditPersonalDetails";
import EditTeamDetails from "../components/editDetails/EditTeamDetails";
import ViewSkills from "../components/editDetails/ViewSkills";

function ViewDetails() {
  return (
    <div>
      <EditPersonalDetails />
      <ViewSkills />
      <EditTeamDetails />
    </div>
  );
}

export default ViewDetails;
