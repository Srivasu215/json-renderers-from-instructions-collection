import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import render from "../../../docs/dist/v1/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // Full Complete Dashboard: Select + DataList + Form + Table
        render({
            data,
            columns,
            targetHtmlId,
            classToApply: "",
            appendPosition: "replace",
            renderers: [
                {
                    type: "select.simple",
                    options: {}
                },
                {
                    type: "dataList.simple",
                    options: {}
                },
                {
                    type: "form.simple",
                    options: {}
                },
                {
                    type: "table.simple",
                    options: {
                        showSerial: true,
                        showSearch: true,
                        showOptions: true
                    }
                }
            ],
            showLog: true
        });
    } catch (error) {
        console.error("Dashboard initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

start();
