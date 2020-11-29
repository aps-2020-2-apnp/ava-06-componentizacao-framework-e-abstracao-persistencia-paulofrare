
import { IncomingMessage, ServerResponse } from 'http';
import { list, insert, deleteById } from './dbaccess'

const products = "produtos"
const fields = "(nome, preco)"
const values = "(?,?)"

export const allProductsCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    list(resp, products)
  }
}

export const newProductCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    insert(req, resp, products, fields, values)
  }
}

export const deleteProductCommand = {
  execute(req: IncomingMessage, resp: ServerResponse): void {
    deleteById(req, resp, products)
  }
}
