import { success, notFound } from '../../services/response/'
import { HealthCheck } from '.'

export const create = ({ body }, res, next) =>
  HealthCheck.create(body)
    .then((healthCheck) => healthCheck.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  HealthCheck.count(query)
    .then(count => HealthCheck.find(query, select, cursor)
      .then((healthChecks) => ({
        count,
        rows: healthChecks.map((healthCheck) => healthCheck.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  HealthCheck.findById(params.id)
    .then(notFound(res))
    .then((healthCheck) => healthCheck ? healthCheck.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  HealthCheck.findById(params.id)
    .then(notFound(res))
    .then((healthCheck) => healthCheck ? Object.assign(healthCheck, body).save() : null)
    .then((healthCheck) => healthCheck ? healthCheck.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  HealthCheck.findById(params.id)
    .then(notFound(res))
    .then((healthCheck) => healthCheck ? healthCheck.remove() : null)
    .then(success(res, 204))
    .catch(next)
