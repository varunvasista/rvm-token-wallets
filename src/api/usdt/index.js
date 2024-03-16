import { Router } from 'express'
import { token } from '../../services/passport'
import { send, balance } from './controller'

const router = new Router()

/**
 * @api {post} /usdt Create usdt
 * @apiName CreateAcc
 * @apiGroup Acc
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} usdt Acc's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Acc not found.
 * @apiError 401 user access only.
 */
router.post('/send',
  token({ required: true }),
  send)

/**
 * @api {get} /usdt/:id Retrieve usdt
 * @apiName RetrieveAcc
 * @apiGroup Acc
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} usdt Acc's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Acc not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

export default router
