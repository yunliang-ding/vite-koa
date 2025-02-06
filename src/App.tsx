import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FormDesign from "./pages/form-design";
import TableDesign from "./pages/table-design";
import Playground from "./pages/playground";
import Drag from "./pages/drag";
import Layout from "./layout";

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Drag />} />
          <Route path="/drag" element={<Drag />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/template/form" element={<FormDesign />} />
          <Route path="/template/table" element={<TableDesign />} />
        </Route>
      </Routes>
    </Router>
  );
};
