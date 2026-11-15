let state = {
    dataset: [],
    reRender: null
};

export const initState = ({ dataset, reRender }) => {
    state.dataset = dataset;
    state.reRender = reRender;
};

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

export const actions = {
    onSearchFilter: (event, matchElement) => {
        const query = matchElement.value.trim().toLowerCase();
        const tbody = document.querySelector('[data-role="table-body"]');
        if (!tbody) return;

        const rows = tbody.querySelectorAll("tr");
        let visibleCount = 0;

        rows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            const matches = !query || text.includes(query);
            row.style.display = matches ? "" : "none";
            if (matches) visibleCount++;
        });

        if (query) {
            showToast(`<i class="bi bi-funnel me-1"></i> Filter: Found <strong>${visibleCount}</strong> of ${rows.length} rows matching "<strong>${query}</strong>"`, "info");
        }
    },

    onFormSubmit: (event, matchElement) => {
        event.preventDefault();
        const form = matchElement;
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

        // Mutate dataset
        state.dataset.push(newRecord);

        // Re-render UI: bindEvents stays alive on the parent container!
        if (state.reRender) state.reRender();
        
        // Reset form
        const freshForm = document.querySelector('form[data-role="form-body"]');
        if (freshForm) freshForm.reset();

        showToast(`<strong>Success!</strong> Added "<strong>${newRecord.itemName}</strong>" to table. (Total: ${state.dataset.length} items)`, "success");
    },

    onRowShow: (event, matchElement) => {
        const tr = matchElement.closest("tr");
        if (!tr) return;

        const serialCell = tr.children[0];
        const rowIndex = parseInt(serialCell?.textContent, 10) - 1;
        const rowData = state.dataset[rowIndex] || {
            itemName: tr.children[1]?.textContent,
            category: tr.children[2]?.textContent,
            baseUnit: tr.children[3]?.textContent
        };

        showToast(`
            <i class="bi bi-eye-fill me-1"></i>
            <strong>Row Selected (#${rowIndex + 1}):</strong> 
            ${rowData.itemName} | <span class="badge bg-secondary">${rowData.category}</span> | Unit: <code>${rowData.baseUnit}</code>
        `, "primary");
    }
};

export default actions;
