import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketsService } from "../services/TicketsService"
import BaseController from "../utils/BaseController"

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicket)
    }


    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            ticketData.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async destroyTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const requestorId = req.userInfo.id
            const ticket = await ticketsService.destroyTicket(ticketId, requestorId)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}