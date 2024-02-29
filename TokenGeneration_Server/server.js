const express = require('express');
const cors = require('cors');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { mplBubblegum } = require('@metaplex-foundation/mpl-bubblegum');
const { generateSigner, keypairIdentity, publicKey } = require('@metaplex-foundation/umi');
const { createTree } = require('@metaplex-foundation/mpl-bubblegum');
const { fetchMerkleTree } = require('@metaplex-foundation/mpl-bubblegum');
const { none } = require('@metaplex-foundation/umi');
const { mintV1, parseLeafFromMintV1Transaction, findLeafAssetIdPda } = require('@metaplex-foundation/mpl-bubblegum');

const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());

app.post('/trigger-script', async (req, res) => {
  try {
    const umi = createUmi('https://api.devnet.solana.com').use(mplBubblegum());

    const secretKey = [2,31,38,36,149,166,99,136,4,61,165,172,181,191,64,181,32,176,93,220,98,164,64,35,223,208,0,52,84,146,237,219,102,113,185,77,216,214,234,238,230,226,99,233,122,111,21,16,166,87,169,209,183,242,211,246,129,235,200,196,247,155,147,217]
    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
    umi.use(keypairIdentity(keypair));

    const merkleTree = generateSigner(umi);

    // const builder = await createTree(umi, {
    //   merkleTree,
    //   treeCreator: merkleTree,
    //   public: true,
    //   maxDepth: 14,
    //   maxBufferSize: 64,
    // });

    // await builder.sendAndConfirm(umi);

    // const merkleTreeAccount = await fetchMerkleTree(umi, publicKey('ZB8oAPG2PGF87qMiQaVhQZLJCX2t4aAbHZQ85yqWQyx'));

    const { signature } = await mintV1(umi, {
      leafOwner: umi.identity.publicKey,
      merkleTree: publicKey('ZB8oAPG2PGF87qMiQaVhQZLJCX2t4aAbHZQ85yqWQyx'),
      metadata: {
        name: 'My Compressed NFT',
        uri: 'https://example.com/my-cnft.json',
        sellerFeeBasisPoints: 500,
        collection: none(),
        creators: [
          { address: umi.identity.publicKey, verified: false, share: 100 },
        ],
      },
    }).sendAndConfirm(umi);

    console.log(signature)

    // const leaf = await parseLeafFromMintV1Transaction(umi, signature);
    // console.log(leaf)
    const assetId = findLeafAssetIdPda(umi, { merkleTree: publicKey('ZB8oAPG2PGF87qMiQaVhQZLJCX2t4aAbHZQ85yqWQyx'), leafIndex: 0n });
    console.log("assertId" + assetId);


    res.status(200).json(assetId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
