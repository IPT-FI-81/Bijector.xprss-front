const EventEmitter = require('events');

const request = require('request');

const wf_api_base_url = "https://localhost:5010";

class WFRepo extends EventEmitter {

    getAll() {
        return new Promise((resolve, reject) => {
            let config = {

            };
            request(wf_api_base_url + '/Workflows/GetAll', config, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('WFRepo.getAll res body:', body);
                    resolve(body)
                }
            })
        })
    }
}

module.exports.WorkflowRepo = new WFRepo();
