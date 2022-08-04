import azFunctionsCreatePreference from '../index';
import * as stubAzFn from 'stub-azure-function-context';
import * as mercadopago from 'mercadopago';
jest.mock('mercadopago');


describe(`${azFunctionsCreatePreference.name}`, () => {
  test(`${azFunctionsCreatePreference.name} deve ser uma função`, () => {
    expect(typeof azFunctionsCreatePreference).toBe('function');
  });

  describe(`POST /create-preferece`, () => {
    let { runStubFunctionFromBindings, createHttpTrigger } = stubAzFn
, sentHeaders = { 'X-meli-session-id': 'sessionContent' }
, sentBody = { property: 'bodyPropertyContent' }
, configureSpy = jest.spyOn(mercadopago, 'configure')
, createSpy = jest.spyOn(mercadopago.preferences, 'create')
, fakeCreateResponse = { init_point: 'http://localhost:3000/init-point' }
, httpTriggerBinding = { type: 'httpTrigger', name: 'req', direction: 'in' }
, httpOutBinding = { type: 'http', name: 'res', direction: 'out' }
, data = createHttpTrigger('POST', 'alguma-url', sentHeaders, {}/*params*/, sentBody); /* data será req dentro da função */
beforeAll(async () => {
createSpy.mockResolvedValue(fakeCreateResponse);
await runStubFunctionFromBindings(
azFunctionsCreatePreference,
[
{ ...httpTriggerBinding, data },
httpOutBinding
]
);
});
test(`Verifica se as propriedades obrigatórias estão sendo passadas para mercadopago.configure()`, async () => {
  expect(configureSpy).toBeCalledWith(expect.objectContaining({
  'access_token': expect.any(String),
  'integrator_id': expect.any(String)
  }));
  });
  test(`Verifica se as propriedades obrigatórias estão sendo passadas para mercadopago.preferences.create()`, async () => {
    expect(createSpy).toBeCalledWith(sentBody, { headers: { ...sentHeaders } });
    expect(createSpy.mock.results[0].value).toEqual(Promise.resolve(fakeCreateResponse));
    });

  });
});

