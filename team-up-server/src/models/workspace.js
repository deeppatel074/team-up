import mongoCollections from "../config/mongoCollections";
// import constants from "../config/constants";
const workspace = mongoCollections.workspace;



export async function createWorkspaceModel(name, createdBy) {
    const WorkspaceCollection = await workspace();
    // I added the user that created as a member and other members will be added later with invitation.
    // I have kept tasks,schedules adn sharedFiles empty as it will be added after that workspace is created.
    
    let newWorkspace = {
        name: name,
        tasks: [],
        sharedFiles: [],
        schedules: [],
        members: [
            createdBy
        ],
        createdDate: new Date(),
        createdBy : createdBy
    }

    const newInsertInformation = await WorkspaceCollection.insertOne(newWorkspace);
  if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return (newWorkspace);
}


export async function getWorkspaceById(id) {
    const WorkspaceCollection = await workspace();
    const workspaces = await WorkspaceCollection.find({
        createdBy: id
    }).toArray();
    if (!workspaces) {
        throw "No workspaces found"
    }
    for (i in workspaces) {
        workspaces[i]._id = workspaces[i]._id.toString();
    }
    return workspaces;

}