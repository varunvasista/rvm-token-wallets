import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /binance/create Create binance Address
 * @apiName CreateBinanceAddress
 * @apiGroup Binance
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} binance Binance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Binance not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /binance/balance:address Retrieve binance
 * @apiName RetrieveBinance
 * @apiGroup Binance
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} binance Binance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Binance not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)




/**
 * @api {post} /binance/send Send binance
 * @apiName SendBinance
 * @apiGroup Binance
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} binance Binance's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Binance not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)

export default router
