import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormDesign from "./pages/form-design";
import TableDesign from "./pages/table-design";
import Playground from "./pages/playground";
import Drag from "./pages/drag";

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormDesign />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="/template/form" element={<FormDesign />} />
        <Route path="/template/table" element={<TableDesign />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
};
