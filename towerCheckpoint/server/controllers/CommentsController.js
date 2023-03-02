import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController{
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createMessage)
        .delete('/:commentId', this.destroyComments)
    }
    async destroyComments(req, res, next) {
        try {
            const commentId = req.params.commentId
            const requestorId = req.userInfo.id
            const comment = await commentsService.destroyComment(commentId, requestorId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async createMessage(req, res, next) {
        try {
            const commentData = req.body
            commentData.creatorId = req.userInfo.id
            const comment = await commentsService.createMessage(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}