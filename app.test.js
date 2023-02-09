const supertest = require('supertest');
const request = require('supertest');
const app = require('./app');
const handlers = require("./handlers")

describe('GET /',()=>{
  test('testing get method of login page',()=>{
    const req = {},
    res = {render: jest.fn()}
    handlers.login(req,res)
    expect(res.render.mock.calls[ 0 ][ 0 ]).toBe('login');

  })
})

describe('GET /landingPage',()=>{
  test('testing get method of landing page',()=>{
    const req = {},
    res = {render: jest.fn()}
    handlers.landingPage(req,res)
    expect(res.render.mock.calls[ 0 ][ 0 ]).toBe('landingPage');
    console.log(res.render.mock.calls[ 0 ]);
    expect(res.render.mock.calls[ 0 ][ 1 ]).toEqual(
      expect.objectContaining({
        today: expect.any(String)
      })
    )

  })
})

describe('GET /chatRoom',()=>{
  test('testing get method of chatRoom page',()=>{
    const req = {},
    res = {render: jest.fn()}
    handlers.chatRoom(req,res)
    expect(res.render.mock.calls[ 0 ][ 0 ]).toBe('chatRoom');

  })
})

describe('GET /searchArticles',()=>{
  test('testing get method of searchArticles page',()=>{
    const req = {},
    res = {render: jest.fn()}
    handlers.getsearchArticles(req,res)
    expect(res.render.mock.calls[ 0 ][ 0 ]).toBe('search_articles');

  })
})

describe('GET /articles',()=>{
  test('testing get method of articles page',()=>{
    const req = {},
    res = {render: jest.fn()}
    handlers.articles(req,res)
    expect(res.render.mock.calls[ 0 ][ 0 ]).toBe('articles');
    console.log(res.render.mock.calls[ 0 ]);
    expect(res.render.mock.calls[ 0 ][ 1 ]).toEqual(
      expect.objectContaining({
        article_keyword: expect.any(String),
        apikey : expect.any(String),
      })
    )

  })
})
