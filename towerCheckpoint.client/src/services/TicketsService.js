import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async createTicket(eventId) {
        logger.log('eventId', eventId)
        const res = await api.post('api/tickets', eventId)
        logger.log('data',res.data)
        AppState.activeEvent.capacity--
    }

    async getPeoplesTickets(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        AppState.eventTickets = res.data
        logger.log(AppState.eventTickets)
    }
}

export const ticketsService = new TicketsService()