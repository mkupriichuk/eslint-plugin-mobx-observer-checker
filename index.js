module.exports = {
	rules: {
		'observer-wrapper': {
			create: function (context) {
				let storeUsage = false;
				return {
					CallExpression(node) {
						if (/use.*?Store/.test(node.callee.name)) {
							storeUsage = true;
						}
					},
					ExportDefaultDeclaration(node) {
						if (storeUsage) {
							if (
								node.declaration.type !== 'CallExpression' ||
								node.declaration.callee.name !== 'observer'
							) {
								context.report(node, 'It looks like you are using a mobx store but did not wrap your component in an observer');
							}
						}
					},
				};
			},
		},
	},
};
