import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /dash Create dash
 * @apiName CreateDash
 * @apiGroup Dash
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dash Dash's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dash not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /dash/:id Retrieve dash
 * @apiName RetrieveDash
 * @apiGroup Dash
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dash Dash's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dash not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)


/**
 * @api {post} /dash Create dash
 * @apiName CreateDash
 * @apiGroup Dash
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dash Dash's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dash not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)  

export default router
