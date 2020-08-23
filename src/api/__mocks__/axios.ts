const mockAxios: any = jest.genMockFromModule('axios');

const GET = jest.fn(() => Promise.resolve({ data: {} }));
const POST = jest.fn(() => Promise.resolve({ data: {} }));

export default {
  GET,
  POST
};
