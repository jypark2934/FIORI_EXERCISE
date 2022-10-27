/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc07c07/sample/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
