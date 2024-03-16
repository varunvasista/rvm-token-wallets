import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /matic/create Create matic
 * @apiName CreateMatic
 * @apiGroup Matic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} matic Matic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Matic not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /matic/:address Retrieve matic
 * @apiName RetrieveMatic
 * @apiGroup Matic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} matic Matic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Matic not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {put} /matic/send Update matic
 * @apiName UpdateMatic
 * @apiGroup Matic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} matic Matic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Matic not found.
 * @apiError 401 user access only.
 */
router.post('/send',
token({ required: true }),
send)

export default router
