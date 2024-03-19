"use strict";
//Here's all your Business Logic for this important stuff
var EMV;
(function (EMV) {
    EMV[EMV["visa"] = 0] = "visa";
    EMV[EMV["mastercard"] = 1] = "mastercard";
    EMV[EMV["europay"] = 2] = "europay";
})(EMV || (EMV = {}));
class NCREnterprisePlatform {
    constructor() {
        this.funct = () => {
            console.log("Do you know what a BFF is?");
        };
        this.bsp = {
            name: "bsp platform",
            id: new Date().getTime(),
        };
    }
}
//# sourceMappingURL=ReallyImportantCode.js.map