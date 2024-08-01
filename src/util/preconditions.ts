import { KeyedObject } from "../types/typeUtil.js";

export class Preconditions {
    public static checkURL(data: KeyedObject): void {
        if (data?.url) return;
        throw new Error("Request data must have a url property!");
    }

    public static checkRequestType(data: KeyedObject): void {
        if (!data?.requestType) {
            data.requestType = "browser";
        } else if (!["browser", "request"].includes(data.requestType)) {
            data.requestType = "browser";
        }
    }

    public static enforceSessionIfKeepSamePage(data: KeyedObject): void {
        if (data?.keepSamePage && !data?.session) {
            throw new Error("Requests with keepSamePage must specify a session ID!");
        }
    }

    public static validateRequestType(data: KeyedObject): void {
        const type = data.requestType;
        if (type === "browser") return;

        const browserExclusive = ["includeImages", "includeLinks", "alwaysLoad", "localStorage", "mouseMovements", "automaticallySolveCaptchas", "autoparse", "properties", "video","screenshot", "browserActions", "base64"];
        const disallowedKeys = browserExclusive.map(key => data.hasOwnProperty(key));

        if (disallowedKeys.length > 0) {
            throw new Error(`Properties ${disallowedKeys.join(", ")} are not allowed with requestType: "request"!`);
        }
    }

    public static validateProxyType(data: KeyedObject): void {
        const proxyData = data?.proxyData;
        if (!proxyData) return;

        const type = proxyData.type;
        
        if (type === "custom") {
            const rotatingExclusive = ["proxyCountry", "proxyType"];
            const disallowedKeys = rotatingExclusive.map(key => data.hasOwnProperty(key));

            if (disallowedKeys.length > 0) {
                throw new Error(`Properties ${disallowedKeys.join(", ")} are not allowed with type: "custom"!`);
            }
        } else if (type === "rotating") {
            const customExclusive = ["proxy", "dontChangeProxy"];
            const disallowedKeys = customExclusive.map(key => data.hasOwnProperty(key));

            if (disallowedKeys.length > 0) {
                throw new Error(`Properties ${disallowedKeys.join(", ")} are not allowed with type: "rotating"!`);
            }
        }

        const browserExclusive = [];
        const disallowedKeys = browserExclusive.map(key => data.hasOwnProperty(key));

        if (disallowedKeys.length > 0) {
            throw new Error(`Properties ${disallowedKeys.join(", ")} are not allowed with requestType: "request"!`);
        }
    }

    public static validateRequestData(data: KeyedObject): void {
        this.checkURL(data);
        this.checkRequestType(data);
        this.enforceSessionIfKeepSamePage(data);
        this.validateRequestType(data);
        this.validateProxyType(data);
    }
}