const {MOCK_WORKFLOWS, MOCK_USERS_AUTH, MOCK_USERS, MOCK_SERVICES} = require('./mock-data');
const EventEmitter = require('events');

const request = require('request');

const THROTTLE = 500;

function clone(a) {
    return JSON.parse(JSON.stringify(a))
}

function delayed(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val)
        }, THROTTLE)
    })
}

class MockRepo extends EventEmitter {
    db;
    next_id;

    subrepoCache;

    constructor(content, init_id, live = false) {
        super();
        this.db = live ? content : clone(content);
        this.next_id = init_id;
        this.subrepoCache = [];
    }

    subrepo(id, prop, init_id) {
        let i = this.subrepoCache.findIndex(sr => sr.id === id && sr.prop === prop);
        if (i >= 0) {
            return this.subrepoCache[i].repo;
        }
        let target_content = this.db.find(i => i.id === id)[prop];
        if (!init_id) {
            init_id = '0';
            for (let j of target_content) {
                if (!j.hasOwnProperty('id')) throw Error('Subrepo content has no id!');
                if (j.id > init_id) init_id = j.id;
            }
            init_id = ''+(+init_id+1);
        }
        let newrepo = {
            id: id,
            prop: prop,
            repo: new MockRepo(target_content, init_id, true)
        };
        this.subrepoCache.push(newrepo);
        return newrepo;
    }
    // aliases
    sub = this.subrepo;
    s = this.subrepo;

    getAll() {
        return delayed(this.db);
    }

    getById(id) {
        return delayed(this.db.find(i => i.id === id));
    }

    getBy(prop, val, strict = false) {
        return delayed(this.db.reduce((acc, i) => {
            if ((strict && i[prop] === val) || (!strict && i[prop] == val)) acc.push(i);
            return acc;
        }, []));
    }

    put(val) {
        val.id = this.next_id;
        this.next_id = '' + (+this.next_id + 1);
        this.db.push(val);
        this.emit('put', val);
        return delayed(val);
    }

    update(id, val) {
        val.id = id;
        this.db[this.db.findIndex(i => i.id === id)] = val;
        this.emit('update', val);
        return delayed(val)
    }

    deleteById(id) {
        this.emit('delete', id);
        return delayed(this.db.splice(this.db.findIndex(i => i.id === id), 1))
    }
}

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

// module.exports.WorkflowRepo = new MockRepo(MOCK_WORKFLOWS, 5);
// module.exports.SerivceRepo = new MockRepo(MOCK_SERVICES, 2);
// module.exports.UserRepo = new MockRepo(MOCK_USERS, 5);
// module.exports.UserAuthRepo = new MockRepo(MOCK_USERS_AUTH, 5);

module.exports.MockRepo = MockRepo;
