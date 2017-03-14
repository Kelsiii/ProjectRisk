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
		let filters = { must:[], must_not:[] };
    let size = 30;
		if(ctx){
			if(ctx.company){
				filters.must.push({
					 term: {
						 company : ctx.company
           }
        })
			}
      if(ctx.owner){
				filters.must.push({
					 term: {
						 owner : ctx.owner
           }
        })
			}
      if(ctx.type === 'unchecked'){
				filters.must.push({
					 term: {
						 status: 'unchecked'
           }
        })
			}
      if(ctx.type === 'unevaluated'){
				filters.must.push({
					 term: {
						 status: 'evaluating'
           }
        })
			}
      if(ctx.type === 'invested'){
				filters.must.push({
					 term: {
						 status: 'invested'
           }
        })
			}
      if(ctx.type === 'submitted'){
        filters.must_not.push({
          term: {
            status: 'unfinished'
          }
        })
      }
      if(ctx.type === 'unfinished'){
        filters.must.push({
					 term: {
						 status: 'unfinished'
           }
        })
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
          resolve([]);
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
    let now = new Date;
    project.lastUpdated = now.toLocaleDateString().replace(/\//g,"-")+' '+now.toTimeString().substring(0,8);
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