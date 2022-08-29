const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch:9200' })

async function create(id, nick) {

    await client.create({
      index: 'game',
      id: id,
      body: {
        nickname: nick,
        score: 0,
        time: 0.0
      }
    })
  
}

async function update(id, score, time){
    await client.update({
        index: 'game',
        id: id,
        body: {
          script: {
            lang: "painless",
            source: "ctx._source.score += params['newScore']; ctx._source.time += params['newTime']",
            params: {
                newTime: time,
                newScore: score
            }
          }
        }
      })
}


async function get(id) {

  const { body } = await client.get({
  index: 'game',
  id: id
})

return body;
}


module.exports.create = create;
module.exports.update = update;
module.exports.get = get;

  