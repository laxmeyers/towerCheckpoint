import { api } from "./AxiosService"
import {AppState} from '../AppState'
import { logger } from "../utils/Logger"

class EventsService{
    async getEvents() {
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.events = res.data
        logger.log(AppState.events)
        
    }

    async getActiveEvent(eventId) {
        AppState.activeEvent = {}
        const res = await api.get('api/events/' + eventId)
        AppState.activeEvent = res.data

    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        AppState.events.unshift(res.data)
        AppState.activeEvent = res.data
    }

    async cancelEvent() {
        const res = await api.delete('api/events/' + AppState.activeEvent.id)
        AppState.activeEvent.isCanceled = true
    }
}

export const eventsService = new EventsService()