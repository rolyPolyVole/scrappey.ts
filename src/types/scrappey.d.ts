import type { EnumValues, KeyedObject, AssertDiscriminatedUnion, Insert, HasDefinedKV, HasObjectWithKVRecord } from "./typeUtil.d.ts";

declare module "scrappey-wrapper-typed" {
    export type BrowserData = {
        name: string;
        minVersion?: number;
        maxVersion?: number;
    }

    export enum DeviceOption {
        Desktop = "desktop",
        Mobile = "mobile"
    }

    export enum OSOption {
        Windows = "windows",
        MacOS = "macos",
        Linux = "linux",
        Android = "android",
        IOS = "ios"
    }

    export type Session = {
        /**
         * The session UUID
         */
        readonly session: string;
        /**
         * No idea what this is, it exists though
         */
        readonly fingerprint: any;
    }

    export type Cookie = {
        name: string;
        value: string;
        domain: string;
        path: string;
    }

    export type ActiveCookie = Cookie & {
        /**
         * Unix timestamp
         */
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: string;
    }

    export enum ProxyCountry {
        UnitedStates = "UnitedStates",
        Canada = "Canada",
        Afghanistan = "Afghanistan",
        Albania = "Albania",
        Algeria = "Algeria",
        Argentina = "Argentina",
        Armenia = "Armenia",
        Aruba = "Aruba",
        Australia = "Australia",
        Austria = "Austria",
        Azerbaijan = "Azerbaijan",
        Bahamas = "Bahamas",
        Bahrain = "Bahrain",
        Bangladesh = "Bangladesh",
        Belarus = "Belarus",
        Belgium = "Belgium",
        BosniaAndHerzegovina = "BosniaandHerzegovina",
        Brazil = "Brazil",
        BritishVirginIslands = "BritishVirginIslands",
        Brunei = "Brunei",
        Bulgaria = "Bulgaria",
        Cambodia = "Cambodia",
        Cameroon = "Cameroon",
        Chile = "Chile",
        China = "China",
        Colombia = "Colombia",
        CostaRica = "CostaRica",
        Croatia = "Croatia",
        Cuba = "Cuba",
        Cyprus = "Cyprus",
        Czechia = "Czechia",
        Denmark = "Denmark",
        DominicanRepublic = "DominicanRepublic",
        Ecuador = "Ecuador",
        Egypt = "Egypt",
        ElSalvador = "ElSalvador",
        Estonia = "Estonia",
        Ethiopia = "Ethiopia",
        Finland = "Finland",
        France = "France",
        Georgia = "Georgia",
        Germany = "Germany",
        Ghana = "Ghana",
        Greece = "Greece",
        Guatemala = "Guatemala",
        Guyana = "Guyana",
        HashemiteKingdomOfJordan = "HashemiteKingdomofJordan",
        HongKong = "HongKong",
        Hungary = "Hungary",
        India = "India",
        Indonesia = "Indonesia",
        Iran = "Iran",
        Iraq = "Iraq",
        Ireland = "Ireland",
        Israel = "Israel",
        Italy = "Italy",
        Jamaica = "Jamaica",
        Japan = "Japan",
        Kazakhstan = "Kazakhstan",
        Kenya = "Kenya",
        Kosovo = "Kosovo",
        Kuwait = "Kuwait",
        Latvia = "Latvia",
        Liechtenstein = "Liechtenstein",
        Luxembourg = "Luxembourg",
        Macedonia = "Macedonia",
        Madagascar = "Madagascar",
        Malaysia = "Malaysia",
        Mauritius = "Mauritius",
        Mexico = "Mexico",
        Mongolia = "Mongolia",
        Montenegro = "Montenegro",
        Morocco = "Morocco",
        Mozambique = "Mozambique",
        Myanmar = "Myanmar",
        Nepal = "Nepal",
        Netherlands = "Netherlands",
        NewZealand = "NewZealand",
        Nigeria = "Nigeria",
        Norway = "Norway",
        Oman = "Oman",
        Pakistan = "Pakistan",
        Palestine = "Palestine",
        Panama = "Panama",
        PapuaNewGuinea = "PapuaNewGuinea",
        Paraguay = "Paraguay",
        Peru = "Peru",
        Philippines = "Philippines",
        Poland = "Poland",
        Portugal = "Portugal",
        PuertoRico = "PuertoRico",
        Qatar = "Qatar",
        RepublicOfLithuania = "RepublicofLithuania",
        RepublicOfMoldova = "RepublicofMoldova",
        Romania = "Romania",
        Russia = "Russia",
        SaudiArabia = "SaudiArabia",
        Senegal = "Senegal",
        Serbia = "Serbia",
        Seychelles = "Seychelles",
        Singapore = "Singapore",
        Slovakia = "Slovakia",
        Slovenia = "Slovenia",
        Somalia = "Somalia",
        SouthAfrica = "SouthAfrica",
        SouthKorea = "SouthKorea",
        Spain = "Spain",
        SriLanka = "SriLanka",
        Sudan = "Sudan",
        Suriname = "Suriname",
        Sweden = "Sweden",
        Switzerland = "Switzerland",
        Syria = "Syria",
        Taiwan = "Taiwan",
        Tajikistan = "Tajikistan",
        Thailand = "Thailand",
        TrinidadAndTobago = "TrinidadandTobago",
        Tunisia = "Tunisia",
        Turkey = "Turkey",
        Uganda = "Uganda",
        Ukraine = "Ukraine",
        UnitedArabEmirates = "UnitedArabEmirates",
        UnitedKingdom = "UnitedKingdom",
        Uzbekistan = "Uzbekistan",
        Venezuela = "Venezuela",
        Vietnam = "Vietnam",
        Zambia = "Zambia"
    }

