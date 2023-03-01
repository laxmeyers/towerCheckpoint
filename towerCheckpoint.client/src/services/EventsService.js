import { api } from "./AxiosService"
import {AppState} from '../AppState'

class EventsService{
    async getEvents() {
        const res = await api.get('api/events')
        AppState.events = res.data
    }
}

export const eventsService = new EventsService()