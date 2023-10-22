require('dotenv').config();
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
//const wook_meta = require('../frontend/assets/data/wooks-data-w-index.json')['wooks'];
const path = require('path');
const dirPath = path.join(__dirname, '/wook_ipfs');
const celeb_meta = require('../frontend/assets/data/newCelebMeta.json')['celebs'];
const celeb_ims = fs.readdirSync('./frontend/assets/img/PixelwookCelebs/');
const celeb_ims2 = fs.readdirSync('./frontend/assets/img/PixelwookCelebs/', { withFileTypes: true });

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function populateMeta() {
  let celeb_json = {};
  for (i = 0; i < celeb_ims.length; i += 1) {
    console.log(celeb_ims2[i].name);
    let index = i;
    if (celeb_ims2[i].name !== '.DS_Store') {
      //   console.log(celeb_meta[i]);
      celeb_json[i] = {
        name: `${celeb_meta[i].name}`,
        attributes: [],
        image: '',
      };
      Object.keys(celeb_meta[i]).forEach(function (key) {
        // console.log(key);
        if (key !== 'index' && key !== 'name') {
          celeb_json[i]['attributes'].push({
            trait_type: key,
            value: celeb_meta[i][key],
          });
        }
      });
      stream = fs.createReadStream(`./frontend/assets/img/PixelwookCelebs/${celeb_ims[i]}`);
      let options = {};
      // pin image file
      await pinata
        .pinFileToIPFS(stream, options)
        .then((result) => {
          let imageURI = result['IpfsHash'];
          celeb_json[i]['image'] = `ipfs://${imageURI}`;
        })
        .catch((err) => {
          console.log(`Error writing file ${i}, ${err}`);
        });
      fs.writeFile(`./wook_ipfs/${index}`, JSON.stringify(celeb_json[i]), (err) => {
        if (err) console.log(`Error writing file ${i}`);
        else {
        }
      });
    }

    //stream = fs.createReadStream(`./frontend/assets/img/wooks/${i}.gif`)
  }
}

populateMeta();
