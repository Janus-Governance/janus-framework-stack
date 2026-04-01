"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowPanel = void 0;
const vscode = __importStar(require("vscode"));
const janusParser_1 = require("./janusParser");
class FlowPanel {
    constructor(context) {
        this.context = context;
        this.panel = null;
        this.events = [];
        this.status = null;
        this.emptyMessage = null;
        this.action = null;
    }
    show() {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.Beside);
            return;
        }
        this.panel = vscode.window.createWebviewPanel("janusFlowViewer", "Janus Flow (Experimental)", vscode.ViewColumn.Beside, {
            enableScripts: false,
            enableCommandUris: true,
        });
        this.panel.onDidDispose(() => {
            this.panel = null;
        }, null, this.context.subscriptions);
        this.render();
    }
    setStatus(message) {
        this.status = message;
        this.render();
    }
    setEmptyMessage(message) {
        this.emptyMessage = message;
        this.render();
    }
    setAction(action) {
        this.action = action;
        this.render();
    }
    appendEvent(event) {
        this.events.push(event);
        if (this.events.length > 200)
            this.events.shift();
        this.render();
    }
    render() {
        // ...existing code...
    }
}
