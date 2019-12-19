import {FactomCli} from "factom";
import factomUtils from "factom/src/util";

const initialize = () => {
  const options = {
    host: '136.144.204.97',
    port: 8088,
  };

  return new FactomCli(options);
};

const hashFile = (file) => {
  return factomUtils
    .sha256(file);
};

const verify = async (file) => {
  const cli = initialize();
  const {chainId} = process.env;
  const fileHash = hashFile(file);

  const exists = await cli.chainExists(chainId);

  if (!exists) {
    throw new Error(`Chain doesn't exist`);
  }

  const entries = await cli.getAllEntriesOfChain(chainId);

  return entries
    .filter(entry => {
      const [, , badgeHash] = entry.extIdsHex;
      return badgeHash === fileHash;
    }).length === 1;
};

export {verify, hashFile};
