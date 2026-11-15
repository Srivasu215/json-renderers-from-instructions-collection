import buildSingleSpec from "./buildSingleSpec.js";
import { definitions as fallbackDefinitions, spec as fallbackSpec } from "spec-repo";

export const buildSpec = ({
    definitions = fallbackDefinitions,
    spec = fallbackSpec,
    renderers = [],
    data = [],
    columns = [],
    layout = "vertical",
    showLog = false
} = {}) => {
    if (!Array.isArray(renderers) || renderers.length === 0) {
        throw new Error("renderers must be a non-empty array of renderer configurations.");
    }

    const childSpecs = renderers.map(item => {
        const rendererConfig = typeof item === "string" ? { type: item } : item;

        return buildSingleSpec({
            definitions,
            spec,
            type: rendererConfig.type,
            data: rendererConfig.data || data,
            columns: rendererConfig.columns || columns,
            options: rendererConfig.options || {},
            showLog
        });
    });

    const containerClass = layout === "horizontal"
        ? "row g-4"
        : "d-flex flex-column gap-4";

    return {
        tagName: "div",
        attributes: {
            class: containerClass,
            "data-role": "collection-container"
        },
        children: childSpecs
    };
};

export default buildSpec;
