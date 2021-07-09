import {getProjectTokens} from './projects';

export function filterForProject(allTokens, projectId) {
  const regex = new RegExp(`^${projectId}\\d+`, 'g');
  const tokens = !allTokens ? null : allTokens.filter(token => token.id.match(regex));
  if (tokens) {
    tokens.sort((tokenA, tokenB) => (tokenA.id < tokenB.id) ? -1: 1);
  }
  return tokens;
}

export async function fetchProjectTokensForAccount(contract, account, project) {
  if (!account) {
    return null;
  }

  const ids = await contract.methods.tokensOfOwner(account).call();
  const tokens = await Promise.all(ids.map(async (id) => {
    return {
      id,
      hash: await contract.methods.tokenIdToHash(id).call()
    };
  }));

  return filterForProject(tokens, project);
}

export async function getRandomTokenFromProject(contract, project) {
  const tokens = await getProjectTokens(contract, project);
  return {id: tokens[Math.floor(Math.random() * tokens.length)]}
}
