import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /tron Create tron
 * @apiName CreateTron
 * @apiGroup Tron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} tron Tron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tron not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /tron/:id Retrieve tron
 * @apiName RetrieveTron
 * @apiGroup Tron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} tron Tron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tron not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {post} /tron Create tron
 * @apiName CreateTron
 * @apiGroup Tron
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} tron Tron's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tron not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)


export default router
