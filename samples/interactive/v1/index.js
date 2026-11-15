import columns from "../../v1/common/columns.json" with { type: "json" };
import initialData from "../../v1/common/data.json" with { type: "json" };
import render from "../../../docs/dist/v1/min.js";

const targetHtmlId = "dom-render-container";
let dataset = [...initialData];

// UI Toast Notification helper
const showToast = (message, type = "success") => {
    const feedback = document.getElementById("action-feedback");
    const feedbackText = document.getElementById("action-feedback-text");
    if (!feedback || !feedbackText) return;

    feedback.className = `alert alert-${type} alert-dismissible fade show shadow-sm mb-3`;
    feedbackText.innerHTML = message;
    feedback.style.display = "block";

    setTimeout(() => {
        feedback.style.display = "none";
    }, 4500);
};

// ---------------------------------------------------------------
// Event Handler 1: Live Table Search Filtering
// ---------------------------------------------------------------
const hookLiveSearch = () => {
    const searchInput = document.getElementById("tableSearch");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        const tbody = document.querySelector('[data-role="table-body"]');
        if (!tbody) return;

        const rows = tbody.querySelectorAll("tr");
        let visibleCount = 0;

        rows.forEach((row) => {
            // Check textContent across all data cells in this row
            const text = row.textContent.toLowerCase();
            const matches = !query || text.includes(query);
            row.style.display = matches ? "" : "none";
            if (matches) visibleCount++;
        });

        if (query) {
            showToast(`<i class="bi bi-funnel me-1"></i> Filter: Found <strong>${visibleCount}</strong> of ${rows.length} rows matching "<strong>${query}</strong>"`, "info");
        }
    });
};

// ---------------------------------------------------------------
// Event Handler 2: Form Submit & Data Addition Loop
// ---------------------------------------------------------------
const hookFormSubmit = () => {
    const form = document.querySelector('form[data-role="form-body"]');
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Extract input values automatically
        const formData = new FormData(form);
        const newRecord = {
            itemName: formData.get("itemName") || form.querySelector('#itemName')?.value || "",
            category: formData.get("category") || form.querySelector('#category')?.value || "General",
            baseUnit: formData.get("baseUnit") || form.querySelector('#baseUnit')?.value || "pcs"
        };

        if (!newRecord.itemName.trim()) {
            showToast("Please enter an Item Name before submitting.", "warning");
            return;
        }

        // 1. Mutate dataset
        dataset.push(newRecord);

        // 2. Re-render UI in 1 statement
        renderApp();

        // 3. Reset form
        const freshForm = document.querySelector('form[data-role="form-body"]');
        if (freshForm) freshForm.reset();

        showToast(`<strong>Success!</strong> Added "<strong>${newRecord.itemName}</strong>" to table. (Total: ${dataset.length} items)`, "success");
    });
};

// ---------------------------------------------------------------
// Event Handler 3: Table Row Action Delegation
// ---------------------------------------------------------------
const hookRowActions = () => {
    const tbody = document.querySelector('[data-role="table-body"]');
    if (!tbody) return;

    tbody.addEventListener("click", (e) => {
        const actionBtn = e.target.closest(".ks-btn-show");
        if (!actionBtn) return;

        const tr = actionBtn.closest("tr");
        if (!tr) return;

        // Determine row index from serial cell text or row position
        const serialCell = tr.children[0];
        const rowIndex = parseInt(serialCell.textContent, 10) - 1;
        const rowData = dataset[rowIndex] || {
            itemName: tr.children[1]?.textContent,
            category: tr.children[2]?.textContent,
            baseUnit: tr.children[3]?.textContent
        };

        showToast(`
            <i class="bi bi-eye-fill me-1"></i>
            <strong>Row Selected (#${rowIndex + 1}):</strong> 
            ${rowData.itemName} | <span class="badge bg-secondary">${rowData.category}</span> | Unit: <code>${rowData.baseUnit}</code>
        `, "primary");
    });
};

// ---------------------------------------------------------------
// Main Application Render Loop
// ---------------------------------------------------------------
const renderApp = () => {
    try {
        // Render Form on top + Table with serial, search, and options below
        render({
            data: dataset,
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
            showLog: false
        });

        // Attach interactive event listeners after mounting
        hookLiveSearch();
        hookFormSubmit();
        hookRowActions();

    } catch (error) {
        console.error("Interactive POC initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

// Start
renderApp();
