//Here's all your Business Logic for this important stuff

interface BSP {
  name: string;
  id: number;
}

enum EMV {
  visa,
  mastercard,
  europay,
}

class NCREnterprisePlatform {
  bsp: BSP;
  constructor() {
    this.bsp = {
      name: "bsp platform",
      id: new Date().getTime(),
    };
  }

  funct = () => {
    console.log("Do you know what a BFF is?");
  };
}
