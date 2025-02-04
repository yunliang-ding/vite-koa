import * as Antd from "antd";
import React from "react";
import axios from "axios";

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
} as any;
