import axios, { AxiosRequestConfig } from "axios";
import { BrowserAction, CreateSessionOptions, GetRequestOptions, GetResponseData, HasDefinedKey, HasObjectWithKVRecord, PostRequestOptions } from "scrappey-wrapper-typed";

class Scrappey {

    public readonly apiKey: string;
    public readonly baseUrl = "https://publisher.scrappey.com/api/v1";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Creates a session
     * @param {CreateSessionOptions} data 
     * @returns {Promise<any>}
     */
    async createSession(data: CreateSessionOptions): Promise<any> {
        return await this.sendRequest({
            endpoint: "sessions.create",
            ...data
        });
    }

    /**
     * Destroys a session
     * @param {string} session
     * @returns {Promise<any>}
     */
    async destroySession(session: string): Promise<any> {
        return await this.sendRequest({
            endpoint: "sessions.destroy",
            session: session
        });
    }

    /**
     * Send a GET request
     * @param {Partial<GetRequestOptions>} data 
     * @returns {Promise<any>}
     */
    async get<R extends Partial<GetRequestOptions> & { url: string }>(data: R): Promise<GetResponseData<R>> {
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
     * @param {PostRequestOptions} data 
     * @returns {Promise<any>}
     */
    async post(data: PostRequestOptions): Promise<any> {
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
     * @param {any} dataOptions 
     * @returns 
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