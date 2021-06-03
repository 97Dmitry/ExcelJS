import "./scss/index.scss";
import { Excel } from "./views/excel/Excel";
import { Header } from "./components/excel-components/header/Header";
import { Toolbar } from "./components/excel-components/toolbar/Toolbar";
import { Formula } from "./components/excel-components/formula/Formula";
import { Table } from "./components/excel-components/table/Table";

const excel = new Excel("#app", {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
});

excel.render();
