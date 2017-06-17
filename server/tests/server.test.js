const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todos } = require('./../models/todo');

let testTodos = [{
    _id: new ObjectID(),
    text: 'This is test text - 1'
  },{
    _id: new ObjectID(),
    text: 'This is test text - 2'
}];
beforeEach((done) => {
  Todos.remove({}).then(() => {
    return Todos.insertMany(testTodos);
  }).then(()=> done());
});

describe('POST /todos', ()=> {
  it('should create a new todo document', (done) => {
    let text = 'Test todo document text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err, res)=>{
        if (err) return done(err);
        Todos.findOne({text: text}).then((todo)=>{
          expect(todo.text).toBe(text)
          done();
        }).catch((e)=> done(e))
      })
  });

  it('should not create data with bad todo', (done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res)=>{
        if (err) return done(err);
        Todos.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=> done(e));
      });
  })
});

describe('GET /todos', ()=> {
  it('should get all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2)
      })
      .end(done)
  });
});

describe('GET /todos/id', () => {
  it('should get one particular todo', (done) => {
    let testTodo = testTodos[0];
    request(app)
      .get(`/todos/${testTodo._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.text).toBe(testTodo.text);
      })
      .end(done)
  });

  it('should return 404 if todo not found', (done) => {
    let testTodoId = new ObjectID();
    request(app)
      .get(`/todos/${testTodoId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if passed ID is not valid', (done)=>{
    let requestUrl = '/todos/123';
    request(app)
      .get(requestUrl)
      .expect(404)
      .end(done)
  })
});
