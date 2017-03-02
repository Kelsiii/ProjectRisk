import Cookies from 'js-cookie'
import ElasticSearch from 'elasticsearch'
import { host } from '../utils'

const client = new ElasticSearch.Client({
  host: `${host()}/service/es`
});

const USER = 'user.username';
const SESSION = 'user.id';
const TYPE = 'user.type'
const DOMAIN = '.riskcon.com';

export default {
  authenticate(username, password, remember) {
    return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'user',
        body: {
          query: {
            bool: {
              must: {
                term: {
                  id: username
                }
              }
            }
          },
          size: 1
        }
      }).then(resp => {
        if (resp.hits.hits.length) {
					let user = resp.hits.hits[0]._source;
					if(user.password === password){
	          return (resp.hits.hits[0]._source);
					} else {
						reject('not match');
					}
        } else {
          reject('missing')
        }
      }, e => {
        reject(e.body);
      }).then(json => {
        if (json && json.id) {
          if (remember) {
            Cookies.set(USER, json.name, { expires: 1});
						Cookies.set(SESSION, json.id, { expires: 1});
						Cookies.set(TYPE, json.department || json.type, { expires: 1});
          } else {
            Cookies.set(USER, json.name);
						Cookies.set(SESSION, json.id);
						Cookies.set(TYPE, json.department || json.type);
          }
          resolve(json);
        } else {
          reject(json.error);
        }
      }).catch(e => {
        reject(e.message);
      })
    });
  },

  validate(sessionId) {
    return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'user',
        body: {
          query: {
            bool: {
              must: {
                term: {
                  id: sessionId
                }
              }
            }
          },
          size: 1
        }
      }).then(resp => {
        if (resp.hits.hits.length) {
					resolve();
				} else {
					reject();
				}
			})
    })
  },

  clear() {
    [USER, SESSION].forEach(key => Cookies.remove(key));
  },

  username() {
    return Cookies.get(USER);
  },

  id() {
    let id = Cookies.get(SESSION);
    return id;
  },

  type() {
    let type = Cookies.get(TYPE);
    return type;
  },

  ip() {
    return this.clientIp;
  },

  setClientIp(ip) {
    this.clientIp = ip;
  },

  async isAuthenticated() {
    const sessionId = this.id();
    console.log('sessionId:', sessionId);
    if (!sessionId) {
      return false;
    }
    try {
      /*let sessions =*/ await this.validate(sessionId);
      // console.log(sessions);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}