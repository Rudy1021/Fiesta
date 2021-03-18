module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-prettier"],
	plugins: ["stylelint-scss", "stylelint-order"],
	rules: {
		"order/properties-alphabetical-order": null,
		"order/properties-order": [
			// CSS属性顺序
		],
		"color-hex-case": "lower",
		"color-hex-length": "short",
		"color-named": "never",
		"font-family-name-quotes": "always-where-recommended",
		"font-weight-notation": "numeric",
		"number-leading-zero": "always",
		"string-quotes": "double",
		"value-no-vendor-prefix": [
			true,
			{
				ignoreValues: [
					"placeholder",
					"input-placeholder",
					"text-fill-color",
					"line-clamp",
					"box-orient",
					"box"
				]
			}
		],
		"value-list-comma-newline-before": "never-multi-line",
		"value-list-comma-newline-after": "always-multi-line",
		"value-list-comma-space-before": "never",
		"value-list-comma-space-after": "always",
		"declaration-colon-newline-after": null,
		"declaration-bang-space-before": "always",
		"declaration-bang-space-after": "never",
		"declaration-colon-space-before": "never",
		"declaration-colon-space-after": "always",
		"declaration-empty-line-before": null,
		"declaration-block-semicolon-newline-before": "never-multi-line",
		"at-rule-no-unknown": null,
		"block-closing-brace-empty-line-before": [
			"never",
			{
				except: ["after-closing-brace"]
			}
		],
		"block-closing-brace-newline-after": "always",
		"block-closing-brace-newline-before": "always",
		"block-opening-brace-newline-after": "always",
		"block-opening-brace-space-before": "always",
		"no-descending-specificity": [
			true,
			{ ignore: ["selectors-within-list"] }
		],
		"rule-empty-line-before": [
			"always",
			{
				ignore: ["after-comment", "first-nested"]
			}
		],
		"block-no-empty": null
	}
};