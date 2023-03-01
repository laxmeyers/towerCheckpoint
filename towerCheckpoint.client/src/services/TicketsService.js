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
}

export const ticketsService = new TicketsService()