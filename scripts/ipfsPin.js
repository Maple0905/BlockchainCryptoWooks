require('dotenv').config()
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
//const wook_meta = require('../frontend/assets/data/wooks-data-w-index.json')['wooks'];

const celeb_meta = require('../frontend/assets/data/celebMeta.json')['celebs'];
const celeb_ims = fs.readdirSync('./frontend/assets/img/celebs/');

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function populateMeta() {
    let wooks_json = {}
    for (i = 0; celeb_ims.length > i; i += 1) {
        let index = i + 5000;
        wooks_json[i] = {
            'name': `wook #${index}`,
            'attributes': [],
            'image': ''
        }

        Object.keys(celeb_meta[i]).forEach( function(key) {
            if (key !== 'index') {
                wooks_json[i]['attributes'].push({
                    'trait_type': key,
                    'value': celeb_meta[i][key]
                })
            }
        })

        //stream = fs.createReadStream(`./frontend/assets/img/wooks/${i}.gif`)
        stream = fs.createReadStream(`./frontend/assets/img/celebs/${celeb_ims[i]}`)
        let options = {};
        // pin image file
        await pinata.pinFileToIPFS(stream, options).then((result) => {
            let imageURI = result["IpfsHash"]
            wooks_json[i]['image'] = imageURI;
        }).catch((err) => {
            console.log(`Error writing file ${i}, ${err}`);
        });

        fs.writeFile(`./wook_ipfs/${index}`, JSON.stringify(wooks_json[i]), (err) => {
            if (err)
              console.log(`Error writing file ${i}`);
            else {}
        });    
    }
}

populateMeta();