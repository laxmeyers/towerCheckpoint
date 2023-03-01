import { api } from "./AxiosService"
import {AppState} from '../AppState'
import { logger } from "../utils/Logger"

class EventsService{
    async getEvents() {
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.events = res.data
    }
}

export const eventsService = new EventsService()