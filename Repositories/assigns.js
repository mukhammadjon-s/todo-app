const { readFile, writeFile } = require('fs/promises')

async function getAssigns () {
  let data = await readFile('./DB/assignments.json')
  data = JSON.parse(data.toString()).filter((dt) => dt.deleted !== true)
  return JSON.stringify(data)
}

async function postAssign (body) {
  let data = await readFile('./DB/assignments.json')
  data = JSON.parse(data.toString())
  data.push(JSON.parse(body))
  await writeFile('./DB/assignments.json', JSON.stringify(data))
}

module.exports = {
  getAssigns,
  postAssign
}
