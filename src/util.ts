import { GetRequest, PostRequest, ProxyData, SessionCreateRequestOptions } from "scrappey-wrapper-typed";

export class Util {
    public static sessionCreateToJSON(data: SessionCreateRequestOptions): any {
        const jsonData = this.cloneObject(data) as any;

        if (data.proxyData) {
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    public static getRequestToJSON(data: GetRequest): any {
        const jsonData = this.cloneObject(data) as any;

        if (data.proxyData) {
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    public static postRequestToJSON(data: PostRequest): any {
        const jsonData = this.cloneObject(data) as any;

        if (data?.customHeaders?.content_type === "application/json" && typeof data?.postData === "object") {
            jsonData.postData = JSON.stringify(data.postData);
        }

        if (data.proxyData) {
            const jsonProxyData = this.proxyDataToJSON(data.proxyData);

            for (const key in jsonProxyData) {
                jsonData[key] = jsonProxyData[key];
            }
        }

        return jsonData;
    }

    private static proxyDataToJSON(data: ProxyData): any {
        const jsonData = {} as any;
        
        if (data.type === "custom") {
            jsonData.proxy = data.proxy;

            if (data.dontChangeProxy) {
                jsonData.proxyCountry = data.dontChangeProxy;
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