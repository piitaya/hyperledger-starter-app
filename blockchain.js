var IBMBlockchain = require('ibm-blockchain-js');
var fs = require('fs');
var TAG = "Blockchain init:";
var Promise = require("bluebird");

var ibc = new IBMBlockchain();
var user_manager = require('./utils/users');

var blockchain = module.exports = {
    init: init,
    chaincode: {},
    ibc: ibc
};

function init() {
    return new Promise(function(resolve, reject) {
        // Load peers manually or from VCAP, VCAP will overwrite hardcoded list!
        var manual = JSON.parse(fs.readFileSync('vcap.json', 'utf8'));

        var peers, users, ca;

        if (manual.credentials.peers) {
            console.log(TAG, 'loading', manual.credentials.peers.length, 'hardcoded peers');
            peers = manual.credentials.peers;
        }

        if (manual.credentials.users) {
            console.log(TAG, "loading", manual.credentials.users.length, "hardcoded users");
            users = manual.credentials.users;
        }

        if (manual.credentials.ca) {
            var ca_name = Object.keys(manual.credentials.ca)[0];
            console.log(TAG, "loading ca:", ca_name);
            ca = manual.credentials.ca[ca_name];
        }

        if (process.env.VCAP_SERVICES) {															//load from vcap, search for service, 1 of the 3 should be found...
            var servicesObject = JSON.parse(process.env.VCAP_SERVICES);
            for (var i in servicesObject) {
                if (i.indexOf('ibm-blockchain') >= 0) {											// looks close enough (can be suffixed dev, prod, or staging)
                    if (servicesObject[i][0].credentials.error) {
                        console.log('!\n!\n! Error from Bluemix: \n', servicesObject[i][0].credentials.error, '!\n!\n');
                        peers = null;
                        users = null;
                        process.error = {
                            type: 'network',
                            msg: "Due to overwhelming demand the IBM Blockchain Network service is at maximum capacity.  Please try recreating this service at a later date."
                        };
                    }
                    if (servicesObject[i][0].credentials && servicesObject[i][0].credentials.peers) {
                        console.log('overwritting peers, loading from a vcap service: ', i);
                        peers = servicesObject[i][0].credentials.peers;
                        var ca_name = Object.keys(servicesObject[i][0].credentials.ca)[0];
                        console.log(TAG, "loading ca:", ca_name);
                        ca = servicesObject[i][0].credentials.ca[ca_name];
                        if (servicesObject[i][0].credentials.users) {
                            console.log('overwritting users, loading from a vcap service: ', i);
                            users = servicesObject[i][0].credentials.users;
                        }
                        else users = null;														//no security
                        break;
                    }
                }
            }
        }

        // Options for the blockchain network
        var options = {};

        // Start up the network
        configure_network();

        // Configure ibm-blockchain-js sdk
        function configure_network() {

            options = {
                network: {
                    peers: peers,
                    users: users
                },
                chaincode: {
                    zip_url: 'https://github.com/IBM-Blockchain/cp-chaincode-v2/archive/master.zip',
                    unzip_dir: 'cp-chaincode-v2-master/hyperledger',							    //subdirectroy name of chaincode after unzipped
                    git_url: 'https://github.com/IBM-Blockchain/cp-chaincode-v2/hyperledger',		//GO get http url

                    //hashed cc name from prev deployment
                    //deployed_name: '2450c95bc77e124c766ff650c2f4642e5c0bc2d576ee67db130900750cddc5982e295f320fd5dff7aca2f61fa7cc673fcdcc8a7464f94c68eeccdb14b2384a75'
                }
            };
            if (process.env.VCAP_SERVICES) {
                console.log('\n[!] looks like you are in bluemix, I am going to clear out the deploy_name so that it deploys new cc.\n[!] hope that is ok buddy\n');
                options.chaincode.deployed_name = "";
            }

            ibc.load(options, cb_ready);
        }

        function cb_ready(err, cc) {//response has chaincode functions
            if (err != null) {
                console.log('! looks like an error loading the chaincode, app will fail\n', err);
                if (!process.error) process.error = {type: 'load', msg: err.details};				//if it already exist, keep the last error
                reject(err);
            }
            else {
                blockchain.chaincode = cc;
                if (!cc.details.deployed_name || cc.details.deployed_name === "") {												//decide if i need to deploy
                    cc.deploy('init', [], {save_path: './cc_summaries', delay_ms: 10000}, finalSetup);
                }
                else {
                    console.log('chaincode summary file indicates chaincode has been previously deployed');
                    finalSetup(null, "");
                }
            }
        }

        function finalSetup(err, data) {
            if (err != null) {
                //look at tutorial_part1.md in the trouble shooting section for help
                console.log('! looks like a deploy error, holding off on the starting the socket\n', err);
                if (!process.error) process.error = {type: 'deploy', msg: err.details};
            } else {
                user_manager.setup(ibc, blockchain.chaincode, ca, cb_deployed);
            }
        }

        function cb_deployed(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        };
    });

};
