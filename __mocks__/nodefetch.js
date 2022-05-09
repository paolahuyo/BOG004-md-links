const fetchMock = jest.fn();
const mockNodeFetch = jest.fn().mockImplementation(() => {
    return {fetch: fetchMock}
});

module.exports = {
    mockNodeFetch
}
