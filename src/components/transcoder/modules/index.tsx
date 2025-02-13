import * as Antd from "antd";
import React from "react";
import axios from "axios";
import moment from "moment";
import { create } from "@shined/reactive";
import * as Utils from "../../shared";

export type ModuleProps = {
  [key: string]: {
    module: any;
    imports: `import ${string}`;
  };
}

const globalModules: ModuleProps = {
  React: {
    module: React,
    imports: 'import React from "react"',
  },
  axios: {
    module: axios,
    imports: 'import axios from "axios"',
  },
  Antd: {
    module: Antd,
    imports: 'import * as Antd from "antd"',
  },
  moment: {
    module: moment,
    imports: 'import moment from "moment"',
  },
  create: {
    module: create,
    imports: 'import { create } from "@shined/reactive"',
  },
  Utils: {
    module: Utils,
    imports: 'import * as Utils from "xxx/shared"',
  },
};

// export const inject = (modules: ModuleProps) => {
//   Object.assign(globalModules, modules)
// };

export default globalModules;
