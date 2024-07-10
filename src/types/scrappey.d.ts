declare module "scrappey-wrapper-typed" {
    export type KeyedObject = {
        [key: string]: any
    }

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
         * Session UUID
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
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: string;
    }

    export type CreateSessionOptions = {
        session?: string;
        proxy?: string;
        whitelistedDomains?: string[];
        datacenter?: boolean;
        browser?: BrowserData[];
        operatingSystem?: OSOption;
        device?: DeviceOption;
    }

    export type RequestOptions = {
        endpoint: string;
    }

    export type BaseBrowserAction = {
        when?: LoadType
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
        | { type: "keyboard", value: "tab" | "enter" | "space" | "arrowdown" | "arrowup" | "arrowleft" | "arrowright" }

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
        

    export type GetRequestOptions = {
        url: string;
        session?: string;
        cookiejar?: Cookie[];
        proxy?: string;
        customHeaders?: KeyedObject;
        proxyCountry?: ProxyCountry;
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
        [key: string]: any;
    }

    export type PostRequestOptions = 
        | Omit<GetRequestOptions, "customHeaders"> & { customHeaders: { content_type: "application/json" } } & { postData: KeyedObject } 
        | Omit<GetRequestOptions, "customHeaders"> & { customHeaders?: any } & { postData: string }

    export type GetResponseData = {
        solution: {
            verified: boolean;
            currentUrl?: string;
            userAgent?: string;
            innerText?: string;
            localStorageData?: {
                [key: string]: string;
            }
            cookies?: ActiveCookie[];
            cookieString?: string;
            response?: string;
            type?: string;
            javascriptReturn?: any[];
        }
        videoUrl?: string;
        timeElapsed: number;
        data: string;
        session: string;
        request_uuid: string;
        [key: string]: any;
    }

    export default class Scrappey {
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
        public get(data: GetRequestOptions): Promise<GetResponseData>;

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