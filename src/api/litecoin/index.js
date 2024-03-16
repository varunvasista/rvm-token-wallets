import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /litecoin Create litecoin
 * @apiName CreateLitecoin
 * @apiGroup Litecoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} litecoin Litecoin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Litecoin not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /litecoin/:id Retrieve litecoin
 * @apiName RetrieveLitecoin
 * @apiGroup Litecoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} litecoin Litecoin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Litecoin not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {post} /litecoin Create litecoin
 * @apiName CreateLitecoin
 * @apiGroup Litecoin
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} litecoin Litecoin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Litecoin not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)


export default router
