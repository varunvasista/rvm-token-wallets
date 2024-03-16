import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import bitcoin from './bitcoin'
import ethereum from './ethereum'
import binance from './binance'
import litecoin from './litecoin'
import ripple from './ripple'
import dash from './dash'
import tron from './tron'
import matic from './matic'
import usdt from './usdt'
import solana from './solana'
import avalanche from './avalanche'
import rvmt from './rvmt'
import dogecoin from './dogecoin'
import ethereumClassic from './ethereum-classic'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/bitcoin',bitcoin)
router.use('/ethereum',ethereum)
router.use('/binance',binance)
router.use('/litecoin',litecoin)
router.use('/ripple',ripple)
router.use('/dash',dash)
router.use('/tron',tron)
router.use('/matic',matic)
router.use('/usdt',usdt)
router.use('/solana',solana)
router.use('/avalanche',avalanche)
router.use('/rvmt',rvmt)
router.use('/dogecoin', dogecoin)
router.use('/ethereum-classic', ethereumClassic)

export default router
