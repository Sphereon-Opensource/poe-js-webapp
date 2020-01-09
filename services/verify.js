const {FactomCli} = require('factom');
const crypto = require('crypto');

const cli = new FactomCli({
  host: 'factom.blockchange.dev.sphereon.com',
  protocol: 'https',
  path: '/v2',
  port: 443,
  timeout: 5000,
});

const chainExists = async chainId => {
  return cli.chainExists(chainId)
    .then(exists => {
      if (!exists) {
        throw new Error(`Chain doesn't exist`);
      }
    });
};

const hashFile = bytes => {
  return crypto.createHash('sha256')
    .update(Buffer.from(bytes, 'hex'))
    .digest('hex');
};

const verifyFilesFromBytes = (files, chainId) => {
  return chainExists(chainId)
    .then(() => cli.getAllEntriesOfChain(chainId))
    .then(chainEntries => {
      return files
        .map(file => {
          const blockchainEntry = findEntryFromBytes(chainEntries, file.bytes);
          if (blockchainEntry) {
            return {
              name: file.name,
              verified: true,
              blockchainEntry,
            };
          }
          return {
            name: file.name,
            verified: false,
          };
        });
    });
};

const findEntryFromBytes = (chainEntries, bytes) => {
  const matchingEntries = chainEntries
    .filter(entry => entry.extIds)
    .filter(entry => entry.extIds.length >= 3)
    .filter(entry => {
      const [, , badgeHash] = entry.extIds;
      return badgeHash.toString('ascii') === hashFile(bytes);
    });

  if (matchingEntries.length) {
    return matchingEntries[0];
  }
};

export {verifyFilesFromBytes};
