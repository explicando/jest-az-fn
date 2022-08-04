import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as mercadopago from 'mercadopago'

const createPreference: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  mercadopago.configure({ access_token: '', integrator_id: '' });
  mercadopago.preferences.create(req.body, { headers: { "X-meli-session-id": req.headers["X-meli-session-id"] }});
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default createPreference;