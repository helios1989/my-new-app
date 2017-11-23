import { Router } from 'express'
import { middleware as query } from 'querymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export HealthCheck, { schema } from './model'

const router = new Router()

/**
 * @api {post} /health-checks Create health check
 * @apiName CreateHealthCheck
 * @apiGroup HealthCheck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} healthCheck Health check's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Health check not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  create)

/**
 * @api {get} /health-checks Retrieve health checks
 * @apiName RetrieveHealthChecks
 * @apiGroup HealthCheck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of health checks.
 * @apiSuccess {Object[]} rows List of health checks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /health-checks/:id Retrieve health check
 * @apiName RetrieveHealthCheck
 * @apiGroup HealthCheck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} healthCheck Health check's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Health check not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /health-checks/:id Update health check
 * @apiName UpdateHealthCheck
 * @apiGroup HealthCheck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} healthCheck Health check's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Health check not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  update)

/**
 * @api {delete} /health-checks/:id Delete health check
 * @apiName DeleteHealthCheck
 * @apiGroup HealthCheck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Health check not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
