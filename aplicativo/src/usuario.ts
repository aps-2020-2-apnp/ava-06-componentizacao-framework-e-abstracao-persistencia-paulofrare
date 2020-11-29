import { IncomingMessage, ServerResponse } from 'http';
import { list, insert, deleteById } from './dbaccess';

const users = "usuarios"
const fields = "(nome,sobrenome)"
const values = "(?,?)"

export const allUsersCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    list(resp, users)
  }
}

export const newUserCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    insert(req, resp, users, fields, values)
  }
}

export const deleteUserCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    deleteById(req, resp, users)
  }
}
