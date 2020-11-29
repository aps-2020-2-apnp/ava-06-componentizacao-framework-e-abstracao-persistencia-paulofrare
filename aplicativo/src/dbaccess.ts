import { IncomingMessage, ServerResponse } from 'http'
import { Database } from 'sqlite3'

const db = new Database('./banco.db')

export function list(resp: ServerResponse, table: string) {
  db.all(`SELECT * FROM ${table}`, (erro, reg) => {
    resp.writeHead(200, {'Content-Type': 'application/json'})
    resp.end(JSON.stringify(reg))
  })
}

export function insert(req: IncomingMessage, resp: ServerResponse, table: string,
   fields: string, values: string) {
  let corpo = ''
  req.on('data', (parte) => corpo += parte)
  req.on('end', () => {
    const array = Object.values(JSON.parse(corpo))
    const statement = db.prepare(`INSERT INTO ${table} ${fields} VALUES ${values}`)
    statement.run(...array)
    statement.finalize(() => {
      resp.writeHead(201, { 'Content-Type': 'text/plain' })
      resp.end('Registro Criado')
    })
  })
}

export function deleteById(req: IncomingMessage, resp: ServerResponse, table: string) {
  if(req.url) {
    const pos = req.url.indexOf("=")
    const statement = db.run(`DELETE FROM ${table} where id=${req.url.slice(pos + 1, req.url.length)}`, function(err) {
      if (err) {
        return console.error(err.message)
      }
      if (this.changes === 0) {
        resp.writeHead(404, { 'Content-Type': 'text/plain' })
        resp.end('Registro não encontrado')
      }else{
        resp.writeHead(200, { 'Content-Type': 'text/plain' })
        resp.end('Registro Apagado')
      }
    })
  }
}
