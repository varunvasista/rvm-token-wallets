import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /avalanche Create avalanche
 * @apiName CreateAvalanche
 * @apiGroup Avalanche
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} avalanche Avalanche's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Avalanche not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /avalanche/:id Retrieve avalanche
 * @apiName RetrieveAvalanche
 * @apiGroup Avalanche
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} avalanche Avalanche's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Avalanche not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)

/**
 * @api {put} /avalanche/:id Update avalanche
 * @apiName UpdateAvalanche
 * @apiGroup Avalanche
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} avalanche Avalanche's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Avalanche not found.
 * @apiError 401 user access only.
 */
router.post('/send',
token({ required: true }),
send)

export default router
