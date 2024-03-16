import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /ethereum/create Create Ethereum Address
 * @apiName CreateEthereumAddress
 * @apiGroup Ethereum
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereum Ethereum's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /ethereum/:address Get Balance
 * @apiName GetBalance
 * @apiGroup Ethereum
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereum Ethereum's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)



/**
 * @api {post} /ethereum/send Send Ethereum
 * @apiName SendEthereum
 * @apiGroup Ethereum
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereum Ethereum's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)

export default router
