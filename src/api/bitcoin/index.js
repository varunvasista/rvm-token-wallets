import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /bitcoin/create Create Bitcoin Address
 * @apiName CreateBitcoinAddress
 * @apiGroup Bitcoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bitcoin Bitcoin Address, PrivateKey, WIF
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bitcoin not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)


/**
 * @api {get} /bitcoin/balance Get Balance
 * @apiName GetBalance
 * @apiGroup Bitcoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bitcoin balance
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bitcoin not found.
 * @apiError 401 user access only.
 */
 router.get('/balance/:address',
 balance)


/**
 * @api {post} /bitcoin/send Send Bitcoin
 * @apiName SendBitcoin
 * @apiGroup Bitcoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bitcoin transaction hash
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bitcoin not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)

export default router
