import Drag from "../../components/material/drag";

export default () => {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: 20,
          flex: 1,
          flexWrap: "wrap",
          backgroundColor: "var(--bg-color-2)",
        }}
      >
        <Drag
          accept={false}
          items={["Input", "Select", "Checkbox"].map((i) => {
            return {
              key: i,
              content: (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                    padding: "0 4px",
                  }}
                >
                  {i}
                </div>
              ),
            };
          })}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: 20,
          flex: 9,
          flexWrap: "wrap",
          alignContent: "flex-start",
          backgroundColor: "var(--bg-color-2)",
        }}
      >
        <Drag
          onChange={(item: any) => {
            console.log(item);
          }}
          defaultKey={5}
          onSelected={(item: any) => {
            console.log(item)
          }}
          items={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => {
            return {
              key: i,
              content: (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                    padding: "0 4px",
                  }}
                >
                  {i}
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};
