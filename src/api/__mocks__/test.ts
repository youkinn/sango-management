import * as test from '../test';

it('works with promises', () => {
  expect.assertions(1);
  return test.getUserList().then(data => expect(data).toEqual('Mark'));
});

it('works with promises', params => {
  expect.assertions(1);
  return test.addUser(params).then(data => expect(data).toEqual('Mark'));
});