    export enum APIEndpoint {
        SessionCreate = "sessions.create",
        SessionActive = "sessions.active",
        SessionDestroy = "sessions.destroy",
        RequestGet = "request.get",
        RequestPost = "request.post"
    }

    export type RequestOptions = {
        /**
         * The command to send to the API
         */
        endpoint: APIEndpoint | EnumValues<typeof APIEndpoint>;
        [key: string]: any;
    }

    export enum LoadType {
        BeforeLoad = "beforeload",
        AfterLoad = "afterload"
    }

    export type BaseBrowserAction = {
        /**
         * Whether this action should be executed before the supplied `url` loads, or after it
         */
        when?: LoadType | EnumValues<typeof LoadType>
    }

    export type WaitableAction = {
        /**
         * The duration in seconds to wait after the action is completed
         */
        wait?: number;
    }

    export type ThrowableAction = {
        /**
         * Whether to ignore errors thrown by this action
         */
        ignoreErrors?: boolean;
    }

    export type ElementInteractionAction = BaseBrowserAction & ThrowableAction & WaitableAction & {
        /**
         * The [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) of the target element for this action
         */
        cssSelector: string;
    }

    export enum CaptchaType {
        Custom = "custom",
        Turnstile = "turnstile",
        PerimeterX = "perimeterx",
        ReCaptcha = "recaptcha",
        HCaptcha = "hcaptcha",
        MTCaptcha = "mtcaptcha"
    }

    export enum KeyboardAction {
        Tab = "tab",
        Enter = "enter",
        Space = "space",
        ArrowDown = "arrowdown",
        ArrowUp = "arrowup",
        ArrowLeft = "arrowleft",
        ArrowRight = "arrowright"
    }

    export type BrowserAction = 
        | ElementInteractionAction & { type: "click", waitForSelector?: string; }
        | ElementInteractionAction & { type: "type", text: string }
        | BaseBrowserAction & WaitableAction & { type: "discord_login", token: string }
        | BaseBrowserAction & ThrowableAction & { type: "goto", url: string }
        | Omit<ElementInteractionAction, "wait"> & { type: "wait_for_selector", timeout: number }
        | Required<WaitableAction> & ThrowableAction & BaseBrowserAction & { type: "wait" }
        | ThrowableAction & { type: "solve_captcha", captcha: Omit<CaptchaType, "Custom"> | Omit<EnumValues<typeof CaptchaType>, "custom"> }
        | ThrowableAction & ElementInteractionAction & { type: "solve_captcha", captcha: CaptchaType.Custom | "custom", inputSelector: string, clickSelector?: string }
        | { type: "execute_js", code: string }
        | Partial<ElementInteractionAction> & { type: "scroll", repeat?: number, delayMs?: number }
        | { type: "keyboard", value: KeyboardAction | EnumValues<typeof KeyboardAction> }
        | ElementInteractionAction & { type: "dropdown", index: number, value?: never }
        | ElementInteractionAction & { type: "dropdown", value: string, index?: never }
        | { type: "if", condition: string, then: BrowserAction[], or?: BrowserAction[] }
        | { type: "while", condition: string, then: BrowserAction[], maxAttempts?: number }
        | { type: "wait_for_load_state", waitForLoadState: "domcontentloaded" | "networkidle" | "load" };

