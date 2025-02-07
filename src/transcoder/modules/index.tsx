import * as Antd from "antd";
import React from "react";
import axios from "axios";
import moment from "moment";

export default {
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
} as any;
