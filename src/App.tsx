import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drag from "./pages/drag";
import FormDesign from "./pages/form-design";
import TableDesign from "./pages/table-design";
import Playground from "./pages/playground";
import Template from "./pages/template";

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/drag" element={<Drag />} />
        <Route path="/form-design" element={<FormDesign />} />
        <Route path="/table-design" element={<TableDesign />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </Router>
  );
};