    export enum ProxyType {
        Residential = "residential",
        PremiumResidential = "premiumResidential",
        DataCenter = "dataCenter",
        Mobile = "mobile"
    }

    type WithCustomProxy = {
        /**
         * Custom proxy URL, leave blank for default random rotating proxy
         */
        proxy: string;
        /**
         * Whether to fall back to a random rotating proxy in case a specified proxy url fails
         */
        dontChangeProxy?: boolean;
    }

    type WithRotatingProxy = {
        /**
         * A specific country from which the rotating proxy should choose from
         */
        proxyCountry?: ProxyCountry | EnumValues<typeof ProxyCountry>;
        /**
         * The type of proxy to use
         */
        proxyType: ProxyType | EnumValues<typeof ProxyType>;
    }

    export type ProxyData = 
        | { type: "custom" } & WithCustomProxy 
        | { type: "rotating" } & WithRotatingProxy;

    export type SessionCreateRequestOptions = {
        /**
         * A custom session UUID to assign, defaults to a random UUID
         */
        session?: string;
        /**
         * Proxy information
         */
        proxyData?: ProxyData;
        /**
         * Whitelists certain domains
         */
        whitelistedDomains?: string[];
        /**
         * Sets the browser name, min and max version
         */
        browser?: BrowserData;
        /**
         * Sets the OS, min and max version
         */
        operatingSystem?: OSOption | EnumValues<typeof OSOption>;
        /**
         * Specify whether the device is mobile or desktop
         */
        device?: DeviceOption | EnumValues<typeof DeviceOption>;
        /**
         * Whether to use a patched chrome browser, only applies if the browser is set to chrome (Firefox has this feature by default)
         */
        noDriver?: boolean;
    }

    type AllGetResponseDataKeys = `${keyof (BaseGetResponseData & VideoURL & JSOutput & Base64Response)["solution"]}`;

    export type BaseHTTPRequest = {
        /**
         * The page URL to navigate to
         */
        url: string;
        /**
         * If set to `true`, ignores the input of `url` and executes the request on the current tab of the provided `session`
         */
        keepSamePage?: boolean
        /**
         * A session UUID to continue from
         */
        session?: string;
        /**
         * Proxy information
         */
        proxyData?: ProxyData;
        /**
         * Custom request header data
         */
        customHeaders?: KeyedObject;
        /**
         * A custom cookie string to use
         */
        cookies?: string;
        /**
         * Amount of retry attempts before the request fails
         */
        retries?: number;
        /**
         * Filter the response data to only include the specified keys
         */
        filter?: AllGetResponseDataKeys[];
    }

    export type BaseGetRequest = {
        includeImages?: boolean;
        /**
         * If true, response will contain a list of all links on the website
         */
        includeLinks?: boolean;
        /**
         * Loads content from the specified URLs
         */
        alwaysLoad?: string[];
        /**
         * Sets the local storage of the page
         */
        localStorage?: KeyedObject;
        /**
         * Whether to add automatic mouse movements to reduce the chance of bot detection
         */
        mouseMovements?: boolean;
        /**
         * Whether to automatically solve any captchas
         */
        automaticallySolveCaptchas?: boolean;
        /**
         * If set to true, uses ChatGPT 3.5 to parse the page data using the query specified in `properties`
         */
        autoparse?: boolean;
        /**
         * If `autoparse` is true, use this to specify the query to the AI
         */
        properties?: string;
        /**
         * Whether to record a video of the actions performed on the page (A link will be returned in the response, under `videoUrl`)
         */
        video?: boolean;
        /**
         * If true, takes a screenshot after all browser actions have been performed
         */
        screenshot?: boolean;
        /**
         * An ordered list of browser actions to be performed on the page, prioritising those with `when` set to `"beforeload"`
         */
        browserActions?: BrowserAction[];
        /**
         * If the provided URL is directly to a PDF file or an image, returns that file in base64 format under `base64Response`
         */
        base64?: boolean;
    }

    export enum RequestType {
        Browser = "browser",
        Request = "request"
    }

    type GetRequest =
        | { requestType: "request" | RequestType.Request } & BaseHTTPRequest
        | { requestType: "browser" | RequestType.Browser } & BaseHTTPRequest & BaseGetRequest;

