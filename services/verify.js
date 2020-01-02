const {FactomCli} = require('factom');
const crypto = require('crypto');

const cli = new FactomCli({
  host: 'localhost',
  port: 8088,
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

const verifyFromBytes = (bytes, chainId) => {
  return chainExists(chainId)
    .then(() => cli.getAllEntriesOfChain(chainId))
    .then(chainEntries => {
      const matchingEntries = chainEntries
        .filter(entry => entry.extIds)
        .filter(entry => entry.extIds.length >= 3)
        .filter(entry => {
          const [, , badgeHash] = entry.extIds;
          return badgeHash.toString('ascii') === hashFile(bytes);
        });

      if (!matchingEntries.length) {
        throw new Error('No matching entries');
      }
      return matchingEntries[0];
    });
};

export {verifyFromBytes};
