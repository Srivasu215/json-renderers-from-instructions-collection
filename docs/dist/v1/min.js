// ../json-renderers-run-instructions/node_modules/json-write-path/src/v4/utils/toArray.js
var e = (e) => Array.isArray(e) ? e : [e], t = (e, t, n) => {
	e[t] = n;
}, n = {
	set: t,
	push: (t, n, r) => {
		t[n].push(...e(r));
	},
	unshift: (t, n, r) => {
		t[n].unshift(...e(r));
	},
	pushToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.push(...structuredClone(e(r)));
		});
	},
	unshiftToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.unshift(...structuredClone(e(r)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, r = (e) => typeof e == "object" && !!e && !Array.isArray(e), i = (e, t) => {
	if (!r(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = d(t, i);
	return n;
}, a = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => d(t, e));
}, o = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, s = (e, t) => o(e, t), c = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, l = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, u = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: l,
		applyTemplate: e
	});
}, d = (e, t, n) => {
	let r = e, l = t;
	c(r, l, n);
	let u = structuredClone(l);
	return typeof u == "string" ? o(u, r) : (typeof u != "object" || !u || ("textContent" in u && (u.textContent = s(u?.textContent, r)), "attributes" in u && (u.attributes = i(u?.attributes, r)), "children" in u && (u.children = a(u?.children, r))), u);
};
u(d);
// ../json-renderers-run-instructions/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var f = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, ee = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, te = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: ee,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, p = (e, t) => {
	let n = e, r = t;
	return f(n, r), n.map((e) => d(e, r));
};
te((e, t) => {
	let n = e;
	return f(n, t), n.map((e) => d(e, e[t]));
}, p);
// ../json-renderers-run-instructions/node_modules/json-transformer-funcs-two-dimensions/src/v8/addRowData.js
var ne = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), m = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, h = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => {
	m(e, t);
	let i = e;
	return t.map((e) => {
		let t = d(e, r);
		return t.children = p(ne(i, e), n), t;
	});
}, g = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = g(n, t);
		if (e) return e;
	}
	return null;
}, re = (e, t, n) => {
	let r = t.fileName, i = g(e[r], t.dataRole), a = t.dataRole ? i : e[t.fileName], o = [...t.filePath ?? []], s = o.pop();
	return {
		parent: o.reduce((e, t) => e[t], a),
		key: s
	};
}, _ = (e, r, i, a) => {
	a && console.log("v4 index :", e, r, i);
	let { parent: o, key: s } = re(e, r, a);
	(n[r.action] || t)(o, s, i);
}, v = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = v(n, t);
		if (e) return e;
	}
	return null;
}, ie = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? v(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, y = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	}
}, b = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, ae = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, x = {
	table: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "table-parent" },
				children: [{
					tagName: "table",
					attributes: { class: "table table-hover table-striped align-middle border mb-0" },
					children: [
						{
							tagName: "colgroup",
							attributes: { "data-role": "table-colgroup" },
							children: []
						},
						{
							tagName: "thead",
							attributes: {
								class: "table-dark",
								"data-role": "table-header"
							},
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-header-row" },
								children: []
							}]
						},
						{
							tagName: "tbody",
							attributes: { "data-role": "table-body" },
							children: []
						},
						{
							tagName: "tfoot",
							attributes: { "data-role": "table-footer" },
							children: [{
								tagName: "tr",
								attributes: { "data-role": "table-footer-row" },
								children: []
							}]
						}
					]
				}]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: {
					rowKey: "buildBodyTr",
					columnKey: "buildBodyCell"
				},
				func: "twoDimensional"
			}],
			rowOnColumn: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				templateKey: {
					rowKey: "buildBodyTr",
					columnKey: "buildBodyCell"
				}
			}],
			options: {
				serial: [
					{
						narration: "Prepend the serial column width to the table colgroup.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-colgroup",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "colGroupForSerial",
						func: null
					},
					{
						narration: "Prepend the serial header cell to the table header row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-header-row",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "headerSerialCell",
						func: null
					},
					{
						narration: "Prepend the serial number cell into each table body row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-body",
							filePath: ["children"],
							action: "unshiftSerialToRows"
						},
						sourcePath: null,
						templateKey: "buildBodyCell",
						func: null
					},
					{
						narration: "Prepend the serial footer cell to the table footer row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-footer-row",
							filePath: ["children"],
							action: "unshift"
						},
						sourcePath: null,
						templateKey: "headerSerialCell",
						func: null
					}
				],
				options: [
					{
						narration: "Append the options column width to the table colgroup.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-colgroup",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "colGroupForOption",
						func: null
					},
					{
						narration: "Append the options header cell to the table header row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-header-row",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "headerForOption",
						func: null
					},
					{
						narration: "Append the options button cell into each table body row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-body",
							filePath: ["children"],
							action: "pushToRows"
						},
						sourcePath: null,
						templateKey: "optionsButtonCell",
						func: null
					},
					{
						narration: "Append the options footer cell to the table footer row.",
						destinationPath: {
							fileName: "base",
							dataRole: "table-footer-row",
							filePath: ["children"],
							action: "push"
						},
						sourcePath: null,
						templateKey: "tdWithButtonSaveWarning",
						func: null
					}
				],
				search: [{
					narration: "Prepend the search row to top of the table.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-parent",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "tableSearch",
					func: null
				}]
			}
		},
		withFooter: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					},
					{
						tagName: "tfoot",
						attributes: { "data-role": "table-footer" },
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-footer-row" },
							children: []
						}]
					}
				]
			},
			single: [
				{
					narration: "Build column widths",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildColGroup",
					func: "fromCollection"
				},
				{
					narration: "Build table header",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildHeader",
					func: "fromCollection"
				},
				{
					narration: "Build footer input cells",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"]
					},
					sourcePath: {
						fileName: "data",
						filePath: ["columns"]
					},
					templateKey: "buildFooter",
					func: "fromCollection"
				}
			],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		bodyOnly: {
			base: {
				tagName: "tbody",
				attributes: { "data-role": "table-body" },
				children: []
			},
			single: [],
			double: [{
				narration: "Build table body",
				destinationPath: {
					fileName: "base",
					dataRole: "table-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				func: "twoDimensional"
			}]
		},
		footerOnly: {
			base: {
				tagName: "tfoot",
				attributes: { "data-role": "table-footer" },
				children: [{
					tagName: "tr",
					attributes: { "data-role": "table-footer-row" },
					children: []
				}]
			},
			single: [{
				narration: "Build footer input cells",
				destinationPath: {
					fileName: "base",
					dataRole: "table-footer-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFooter",
				func: "fromCollection"
			}],
			double: []
		},
		headerOnly: {
			base: {
				tagName: "table",
				attributes: { class: "table table-hover table-striped align-middle border mb-0" },
				children: [
					{
						tagName: "colgroup",
						attributes: { "data-role": "table-colgroup" },
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header"
						},
						children: [{
							tagName: "tr",
							attributes: { "data-role": "table-header-row" },
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: { "data-role": "table-body" },
						children: []
					}
				]
			},
			single: [{
				narration: "Build column widths",
				destinationPath: {
					fileName: "base",
					dataRole: "table-colgroup",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildColGroup",
				func: "fromCollection"
			}, {
				narration: "Build table header",
				destinationPath: {
					fileName: "base",
					dataRole: "table-header-row",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildHeader",
				func: "fromCollection"
			}],
			double: []
		},
		options: {
			serial: [
				{
					narration: "Prepend the serial column width to the table colgroup.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "colGroupForSerial",
					func: null
				},
				{
					narration: "Prepend the serial header cell to the table header row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "headerSerialCell",
					func: null
				},
				{
					narration: "Prepend the serial number cell into each table body row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-body",
						filePath: ["children"],
						action: "unshiftSerialToRows"
					},
					sourcePath: null,
					templateKey: "buildBodyCell",
					func: null
				},
				{
					narration: "Prepend the serial footer cell to the table footer row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"],
						action: "unshift"
					},
					sourcePath: null,
					templateKey: "headerSerialCell",
					func: null
				}
			],
			options: [
				{
					narration: "Append the options column width to the table colgroup.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-colgroup",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "colGroupForOption",
					func: null
				},
				{
					narration: "Append the options header cell to the table header row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-header-row",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "headerForOption",
					func: null
				},
				{
					narration: "Append the options button cell into each table body row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-body",
						filePath: ["children"],
						action: "pushToRows"
					},
					sourcePath: null,
					templateKey: "optionsButtonCell",
					func: null
				},
				{
					narration: "Append the options footer cell to the table footer row.",
					destinationPath: {
						fileName: "base",
						dataRole: "table-footer-row",
						filePath: ["children"],
						action: "push"
					},
					sourcePath: null,
					templateKey: "tdWithButtonSaveWarning",
					func: null
				}
			],
			search: [{
				narration: "Prepend the search row to top of the table.",
				destinationPath: {
					fileName: "base",
					dataRole: "table-parent",
					filePath: ["children"],
					action: "unshift"
				},
				sourcePath: null,
				templateKey: "tableSearch",
				func: null
			}]
		}
	},
	select: {
		base: {
			tagName: "div",
			attributes: { "data-role": "select-container" },
			children: []
		},
		single: [{
			narration: "Build select options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: [],
		columnOnRow: [{
			narration: "Build selects with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildSelect",
				rowKey: "buildOption"
			}
		}]
	},
	dataList: {
		simple: {
			base: {
				tagName: "div",
				attributes: { "data-role": "datalist-container" },
				children: []
			},
			single: [],
			double: [],
			columnOnRow: [{
				narration: "Build datalists with options",
				destinationPath: {
					fileName: "base",
					filePath: ["children"]
				},
				templateKey: {
					columnKey: "buildDataList",
					rowKey: "buildOption"
				}
			}]
		},
		base: {
			tagName: "div",
			attributes: { "data-role": "datalist-container" },
			children: []
		},
		single: [],
		double: [],
		columnOnRow: [{
			narration: "Build datalists with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildDataList",
				rowKey: "buildOption"
			}
		}]
	},
	selectOptionsOnly: {
		base: [],
		single: [{
			narration: "Build options array",
			destinationPath: {
				fileName: "base",
				filePath: []
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	searchInput: {
		base: {
			tagName: "div",
			attributes: { class: "d-flex align-items-center gap-2" },
			children: [{
				tagName: "label",
				textContent: "${label}",
				attributes: {
					class: "form-label mb-0 text-nowrap fw-semibold",
					for: "${id}"
				}
			}, {
				tagName: "input",
				attributes: {
					type: "search",
					placeholder: "${placeholder}",
					class: "form-control",
					id: "${id}"
				}
			}]
		},
		single: [],
		double: []
	},
	form: {
		simple: {
			base: {
				tagName: "div",
				attributes: { class: "card shadow-sm border-0" },
				children: [
					{
						tagName: "div",
						attributes: { class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center" },
						children: [{
							tagName: "h2",
							textContent: "Data Entry Form",
							attributes: { class: "h5 fw-bold mb-0 text-dark" }
						}]
					},
					{
						tagName: "div",
						attributes: { class: "card-body p-4" },
						children: [{
							tagName: "form",
							attributes: {
								id: "form-body-id",
								"data-role": "form-body"
							},
							children: []
						}]
					},
					{
						tagName: "div",
						attributes: { class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2" },
						children: [{
							tagName: "button",
							textContent: "Reset",
							attributes: {
								type: "reset",
								class: "btn btn-outline-secondary"
							}
						}, {
							tagName: "button",
							textContent: "Submit",
							attributes: {
								type: "submit",
								class: "btn btn-primary"
							}
						}]
					}
				]
			},
			single: [{
				narration: "Build form fields from columns",
				destinationPath: {
					fileName: "base",
					dataRole: "form-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFormField",
				func: "fromCollection"
			}],
			double: []
		},
		base: {
			tagName: "div",
			attributes: { class: "card shadow-sm border-0" },
			children: [
				{
					tagName: "div",
					attributes: { class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center" },
					children: [{
						tagName: "h2",
						textContent: "Data Entry Form",
						attributes: { class: "h5 fw-bold mb-0 text-dark" }
					}]
				},
				{
					tagName: "div",
					attributes: { class: "card-body p-4" },
					children: [{
						tagName: "form",
						attributes: {
							id: "form-body-id",
							"data-role": "form-body"
						},
						children: []
					}]
				},
				{
					tagName: "div",
					attributes: { class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2" },
					children: [{
						tagName: "button",
						textContent: "Reset",
						attributes: {
							type: "reset",
							class: "btn btn-outline-secondary"
						}
					}, {
						tagName: "button",
						textContent: "Submit",
						attributes: {
							type: "submit",
							class: "btn btn-primary"
						}
					}]
				}
			]
		},
		single: [{
			narration: "Build form fields from columns",
			destinationPath: {
				fileName: "base",
				dataRole: "form-body",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["columns"]
			},
			templateKey: "buildFormField",
			func: "fromCollection"
		}],
		double: []
	}
}, oe = {
	name: "spec-repo",
	version: "1.6.1"
}, S = ({ spec: e, tags: t, tagsSchema: n, definitions: r }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: oe,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r
	});
}, C = y;
S({
	spec: y,
	tags: b,
	tagsSchema: ae,
	definitions: x
});
// ../json-renderers-run-instructions/node_modules/json-instruction-single/src/v6/getResult.js
var se = {
	applyTemplate: d,
	fromCollection: p
}, ce = (e, t, n) => e?.sourcePath === null ? null : ie(t, e.sourcePath), le = (e, t, n) => {
	let r = t?.spec ?? C, i = e.templateKey, a = e?.func, o = r[i], s = ce(e, t, n), c = a === null ? o : se[e.func](s, o);
	return s === null ? o : c;
}, ue = (e, t, n) => {
	let r = n;
	r && console.log("runSingleInstruction 1 :", e, t);
	let i = le(e, t, n);
	r && console.log("runSingleInstruction 2 :", i), _(t, e.destinationPath, i);
}, de = (e, t, n, r) => {
	e.forEach((e) => {
		ue(e, t, n, r);
	});
}, fe = {
	applyTemplate: d,
	fromCollection: p,
	twoDimensional: h
}, pe = ({ instruction: e, registry: t, showLog: n, returnLog: r }) => {
	let i = C, a = fe[e.func]({
		columns: t?.data?.columns,
		data: t?.data?.data,
		columnSpec: i[e?.templateKey?.columnKey],
		rowSpec: i[e?.templateKey?.rowKey]
	});
	_(t, e.destinationPath, a);
}, me = ({ instructions: e, registry: t, showLog: n, returnLog: r }) => {
	e.forEach((e) => {
		pe({
			instruction: e,
			registry: t,
			showLog: n,
			returnLog: r
		});
	});
}, he = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), ge = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, _e = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (ge(e, t), t.map((t) => {
	let i = d(t, r);
	return i.children = p(he(e, t), n), i;
})), ve = (e, t) => t.map((t) => ({
	...e,
	rowData: t[e.columnName]
})), ye = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, be = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (ye(e, t), e.map((e) => {
	let i = d(e, n);
	return i.children = t.length > 0 ? p(ve(e, t), r) : [], i;
})), xe = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = C[e?.templateKey?.columnKey], a = C[e?.templateKey?.rowKey], o = _e({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:rowOnColumn]", e.narration, o), _({
			base: t,
			data: n
		}, e.destinationPath, o);
	});
}, Se = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = C[e?.templateKey?.columnKey], a = C[e?.templateKey?.rowKey], o = be({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:columnOnRow]", e.narration, o), _({
			base: t,
			data: n
		}, e.destinationPath, o);
	});
}, Ce = ({ single: e = [], double: t = [], rowOnColumn: n = [], columnOnRow: r = [], base: i, data: a, showLog: o = !1 } = {}) => {
	if (o && console.log("runInstructions input:", {
		single: e,
		double: t,
		rowOnColumn: n,
		columnOnRow: r,
		base: i,
		data: a
	}), !Array.isArray(e)) throw TypeError("single instructions must be an array");
	if (!Array.isArray(t)) throw TypeError("double instructions must be an array");
	if (!Array.isArray(n)) throw TypeError("rowOnColumn instructions must be an array");
	if (!Array.isArray(r)) throw TypeError("columnOnRow instructions must be an array");
	let s = {
		base: i,
		data: a
	};
	return e.length > 0 && de(e, s, o), t.length > 0 && me({
		instructions: t,
		registry: s,
		showLog: o
	}), n.length > 0 && xe({
		instructions: n,
		base: i,
		data: a,
		showLog: o
	}), r.length > 0 && Se({
		instructions: r,
		base: i,
		data: a,
		showLog: o
	}), i;
}, w = (e) => Array.isArray(e) ? e : [e], T = (e, t, n) => {
	e[t] = n;
}, E = {
	set: T,
	push: (e, t, n) => {
		e[t].push(...w(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...w(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(w(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(w(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, D = (e) => typeof e == "object" && !!e && !Array.isArray(e), O = (e, t) => {
	if (!D(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = j(t, i);
	return n;
}, k = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => j(t, e));
}, A = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, we = (e, t) => A(e, t), Te = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Ee = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, De = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Ee,
		applyTemplate: e
	});
}, j = (e, t, n) => {
	let r = e, i = t;
	Te(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? A(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = we(a?.textContent, r)), "attributes" in a && (a.attributes = O(a?.attributes, r)), "children" in a && (a.children = k(a?.children, r))), a);
};
De(j);
// ../json-renderers-run-options/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var M = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Oe = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, ke = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Oe,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, N = (e, t) => {
	let n = e, r = t;
	return M(n, r), n.map((e) => j(e, r));
};
ke((e, t) => {
	let n = e;
	return M(n, t), n.map((e) => j(e, e[t]));
}, N);
// ../json-renderers-run-options/node_modules/json-transformer-funcs/src/v24/findByRole.js
var P = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = P(n, t);
		if (e) return e;
	}
	return null;
}, Ae = (e, t, n) => {
	let r = t.fileName, i = P(e[r], t.dataRole), a = t.dataRole ? i : e[t.fileName], o = [...t.filePath ?? []], s = o.pop();
	return {
		parent: o.reduce((e, t) => e[t], a),
		key: s
	};
}, je = (e, t, n, r) => {
	r && console.log("v4 index :", e, t, n);
	let { parent: i, key: a } = Ae(e, t, r);
	(E[t.action] || T)(i, a, n);
}, F = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = F(n, t);
		if (e) return e;
	}
	return null;
}, Me = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? F(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, Ne = {
	applyTemplate: j,
	fromCollection: N
}, Pe = (e, t, n) => e?.sourcePath === null ? null : Me(t, e.sourcePath), Fe = (e, t, n) => {
	let r = t?.spec ?? C, i = e.templateKey, a = e?.func, o = r[i], s = Pe(e, t, n), c = a === null ? o : Ne[e.func](s, o);
	return s === null ? o : c;
}, Ie = (e, t, n) => {
	let r = n;
	r && console.log("runSingleInstruction 1 :", e, t);
	let i = Fe(e, t, n);
	r && console.log("runSingleInstruction 2 :", i), je(t, e.destinationPath, i);
}, I = (e, t, n, r) => {
	e.forEach((e) => {
		Ie(e, t, n, r);
	});
}, L = (e, t) => !e || typeof e != "object" ? !1 : e.attributes?.["data-role"] === t || Array.isArray(e.children) && e.children.some((e) => L(e, t)), R = (e = [], t) => e.filter(({ destinationPath: e }) => L(t, e?.dataRole)), Le = ({ base: e, options: t = {}, optionDefs: n = {}, showLog: r = !1 } = {}) => {
	if (!e) return e;
	let i = { base: e };
	if (t.showSearch && n.search) {
		let t = R(n.search, e);
		r && console.log("[runOptions:search]", t), I(t, i, r);
	}
	if ((t.showSerial || t.serial) && n.serial) {
		let t = R(n.serial, e);
		r && console.log("[runOptions:serial]", t), I(t, i, r);
	}
	if ((t.showOptions || t.options) && n.options) {
		let t = R(n.options, e);
		r && console.log("[runOptions:options]", t), I(t, i, r);
	}
	return e;
}, z = ({ definitions: e = x, spec: t = y, type: n = "table.simple", data: r = [], columns: i = [], options: a = {}, showLog: o = !1 } = {}) => {
	let s = n.split("."), c = s[0], l = s[1], u = e[c], d = l && u?.[l] ? u[l] : u;
	if (!d) throw Error(`Unknown component definition for type "${n}".`);
	let f = Ce({
		single: d.single || [],
		double: d.double || [],
		rowOnColumn: d.rowOnColumn || [],
		columnOnRow: d.columnOnRow || [],
		base: structuredClone(d.base),
		data: {
			columns: i,
			data: r
		},
		showLog: o
	});
	return Le({
		base: f,
		options: a,
		optionDefs: d.options || e[c]?.options || {},
		showLog: o
	}), f;
}, B = ({ definitions: e = x, spec: t = y, renderers: n = [], data: r = [], columns: i = [], layout: a = "vertical", showLog: o = !1 } = {}) => {
	if (!Array.isArray(n) || n.length === 0) throw Error("renderers must be a non-empty array of renderer configurations.");
	let s = n.map((n) => {
		let a = typeof n == "string" ? { type: n } : n;
		return z({
			definitions: e,
			spec: t,
			type: a.type,
			data: a.data || r,
			columns: a.columns || i,
			options: a.options || {},
			showLog: o
		});
	});
	return {
		tagName: "div",
		attributes: {
			class: a === "horizontal" ? "row g-4" : "d-flex flex-column gap-4",
			"data-role": "collection-container"
		},
		children: s
	};
}, Re = {
	version: "42.1.4",
	name: "json-to-dom"
}, ze = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.jsonToDom = {
		meta: Re,
		appendToDom: e
	});
}, Be = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, V = (e) => {
	if (typeof globalThis > "u" || !e) return;
	globalThis.ks ??= {};
	let t = typeof e == "function" ? e : e.buildSpecElement, n = e.buildSpecElementWithValidate, r = {
		meta: Be,
		buildSpecElement: t,
		...n ? { buildSpecElementWithValidate: n } : {}
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, H = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => U({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, Ve = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	if (!n || typeof n != "object" || Array.isArray(n)) return null;
	let i = typeof r == "function" ? r(n) : null;
	if (Array.isArray(n.children)) {
		let e = H({
			inItems: n.children,
			inFunc: r
		});
		if (i && typeof i.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && i.append(...t);
		}
	}
	return i;
}, U = ({ inSpec: e, inFunc: t }) => {
	let n = e, r = t;
	return n == null ? null : typeof Node < "u" && n instanceof Node ? n : Array.isArray(n) ? H({
		inItems: n,
		inFunc: r
	}) : typeof n == "object" ? Ve({
		inSpec: n,
		inFunc: r
	}) : typeof n == "string" || typeof n == "number" ? typeof document < "u" ? document.createTextNode(String(n)) : String(n) : null;
}, He = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t;
	return !n || typeof n != "object" || Array.isArray(n) ? (r.push({ reason: "Node must be a plain object" }), !1) : !0;
}, Ue = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName;
	return !o || typeof o != "string" || o.trim() === "" ? (a.push({ reason: "Missing or empty 'tagName'" }), !1) : i && typeof i == "object" && !(i[o] || Object.keys(i).includes(o)) ? (a.push({
		tagName: o,
		reason: `Unrecognized tagName '${o}' not found in spec catalog`
	}), !1) : !0;
}, We = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsTextContent === !1 && r.textContent ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow direct textContent`
	}), !1) : !0;
}, Ge = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && s.allowsChildren === !1 && Array.isArray(r.children) && r.children.length > 0 ? (a.push({
		tagName: o,
		reason: `Tag '${o}' does not allow children (void element)`
	}), !1) : "children" in r && !Array.isArray(r.children) ? (a.push({
		tagName: o,
		reason: "'children' must be an array"
	}), !1) : !0;
}, Ke = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n, o = r.tagName, s = i ? i[o] : null;
	return s && Array.isArray(s.childTags) && s.childTags.length > 0 && Array.isArray(r.children) && r.children.forEach((e) => {
		e && e.tagName && !s.childTags.includes(e.tagName) && a.push({
			tagName: e.tagName,
			reason: `Tag '${e.tagName}' is not an allowed child of '${o}' (allowed: ${s.childTags.join(", ")})`
		});
	}), !0;
}, qe = ({ inNode: e, inErrors: t }) => {
	let n = e, r = t, i = n.tagName;
	return "attributes" in n && (!n.attributes || typeof n.attributes != "object" || Array.isArray(n.attributes)) ? (r.push({
		tagName: i,
		reason: "'attributes' must be a key-value object"
	}), !1) : !0;
}, Je = ({ inNode: e, inCatalog: t, inErrors: n }) => {
	let r = e, i = t, a = n;
	He({
		inNode: r,
		inErrors: a
	}) && (Ue({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), We({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), Ge({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), Ke({
		inNode: r,
		inCatalog: i,
		inErrors: a
	}), qe({
		inNode: r,
		inErrors: a
	}));
};
// node_modules/json-to-tag-validate/src/v4/index.js
function Ye({ inJson: e, inCatalog: t, inSpec: n }) {
	let r = e, i = t ?? n ?? b, a = [];
	return U({
		inSpec: r,
		inFunc: (e) => {
			Je({
				inNode: e,
				inCatalog: i,
				inErrors: a
			});
		}
	}), {
		isValid: a.length === 0,
		errors: a
	};
}
// node_modules/@keshavsoft/json-to-tag/src/v12/element/createElement.js
var Xe = "http://www.w3.org/2000/svg", Ze = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), Qe = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return Ze.has(t) ? document.createElementNS(Xe, t) : document.createElement(t);
}, $e = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), et = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), tt = "http://www.w3.org/1999/xlink", nt = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") i ? n.setAttribute("class", String(t)) : n.className = t;
		else if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(tt, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
		} else typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, rt = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, W = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = Qe({ inTagName: e.tagName });
	return t ? ($e({
		inElement: t,
		inTextContent: e.textContent,
		inTagName: e.tagName
	}), et({
		inElement: t,
		inProperties: e.properties
	}), nt({
		inElement: t,
		inAttributes: e.attributes
	}), rt({
		inElement: t,
		inClassList: e.classList
	}), t) : null;
}, G = (e = {}) => U({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: W
});
V({
	buildSpecElement: G,
	buildSpecElementWithValidate: (e = {}) => {
		let t = e?.spec ?? e?.inSpec ?? e, n = Ye({ inJson: t });
		return n.isValid || console.warn("[json-to-tag] Specification validation issues:", n.errors), U({
			inSpec: t,
			inFunc: W
		});
	}
});
// node_modules/spec-to-dom/src/v2/register/meta.js
var it = {
	version: "2.1.1",
	name: "spec-to-dom"
}, at = (e) => {
	e && (globalThis.ks ??= {}, globalThis.ks.specToDom = {
		meta: it,
		appendToDom: e
	});
}, K = ({ buildSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => {
	let i = e, a = t, o = n, s = r;
	s && console.log("renderToDom 1 (content):", i);
	let c = document.getElementById(a);
	return c ? (Array.isArray(i) || i instanceof NodeList || i instanceof HTMLCollection ? o === "prepend" ? c.prepend(...i) : c.append(...i) : o === "prepend" ? c.prepend(i) : (c.innerHTML = "", c.append(i)), s && console.log("renderToDom 2 (mounted):", c), c) : null;
};
at(K);
// node_modules/@keshavsoft/json-to-dom/src/v42/index.js
var q = ({ jsonSpec: e, targetHtmlId: t, appendPosition: n, showLog: r }) => K({
	buildSpec: G(e),
	targetHtmlId: t,
	appendPosition: n,
	showLog: r
});
ze(q);
// node_modules/json-renderers-guard/src/v5/spec/type/index.js
var ot = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.type;
	if (n === void 0) throw Error("Missing compulsory key: \"type\"");
	if (typeof n != "string") throw TypeError("type must be a string");
	return !0;
}, st = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.data;
	if (n === void 0) throw Error("Missing compulsory key: \"data\"");
	if (!Array.isArray(n)) throw TypeError("data must be an Array");
	return !0;
}, ct = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.columns;
	if (n === void 0) throw Error("Missing compulsory key: \"columns\"");
	if (!Array.isArray(n)) throw TypeError("columns must be an Array");
	return !0;
}, lt = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.showLog;
	if (n !== void 0 && typeof n != "boolean") throw TypeError("showLog must be a boolean");
	return !0;
}, J = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return ot(t), st(t), ct(t), lt(t), !0;
}, ut = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.targetHtmlId;
	if (n === void 0) throw Error("Missing compulsory key: \"targetHtmlId\"");
	if (typeof n != "string") throw TypeError("targetHtmlId must be a string");
	if (n.trim().length === 0) throw Error("targetHtmlId must be a non-empty string");
	return !0;
}, dt = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.appendPosition;
	if (n === void 0) throw Error("Missing compulsory key: \"appendPosition\"");
	if (typeof n != "string") throw TypeError("appendPosition must be a string");
	return !0;
}, ft = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object") throw TypeError("Config must be an object");
	let n = t.classToApply;
	if (n === void 0) throw Error("Missing compulsory key: \"classToApply\"");
	if (typeof n != "string") throw TypeError("classToApply must be a string");
	return !0;
}, Y = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return ut(t), dt(t), ft(t), !0;
}, X = {
	type: "table",
	targetHtmlId: "",
	data: [],
	columns: [],
	classToApply: "",
	appendPosition: "replace",
	showLog: !1
}, Z = (e) => {
	let t = typeof e == "object" && e ? e.inKey ?? e.key : e;
	return t && t in X ? X[t] : { ...X };
};
Object.assign(Z, X);
// node_modules/json-renderers-guard/src/v5/index.js
var Q = (e) => {
	let t = e?.inConfig ?? e;
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Config must be an object");
	return J(t), Y(t), !0;
};
Q.getSpec = Z, Q.configSpec = X, Q.guardSpec = J, Q.guardMount = Y;
// src/v1/registerGlobal/meta.js
var pt = {
	name: "json-renderers-from-instructions-collection",
	version: "1.0.0",
	description: "Composite multi-renderer orchestrator driven by declarative instructions and collections"
}, mt = (e) => {
	let t = e;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.fromInstructionsCollection = {
		meta: pt,
		render: t
	});
}, $ = (e = {}) => {
	let t = e?.showLog;
	Q({
		...e,
		type: e.type || "collection"
	}), t && console.log("[from-instructions-collection] input config:", {
		renderers: e.renderers,
		columns: e.columns,
		data: e.data,
		targetHtmlId: e.targetHtmlId
	});
	let n = B({
		renderers: e.renderers || [],
		data: e.data || [],
		columns: e.columns || [],
		layout: e.layout || "vertical",
		showLog: t
	});
	t && console.log("[from-instructions-collection] generated composite spec:", n);
	let r = q({
		jsonSpec: n,
		targetHtmlId: e.targetHtmlId,
		appendPosition: e.appendPosition || "replace",
		classToApply: e.classToApply || "",
		showLog: t
	});
	return t && console.log("[from-instructions-collection] mounted DOM element:", r), r;
};
mt($);
export { z as buildSingleSpec, B as buildSpec, $ as default, $ as render };
