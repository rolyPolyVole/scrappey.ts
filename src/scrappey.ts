import axios, { AxiosRequestConfig } from "axios";
import { CreateSessionOptions, GetResponseData, PartialGetRequest, PartialPostRequest, PostRequest, Session } from "scrappey-wrapper-typed";

class Scrappey {

    public readonly apiKey: string;
    public readonly baseUrl = "https://publisher.scrappey.com/api/v1";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Creates a session
     */
    async createSession(data: CreateSessionOptions): Promise<Session> {
        return await this.sendRequest({
            endpoint: "sessions.create",
            ...data
        });
    }

    /**
     * Destroys a session
     */
    async destroySession(session: string): Promise<any> {
        return await this.sendRequest({
            endpoint: "sessions.destroy",
            session: session
        });
    }

    /**
     * Send a GET request
     */
    async get<const R extends PartialGetRequest>(data: R): Promise<GetResponseData<R>> {
        const { url } = data;
        
        if (!url) {
            throw new Error(`URL is required to send a request`);
        }

        return await this.sendRequest({
            endpoint: "request.get",
            ...data
        });
    }

    /**
     * Sends a POST request
     */
    async post<const R extends PartialPostRequest>(data: R): Promise<GetResponseData<R>> {
        if (data?.customHeaders?.content_type === "application/json") {
            data.postData = JSON.stringify(data.postData);
        }

        return await this.sendRequest({
            endpoint: "request.post",
            ...data
        });
    }

    /**
     * Sends the actual request to scrappey as a proxy
     */
    async sendRequest(dataOptions: any) {
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