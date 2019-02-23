/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/awesome-typescript-loader/dist/entry.js!./src/ui/worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/awesome-typescript-loader/dist/entry.js!./src/ui/worker.ts":
/*!*********************************************************************************!*\
  !*** ./node_modules/awesome-typescript-loader/dist/entry.js!./src/ui/worker.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst simulation_1 = __webpack_require__(/*! ../simulation */ \"./src/simulation.ts\");\r\nconst ctx = self;\r\nctx.onmessage = (ev) => {\r\n    let values = [];\r\n    let sim = ev.data;\r\n    let baseOA = sim.attacker.offensiveAbility - 1510;\r\n    for (let i = 0; i < 300; i++) {\r\n        let oa = baseOA + 10 * i;\r\n        sim.attacker.offensiveAbility = oa;\r\n        values.push({\r\n            \"OA\": oa,\r\n            \"dps\": simulation_1.simulate(sim)\r\n        });\r\n    }\r\n    ctx.postMessage(values);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/ui/worker.ts?./node_modules/awesome-typescript-loader/dist/entry.js");

/***/ }),

/***/ "./src/formulas.ts":
/*!*************************!*\
  !*** ./src/formulas.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst model_1 = __webpack_require__(/*! ./model */ \"./src/model.ts\");\r\nlet probabilityToHit = (oa, da) => {\r\n    return Math.max(66, ((((oa / ((da / 3.5) + oa)) * 300) * 0.3) + (((((oa * 3.25) + 10000) - (da * 3.25)) / 100) * 0.7)) - 50);\r\n};\r\nexports.probabilityToHit = probabilityToHit;\r\nlet calculateHitRoll = (roll, probabilityToHit, critDamage) => {\r\n    let hitRoll;\r\n    if (probabilityToHit < 100) {\r\n        hitRoll = roll * 100;\r\n    }\r\n    else {\r\n        hitRoll = roll * probabilityToHit;\r\n    }\r\n    if (hitRoll > probabilityToHit) {\r\n        return 0;\r\n    }\r\n    if (probabilityToHit < 70) {\r\n        return probabilityToHit / 70;\r\n    }\r\n    if (hitRoll < 90) {\r\n        return 1;\r\n    }\r\n    if (hitRoll < 105) {\r\n        return 1.1 + critDamage;\r\n    }\r\n    if (hitRoll < 120) {\r\n        return 1.2 + critDamage;\r\n    }\r\n    if (hitRoll < 130) {\r\n        return 1.3 + critDamage;\r\n    }\r\n    if (hitRoll < 135) {\r\n        return 1.4 + critDamage;\r\n    }\r\n    return 1.5 + critDamage;\r\n};\r\nexports.calculateHitRoll = calculateHitRoll;\r\nlet calculateDamageTaken = (damage, defender) => {\r\n    let damageValue = damage.value;\r\n    if (damage.type == model_1.DamageType.PHYISCAL) {\r\n        if (defender.armor > damageValue) {\r\n            damageValue = damageValue * defender.armorAbsorbtion;\r\n        }\r\n        else {\r\n            damageValue = damageValue - defender.armor + defender.armor * (1 - defender.armorAbsorbtion);\r\n        }\r\n    }\r\n    let value = damageValue\r\n        * (1 - defender.resistance[damage.type])\r\n        * (1 - defender.percentAbsorbtion)\r\n        - defender.flatAbsorbtion;\r\n    return Math.max(0, value);\r\n};\r\nexports.calculateDamageTaken = calculateDamageTaken;\r\nlet calculateDamage = (attacker, defender, attack, hitRoll) => {\r\n    let totalDamage = 0;\r\n    for (let damage of attack.damage) {\r\n        totalDamage +=\r\n            calculateDamageTaken({\r\n                value: (1 + attacker.percentageDamageBonus[damage.type]) * damage.value * hitRoll,\r\n                type: damage.type\r\n            }, defender);\r\n    }\r\n    if (attack.weaponDamage > 0) {\r\n        for (let damageType in attacker.flatDamage) {\r\n            totalDamage +=\r\n                calculateDamageTaken({\r\n                    value: attacker.percentageDamageBonus[damageType] *\r\n                        attacker.flatDamage[damageType] *\r\n                        attack.weaponDamage * hitRoll,\r\n                    type: damageType\r\n                }, defender);\r\n        }\r\n    }\r\n    return totalDamage;\r\n};\r\nexports.calculateDamage = calculateDamage;\r\nlet attackPerSecond = (weaponModifier, attackSpeedBonus) => {\r\n    return (1 + weaponModifier) + (1 - weaponModifier) * (attackSpeedBonus / 100);\r\n};\r\nexports.attackPerSecond = attackPerSecond;\r\n\n\n//# sourceURL=webpack:///./src/formulas.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DamageType;\r\n(function (DamageType) {\r\n    DamageType[\"PHYISCAL\"] = \"Physical\";\r\n    DamageType[\"INTERNAL_TRAUMA\"] = \"Internal trauma\";\r\n    DamageType[\"FIRE\"] = \"Fire\";\r\n    DamageType[\"BURN\"] = \"Burn\";\r\n    DamageType[\"COLD\"] = \"Cold\";\r\n    DamageType[\"FROSTBURN\"] = \"Frostburn\";\r\n    DamageType[\"LIGHTNING\"] = \"Lightning\";\r\n    DamageType[\"ELECTROCUTE\"] = \"Electrocute\";\r\n    DamageType[\"ACID\"] = \"Acid\";\r\n    DamageType[\"POISON\"] = \"Poison\";\r\n    DamageType[\"BLEED\"] = \"Bleed\";\r\n    DamageType[\"VITALITY\"] = \"Vitality\";\r\n    DamageType[\"VITALITY_DECAY\"] = \"Vitality decay\";\r\n    DamageType[\"AETHER\"] = \"Aether\";\r\n    DamageType[\"CHAOS\"] = \"Chaos\";\r\n})(DamageType || (DamageType = {}));\r\nexports.DamageType = DamageType;\r\n\n\n//# sourceURL=webpack:///./src/model.ts?");

/***/ }),

/***/ "./src/simulation.ts":
/*!***************************!*\
  !*** ./src/simulation.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst formulas_1 = __webpack_require__(/*! ./formulas */ \"./src/formulas.ts\");\r\nlet attackDamage = (attack, s) => {\r\n    let totalDamage = 0;\r\n    for (let i = 0; i < attack.totalAttacks; i++) {\r\n        let hitRoll = formulas_1.calculateHitRoll(Math.random(), formulas_1.probabilityToHit(s.attacker.offensiveAbility, s.defender.defensiveAbility), s.attacker.critDamage);\r\n        totalDamage += formulas_1.calculateDamage(s.attacker, s.defender, attack, hitRoll);\r\n    }\r\n    return totalDamage;\r\n};\r\nlet simulate = (s) => {\r\n    let attacks = s.attacks.map(attack => {\r\n        let attacksPerSecond = attack.isSpell ? 0 : formulas_1.attackPerSecond(s.attacker.weaponSpeed, s.attacker.attackSpeed);\r\n        return {\r\n            weaponDamage: attack.weaponDamage,\r\n            damage: attack.damage,\r\n            isSpell: attack.isSpell,\r\n            totalAttacks: attacksPerSecond * s.time\r\n        };\r\n    });\r\n    return attacks.map(attack => attackDamage(attack, s)).reduce((a, b) => a + b);\r\n};\r\nexports.simulate = simulate;\r\n\n\n//# sourceURL=webpack:///./src/simulation.ts?");

/***/ })

/******/ });