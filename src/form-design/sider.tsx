import Drag from "../components/material/drag";
import material from './material-config';

export default () => {
  return (
    <div className="sider">
      <Drag
        accept={false}
        items={Object.keys(material).map((key: string) => {
          return {
            key,
            schema: (material as any)[key],
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
                {key}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};
