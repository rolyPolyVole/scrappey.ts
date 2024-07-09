declare module "scrappey-wrapper" {
    export type KeyedObject = {
        [key: string]: any
    }

    export type BrowserData = {
        name: string;
        minVersion?: number;
        maxVersion?: number;
    }

    export type DeviceOptions = "desktop" | "mobile";
    export type OSOptions = "windows" | "macos" | "linux" | "android" | "ios";

    export type CreateSessionOptions = {
        session?: string;
        proxy?: string;
        whitelistedDomains?: string[];
        datacenter?: boolean;
        browser?: BrowserData[];
        operatingSystem?: OSOptions;
        device?: DeviceOptions;
    }

    export type Session = {
        /**
         * Session UUID
         */
        readonly session: string;
        readonly fingerprint: any;
    }

    export type Cookie = {
        name: string;
        value: string;
        domain: string;
        path: string;
    }

    export type RequestType = "browser"|"request";

    export type RequestOptions = {
        endpoint: string;
    }

    export type BaseBrowserAction = {
        when?: "beforeload" | "afterload"
    }

    export type WaitableAction = {
        wait?: number;
    }

    export type ThrowableAction = {
        ignoreErrors?: boolean;
    }

    export type ElementInteractionAction = BaseBrowserAction & ThrowableAction & WaitableAction & {
        cssSelector: string;
    }

    export type BrowserAction = 
        | ElementInteractionAction & { type: "click", waitForSelector?: boolean; }
        | ElementInteractionAction & { type: "type", text: string }
        | BaseBrowserAction & WaitableAction & { type: "discord_login", token: string }
        | BaseBrowserAction & ThrowableAction & { type: "goto", url: string }
        | Omit<ElementInteractionAction, "wait"> & { type: "wait_for_selector", timeout: number }
        | WaitableAction & ThrowableAction & BaseBrowserAction & { type: "wait" }
        | ThrowableAction & { type: "solve_captcha", captcha: "turnstile" | "perimeterx" | "recaptcha" | "hcaptcha" | "mtcaptcha" }
        | ThrowableAction & ElementInteractionAction & { type: "solve_captcha", captcha: "custom", inputSelector: string, clickSelector?: string }
        | { type: "execute_js", code: string }
        | ElementInteractionAction & { type: "scroll", repeat?: number, delayMs: number }

    export type GetRequestOptions = {
        url: string;
        session?: string;
        cookiejar?: Cookie[];
        proxy?: string;
        customHeaders?: KeyedObject;
        proxyCountry?: string;
        includeImages?: boolean;
        includeLinks?: boolean;
        requestType?: RequestType;
        localStorage?: KeyedObject;
        mouseMovements?: boolean;
        automaticallySolveCaptchas?: boolean;
        autoparse?: boolean;
        properties?: string;
        video?: boolean;
        browserActions?: BrowserAction[];
    }

    export type PostRequestOptions = GetRequestOptions & {
        postData: string;
    }

    export class Scrappey {
        public constructor(apiKey: string);

        /**
         * Creates a session
         * @param {CreateSessionOptions} data The session creation data
         * @returns {Promise<Session>} The session object
         */
        public createSession(data: CreateSessionOptions): Promise<Session>;

        /**
         * Destroys a session
         * @param {Session} session 
         * @returns 
         */
        public destroySession(session: string): Promise<any>;

        /**
         * Send a GET request
         * @param data 
         * @returns 
         */
        public get(data: GetRequestOptions): Promise<any>;

        /**
         * Sends a POST request
         * @param data 
         * @returns 
         */
        public post(data: PostRequestOptions): Promise<any>;

        /**
         * Sends the actual request to scrappey as a proxy
         * @param dataOptions 
         * @returns 
         */
        public sendRequest(dataOptions: RequestOptions): Promise<any>;

        public readonly apiKey: string;
        public readonly baseUrl: string;
    }
}