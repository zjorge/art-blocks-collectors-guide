export async function fetchProjectDetails(contract, projectId) {
  return await contract.methods.projectDetails(projectId).call();
}

export async function getProjectTokens(contract, projectId) {
  return contract.methods.projectShowAllTokens(projectId).call();
}
