import columns from "../common/columns.json" with { type: "json" };
import data from "../common/data.json" with { type: "json" };
import render from "../../../docs/dist/v1/min.js";

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // Pure 1-statement consumption rendering Form on top + Table with serial and options below
        render({
            data,
            columns,
            targetHtmlId,
            classToApply: "",
            appendPosition: "replace",
            renderers: [
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
        console.error("Collection initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

start();
