import { createServer } from 'http'
import { FrontController, Method } from 'framework'
import { allUsersCommand, newUserCommand, deleteUserCommand } from './usuario'
import { allProductsCommand, newProductCommand, deleteProductCommand } from './produto'

const controller = new FrontController()

controller.register(Method.GET, '/nada')
controller.register(Method.GET, '/usuarios', allUsersCommand)
controller.register(Method.POST, '/usuarios', newUserCommand)
controller.register(Method.DELETE, '/usuarios', deleteUserCommand)
controller.register(Method.GET, '/produtos', allProductsCommand)
controller.register(Method.POST, '/produtos', newProductCommand)
controller.register(Method.DELETE, '/produtos', deleteProductCommand)

const port = 9999
const server = createServer((req, resp) => controller.handle(req, resp))
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
