export async function fetchProjectDetails(contract, projectId) {
  return await contract.methods.projectDetails(projectId).call();
}
