import columns from "./columns.json" with { type: "json" };
import initialData from "./data.json" with { type: "json" };
import bindings from "./bindings.json" with { type: "json" };
import actions, { initState } from "./actions.js";
import render from "../../../docs/dist/v1/min.js";
import { bindEvents } from "../../../vendor/dom-primitive-bindings.min.js";

const containerId = "dom-render-container";
const dataset = [...initialData];

// 1. Render Collection UI
const renderCollection = () => {
    try {
        render({
            data: dataset,
            columns,
            targetHtmlId: containerId,
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
            showLog: false
        });
    } catch (error) {
        console.error("Collection render failed:", error);
    }
};

// 2. Initial Mount
renderCollection();

// 3. Connect State to Actions & Bind Container Events via Declarative dom-primitive-bindings
initState({ dataset, reRender: renderCollection });
bindEvents(containerId, bindings, actions);
