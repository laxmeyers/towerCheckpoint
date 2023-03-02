import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsForEvent)
            .get('/:eventId/tickets', this.getPeopleWhoHaveTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getCommentsForEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await commentsService.getCommentsForEvent(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getPeopleWhoHaveTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const peopleTickets = await ticketsService.getPeopleWhoHaveTickets(eventId)
            return res.send(peopleTickets)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }


    async getEvents(req, res, next) {
        try {
            const events = await eventsService.getEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const eventData = req.body
            const eventId = req.params.eventId
            const editor = req.userInfo.id
            const event = await eventsService.editEvent(eventData, eventId, editor)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
}