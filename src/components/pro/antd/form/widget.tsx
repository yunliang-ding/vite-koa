import {
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  TimePicker,
  Rate,
  TreeSelect,
  Upload,
  Checkbox,
  Radio,
  TableList,
  FormList,
} from "../../../material/antd";

const Mapping: any = {
  Cascader,
  DatePicker,
  Input,
  TextArea: Input.TextArea,
  InputNumber,
  Select,
  Slider,
  Switch,
  TimePicker,
  CheckGroup: Checkbox.Group,
  RadioGroup: Radio.Group,
  RangeDatePicker: DatePicker.RangePicker,
  RangeTimePicker: TimePicker.RangePicker,
  Rate,
  TreeSelect,
  FormList,
  TableList,
  Upload,
};

export const getComponent = (type: string) => {
  return (
    Mapping[type] ||
    (() => <span style={{ color: "red" }}>找不到类型：{type}</span>)
  );
};

export default Mapping;
