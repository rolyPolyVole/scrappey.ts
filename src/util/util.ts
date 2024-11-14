import { KeyedObject } from "../types/typeUtil.js";

export class Util {
    public static sessionCreateToJSON(data: KeyedObject): any {
        const jsonData = this.cloneObject(data) as any;

        if (data.proxyData) {
            delete jsonData.proxyData;
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    public static getRequestToJSON(data: KeyedObject): any {
        const jsonData = this.cloneObject(data) as any;

        if (data.proxyData) {
            delete jsonData.proxyData;
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    public static postRequestToJSON(data: KeyedObject): any {
        const jsonData = this.cloneObject(data) as any;

        if (data?.customHeaders?.content_type === "application/json" && typeof data?.postData === "object") {
            jsonData.postData = JSON.stringify(data.postData);
        }

        if (data.proxyData) {
            delete jsonData.proxyData;
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    private static proxyDataToJSON(data: KeyedObject): any {
        const jsonData = {} as any;
        
        if (data.type === "custom") {
            jsonData.proxy = data.proxy;

            if (data.dontChangeProxy) {
                jsonData.dontChangeProxy = data.dontChangeProxy;
            }
        } else if (data.type === "rotating") {
            switch (data.proxyType) {
                case "residential":
                    break;
                case "premiumResidential":
                    jsonData.premiumProxy = true;
                    break;
                case "dataCenter":
                    jsonData.datacenter = true;
                    break;
                case "mobile":
                    jsonData.mobileProxy = true;
                    break;
            }
            
            if (data.proxyCountry) {
                jsonData.proxyCountry = data.proxyCountry;
            }
        }

        return jsonData;
    }

    private static cloneObject<O>(obj: O): O {
        return JSON.parse(JSON.stringify(obj));
    }
}
