import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class EventsService {
    async capacityIncreased(eventId) {
        const event = await this.getEventById(eventId)

        event.capacity++
        await event.save()
        return event
    }
    async lowerCapacity(eventId) {
        const event = await this.getEventById(eventId)
        if (event.isCanceled) {
            throw new Forbidden("this is canceled and can't be edited!")
        }

        if (event.capacity <= 0) {
            throw new BadRequest('This event is Full.')
        }
        event.capacity--
        await event.save()
        return event
    }
    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)

        if (event.creatorId.toString() != requestorId) {
            throw new Forbidden('Your cant be here')
        }
        event.isCanceled = true
        await event.save()
        return event
    }
    async editEvent(eventData, eventId, editor) {
        const eventById = await this.getEventById(eventId)
        if (eventById.creatorId != editor) {
            throw new Forbidden("You didn't create this event!")
        }
        if (eventById.isCanceled) {
            throw new Forbidden("this is canceled and can't be edited!")
        }

        eventById.name = eventData.name || eventById.name
        eventById.description = eventData.description || eventById.description

        await eventById.save()

        return eventById
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
        if (!event) {
            throw new BadRequest('Invalid Event Id')
        }
        return event
    }
    async getEvents() {
        const events = await dbContext.Events.find().populate('creator', 'name picture')
        return events
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        return event
    }

}

export const eventsService = new EventsService()