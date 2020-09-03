const mockAxios: any = jest.genMockFromModule('axios');
mockAxios.create = jest.fn(() => mockAxios);

mockAxios.GET = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.POST = jest.fn(() => Promise.resolve({ data: {} }));

export default mockAxios;
