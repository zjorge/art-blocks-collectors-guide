import {artblocksApiUrl} from './consts';

function ArtBlocksImage({cname, token}) {
  return (
    <img 
      className={`${cname}`}
      src={`${artblocksApiUrl}/image/${token.id}`}
      alt={token.id}
    />
  );
}

export default ArtBlocksImage;
