// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/classes/Grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Grid =
/** @class */
function () {
  function Grid(size) {
    this.gridsize = size;
    this.grid = []; // Making a grid from size
    // Grid structure : 0 - x 1 - y 2 - state
    // State : 0 - none 1 - headsnake 2 - snakepart 3 - apple 4 - bonusApple

    for (var x = 0; x < this.gridsize; x++) {
      this.grid[x] = [];

      for (var y = 0; y < this.gridsize; y++) {
        this.grid[x][y] = {
          x: 0,
          y: 0,
          state: 0
        };
        this.grid[x][y].x = x;
        this.grid[x][y].y = y;
        this.grid[x][y].state = 0;
      }
    }
  }

  return Grid;
}();

exports.Grid = Grid;
},{}],"scripts/classes/Drawing.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Drawing =
/** @class */
function () {
  function Drawing(squareSize, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.squareSize = squareSize;
  }

  Drawing.prototype.Draw = function (obj) {
    // clearing the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // quantity of squares according to px size and canvas width

    var brickCount = this.canvas.width / this.squareSize;
    var currentX = 0;
    var currentY = 0;

    for (var ix = 0; ix < obj.gridsize; ix++) {
      for (var iy = 0; iy < obj.gridsize; iy++) {
        // 0 - field 1 - headsnake 2 - snakepart 3 - apple 4 - bonusApple
        switch (obj.grid[ix][iy].state) {
          case 0:
            //drawing Field
            this.ctx.beginPath();
            this.ctx.rect(currentX, currentY, this.squareSize, this.squareSize); // this.ctx.fillStyle = "#0095DD";
            // this.ctx.fill();

            this.ctx.stroke(); // this.ctx.closePath();

            break;

          case 1:
            this.ctx.beginPath();
            this.ctx.rect(currentX, currentY, this.squareSize, this.squareSize);
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
            break;

          case 5:
            alert('Перебор');
            break;

          default:
            alert("Нет таких значений");
        }

        currentX += this.squareSize;
      }

      currentY += this.squareSize;
      currentX = 0;
    }
  };

  return Drawing;
}();

exports.Drawing = Drawing;
},{}],"scripts/classes/snakeHead.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SnakeHead =
/** @class */
function () {
  function SnakeHead(startX, startY, speed, forward, grid) {
    this.startX = startX;
    this.startY = startY;
    this.speed = speed;
    this.forward = forward;
    this.grid = grid;
    this.grid.grid[this.startX][this.startY].state = 1;
  }

  SnakeHead.prototype.move = function () {
    switch (this.forward) {
      case "left":
        this.speedX = 0;
        this.speedY = -1;
        break;

      case "up":
        this.speedX = -1;
        this.speedY = 0;
        break;

      case "right":
        this.speedX = 0;
        this.speedY = 1;
        break;

      case "down":
        this.speedX = 1;
        this.speedY = 0;
    }

    this.grid.grid[this.startX][this.startY].state = 0;
    this.grid.grid[this.startX + this.speedX][this.startY + this.speedY].state = 1;
    this.startX += this.speedX;
    this.startY += this.speedY;
  };

  return SnakeHead;
}();

exports.SnakeHead = SnakeHead;
},{}],"scripts/classes/InformtationToShow.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InformationToShow =
/** @class */
function () {
  function InformationToShow(sh) {
    this.sh = sh;
  }

  InformationToShow.prototype.showDirection = function (id) {
    // shows current direction on the screen 
    var outsidelabel = document.getElementById(id);
    outsidelabel.innerHTML = this.sh.forward;
  };

  return InformationToShow;
}();

exports.InformationToShow = InformationToShow;
},{}],"scripts/mainCycle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Grid_1 = require("./classes/Grid");

var Drawing_1 = require("./classes/Drawing");

var snakeHead_1 = require("./classes/snakeHead");

var InformtationToShow_1 = require("./classes/InformtationToShow"); //initializing things


var button = document.getElementById("my_button");
button.addEventListener("click", function (e) {
  return start();
});

function start() {
  var cs = document.getElementById("gamewindow");
  var csx = cs.getContext("2d");
  var grid = new Grid_1.Grid(10);
  var drawing = new Drawing_1.Drawing(40, cs, csx);
  var snakeH = new snakeHead_1.SnakeHead(5, 5, 1, "right", grid);
  var infoShow = new InformtationToShow_1.InformationToShow(snakeH);
  document.addEventListener("keydown", keyDownHandler, false); //document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      snakeH.forward = "right";
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      snakeH.forward = "left";
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      snakeH.forward = "down";
    } else if (e.key == "Up" || e.key == "ArrowUp") {
      snakeH.forward = "up";
    }
  }
  /*function keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }
      else if (e.key == "Down" || e.key == "ArrowDown"){
          downPressed = false;
      }
  }
  */


  drawing.Draw(grid);
  setInterval(function () {
    drawing.Draw(grid), infoShow.showDirection("dirShow");
    snakeH.move();
  }, 400);
}

function go() {
  alert("hello");
}
},{"./classes/Grid":"scripts/classes/Grid.ts","./classes/Drawing":"scripts/classes/Drawing.ts","./classes/snakeHead":"scripts/classes/snakeHead.ts","./classes/InformtationToShow":"scripts/classes/InformtationToShow.ts"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33771" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/mainCycle.ts"], null)
//# sourceMappingURL=/mainCycle.c0e67c2b.js.map