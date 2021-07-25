import {projectMap} from './projectMap';

export async function fetchProjectDetails(contract, projectId) {
  const localProjectDetails = projectMap[projectId]
  const contractProjectDetails = await contract.methods.projectDetails(projectId).call();
  return {...contractProjectDetails, ...localProjectDetails};
}

export async function getProjectTokens(contract, projectId) {
  return contract.methods.projectShowAllTokens(projectId).call();
}
