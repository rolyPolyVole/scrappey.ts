declare module "scrappey-wrapper-typed" {
    type KeyedObject = {
        [key: string]: any
    }

    /**
     * Returns the string values of an enum
     */
    type EnumValues<T extends KeyedObject> = 
        | T[keyof T] 
        | `${T[keyof T]}`;

    /**
     * Returns a boolean value indicating whether `K` is a key of type `T`
     */
    type HasDefinedKey<T, K extends keyof any> = K extends keyof T ? true : false;

    /**
     * Returns if an array `T` of objects contains any element that matches object `O` 
     */
    type HasObjectWithKVRecord<T extends readonly object[], K extends PropertyKey, V> =
        true extends (
            T[number] extends infer A 
                ? A extends A
                    ? A extends Record<K, V>
                        ? true
                        : never
                    : never
                : never
        ) ? true : false;

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

    export enum RequestType {
        Browser = "browser",
        Request = "request"
    }

    export enum LoadType {
        BeforeLoad = "beforeload",
        AfterLoad = "afterload"
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
        BosniaandHerzegovina = "BosniaandHerzegovina",
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
        HashemiteKingdomofJordan = "HashemiteKingdomofJordan",
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
        RepublicofLithuania = "RepublicofLithuania",
        RepublicofMoldova = "RepublicofMoldova",
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
        TrinidadandTobago = "TrinidadandTobago",
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

    export type CreateSessionOptions = {
        /**
         * A custom session UUID to assign, defaults to a random UUID
         */
        session?: string;
        /**
         * A url to a proxy server, defaults to a random rotating proxy
         */
        proxy?: string;
        /**
         * A specific country from where the rotating proxy should choose from
         */
        proxyCountry?: ProxyCountry | EnumValues<typeof ProxyCountry>;
        /**
         * Whitelists certain domains
         */
        whitelistedDomains?: string[];
        /**
         * If true, uses a datacenter proxy instead of a residential one
         */
        datacenter?: boolean;
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

    export enum CatpchaType {
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
        | ElementInteractionAction & { type: "click", waitForSelector?: boolean; }
        | ElementInteractionAction & { type: "type", text: string }
        | BaseBrowserAction & WaitableAction & { type: "discord_login", token: string }
        | BaseBrowserAction & ThrowableAction & { type: "goto", url: string }
        | Omit<ElementInteractionAction, "wait"> & { type: "wait_for_selector", timeout: number }
        | WaitableAction & ThrowableAction & BaseBrowserAction & { type: "wait" }
        | ThrowableAction & { type: "solve_captcha", captcha: CatpchaType | EnumValues<typeof CatpchaType> }
        | ThrowableAction & ElementInteractionAction & { type: "solve_captcha", captcha: CatpchaType.Custom | "custom", inputSelector: string, clickSelector?: string }
        | { type: "execute_js", code: string }
        | ElementInteractionAction & { type: "scroll", repeat?: number, delayMs: number }
        | { type: "keyboard", value: KeyboardAction | EnumValues<typeof KeyboardAction> }
        | ElementInteractionAction & { type: "dropdown", index: number, value?: never }
        | ElementInteractionAction & { type: "dropdown", value: string, index?: never }

    type GetRequest = {
        /**
         * The page URL to navigate to
         */
        url: string;
        /**
         * A session UUID to continue from
         */
        session?: string;
        /**
         * Cookie data
         */
        cookiejar: Cookie[];
        /**
         * Custom proxy URL, leave blank for default random rotating proxy
         */
        proxy: string;
        /**
         * Custom request header data
         */
        customHeaders: KeyedObject;
        /**
         * A specific country from which the rotating proxy should choose from
         */
        proxyCountry: ProxyCountry | EnumValues<typeof ProxyCountry>;
        /**
         * If true, response will contain a list of all image URLs on the website
         */
        includeImages: boolean;
        /**
         * If true, response will contain a list of all links on the website
         */
        includeLinks: boolean;
        /**
         * Takes `browser` or `request`
         */
        requestType: RequestType | EnumValues<typeof RequestType>;
        /**
         * Sets the local storage of the page
         */
        localStorage: KeyedObject;
        /**
         * Whether to add automatic mouse movements to reduce the chance of bot detection
         */
        mouseMovements: boolean;
        /**
         * Whether to automatically solve any captchas
         */
        automaticallySolveCaptchas: boolean;
        /**
         * If set to true, uses ChatGPT 3.5 to parse the page data using the query specified in `properties`
         */
        autoparse: boolean;
        /**
         * If `autoparse` is true, use this to specify the query to the AI
         */
        properties: string;
        /**
         * Whether to record a video of the actions performed on the page (A link will be returned in the response, under `videoUrl`)
         */
        video: boolean;
        /**
         * If true, takes a screenshot after all browser actions have been performed
         */
        screenshot: boolean;
        /**
         * An ordered list of browser actions to be performed on the page, prioritising those with `when` set to `"beforeload"`
         */
        browserActions: BrowserAction[];
        /**
         * If the provided URL is directly to a PDF file or an image, returns that file in base64 format under `base64Response`
         */
        base64: boolean;
        [key: string]: any;
    }

    export type PartialGetRequest = Partial<GetRequest> & { url: string }

    type PostRequest = 
        | Omit<GetRequest, "customHeaders"> & { customHeaders: { content_type: "application/json" } } & { postData: KeyedObject } 
        | Omit<GetRequest, "customHeaders"> & { customHeaders?: any } & { postData: string }

    export type PartialPostRequest = Partial<PostRequest> & { url: string, postData: PostRequest["postData"] };

    type BaseGetResponseData = {
        solution: {
            /**
             * Whether the request was successful or not
             */
            verified: boolean;
            /**
             * The current URL the request ended on
             */
            currentUrl?: string;
            /**
             * The user agent string
             */
            userAgent?: string;
            /**
             * The text content of the page
             */
            innerText?: string;
            /**
             * The page's local storage data
             */
            localStorageData?: {
                [key: string]: string;
            }
            /**
             * A list of active cookies on the page
             */
            cookies?: ActiveCookie[];
            /**
             * The HTML content of the page
             */
            response?: string;
            /**
             * The request type
             */
            type?: RequestType | EnumValues<typeof RequestType>;
        }
        /**
         * The total amount of milliseconds it took for the request to complete
         */
        timeElapsed: number;
        /**
         * Result state of the request, e.g. `"success"`, `"error"`
         */
        data: string;
        /**
         * The session UUID used for this request
         */
        session: string;
        /**
         * The request UUID
         */
        request_uuid: string;
        [key: string]: any;
    }

    type WithVideoURL = Omit<BaseGetResponseData, "solution"> & {
        solution: BaseGetResponseData["solution"] & {
            /**
             * A link to a .webm file of the video recorded, only exists if `video` was set to true in the request 
             */
            videoUrl: string;
            }
    }

    type WithJSOutput = Omit<BaseGetResponseData, "solution"> & {
        solution: BaseGetResponseData["solution"] & {
            /**
             * A list of javascript outputs ordered in the same way as they were given in `browserActions`
             * 
             * Note: `when: beforeload` actions have priority 
             */
            javascriptReturn: any[];
        }
    }

    export type GetResponseData<R extends PartialGetRequest> = 
        HasDefinedKey<R, "video"> extends true
            ? HasObjectWithKVRecord<R["browserActions"], "type", "execute_js"> extends true
                ? BaseGetResponseData & WithVideoURL & WithJSOutput
                : BaseGetResponseData & WithVideoURL
            : HasObjectWithKVRecord<R["browserActions"], "type", "execute_js"> extends true
                ? BaseGetResponseData & WithJSOutput
                : BaseGetResponseData

    export default class Scrappey {
        public readonly apiKey: string;
        public readonly baseUrl: string;

        public constructor(apiKey: string);

        /**
         * Creates a session
         * @param {CreateSessionOptions} data The session creation data object
         * @returns {Promise<Session>} The session object
         */
        public createSession(data: CreateSessionOptions): Promise<Session>;

        /**
         * Destroys a session
         * @param {Session} session The session UUID
         * @returns {Promise<any>}
         */
        public destroySession(session: string): Promise<any>;

        /**
         * Sends a GET request
         * @param data The request object
         * @returns {Promise<GetResponseData>} The reponse object
         */
        public get<const R extends PartialGetRequest>(data: R): Promise<GetResponseData<R>>;

        /**
         * Sends a POST request
         * @param data The request object 
         * @returns {Promise<any>} The response object
         */
        public post(data: PostRequest): Promise<any>;

        /**
         * Sends the actual request to scrappey as a proxy
         * @param dataOptions 
         * @returns {Promise<any>}
         */
        public sendRequest(dataOptions: RequestOptions): Promise<any>;
    }
}