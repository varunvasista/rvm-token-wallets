import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /ethereum-classic Create ethereum classic
 * @apiName CreateEthereumClassic
 * @apiGroup EthereumClassic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereumClassic Ethereum classic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum classic not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /ethereum-classic/:id Retrieve ethereum classic
 * @apiName RetrieveEthereumClassic
 * @apiGroup EthereumClassic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereumClassic Ethereum classic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum classic not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {post} /ethereum-classic Create ethereum classic
 * @apiName CreateEthereumClassic
 * @apiGroup EthereumClassic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ethereumClassic Ethereum classic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ethereum classic not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)


export default router
