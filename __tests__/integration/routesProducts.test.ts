import request from 'supertest'

import App from '../../src/app'

let id = ''

describe('product', () => {
  test('route created', async () => {
    const response = await request(App).post('/api/v1/product').send({
      title: 'Refrigerantes',
      description: 'Refri Garoto guaraná 2L',
      department: 'frios',
      brand: 'Garoto',
      price: 21.5,
      qtd_stock: 6,
      bar_codes: '7488855222'
    })

    id = response.body._id

    expect(response.status).toBe(201)
  })

  test('route getAll', async () => {
    const response = await request(App).get('/api/v1/product')

    expect(response.status).toBe(200)
  })

  test('route getById', async () => { // Id
    const response = await request(App).get(`/api/v1/product/${id}`)

    expect(response.status).toBe(200)
  })

  test('route getByLowStock', async () => {
    const response = await request(App).get('/api/v1/product/low_stock')

    expect(response.status).toBe(200)
  })

  test('route UpdatePut', async () => { // Id
    const response = await request(App).put(`/api/v1/product/${id}`).send({
      title: 'Queijo mussarela',
      description: 'Queijo mussarela 2 KG',
      department: 'Frios',
      brand: 'Boi de ouro',
      price: 250.5,
      qtd_stock: 2
    })

    expect(response.status).toBe(200)
  })

  test('route UpdatePatch', async () => { // Id
    const response = await request(App).patch(`/api/v1/product/${id}`).send(
      {
        title: 'Frutas',
        description: 'Banana 3 KG',
        department: 'Hortifruti',
        brand: 'Feira'
      }
    )

    expect(response.status).toBe(200)
  })

  test('route deleteById', async () => { // Id
    const response = await request(App).delete(`/api/v1/product/${id}`)

    expect(response.status).toBe(204)
  })
})
