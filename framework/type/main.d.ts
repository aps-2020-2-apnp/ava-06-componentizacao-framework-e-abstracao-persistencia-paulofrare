import { IncomingMessage, ServerResponse } from "http";

export interface Command { // command design pattern
  execute(req: IncomingMessage, resp: ServerResponse): void
}

export class FrontController {

  private routing: Record<string, Record<string, Command>>

  register(method: Method, path: string, command?: Command): void

  handle(req: IncomingMessage, resp: ServerResponse): void

}

export enum Method {
  GET    = 'GET',
  POST   = 'POST',
  PUT    = 'PUT',
  DELETE = 'DELETE'
}