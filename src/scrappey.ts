import axios, { AxiosRequestConfig } from "axios";
import { SessionCreateRequestOptions, APIEndpoint, GetRequest, PostRequest, RequestOptions, GetResponseData } from "scrappey-wrapper-typed";
import { Util } from "./util.js";

class Scrappey {
    public readonly apiKey: string;
    public readonly baseUrl = "https://publisher.scrappey.com/api/v1";

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async createSession(data: SessionCreateRequestOptions) {
        const json = Util.sessionCreateToJSON(data);

        return await this.sendRequest({
            endpoint: "sessions.create",
            ...json
        });
    }

    public async destroySession(session: string) {
        return await this.sendRequest({
            endpoint: "sessions.destroy",
            session: session
        });
    }

    public async isSessionActive(session: string) {
        return await this.sendRequest({
            endpoint: "sessions.active",
            session: session
        });
    }

    public async get<const R extends GetRequest>(data: R) {
        const { url } = data;
        
        if (!url) {
            throw new Error(`URL is required to send a request`);
        }

        const json = Util.getRequestToJSON(data);

        return await this.sendRequest({
            endpoint: APIEndpoint.RequestGet,
            ...json
        });
    }

    public async post<const R extends PostRequest>(data: R) {
        const json = Util.postRequestToJSON(data);

        return await this.sendRequest({
            endpoint: APIEndpoint.RequestPost,
            ...json
        });
    }

    public async sendRequest(dataOptions: RequestOptions) {
        const { endpoint } = dataOptions;

        if (!endpoint) {
            throw new Error(`Endpoint is required, examples: request.get, request.post, sessions.create, sessions.destroy`);
        }

        if (!dataOptions) {
            throw new Error(`Data is required`);
        }

        if (!this.apiKey) {
            throw new Error(`API Key is required`);
        }

        const url = `${this.baseUrl}?key=${this.apiKey}`;

        const options: AxiosRequestConfig = {
            url,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                cmd: endpoint,
                ...dataOptions
            },
            timeout: 5 * 60 * 1000
        };

        try {
            const response = await axios(url, options);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Scrappey;