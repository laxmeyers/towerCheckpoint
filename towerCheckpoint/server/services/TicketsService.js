import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"

class TicketsService {
    async destroyTicket(ticketId, requestorId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('Invalid ticket Id')
        }
        if (requestorId != ticket.accountId) {
            throw new Forbidden('You cant do that')
        }
        await eventsService.capacityIncreased(ticket.eventId)
        await ticket.remove()
        return ticket
        
    }
    async getPeopleWhoHaveTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId })
            .populate('profile', 'name picture')
        return tickets
    }
    async getMyTickets(requestorId) {
        const tickets = await dbContext.Tickets.find({ accountId: requestorId })
            .populate('event')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        await eventsService.lowerCapacity(ticket.eventId)
        return ticket
    }

}

export const ticketsService = new TicketsService()