    type HTTPRequest = AssertDiscriminatedUnion<GetRequest, "requestType", "request">;
    type BrowserRequest = AssertDiscriminatedUnion<GetRequest, "requestType", "browser">;

    type PostRequest = 
        | Omit<GetRequest, "customHeaders"> & { customHeaders: { "content-type": "application/json" } } & { postData: KeyedObject | string } 
        | Omit<GetRequest, "customHeaders"> & { customHeaders?: any } & { postData: string };

    export type BaseGetResponseData = {
        readonly solution: {
            /**
             * Whether the request was successful or not
             */
            readonly verified: boolean;
            /**
             * The current URL the request ended on
             */
            readonly currentUrl?: string;
            /**
             * The user agent string
             */
            readonly userAgent?: string;
            /**
             * The text content of the page
             */
            readonly innerText?: string;
            /**
             * The page's local storage data
             */
            readonly localStorageData?: {
                readonly [key: string]: string;
            }
            /**
             * A list of active cookies on the page
             */
            readonly cookies?: Readonly<ActiveCookie>[];
            /**
             * The cookies in string format
             */
            readonly cookieString?: string;
            /**
             * The HTML content of the page
             */
            readonly response?: string;
            /**
             * The request type
             */
            readonly type?: RequestType | EnumValues<typeof RequestType>;
        }
        /**
         * The amount of milliseconds it took for the request to complete
         */
        readonly timeElapsed: number;
        /**
         * Result state of the request, e.g. `"success"`, `"error"`
         */
        readonly data: string;
        /**
         * The session UUID used for this request
         */
        readonly session: string;
        /**
         * The request UUID
         */
        readonly request_uuid: string;
        readonly [key: string]: any;
    }

    type InsertSolution<T extends KeyedObject> = Insert<BaseGetResponseData, "solution", T>;

    type VideoURL = InsertSolution<{
        /**
         * A link to a .webm file of the recorded debugging video
         */
        readonly videoUrl: string; 
    }>;

    type WithVideoURL<R extends BrowserRequest> = HasDefinedKV<R, "video", true> extends true
        ? VideoURL
        : R;

    type JSOutput = InsertSolution<{
        /**
         * A list of javascript outputs ordered in the same way as they were given in `browserActions`
         * 
         * Note: `when: beforeload` actions have priority
         */
        readonly javascriptReturn: any[]; 
    }>;

    type WithJSOutput<R extends BrowserRequest> = HasObjectWithKVRecord<R["browserActions"], "type", "execute_js"> extends true
        ? JSOutput
        : R;

    type Base64Response = InsertSolution<{
        /**
         * The base64 format of the image or pdf provided in the URL
         */
        readonly base64Response: string;
    }>;

    export type WithBase64Response<R extends BrowserRequest> = HasDefinedKV<R, "base64", true> extends true
        ? Base64Response
        : R;

    export type GetResponseData<R extends GetRequest> = R extends BrowserRequest
            ? BaseGetResponseData & WithVideoURL<R> & WithJSOutput<R> & WithBase64Response<R>
            : BaseGetResponseData;

    export type SessionActiveData = {
        readonly active: boolean;
    }

    export type RemainingBalanceData = {
        readonly balance: number;
    }

    export default class Scrappey {
        public readonly apiKey: string;
        public readonly baseUrl: string;

        public constructor(apiKey: string);

        /**
         * Creates a session
         * @param {SessionCreateOptions} data The session creation data object
         */
        public createSession(data: SessionCreateRequestOptions): Promise<Session>;

        /**
         * Destroys a session
         * @param {string} session The session UUID
         */
        public destroySession(session: string): Promise<any>;

        /**
         * Returns whether a session is currently active
         * @param {string} session The session UUID 
         */
        public isSessionActive(session: string): Promise<boolean>;

        /**
         * Returns your remaining API tokens
         */
        public getBalance(): Promise<number>;

        /**
         * Sends a GET request
         * @param data The request object
         */
        public get<const R extends GetRequest>(data: R): Promise<GetResponseData<R>>;

        /**
         * Sends a POST request
         * @param data The request object 
         */
        public post<const R extends PostRequest>(data: R): Promise<GetResponseData<R>>;

        /**
         * Sends a raw request to directly to scrappey API
         * @param dataOptions 
         */
        public sendRequest(dataOptions: RequestOptions): Promise<any>;
    }
}