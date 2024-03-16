import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /dogecoin Create dogecoin
 * @apiName CreateDogecoin
 * @apiGroup Dogecoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dogecoin Dogecoin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dogecoin not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /dogecoin/:id Retrieve dogecoin
 * @apiName RetrieveDogecoin
 * @apiGroup Dogecoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dogecoin Dogecoin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dogecoin not found.
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
