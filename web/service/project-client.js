import ElasticSearch from 'elasticsearch'
import { host } from '../utils'

const client = new ElasticSearch.Client({
  host: `${host()}/service/es`
});

export default {
  addProject(project){
    return new Promise((resolve, reject) => {
      client.create({
				index: 'management',
				type: 'project',
				id: project.id,
				body: project
			}).then(resp => {
        resolve(resp);
      }, e => {
        reject(e.body);
      });
    })
  },

	queryProjects(ctx){
		let filters = { must:[] };
    let size = 30;
		if(ctx){
			if(ctx.type === 'current'){
				filters.must.push({
					 term: {
						 status: 'underway'
           }
        })
			}
      if(ctx.type === 'completed'){
				filters.must.push({
					 term: {
						 status: 'completed'
           }
        })
			}
      if(ctx.type === 'homepage'){
        size = 5
      }
		}

		return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'project',
        body: {
          query: {
            bool: filters
          },
          size,
					sort: [{ 'created': 'desc' }]
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

  fetchProject(id){
    return new Promise((resolve, reject) => {
      client.search({
        index: 'management',
        type: 'project',
        body: {
          query: {
            term: {
              id: id
            }
          },
          size: 1
        }
      }).then(resp => {
        if (resp.hits.hits.length) {
          resolve(resp.hits.hits[0]._source);
        } else {
          reject('missing')
        }
      }, e => {
        reject(e.body);
      })
    })
  },

  updateProject(project){
    return new Promise((resolve, reject) => {
      client.update({
        index: 'management',
        type: 'project',
        id: project.id,
        body:{
          doc: project
        }
      }).then(resp => {
        resolve(resp);
      }, e => {
        reject(e.body);
      })
    })
  }

}