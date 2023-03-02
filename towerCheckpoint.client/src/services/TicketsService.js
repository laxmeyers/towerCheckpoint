import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async createTicket(eventId) {
        logger.log('eventId', eventId)
        const res = await api.post('api/tickets', eventId)
        logger.log('data',res.data)
        AppState.activeEvent.capacity--
        AppState.eventTickets.push(res.data)
    }

    async getPeoplesTickets(eventId) {
        AppState.eventTickets = []
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log(res.data)
        AppState.eventTickets = res.data
        logger.log(AppState.eventTickets)
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data
        logger.log(AppState.myTickets)
    }

    async destroyTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        const ticket = AppState.myTickets.findIndex(t => t.id == ticketId)
        AppState.myTickets.splice(ticket, 1)
    }
}

export const ticketsService = new TicketsService()