import { dbContext } from "../db/DbContext"
import { eventsService } from "./EventsService"

class TicketsService{
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        await eventsService.lowerCapacity(ticket.eventId)
        return ticket
    }

}

export const ticketsService = new TicketsService()