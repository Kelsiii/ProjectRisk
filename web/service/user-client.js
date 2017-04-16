import ElasticSearch from 'elasticsearch'
import { host } from '../utils'
import { hex_sha1 } from './sha1'

const client = new ElasticSearch.Client({
  host: `${host()}/service/es`
});

export default {
	queryUsers(){
		let filters = { must:[] };
		filters.must.push({
			term: {
				type : 'staff'
			}
		});
		filters.must.push({
			term: {
				status : '正常'
			}
		});
		let size = 20;
			return new Promise((resolve, reject) => {
		client.search({
			index: 'management',
			type: 'user',
			body: {
				query: {
					bool: filters
				},
				size,
				sort: [{ 'valid': 'desc' }]
			}
		}).then(resp => {
			if (resp.hits.hits.length) {
				resolve(resp.hits.hits.map(hit => hit._source));
			} else {
				reject('missing')
			}
			}, e => {
				reject(e.body);
			})
		})
	},

  queryCompanies(){
    let filters = { must:[] };
    filters.must.push({
      term: {
        type : 'company'
      }
    })
    let size = 20;
		return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'user',
        body: {
          query: {
            bool: filters
          },
          size,
					sort: [{ 'valid': 'desc' }]
        }
      }).then(resp => {
        if (resp.hits.hits.length) {
          resolve(resp.hits.hits.map(hit => hit._source));
        } else {
          reject('missing')
        }
      }, e => {
        reject(e.body);
      })
    })
  },

	addUser(user){
		return new Promise((resolve, reject) => {
			var sha = hex_sha1(user.password);
			user.password = sha;
      client.create({
				index: 'management',
				type: 'user',
				id: user.id,
				body: user
			}).then(resp => {
        resolve(resp);
      }, e => {
        reject(e.body);
      });
    })
	},

	queryUser(id){
		return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'user',
        body: {
          query: {
            term: {
							id: id
						}
          },
          size: 20
        }
      }).then(resp => {
        if (resp.hits.hits.length) {
          resolve(resp.hits.hits.map(hit => hit._source));
        } else {
          resolve('missing')
        }
      }, e => {
        reject(e.body);
      })
    })
	},

	updateUser(user){
		return new Promise((resolve, reject) => {
      client.update({
        index: 'management',
        type: 'user',
        id: user.id,
        body:{
          doc: user
        }
      }).then(resp => {
        resolve(resp);
      }, e => {
        reject(e.body);
      })
    })
	}


}