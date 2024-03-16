import { Router } from 'express'
import { token } from '../../services/passport'
import { create, balance, send } from './controller'

const router = new Router()

/**
 * @api {post} /solana Create solana
 * @apiName CreateSolana
 * @apiGroup Solana
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} solana Solana's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Solana not found.
 * @apiError 401 user access only.
 */
router.post('/create',
  token({ required: true }),
  create)

/**
 * @api {get} /solana/:id Retrieve solana
 * @apiName RetrieveSolana
 * @apiGroup Solana
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} solana Solana's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Solana not found.
 * @apiError 401 user access only.
 */
router.get('/balance/:address',
  balance)


/**
 * @api {post} /solana Create solana
 * @apiName CreateSolana
 * @apiGroup Solana
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} solana Solana's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Solana not found.
 * @apiError 401 user access only.
 */
 router.post('/send',
 token({ required: true }),
 send)


export default router
