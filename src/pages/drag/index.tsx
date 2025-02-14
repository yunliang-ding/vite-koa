import Drag from "@/components/material/drag";
import Monaco from "@/monaco";
import { CSSProperties } from "react";

const style: CSSProperties = {
  display: "flex",
  gap: 10,
  padding: 20,
  flex: 9,
  flexWrap: "wrap",
  alignContent: "flex-start",
  backgroundColor: "var(--bg-color-2)",
};

const itemStyle: CSSProperties = {
  width: 100,
  height: 100,
  background: "var(--bg-color)",
  color: "var(--text-color)",
  padding: "0 4px",
};

export default () => {
  return (
    <div style={{ display: "flex", height: "calc(100vh - 54px)" }}>
      <div style={{ display: "flex", gap: 12, width: "50%", height: "100%" }}>
        <div
          style={{
            ...style,
            flex: 1,
          }}
        >
          <Drag
            accept={false}
            items={["Input", "Select", "Checkbox"].map((i) => {
              return {
                key: i,
                content: <div style={itemStyle}>{i}</div>,
              };
            })}
          />
        </div>
        <div style={style}>
          <Drag
            onChange={(item: any) => {
              console.log(item);
            }}
            defaultKey={5}
            onSelected={(item: any) => {
              console.log(item);
            }}
            items={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((i) => {
              return {
                key: i,
                content: <div style={itemStyle}>{i}</div>,
              };
            })}
          />
        </div>
      </div>
      <div
        style={{
          height: "100%",
          width: "50%",
        }}
      >
        <Monaco
          readOnly
          value={`import Drag from "@/components/material/drag";
import { CSSProperties } from "react";

const style: CSSProperties = {
  display: "flex",
  gap: 10,
  padding: 20,
  flex: 9,
  flexWrap: "wrap",
  alignContent: "flex-start",
  backgroundColor: "var(--bg-color-2)",
};

const itemStyle: CSSProperties = {
  width: 100,
  height: 100,
  background: "var(--bg-color)",
  color: "var(--text-color)",
  padding: "0 4px",
};

export default () => {
  return (
      <div style={{ display: "flex", gap: 12, width: "50%", height: "100%" }}>
        <div  
          style={{
            ...style,
            flex: 1,
          }}
        >
          <Drag
            accept={false}
            items={["Input", "Select", "Checkbox"].map((i) => {
              return {
                key: i,
                content: <div style={itemStyle}>{i}</div>,
              };
            })}
          />
        </div>
        <div style={style}>
          <Drag
            onChange={(item: any) => {
              console.log(item);
            }}
            defaultKey={5}
            onSelected={(item: any) => {
              console.log(item);
            }}
            items={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((i) => {
              return {
                key: i,
                content: <div style={itemStyle}>{i}</div>,
              };
            })}
          />
        </div>
      </div>
  );
};
`}
        />
      </div>
    </div>
  );
};
