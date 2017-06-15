const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todos } = require('./../models/todo');

let testTodos = [{
    text: 'This is test text - 1'
  },{
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
