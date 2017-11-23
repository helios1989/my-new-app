import { HealthCheck } from '.'

let healthCheck

beforeEach(async () => {
  healthCheck = await HealthCheck.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = healthCheck.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(healthCheck.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = healthCheck.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(healthCheck.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
