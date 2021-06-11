import "./scss/index.scss";

import { Excel } from "./performers/excel/Excel";
import { Header } from "./components/excel-components/header/Header";
import { Toolbar } from "./components/excel-components/toolbar/Toolbar";
import { Formula } from "./components/excel-components/formula/Formula";
import { Table } from "./components/excel-components/table/Table";

import { createStore } from "@/redux/createStore";
import { rootReducer } from "@/redux/rootReducer";
import { lStorage } from "@core/utils";

const store = createStore(rootReducer, lStorage("excelStorage"));
store.subscribe((store: any) => {
  lStorage("excelStorage", store);
});

const excel = new Excel("#app", {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
  store,
});

excel.render();
