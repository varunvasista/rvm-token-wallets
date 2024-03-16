import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /ripple Create ripple
 * @apiName CreateRipple
 * @apiGroup Ripple
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ripple Ripple's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ripple not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /ripple/:id Retrieve ripple
 * @apiName RetrieveRipple
 * @apiGroup Ripple
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ripple Ripple's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ripple not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {post} /ripple Create ripple
 * @apiName CreateRipple
 * @apiGroup Ripple
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ripple Ripple's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ripple not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)


export default router
