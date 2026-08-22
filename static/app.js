      const CONFIG = {
        DPI: 96,
        MM_TO_PX: 3.7795,
        PT_TO_PX: 1.3333,
        SIZES: {
          A3: {
            w: 297,
            h: 420,
          },
          A4: {
            w: 210,
            h: 297,
          },
          A5: {
            w: 148,
            h: 210,
          },
          B4: {
            w: 250,
            h: 353,
          },
          B5: {
            w: 176,
            h: 250,
          },
          Letter: {
            w: 215.9,
            h: 279.4,
          },
          Legal: {
            w: 215.9,
            h: 355.6,
          },
          "16开": {
            w: 210,
            h: 285,
          },
          "32开": {
            w: 185,
            h: 260,
          },
          方纸: {
            w: 230,
            h: 230,
          },
        },
      };
      const CUSTOM_PROPS = [
        "id",
        "selectable",
        "evented",
        "lockMovementX",
        "lockMovementY",
        "isGrid",
        "excludeFromExport",
        "isSmartRect",
        "cornerConfig",
        "isTable",
        "tableData",
        "isVertical",
        "dataBinding",
        "printBackground",
        "isBarcode",
        "barcodeConfig",
        "isDynamicDate",
        "dateConfig",
        "isDynamicPageNum",
        "pageConfig",
        "isSerialNumber",
        "serialConfig",
        "prefix",
        "suffix",
        "rawContent",
        "sharedId",
        "refId",
        "prefixRaw",
        "suffixRaw",
        "syncMode",
        "imgDirId",
        "imgDirName",
      ];
      const DATE_FMT_OPTS = [
        {
          l: "2024-01-30",
          v: "YYYY-MM-DD",
        },
        {
          l: "2024/01/30",
          v: "YYYY/MM/DD",
        },
        {
          l: "2024.01.30",
          v: "YYYY.MM.DD",
        },
        {
          l: "20240130",
          v: "YYYYMMDD",
        },
        {
          l: "01-30",
          v: "MM-DD",
        },
        {
          l: "01/30",
          v: "MM/DD",
        },

        {
          l: "2024年01月30日",
          v: "YYYY年MM月DD日",
        },
        {
          l: "2024年01月",
          v: "YYYY年MM月",
        },
        {
          l: "01月30日",
          v: "MM月DD日",
        },
        {
          l: "2024年",
          v: "YYYY年",
        },

        {
          l: "30/01/2024 (日月年)",
          v: "DD/MM/YYYY",
        },
        {
          l: "01/30/2024 (月日年)",
          v: "MM/DD/YYYY",
        },
        {
          l: "30-01-2024",
          v: "DD-MM-YYYY",
        },

        {
          l: "2024 (仅年)",
          v: "YYYY",
        },
        {
          l: "2024年",
          v: "YYYY年",
        },
        {
          l: "01 (仅月)",
          v: "MM",
        },
        {
          l: "01月",
          v: "MM月",
        },
        {
          l: "30 (仅日)",
          v: "DD",
        },
        {
          l: "30日",
          v: "DD日",
        },
      ];
      const TIME_FMT_OPTS = [
        {
          l: "14:30:59",
          v: "HH:mm:ss",
        },
        {
          l: "14:30",
          v: "HH:mm",
        },
        {
          l: "14-30-59",
          v: "HH-mm-ss",
        },
        {
          l: "14.30.59",
          v: "HH.mm.ss",
        },
        {
          l: "143059",
          v: "HHmmss",
        },

        {
          l: "02:30:59 PM",
          v: "h:mm:ss A",
        },
        {
          l: "02:30 PM",
          v: "h:mm A",
        },
        {
          l: "PM 02:30",
          v: "A h:mm",
        },
        {
          l: "2:30 (无AM/PM)",
          v: "h:mm",
        },

        {
          l: "14时30分59秒",
          v: "HH时mm分ss秒",
        },
        {
          l: "14时30分",
          v: "HH时mm分",
        },
        {
          l: "30分59秒",
          v: "mm分ss秒",
        },
        {
          l: "14点30分",
          v: "HH点mm分",
        },

        {
          l: "14 (仅时-24)",
          v: "HH",
        },
        {
          l: "14时",
          v: "HH时",
        },
        {
          l: "2 (仅时-12)",
          v: "h",
        },
        {
          l: "30 (仅分)",
          v: "mm",
        },
        {
          l: "30分",
          v: "mm分",
        },
        {
          l: "59 (仅秒)",
          v: "ss",
        },
        {
          l: "59秒",
          v: "ss秒",
        },
      ];
      const Utils = {
        mm2px: (mm) => mm * CONFIG.MM_TO_PX,
        px2mm: (px) => px / CONFIG.MM_TO_PX,
        pt2px: (pt) => Math.round(pt * CONFIG.PT_TO_PX),
        px2pt: (px) => Math.round(px / CONFIG.PT_TO_PX),

        generateUniqueId: () => `handle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

        toast: (text, type = "info") => {
          const bg = type === "error" ? "linear-gradient(to right, #ff5f6d, #ffc371)" : type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "#333";
          Toastify({
            text,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
              background: bg,
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            },
          }).showToast();
        },

        throttle: (func, limit) => {
          let inThrottle;
          return function () {
            const args = arguments,
              context = this;
            if (!inThrottle) {
              func.apply(context, args);
              inThrottle = true;
              setTimeout(() => (inThrottle = false), limit);
            }
          };
        },

        formatDate: function (date, unusedFormat, config) {
          if (!config) return date.toLocaleString();
          let targetDate = new Date(date);
          if (config.offsetDays) {
            targetDate.setDate(targetDate.getDate() + (parseInt(config.offsetDays) || 0));
          }
          if (config.offsetMinutes) {
            targetDate.setMinutes(targetDate.getMinutes() + (parseInt(config.offsetMinutes) || 0));
          }

          let formatString = "";
          if (config.showDate) formatString += config.dateFormat || "YYYY-MM-DD";
          if (config.showDate && config.showTime) formatString += " ";
          if (config.showTime) formatString += config.timeFormat || "HH:mm:ss";
          if (!formatString) return "";
          const parts = {
            YYYY: targetDate.getFullYear(),
            MM: String(targetDate.getMonth() + 1).padStart(2, "0"),
            DD: String(targetDate.getDate()).padStart(2, "0"),
            HH: String(targetDate.getHours()).padStart(2, "0"),
            mm: String(targetDate.getMinutes()).padStart(2, "0"),
            ss: String(targetDate.getSeconds()).padStart(2, "0"),
            h: String(targetDate.getHours() % 12 || 12),
            A: targetDate.getHours() >= 12 ? "PM" : "AM",
          };
          let result = formatString;
          Object.keys(parts).forEach((key) => {
            result = result.replace(new RegExp(key, "g"), parts[key]);
          });
          return result;
        },

        generateSmartRectPath: (w, h, r, style) => {
          const maxR = Math.min(w, h) / 2;
          const tl = Math.min(r.tl, maxR),
            tr = Math.min(r.tr, maxR),
            br = Math.min(r.br, maxR),
            bl = Math.min(r.bl, maxR);
          let path = `M ${tl} 0 L ${w - tr} 0 `;
          if (style === "round") {
            path += tr > 0 ? `A ${tr} ${tr} 0 0 1 ${w} ${tr} ` : `L ${w} 0 `;
            path += `L ${w} ${h - br} `;
            path += br > 0 ? `A ${br} ${br} 0 0 1 ${w - br} ${h} ` : `L ${w} ${h} `;
            path += `L ${bl} ${h} `;
            path += bl > 0 ? `A ${bl} ${bl} 0 0 1 0 ${h - bl} ` : `L 0 ${h} `;
            path += `L 0 ${tl} `;
            path += tl > 0 ? `A ${tl} ${tl} 0 0 1 ${tl} 0 ` : `L 0 0 `;
          } else {
            path += `L ${w} ${tr} L ${w} ${h - br} L ${w - br} ${h} L ${bl} ${h} L 0 ${h - bl} L 0 ${tl} L ${tl} 0 `;
          }
          return path + "Z";
        },

        clipLine: (x1, y1, x2, y2, left, top, right, bottom) => {
          let t0 = 0.0,
            t1 = 1.0;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const p = [-dx, dx, -dy, dy];
          const q = [x1 - left, right - x1, y1 - top, bottom - y1];
          for (let i = 0; i < 4; i++) {
            if (p[i] === 0) {
              if (q[i] < 0) return null;
            } else {
              const t = q[i] / p[i];
              if (p[i] < 0) {
                if (t > t1) return null;
                if (t > t0) t0 = t;
              } else {
                if (t < t0) return null;
                if (t < t1) t1 = t;
              }
            }
          }

          if (t0 > t1) return null;
          return {
            x1: x1 + t0 * dx,
            y1: y1 + t0 * dy,
            x2: x1 + t1 * dx,
            y2: y1 + t1 * dy,
          };
        },
      };
      const App = {
        canvas: null,
        state: {
          currentPaper: {
            ...CONFIG.SIZES["A4"],
          },
          baseWidth: 0,
          baseHeight: 0,
          zoom: 1,
          isPanning: false,
          clipboard: null,
          pasteCount: 0,
          selectionQueue: [],
          localFontsLoaded: false,
          hasUnsavedChanges: false,
          editingBackground: false,
          printCurrentOnly: false,
          isReplacingObject: false,
          dataSource: {
            fileHandle: null,
            fileHandleId: null,
            fileName: "",
            workbook: null,
            sheetNames: [],
            currentSheet: "",
            data: [],
            headers: [],
            isActive: false,
            currentDataIndex: 0,
            imgDirHandle: null,
            imgDirId: null,
            isRequestingPerm: false,
            imgDirCache: {},
          },
          label: {
            mode: "design",
            designContent: null,
          },
        },

        init: function () {
          Coloris({
            el: "#floatBgInput",
            theme: "polaroid",
            themeMode: "light",
            alpha: true,
            format: "hex",
            wrap: false,
            swatches: ["#ffffff", "#666666", "#e11d48", "#2563eb", "#16a34a", "transparent"],
          });
          this.canvas = new fabric.Canvas("paperCanvas", {
            backgroundColor: "#fff",
            preserveObjectStacking: true,
            selection: true,
            enableRetinaScaling: true,
            fireRightClick: true,
            stopContextMenu: true,
            defaultCursor: "default",
            hoverCursor: "move",
          });
          fabric.Object.prototype.set({
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            cornerColor: "white",
            cornerStrokeColor: "#3b82f6",
            borderOpacityWhenMoving: 1,
            cornerSize: 8,
            transparentCorners: false,
            centeredScaling: false,
            uniformScaling: false,
            uniScaleKey: "shiftKey",
            objectCaching: false,
            noScaleCache: false,
            // Keep outlines and dash patterns in document units when an object is stretched.
            // Fabric otherwise applies scaleX/scaleY to both, causing uneven line widths and dashes.
            strokeUniform: true,
          });
          const rotateImg = new Image();
          rotateImg.src = "./static/rotate.png";
          function renderRotationControl(ctx, left, top, styleOverride, fabricObject) {
            if (fabricObject.__corner !== this.name) return;
            const size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            const cornerAngleAdjustment = {
              mtr_tr: 0,
              mtr_br: 90,
              mtr_bl: 180,
              mtr_tl: 270,
            };
            const adjustment = cornerAngleAdjustment[this.name] || 0;
            ctx.rotate(fabric.util.degreesToRadians(adjustment));
            if (rotateImg.complete) {
              ctx.drawImage(rotateImg, -size / 2, -size / 2, size, size);
            } else {
              ctx.beginPath();
              ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
              ctx.fillStyle = "#ccc";
              ctx.fill();
            }
            ctx.restore();
          }

          function createRotationControl(x, y, name) {
            const offsetDist = 5;
            return new fabric.Control({
              name: name,
              x: x,
              y: y,
              offsetX: x * offsetDist * 2.5,
              offsetY: y * offsetDist * 2.5,
              actionHandler: fabric.controlsUtils.rotationWithSnapping,
              actionName: "rotate",
              cursorStyle: "none",
              render: renderRotationControl,
              cornerSize: 24,
              withConnection: false,
            });
          }

          const applyCustomRotationControls = (controlsConfig) => {
            controlsConfig.mtr_tl = createRotationControl(-0.5, -0.5, "mtr_tl");
            controlsConfig.mtr_tr = createRotationControl(0.5, -0.5, "mtr_tr");
            controlsConfig.mtr_bl = createRotationControl(-0.5, 0.5, "mtr_bl");
            controlsConfig.mtr_br = createRotationControl(0.5, 0.5, "mtr_br");
            delete controlsConfig.mtr;
          };
          applyCustomRotationControls(fabric.Object.prototype.controls);
          applyCustomRotationControls(fabric.Textbox.prototype.controls);
          const baseRenderTextbox = fabric.Textbox.prototype._renderTextLine;
          const baseRenderIText = fabric.IText.prototype._renderTextLine;
          function renderJustifiedTextLine(baseMethod, method, ctx, line, left, top, lineIndex) {
            const isLastLine = lineIndex === this._textLines.length - 1;
            if (this.textAlign !== "justify" || isLastLine || this.isVertical) {
              return baseMethod.call(this, method, ctx, line, left, top, lineIndex);
            }

            const characters = line;
            if (characters.length <= 1) {
              return baseMethod.call(this, method, ctx, line, left, top, lineIndex);
            }

            if (!this.__charBounds || !this.__charBounds[lineIndex]) {
              return baseMethod.call(this, method, ctx, line, left, top, lineIndex);
            }

            let actualLineWidth = 0;
            for (let i = 0; i < characters.length; i++) {
              const charBox = this.__charBounds[lineIndex][i];
              if (charBox) actualLineWidth += charBox.width;
            }

            const targetWidth = this.width;
            const totalSpace = targetWidth - actualLineWidth;
            if (totalSpace < 0) {
              return baseMethod.call(this, method, ctx, line, left, top, lineIndex);
            }

            const spacePerChar = totalSpace / (characters.length - 1);
            let currentLeft = left;
            for (let i = 0; i < characters.length; i++) {
              const char = characters[i];
              this._renderChar(method, ctx, lineIndex, i, char, currentLeft, top);
              const charBox = this.__charBounds[lineIndex][i];
              const charWidth = charBox ? charBox.width : 0;
              currentLeft += charWidth + spacePerChar;
            }
          }
          fabric.Textbox.prototype._renderTextLine = function (method, ctx, line, left, top, lineIndex) {
            renderJustifiedTextLine.call(this, baseRenderTextbox, method, ctx, line, left, top, lineIndex);
          };
          fabric.IText.prototype._renderTextLine = function (method, ctx, line, left, top, lineIndex) {
            renderJustifiedTextLine.call(this, baseRenderIText, method, ctx, line, left, top, lineIndex);
          };
          this.canvas.on("mouse:move", (opt) => {
            const target = this.canvas.getActiveObject();
            if (target && target.__corner !== target._lastHoveredCorner) {
              target._lastHoveredCorner = target.__corner;
              this.canvas.requestRenderAll();
            }
          });
          // Older projects serialize Fabric's previous `strokeUniform: false` default.
          // Upgrade objects as they enter the canvas so reopening an existing project has
          // the same fixed-width outline and fixed dash spacing behavior as new objects.
          this.canvas.on("object:added", ({ target }) => {
            if (target && !target.isGrid && !target.strokeUniform) {
              target.set("strokeUniform", true);
            }
          });
          this.canvas.on("object:removed", (e) => {
            const target = e.target;
            if (target?.__activeBlobUrl) {
              URL.revokeObjectURL(target.__activeBlobUrl);
              target.__activeBlobUrl = null;
            }
            if (App.history.locked) return;
            if (target && target.sharedId && target.syncMode === "share") {
              const sharedId = target.sharedId;
              const lastValue = App.content.compute(target);
              App.canvas.getObjects().forEach((obj) => {
                if (obj.syncMode === "ref" && obj.refId === sharedId) {
                  obj.set({
                    syncMode: "none",
                    refId: null,
                    editable: true,
                    rawContent: lastValue,
                  });
                  App.content.render(obj);
                }
              });
            }
            setTimeout(() => App.dataSource && App.dataSource.refreshBindingState(), 100);
          });
          if (document.fonts && typeof document.fonts.addEventListener === "function") {
            // 字体（内置或本地）稍后加载完成时，刷新画布避免字形/度量回退
            document.fonts.addEventListener("loadingdone", () => {
              if (App.canvas) App.canvas.requestRenderAll();
            });
          }
          this.paper.init();
          this.ruler.init();
          this.history.init();
          this.zoom.autoFit();
          this.dataSource.initAutoRefresh();
          this.tableEditor.init();
          this.templates.init();
          this.events.initHotkeys();
          this.events.initEvents();
          if ("queryLocalFonts" in window) setTimeout(() => this.loadLocalFonts(), 1000);
        },

        fontManager: {
          fonts: new Map(),
          availableFonts: [],

          ensureBundledFont: async function (family) {
            if (family !== "SourceHanSansCN" && family !== "SourceHanSerifCN-Bold") return;
            if (!document.fonts || typeof document.fonts.load !== "function") return;
            try {
              // 内置字体改为按需加载：仅在设计中实际用到时才下载，
              // 加载完成后由 App.init 里的 loadingdone 监听器触发画布重绘。
              const weight = family === "SourceHanSansCN" ? "400" : "normal";
              await document.fonts.load(`${weight} 16px "${family}"`);
            } catch (e) {
              console.warn("内置字体加载失败:", family, e);
            }
          },

          queryLocalFonts: async function () {
            if (!("queryLocalFonts" in window)) return[];
            this.availableFonts = await window.queryLocalFonts();
            return this.availableFonts;
          },

          getFontBlob: async function (family) {
            if (this.fonts.has(family)) return this.fonts.get(family);
            if (family === "SourceHanSansCN") {
              try {
                const res = await fetch("./static/NotoSansSC-VF.ttf");
                const blob = await res.blob();
                this.fonts.set(family, blob);
                return blob;
              } catch (e) {
                console.warn("无法加载默认字体", e);
              }
            }
            if (family === "SourceHanSerifCN-Bold") {
              try {
                const res = await fetch("./static/SourceHanSerifCN-Bold.ttf");
                const blob = await res.blob();
                this.fonts.set(family, blob);
                return blob;
              } catch (e) {
                console.warn("无法加载默认字体", e);
              }
            }

            if (this.availableFonts.length === 0) await this.queryLocalFonts();
            // 3. 核心修复：优先进行【精确匹配】(匹配具体的字重/字形)
            let fontMetadata = this.availableFonts.find((f) =>
              f.postscriptName === family || f.fullName === family
            );
            if (!fontMetadata) {
              const map = {
                SimSun:["simsun", "宋体"],
                SimHei: ["simhei", "黑体"],
                KaiTi:["kaiti", "楷体", "kaiti_gb2312"],
                FangSong:["fangsong", "仿宋"],
                "Microsoft YaHei": ["yahei", "微软雅黑"],
                Arial: ["arial"],
                "Times New Roman": ["times new roman", "times"]
              };
              const aliases = map[family] || [family.toLowerCase()];
              fontMetadata = this.availableFonts.find((f) =>
                aliases.some((alias) => f.family.toLowerCase().includes(alias) || f.fullName.toLowerCase().includes(alias))
              );
            }

            if (!fontMetadata) {
              fontMetadata = this.availableFonts.find((f) => f.fullName.includes("YaHei") || f.fullName.includes("SimSun"));
              if (!fontMetadata) return null;
            }

            const rawBlob = await fontMetadata.blob();
            const arrayBuffer = await rawBlob.arrayBuffer();
            let finalBlob = rawBlob;
            const view = new DataView(arrayBuffer);
            const magic = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
            if (magic === "ttcf") {
              try {
                const ttfBuffer = this._extractTTCtoTTF(arrayBuffer);
                finalBlob = new Blob([ttfBuffer], { type: "font/ttf" });
              } catch (err) {
                console.error("TTC 解析失败", err);
              }
            }

            this.fonts.set(family, finalBlob); 
            return finalBlob;
          },

          applyToJsPDF: async function (doc, requiredFamilies) {
            for (let family of requiredFamilies) {
              const cleanFamily = family.replace(/['"]/g, "");
              const blob = await this.getFontBlob(cleanFamily);
              if (blob) {
                const base64 = await this._blobToBase64(blob);
                const filename = `${cleanFamily}.ttf`;
                doc.addFileToVFS(filename, base64);
                doc.addFont(filename, cleanFamily, "normal");
                doc.addFont(filename, cleanFamily, "bold");
                doc.addFont(filename, cleanFamily, "italic");
                doc.addFont(filename, cleanFamily, "bolditalic");
              }
            }
          },

          clearCache: function () {
            this.fonts.clear();
          },

          _extractTTCtoTTF: function (arrayBuffer) {
            const view = new DataView(arrayBuffer);
            const firstFontOffset = view.getUint32(12, false);
            const numTables = view.getUint16(firstFontOffset + 4, false);
            const newHeaderSize = 12 + numTables * 16;
            let tables =[];
            let currentNewOffset = newHeaderSize;
            for (let i = 0; i < numTables; i++) {
              const recordOffset = firstFontOffset + 12 + i * 16;
              const tag = view.getUint32(recordOffset, false);
              const checkSum = view.getUint32(recordOffset + 4, false);
              const originalOffset = view.getUint32(recordOffset + 8, false);
              const length = view.getUint32(recordOffset + 12, false);
              const padding = (4 - (length % 4)) % 4;
              tables.push({ tag, checkSum, originalOffset, length, newOffset: currentNewOffset });
              currentNewOffset += length + padding;
            }

            const ttfBuffer = new ArrayBuffer(currentNewOffset);
            const ttfView = new DataView(ttfBuffer);
            const ttfUint8 = new Uint8Array(ttfBuffer);
            const origUint8 = new Uint8Array(arrayBuffer);
            for (let i = 0; i < 12; i++) ttfUint8[i] = origUint8[firstFontOffset + i];
            for (let i = 0; i < numTables; i++) {
              const table = tables[i];
              const recordOffset = 12 + i * 16;
              ttfView.setUint32(recordOffset, table.tag, false);
              ttfView.setUint32(recordOffset + 4, table.checkSum, false);
              ttfView.setUint32(recordOffset + 8, table.newOffset, false);
              ttfView.setUint32(recordOffset + 12, table.length, false);
              for (let j = 0; j < table.length; j++) ttfUint8[table.newOffset + j] = origUint8[table.originalOffset + j];
            }
            return ttfBuffer;
          },

          _blobToBase64: function (blob) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result.split(",")[1]);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          }
        },

        history: {
          stack: [],
          stackSizes: [],
          totalBytes: 0,
          index: -1,
          locked: false,
          maxSteps: 20,
          maxBytes: 32 * 1024 * 1024,

          init: function () {
            const saveHandler = (e) => {
              const target = e?.target;
              if (!this.locked && (!target || (!target.isGrid && !target.__tableScaling))) this.saveState();
            };
            App.canvas.on({
              "object:modified": saveHandler,
              "object:added": saveHandler,
              "object:removed": saveHandler,
            });
          },

          updateUI: function () {
            const btnUndo = document.getElementById("btnUndo");
            const btnRedo = document.getElementById("btnRedo");
            if (btnUndo && btnRedo) {
              btnUndo.disabled = this.index <= 0;
              btnRedo.disabled = this.index >= this.stack.length - 1;
            }
          },

          saveState: function () {
            if (this.locked) return;
            if (App.state.paperType === "label" && App.state.label.mode === "preview") return;
            if (this.index < this.stack.length - 1) {
              this.stack = this.stack.slice(0, this.index + 1);
              this.stackSizes = this.stackSizes.slice(0, this.index + 1);
              this.totalBytes = this.stackSizes.reduce((total, size) => total + size, 0);
            }

            const json = App.canvas.toJSON(CUSTOM_PROPS);
            json.objects = json.objects.filter((o) => !o.isGrid);
            const currentStr = JSON.stringify(json);
            if (this.index >= 0 && this.stack[this.index] === currentStr) {
              return;
            }

            const currentSize = new TextEncoder().encode(currentStr).byteLength;
            this.stack.push(currentStr);
            this.stackSizes.push(currentSize);
            this.totalBytes += currentSize;
            // Image-heavy documents can make a full JSON snapshot several megabytes.
            // Keep the newest state even when it alone exceeds the budget, while trimming
            // older snapshots by both count and total memory use.
            while (this.stack.length > 1 && (this.stack.length > this.maxSteps || this.totalBytes > this.maxBytes)) {
              this.totalBytes -= this.stackSizes.shift();
              this.stack.shift();
            }
            this.index = this.stack.length - 1;
            this.updateUI();
            App.state.hasUnsavedChanges = true;
            App.draft.schedule();
            setTimeout(() => {
              if (App.dataSource) {
                App.dataSource.updateNavUI();
              }
            }, 0);
          },

          reset: function () {
            this.stack = [];
            this.stackSizes = [];
            this.totalBytes = 0;
            this.index = -1;
            this.locked = false;
            this.saveState();
          },

          undo: function () {
            if (this.index <= 0) return;
            this.load(this.stack[--this.index]);
          },

          redo: function () {
            if (this.index >= this.stack.length - 1) return;
            this.load(this.stack[++this.index]);
          },

          load: function (jsonStr) {
            this.locked = true;
            App.canvas.loadFromJSON(jsonStr, () => {
              App.paper.drawGrid();
              App.canvas.renderAll();
              App.ui.updateLayerList();
              App.ui.updateInspector();
              this.locked = false;
              this.updateUI();
            });
          },
        },

        project: {
          // 统一构建 .paper / 模板 / 草稿共用的工程快照
          buildSnapshot: function (opts = {}) {
            const settings = App.paper.getSettings();
            const fitLabelEl = document.getElementById("fitLabelSize");
            if (fitLabelEl) {
              settings.fitLabelSize = fitLabelEl.checked;
              if (settings.fitLabelSize && settings.type === "label") {
                const val = (id) => parseFloat(document.getElementById(id)?.value) || 0;
                const intVal = (id) => parseInt(document.getElementById(id)?.value) || 1;
                settings.marginTop = val("marginTop") * CONFIG.MM_TO_PX;
                settings.marginBottom = val("marginBottom") * CONFIG.MM_TO_PX;
                settings.marginLeft = val("marginLeft") * CONFIG.MM_TO_PX;
                settings.marginRight = val("marginRight") * CONFIG.MM_TO_PX;
                settings.labelGapH = val("labelGapH");
                settings.labelGapV = val("labelGapV");
                settings.labelCols = intVal("labelCols");
                settings.labelRows = intVal("labelRows");
              }
            }

            let canvasData;
            if (App.state.paperType === "label" && App.state.label.mode === "preview") {
              canvasData = typeof App.state.label.designContent === "string" ? JSON.parse(App.state.label.designContent) : App.state.label.designContent;
            } else {
              canvasData = App.canvas.toJSON(CUSTOM_PROPS);
              canvasData.objects = (canvasData.objects || []).filter((o) => !o.isGrid);
            }

            if (canvasData && canvasData.objects) {
              canvasData.objects.forEach((obj) => {
                if (obj.type === "image" && obj.dataBinding && obj.src && obj.src.startsWith("blob:")) {
                  obj.src = "";
                }
              });
            }

            let dataSource = null;
            if (opts.includeDataSource) {
              const dsState = App.state.dataSource;
              dataSource = dsState.isActive && dsState.fileHandleId
                ? {
                    fileName: dsState.fileName,
                    currentSheet: dsState.currentSheet,
                    fileHandleId: dsState.fileHandleId,
                    imgDirId: dsState.imgDirId,
                  }
                : null;
            }

            return {
              version: "4.2",
              timestamp: new Date().toISOString(),
              settings,
              paperSize: document.getElementById("paperSize").value,
              thumbnail: App.canvas.toDataURL({
                format: "png",
                multiplier: opts.thumbnailMultiplier ?? 0.5,
              }),
              canvasData,
              dataSource,
            };
          },
        },

        draft: {
          storageKey: "paperstudio:draft:v1",
          maxDrafts: 5,
          ready: false,
          timer: null,
          hasPending: false,
          lastSavedAt: null,
          _pendingList: [],
          _suspended: false,
          _chain: null,

          // 画布 / 纸张 / 数据源变更后调用，防抖合并写入
          schedule: function () {
            if (!this.ready || this._suspended) return;
            this.hasPending = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.save(), 500);
          },

          // 关闭页面 / 切换后台时立即落盘
          flush: function () {
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            if (this.hasPending) this.save();
          },

          // 打开/加载工程期间挂起，避免"仅打开未修改"也生成草稿
          suspend: function () {
            this._suspended = true;
          },

          resume: function () {
            this._suspended = false;
          },

          save: function () {
            this.timer = null;
            this.hasPending = false;
            // 串行化写入，避免防抖/立即落盘并发时互相覆盖
            this._chain = (this._chain || Promise.resolve()).then(() => this._saveNow());
          },

          _saveNow: async function () {
            try {
              const snapshot = App.project.buildSnapshot({
                includeDataSource: true,
                thumbnailMultiplier: 0.25,
              });
              const list = await this._loadList();
              list.unshift(snapshot);
              // 末位删除：超过上限时丢弃最旧（末尾）的草稿
              if (list.length > this.maxDrafts) list.splice(this.maxDrafts);
              await idbKeyval.set(this.storageKey, list);
              this.lastSavedAt = Date.now();
              this._pendingList = list;
              this._syncFab();
              const panel = document.getElementById("draftPanel");
              if (panel && !panel.classList.contains("hidden")) {
                this.renderList();
              }
            } catch (e) {
              console.error("自动保存草稿失败", e);
            }
          },

          _loadList: async function () {
            try {
              const stored = await idbKeyval.get(this.storageKey);
              if (Array.isArray(stored)) {
                return stored.filter((d) => d && d.canvasData && d.settings);
              }
              // 兼容旧版单草稿格式，自动迁移为数组
              if (stored && stored.canvasData && stored.settings) return [stored];
            } catch (e) {}
            return [];
          },

          clear: function () {
            this.hasPending = false;
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.lastSavedAt = null;
            this._pendingList = [];
            this.closePanel();
            this._syncFab();
            idbKeyval.del(this.storageKey).catch(() => {});
          },

          checkDraft: async function () {
            try {
              const list = await this._loadList();
              if (!list.length) return;
              this._pendingList = list;
              this.renderList();
              this.showPanel();
            } catch (e) {
              console.error("读取草稿失败", e);
            }
          },

          showPanel: function () {
            if (Array.isArray(this._pendingList) && this._pendingList.length) this.renderList();
            const panel = document.getElementById("draftPanel");
            if (panel) panel.classList.remove("hidden");
            this._syncFab();
          },

          closePanel: function () {
            const panel = document.getElementById("draftPanel");
            if (panel) panel.classList.add("hidden");
          },

          _syncFab: function () {
            const fab = document.getElementById("draftFab");
            if (!fab) return;
            const count = Array.isArray(this._pendingList) ? this._pendingList.length : 0;
            fab.classList.toggle("hidden", count === 0);
            const badge = document.getElementById("draftFabCount");
            if (badge) badge.textContent = count;
          },

          renderList: function () {
            const container = document.getElementById("draftList");
            if (!container) return;
            container.innerHTML = "";
            this._pendingList.forEach((draft, index) => {
              const timeText = draft.timestamp ? new Date(draft.timestamp).toLocaleString() : "未知时间";
              const count = (draft.canvasData.objects || []).length;
              const thumb = draft.thumbnail && String(draft.thumbnail).startsWith("data:image/")
                ? `<img src="${draft.thumbnail}" alt="" class="h-10 w-10 rounded object-contain border border-gray-200 bg-white shrink-0" />`
                : "";
              const row = document.createElement("div");
              row.className = "flex items-center gap-2 rounded-lg border border-gray-100 bg-white p-2";
              row.innerHTML = `
                ${thumb}
                <div class="flex-1 min-w-0 text-[11px] text-slate-500">
                  <div class="truncate font-medium text-slate-700">${timeText}</div>
                  <div>${count} 个对象</div>
                </div>
                <button onclick="App.draft.restore(${index})" class="shrink-0 px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium">恢复</button>
                <button onclick="App.draft.remove(${index})" class="shrink-0 p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition" title="删除此草稿">
                  <i class="ph ph-trash"></i>
                </button>
              `;
              container.appendChild(row);
            });
            const hint = document.getElementById("draftLimitHint");
            if (hint) hint.textContent = `共 ${this._pendingList.length} 份，最多保留 ${this.maxDrafts} 份（超出自动删除最旧）`;
          },

          restore: function (index) {
            const draft = this._pendingList?.[index];
            if (!draft) return;
            this.closePanel();
            App.ui.showLoading("正在恢复草稿...");
            App.io.loadProjectData(draft, { markUnsaved: true });
          },

          remove: async function (index) {
            if (!this._pendingList || !this._pendingList[index]) return;
            this._pendingList.splice(index, 1);
            await idbKeyval.set(this.storageKey, this._pendingList);
            this._syncFab();
            if (this._pendingList.length) {
              this.renderList();
            } else {
              this.closePanel();
            }
            Utils.toast("草稿已删除");
          },

          clearAll: function () {
            if (!window.confirm("确定清空所有未保存草稿吗？")) return;
            this.clear();
            Utils.toast("草稿已清空");
          },
        },

        dataSource: {
          getCanvasState: function () {
            const objs = App.canvas.getObjects();
            let hasBinding = false;
            let maxSerialCount = 0;
            objs.forEach((o) => {
              if (o.dataBinding && o.dataBinding.type === "variable" && o.dataBinding.field) {
                hasBinding = true;
              }

              if (o.isTable && o.tableData && o.tableData.cells) {
                o.tableData.cells.flat().forEach((cell) => {
                  if (cell.dataBinding && cell.dataBinding.type === "variable" && cell.dataBinding.field) {
                    hasBinding = true;
                  }
                });
              }

              if (o.isSerialNumber && o.serialConfig) {
                maxSerialCount = Math.max(maxSerialCount, o.serialConfig.generateCount || 1);
              }
            });
            return {
              hasBinding,
              maxSerialCount,
            };
          },
          openFile: async function () {
            try {
              const [handle] = await window.showOpenFilePicker({
                types: [
                  {
                    description: "Excel Spreadsheets",
                    accept: {
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                      "application/vnd.ms-excel": [".xls"],
                    },
                  },
                ],
                multiple: false,
              });
              let finalHandleId = null;
              let isExisting = false;
              try {
                const entries = await idbKeyval.entries();
                for (const [key, storedHandle] of entries) {
                  if (storedHandle && storedHandle.kind === "file" && typeof storedHandle.isSameEntry === "function") {
                    const isSame = await handle.isSameEntry(storedHandle);
                    if (isSame) {
                      finalHandleId = key;
                      isExisting = true;
                      break;
                    }
                  }
                }
              } catch (checkErr) {
                console.warn("检查重复句柄失败，将创建新 ID", checkErr);
              }

              if (!finalHandleId) {
                finalHandleId = Utils.generateUniqueId();
              }
              await idbKeyval.set(finalHandleId, handle);
              await this.loadFromHandle(handle, finalHandleId);
            } catch (err) {
              if (err.name !== "AbortError") {
                console.error(err);
                Utils.toast("打开文件失败", "error");
              }
            }
          },

          requestPermissionUI: function (handle) {
            return new Promise((resolve) => {
              const modal = document.getElementById("permissionModal");
              const nameLabel = document.getElementById("permFileName");
              const grantBtn = document.getElementById("permGrantBtn");
              const cancelBtn = document.getElementById("permCancelBtn");
              if (!modal) {
                return resolve(false);
              }

              nameLabel.innerText = handle.name;
              modal.classList.remove("hidden");
              const cleanup = () => {
                modal.classList.add("hidden");
                grantBtn.onclick = null;
                cancelBtn.onclick = null;
              };
              grantBtn.onclick = async () => {
                try {
                  const status = await handle.requestPermission({
                    mode: "read",
                  });
                  cleanup();
                  resolve(status === "granted");
                } catch (e) {
                  console.error(e);
                  cleanup();
                  resolve(false);
                }
              };
              cancelBtn.onclick = () => {
                cleanup();
                Utils.toast("已取消加载数据源", "info");
                resolve(false);
              };
            });
          },

          reloadFromFile: async function () {
            const s = App.state.dataSource;
            let handle = s.fileHandle;
            const handleId = s.fileHandleId;
            if (!handle && handleId) {
              try {
                handle = await idbKeyval.get(handleId);
              } catch (e) {}
            }

            if (handle) {
              await this.loadFromHandle(handle, handleId || s.fileHandleId);
            } else {
              this.openFile();
            }
          },

          loadFromHandle: async function (handle, handleId) {
            let perm = await handle.queryPermission({
              mode: "read",
            });
            if (perm !== "granted") {
              const granted = await this.requestPermissionUI(handle);
              if (!granted) {
                this.close();
                return;
              }
            }

            try {
              App.canvas.renderOnAddRemove = false;
              let file;
              try {
                file = await handle.getFile();
              } catch (fileErr) {
                if (fileErr.name === "NotFoundError" || fileErr.name === "NotReadableError") {
                  if (handleId) await idbKeyval.del(handleId);
                  Utils.toast(`文件已失效: ${handle.name}`, "error");
                  this.close();
                  return;
                }
                throw fileErr;
              }

              App.state.dataSource.lastModified = file.lastModified;
              const arrayBuffer = await file.arrayBuffer();
              const workbook = XLSX.read(arrayBuffer, {
                type: "array",
                cellNF: true,
                cellStyles: true,
                cellText: true,
                cellDates: false,
                cellFormula: false,
              });
              const validSheetNames = workbook.SheetNames.filter((name) => {
                const ws = workbook.Sheets[name];
                return ws["!ref"];
              });
              if (validSheetNames.length === 0) {
                Utils.toast("导入失败：表格内容为空", "error");
                this.close();
                return;
              }

              const s = App.state.dataSource;
              s.fileHandle = handle;
              s.fileHandleId = handleId;
              s.fileName = handle.name;
              s.workbook = workbook;
              s.sheetNames = validSheetNames;
              s.isActive = true;
              this._sheetCache = {};
              if (!s.currentSheet || !s.sheetNames.includes(s.currentSheet)) {
                s.currentSheet = s.sheetNames[0];
              }

              this.processCurrentSheet(true);
              const act = App.canvas.getActiveObject();
              if (act && act.dataBinding && act.dataBinding.type === "variable" && s.headers.length > 0) {
                act.dataBinding.sheet = s.currentSheet;
                act.dataBinding.field = s.headers[0];
                setTimeout(() => App.ui.updateInspector(), 0);
              }

              await this.renderPage(0);
              this.updateNavUI();
            } catch (e) {
              console.error(e);
              Utils.toast("文件读取失败", "error");
              this.close();
            } finally {
              App.canvas.renderOnAddRemove = true;
              App.canvas.requestRenderAll();
            }
          },

          processCurrentSheet: function (skipRender = false) {
            const s = App.state.dataSource;
            if (!s.isActive || !s.workbook) return;
            const worksheet = s.workbook.Sheets[s.currentSheet];
            const jsonHeader = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
            });
            s.data = [];
            s.headers = [];
            if (jsonHeader.length > 0) {
              s.headers = jsonHeader[0].map((h) => String(h || "").trim());
              s.data = XLSX.utils.sheet_to_json(worksheet, {
                raw: false,
                dateNF: "yyyy-mm-dd",
                defval: "",
              });
            }

            let idx = parseInt(App.state.currentDataIndex) || 0;
            if (idx >= s.data.length) idx = 0;
            if (idx < 0) idx = 0;
            App.state.currentDataIndex = idx;
            if (!skipRender) {
              this.renderPage(idx);
              this.updateUI();
            } else {
              this.updateUI();
            }
            App.draft.schedule();
          },

          changeSheet: function (sheetName) {
            const s = App.state.dataSource;
            s.currentSheet = sheetName;
            if (s.isActive && s.workbook) {
              const worksheet = s.workbook.Sheets[sheetName];
              const jsonHeader = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
              });
              s.data = [];
              s.headers = [];
              if (jsonHeader.length > 0) {
                s.headers = jsonHeader[0].map((h) => String(h || "").trim());
                s.data = XLSX.utils.sheet_to_json(worksheet, {
                  raw: false,
                  dateNF: "yyyy-mm-dd",
                  defval: "",
                });
              }
            }

            this.updateUI();
            this.updateNavUI();
            App.draft.schedule();
          },

          calculateTotalPages: function () {
            const s = App.state.dataSource;
            const cfg = App.paper.getSettings();
            const canvasState = this.getCanvasState();
            if (App.state.paperType === "label" && App.state.label.mode === "preview") {
              const baseCount = s.isActive && s.data.length > 0 ? s.data.length : 1;
              const totalItems = baseCount * cfg.labelQuantity;
              const itemsPerPage = Math.max(1, cfg.labelCols * cfg.labelRows);
              return Math.max(1, Math.ceil(totalItems / itemsPerPage));
            }

            if (s.isActive && canvasState.hasBinding && s.workbook) {
              const objs = App.canvas.getObjects();
              let boundSheetName = null;
              const findBoundSheet = (target) => {
                if (target.dataBinding && target.dataBinding.type === "variable" && target.dataBinding.sheet) {
                  return target.dataBinding.sheet;
                }
                if (target.isTable && target.tableData && target.tableData.cells) {
                  for (let r of target.tableData.cells) {
                    for (let c of r) {
                      if (c.dataBinding && c.dataBinding.type === "variable" && c.dataBinding.sheet) return c.dataBinding.sheet;
                    }
                  }
                }
                return null;
              };
              for (const o of objs) {
                boundSheetName = findBoundSheet(o);
                if (boundSheetName) break;
              }

              if (boundSheetName && s.workbook.Sheets[boundSheetName]) {
                if (!this._sheetCache) this._sheetCache = {};
                if (!this._sheetCache[boundSheetName]) {
                  this._sheetCache[boundSheetName] = XLSX.utils.sheet_to_json(s.workbook.Sheets[boundSheetName]);
                }
                const len = this._sheetCache[boundSheetName].length;
                if (len > 0) return len;
              }

              if (s.data.length > 0) return s.data.length;
            }

            if (App.state.paperType === "label" && App.state.label.mode === "design") return 1;
            if (canvasState.maxSerialCount > 1) return canvasState.maxSerialCount;
            return 1;
          },

          close: async function () {
            App.state.dataSource = {
              fileHandle: null,
              fileHandleId: null,
              fileName: "",
              workbook: null,
              sheetNames: [],
              currentSheet: "",
              data: [],
              headers: [],
              isActive: false,
            };
            this.updateUI();
            this.renderPage(0);
            this.updateNavUI();
          },

          updateUI: function () {
            const s = App.state.dataSource;
            const noData = document.getElementById("noDataState");
            const loaded = document.getElementById("dataLoadedState");
            const fileNameEl = document.getElementById("dsFileName");
            const sheetSel = document.getElementById("dsSheetSelect");
            const rowCount = document.getElementById("dsRowCount");
            const fieldList = document.getElementById("dsFieldList");
            if (!s.isActive) {
              noData.classList.remove("hidden");
              loaded.classList.add("hidden");
              return;
            }

            noData.classList.add("hidden");
            loaded.classList.remove("hidden");
            loaded.classList.add("flex");
            fileNameEl.innerText = s.fileName;
            sheetSel.innerHTML = "";
            s.sheetNames.forEach((name) => {
              const opt = document.createElement("option");
              opt.value = name;
              opt.innerText = name;
              if (name === s.currentSheet) opt.selected = true;
              sheetSel.appendChild(opt);
            });
            rowCount.innerText = `${s.data.length} 条数据`;
            fieldList.innerHTML = "";
            if (s.headers.length === 0) {
              fieldList.innerHTML = '<li class="text-center text-gray-400 py-4 text-xs">暂无字段</li>';
            } else {
              s.headers.forEach((h) => {
                const li = document.createElement("li");
                li.className = "text-xs bg-white border border-gray-200 rounded px-2 py-1.5 text-slate-600 font-mono flex items-center gap-2";
                const icon = document.createElement("i");
                icon.className = "ph ph-brackets-curly text-slate-300";
                li.append(icon, document.createTextNode(` ${h}`));
                li.draggable = true;
                li.dataset.field = h;
                li.dataset.sheet = s.currentSheet;
                fieldList.appendChild(li);
              });
            }
          },
          batchUpdateBinding: function () {
            const s = App.state.dataSource;
            if (!s.isActive || !s.currentSheet) return Utils.toast("请先加载数据源", "error");
            const targetSheet = s.currentSheet;
            const validFields = s.headers;
            if (!validFields || validFields.length === 0) return Utils.toast("目标工作表为空或无字段", "error");
            let count = 0;
            const tryUpdate = (binding) => {
              if (binding && binding.type === "variable") {
                if (validFields.includes(binding.field)) {
                  if (binding.sheet !== targetSheet) {
                    binding.sheet = targetSheet;
                    return true;
                  }
                }
              }
              return false;
            };
            if (App.state.paperType === "label" && App.state.label.mode === "preview") {
              const designJSON = App.state.label.designContent;
              if (!designJSON || !designJSON.objects) return;
              designJSON.objects.forEach((obj) => {
                if (tryUpdate(obj.dataBinding)) count++;
                if (obj.isTable && obj.tableData && obj.tableData.cells) {
                  obj.tableData.cells.flat().forEach((cell) => {
                    if (tryUpdate(cell.dataBinding)) count++;
                  });
                }
              });
              if (count > 0) {
                App.label.renderPreview();
                Utils.toast(`已更新${count}个字段`);
              } else {
                Utils.toast("未找到可匹配字段或无需更新", "info");
              }
              return;
            }

            const objs = App.canvas.getObjects();
            objs.forEach((obj) => {
              let updated = false;
              if (tryUpdate(obj.dataBinding)) {
                updated = true;
              }

              if (obj.isTable && obj.tableData && obj.tableData.cells) {
                obj.tableData.cells.flat().forEach((cell) => {
                  if (tryUpdate(cell.dataBinding)) updated = true;
                });
                if (updated) {
                  App.tableEditor._replaceTableOnCanvas(obj, obj.tableData);
                  updated = false;
                  count++;
                }
              }

              if (updated) count++;
            });
            if (count > 0) {
              this.refreshBindingState();
              App.ui.updateInspector();
              App.history.saveState();
              Utils.toast(`已更新 ${count} 个字段`);
            } else {
              Utils.toast("未找到可匹配字段或无需更新", "info");
            }
          },

          renderPage: async function (pageIndex) {
            const s = App.state.dataSource;
            if (App.state.paperType === "label" && App.state.label.mode === "preview") return;
            const max = this.calculateTotalPages();
            pageIndex = Math.max(0, Math.min(pageIndex, max - 1));
            if (max === 0) pageIndex = 0;
            App.state.currentDataIndex = pageIndex;
            if (!this._sheetCache) this._sheetCache = {};
            if (s.isActive && s.workbook) {
              const objs = App.canvas.getObjects();
              const sheetsToCache = new Set();
              objs.forEach((obj) => {
                if (obj.dataBinding?.type === "variable" && obj.dataBinding.sheet) {
                  sheetsToCache.add(obj.dataBinding.sheet);
                }
                if (obj.isTable && obj.tableData?.cells) {
                  obj.tableData.cells.flat().forEach((cell) => {
                    if (cell.dataBinding?.type === "variable" && cell.dataBinding.sheet) {
                      sheetsToCache.add(cell.dataBinding.sheet);
                    }
                  });
                }
              });
              sheetsToCache.forEach((sheetName) => {
                if (!this._sheetCache[sheetName]) {
                  const ws = s.workbook.Sheets[sheetName];
                  if (ws) {
                    this._sheetCache[sheetName] = XLSX.utils.sheet_to_json(ws, {
                      raw: false,
                      dateNF: "yyyy-mm-dd",
                      defval: "",
                    });
                  }
                }
              });
            }

            const objs = App.canvas.getObjects();
            const updateTasks = [];
            for (const obj of objs) {
              if (obj.type === "image" && obj.dataBinding && obj.dataBinding.type === "variable") {
                if (obj.type === "image" && obj.dataBinding && obj.dataBinding.type === "variable") {
                  const originalSheet = obj.dataBinding.sheet;
                  const filename = this._getBoundValue(obj, pageIndex);
                  if (obj.dataBinding.sheet !== originalSheet) {
                    obj.dataBinding.sheet = originalSheet;
                  }

                  if (obj._lastRenderedFile !== filename || !obj._imgLoaded) {
                    updateTasks.push(this._updateImageAsync(obj, filename));
                  }
                  continue;
                }
              }

              if (obj.isTable && obj.tableData) {
                this._updateTableData(obj, pageIndex);
                continue;
              }

              let newRaw = null;
              let hasNewData = false;
              if (obj.isDynamicPageNum && obj.pageConfig) {
                const currentPage = pageIndex + (obj.pageConfig.startFrom || 1);
                const totalPages = max || 1;
                newRaw = obj.pageConfig.format.replace("{page}", currentPage).replace("{total}", totalPages);
                hasNewData = true;
              } else if (obj.isSerialNumber && obj.serialConfig) {
                newRaw = App.tools._formatSerialNumber(obj.serialConfig, pageIndex);
                hasNewData = true;
              } else if (obj.isDynamicDate && obj.dateConfig) {
                newRaw = Utils.formatDate(new Date(), null, obj.dateConfig);
                hasNewData = true;
              } else if (obj.dataBinding?.type === "variable") {
                const val = this._getBoundValue(obj, pageIndex);
                if (val !== null) {
                  newRaw = String(val);
                  hasNewData = true;
                }
              }

              if (hasNewData) {
                obj.rawContent = newRaw;
                const task = App.content.render(obj);
                if (task instanceof Promise) {
                  updateTasks.push(task);
                }
              } else if (obj.syncMode === "ref") {
                App.content.render(obj);
              }
            }

            if (updateTasks.length > 0) {
              await Promise.all(updateTasks);
            }

            App.canvas.requestRenderAll();
            this.updateNavUI();
          },

          _getBoundValue: function (obj, pageIndex) {
            const binding = obj.dataBinding;
            if (!binding || binding.type !== "variable" || !binding.field) return null;
            const s = App.state.dataSource;
            const targetSheet = binding.sheet || s.currentSheet;
            if (!this._sheetCache[targetSheet]) {
              const ws = s.workbook?.Sheets[targetSheet];
              if (ws) {
                this._sheetCache[targetSheet] = XLSX.utils.sheet_to_json(ws, {
                  raw: false,
                  dateNF: "yyyy-mm-dd",
                  defval: "",
                });
              } else {
                return null;
              }
            }

            const rowData = this._sheetCache[targetSheet][pageIndex];
            if (!rowData) return "";
            const val = rowData[binding.field];
            return val !== undefined && val !== null ? String(val) : "";
          },

          _updateTableData: function (tableObj, pageIndex) {
            if (!tableObj.tableData || !tableObj.tableData.cells) return false;
            let tableChanged = false;
            tableObj.tableData.cells.forEach((row) => {
              row.forEach((cell) => {
                const mockObj = { dataBinding: cell.dataBinding };
                const val = this._getBoundValue(mockObj, pageIndex);
                if (val !== null) {
                  if (cell.text !== val) {
                    cell.text = val;
                    tableChanged = true;
                  }
                }
                if (cell.syncMode === "ref" && cell.refId) {
                  const refVal = App.content.getSharedValue(cell.refId);
                  if (refVal !== undefined && cell.text !== refVal) {
                    cell.text = refVal;
                    tableChanged = true;
                  }
                }
              });
            });
            if (tableChanged) {
              App.tableEditor._replaceTableOnCanvas(tableObj, tableObj.tableData);
            }

            return tableChanged;
          },
          _updateImageAsync: async function (obj, filename) {
            obj._lastRenderedFile = filename;
            obj._imgLoaded = true;
            let blobUrl = null;
            const previousBlobUrl = obj.__activeBlobUrl || null;
            if (filename && obj.imgDirId) {
              try {
                const blob = await this.getImageBlob(filename, obj.imgDirId);
                if (blob) {
                  blobUrl = URL.createObjectURL(blob);
                }
              } catch (e) {
                console.warn("Load img failed", e);
              }
            }

            if (!blobUrl) {
              const errSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="#f3f4f6">
                            <rect width="100" height="100" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2"/>
                            <text x="50" y="50" font-family="sans-serif" font-size="10" fill="#9ca3af" text-anchor="middle">加载失败</text>
                            <text x="50" y="62" font-family="sans-serif" font-size="10" fill="#9ca3af" text-anchor="middle">${filename || "未找到绑定字段"}</text></svg>`;
              blobUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(errSvg);
            }

            return new Promise((resolve) => {
              const targetVisualWidth = obj.getScaledWidth();
              const { left, top, angle, originX, originY } = obj;
              obj.setSrc(blobUrl, (newImg) => {
                obj.__activeBlobUrl = blobUrl.startsWith("blob:") ? blobUrl : null;
                try {
                  newImg.set({
                    left,
                    top,
                    angle,
                    originX,
                    originY,
                  });
                  if (newImg.width > 0) {
                    const newScale = targetVisualWidth / newImg.width;
                    newImg.scaleX = newScale;
                    newImg.scaleY = newScale;
                  }
                } finally {
                  if (previousBlobUrl && previousBlobUrl !== blobUrl) {
                    URL.revokeObjectURL(previousBlobUrl);
                  }
                  resolve();
                }
              });
            });
          },
          _updateBarcodeAsync: async function (obj) {
            try {
              const newObj = await App.barcode.createOrUpdate(obj, obj.barcodeConfig);
              App.ui._replaceObject(obj, newObj);
            } catch (err) {
              console.warn("VDP Barcode Update Failed:", err);
            }
          },

          nav: async function (action, val) {
            const isLabelPreview = App.state.paperType === "label" && App.state.label.mode === "preview";
            if (isLabelPreview) {
              const cfg = App.paper.getSettings();
              const ds = App.state.dataSource;
              let totalCount = cfg.labelQuantity;
              if (ds.isActive && ds.data.length > 0) {
                totalCount = ds.data.length * cfg.labelQuantity;
              }
              const itemsPerPage = cfg.labelCols * cfg.labelRows;
              const maxPages = Math.ceil(totalCount / itemsPerPage);
              let current = App.state.label.previewPage || 0;
              let next = current;
              switch (action) {
                case "first":
                  next = 0;
                  break;
                case "prev":
                  next = current - 1;
                  break;
                case "next":
                  next = current + 1;
                  break;
                case "last":
                  next = maxPages - 1;
                  break;
                case "goto":
                  next = parseInt(val) - 1;
                  break;
              }

              App.state.label.previewPage = Math.max(0, Math.min(next, maxPages - 1));
              await App.label.renderPreview();
              return;
            }

            const current = App.state.currentDataIndex;
            const max = this.calculateTotalPages();
            let next = current;
            switch (action) {
              case "first":
                next = 0;
                break;
              case "prev":
                next = current - 1;
                break;
              case "next":
                next = current + 1;
                break;
              case "last":
                next = max - 1;
                break;
              case "goto":
                next = parseInt(val) - 1;
                break;
            }
            this.renderPage(next);
          },

          updateNavUI: function () {
            const max = this.calculateTotalPages();
            let current = App.state.currentDataIndex;
            if (current >= max) {
              current = max - 1;
              App.state.currentDataIndex = current;
            }
            if (current < 0) current = 0;
            const navBar = document.getElementById("dataNavBar");
            const input = document.getElementById("vdpIndexInput");
            const total = document.getElementById("vdpTotal");
            if (max > 1) {
              navBar.classList.remove("hidden");
              if (App.state.paperType === "label" && App.state.label.mode === "preview") {
                input.value = (App.state.label.previewPage || 0) + 1;
              } else {
                input.value = current + 1;
              }
              total.innerText = max;
            } else {
              navBar.classList.add("hidden");
            }
          },

          refreshBindingState: function () {
            this._sheetCache = {};
            this.renderPage(App.state.currentDataIndex);
          },

          initAutoRefresh: function () {
            const check = Utils.throttle(() => this.checkFileUpdate(), 1000);
            window.addEventListener("focus", check);
            document.addEventListener("visibilitychange", () => {
              if (document.visibilityState === "visible") check();
            });
          },

          checkFileUpdate: async function () {
            const s = App.state.dataSource;
            if (!s.isActive || !s.fileHandle || !s.workbook) return;
            try {
              const perm = await s.fileHandle.queryPermission({
                mode: "read",
              });
              if (perm !== "granted") return;
              const file = await s.fileHandle.getFile();
              if (file.lastModified > s.lastModified + 1000) {
                Utils.toast("数据源已更新！");
                await this.loadFromHandle(s.fileHandle, s.fileHandleId);
              }
            } catch (e) {}
          },

          syncFromProject: async function (meta) {
            if (!meta || !meta.fileHandleId) {
              this.close();
              return;
            }
            const { fileHandleId, fileName, currentSheet } = meta;
            App.state.dataSource.currentSheet = currentSheet;
            try {
              const handle = await idbKeyval.get(fileHandleId);
              if (handle) {
                await this.loadFromHandle(handle, fileHandleId);
              } else {
                Utils.toast(`无法找到关联文件: ${fileName}`, "error");
                this.close();
              }
            } catch (e) {
              console.error("DB Error", e);
              this.close();
            }
          },
          selectImageDir: async function () {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "image") return Utils.toast("请先选中一个图片对象", "error");
            try {
              const handle = await window.showDirectoryPicker({
                id: "vdp_images_dir_common",
                mode: "read",
              });
              let finalHandleId = null;
              try {
                const entries = await idbKeyval.entries();
                for (const [key, storedHandle] of entries) {
                  if (storedHandle && storedHandle.kind === "directory" && typeof storedHandle.isSameEntry === "function") {
                    const isSame = await handle.isSameEntry(storedHandle);
                    if (isSame) {
                      finalHandleId = key;
                      break;
                    }
                  }
                }
              } catch (checkErr) {
                console.warn("检查重复文件夹句柄失败，将创建新 ID", checkErr);
              }

              if (!finalHandleId) {
                finalHandleId = Utils.generateUniqueId();
                await idbKeyval.set(finalHandleId, handle);
              } else {
                await idbKeyval.set(finalHandleId, handle);
              }

              if (!App.state.dataSource.imgDirCache) {
                App.state.dataSource.imgDirCache = {};
              }
              App.state.dataSource.imgDirCache[finalHandleId] = handle;
              act.set({
                imgDirId: finalHandleId,
                imgDirName: handle.name,
              });
              Utils.toast(`已绑定文件夹: ${handle.name}`);
              const binding = act.dataBinding;
              if (binding && binding.type === "variable") {
                const pageIndex = App.state.currentDataIndex || 0;
                const val = this._getBoundValue(act, pageIndex);
                if (val) {
                  await this._updateImageAsync(act, val);
                  App.canvas.renderAll();
                }
              }

              App.ui.updateInspector();
              App.history.saveState();
            } catch (err) {
              if (err.name !== "AbortError") {
                console.error(err);
                Utils.toast("无法访问文件夹", "error");
              }
            }
          },

          restoreImageDir: async function (savedId) {
            if (!savedId) return;
            try {
              const handle = await idbKeyval.get(savedId);
              if (handle) {
                this.imgDirId = savedId;
                App.state.dataSource.imgDirHandle = handle;
              }
            } catch (e) {
              console.warn("Restore ImgDir Failed", e);
            }
          },

          getImageBlob: async function (filename, dirId) {
            if (!filename || !dirId) return null;
            if (!App.state.dataSource.imgDirCache) {
              App.state.dataSource.imgDirCache = {};
            }
            let handle = App.state.dataSource.imgDirCache[dirId];
            if (!handle) {
              try {
                handle = await idbKeyval.get(dirId);
                if (handle) {
                  App.state.dataSource.imgDirCache[dirId] = handle;
                }
              } catch (e) {
                console.warn("读取文件夹句柄失败", e);
              }
            }

            if (!handle) return null;
            let perm = "prompt";
            try {
              perm = await handle.queryPermission({ mode: "read" });
            } catch (e) {
              console.warn("Permission query failed", e);
            }

            if (perm !== "granted") {
              if (this.isRequestingPerm) return null;
              this.isRequestingPerm = true;
              const granted = await this.requestPermissionUI(handle);
              this.isRequestingPerm = false;
              if (!granted) return null;
            }

            try {
              const fileHandle = await handle.getFileHandle(filename);
              return await fileHandle.getFile();
            } catch (e) {
              return null;
            }
          },
        },

        paper: {
          defaults: {
            blank: {
              label: "空白纸",
            },
            ruled: {
              label: "横线纸",
              rowCount: 20,
              strokeWidth: 1,
              gridColor: "#000000",
              doubleFirst: true,
              doubleLast: true,
              ruledClosed: false,
            },
            grid: {
              label: "方格纸",
              gridColumns: 24,
              strokeWidth: 1,
              gridColor: "#000000",
              doubleBorder: true,
              gridDashed: false,
            },
            composition: {
              label: "作文纸",
              columnCount: 12,
              rowCount: 15,
              strokeWidth: 1,
              gridColor: "#000000",
              doubleBorder: true,
            },
            english: {
              label: "英文纸",
              rowCount: 10,
              englishLineGap: 3,
              englishGroupGap: 10,
              englishOffset: 0,
              strokeWidth: 1,
            },
            music: {
              label: "乐谱纸",
              staffCount: 12,
              staffLineGap: 2.5,
              staffGroupGap: 12,
              strokeWidth: 1,
              staffLineCount: 5,
              gridColor: "#000000",
            },
            tianzige: {
              label: "田字格",
              tianSize: 18,
              tianInnerScale: 0.5,
              strokeWidth: 1,
              doubleBorder: true,
              gridDashed: true,
            },
            mizige: {
              label: "米字格",
              tianSize: 18,
              tianInnerScale: 0.5,
              strokeWidth: 1,
              doubleBorder: true,
              gridDashed: true,
            },
            huizige: {
              label: "回字格",
              tianSize: 18,
              tianInnerScale: 0.4,
              strokeWidth: 1,
              doubleBorder: true,
              huiInnerW: 8,
              huiInnerH: 10,
              gridDashed: true,
            },
            jiugongge: {
              label: "宫格纸",
              tianSize: 18,
              tianInnerScale: 0.4,
              strokeWidth: 1,
              doubleBorder: true,
              jiuCols: 3,
              jiuRows: 3,
            },
            dots: {
              label: "点阵纸",
              dotSpace: 5,
              dotSize: 0.5,
              gridColor: "#000000",
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              otStagger: false,
            },
            triangle: {
              label: "等距网格",
              geoSize: 10,
              strokeWidth: 1,
              gridColor: "#000000",
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
            },
            hexagon: {
              label: "六边形网格",
              strokeWidth: 1,
              gridColor: "#000000",
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
            },
            label: {
              label: "标签打印",
              labelWidth: 105,
              labelHeight: 74.2,
              labelCols: 2,
              labelRows: 4,
              labelGapH: 0,
              labelGapV: 0,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              labelQuantity: 1,
            },
          },

          renderers: {
            blank: function (cfg, canvas) {
              return;
            },
            
            ruled: function (cfg, canvas, opts = {}) {
              if (cfg.rowCount <= 0) return;
              const GAP = 3;
              const thickW = cfg.strokeWidth + 2;
              const padTop = cfg.doubleFirst ? GAP + thickW / 2 : cfg.strokeWidth / 2;
              const padBottom = cfg.doubleLast ? GAP + thickW / 2 : cfg.strokeWidth / 2;
              const padX = cfg.ruledClosed && cfg.ruledClosedDouble ? GAP + thickW / 2 : cfg.strokeWidth / 2;
              const startX = Math.max(cfg.marginLeft, padX);
              const endX = App.state.baseWidth - Math.max(cfg.marginRight, padX);
              const startY = Math.max(cfg.marginTop, padTop) + (opts.startYOffset || 0);
              const contentHeight = App.state.baseHeight - Math.max(cfg.marginBottom, padBottom) - startY;
              if (endX - startX <= 0 || contentHeight <= 0) return;
              const lineHeight = contentHeight / cfg.rowCount;
              const gridLines = [];
              const dashArr = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              const outerTop = cfg.doubleFirst ? startY - GAP : startY;
              const outerBottom = cfg.doubleLast ? startY + cfg.rowCount * lineHeight + GAP : startY + cfg.rowCount * lineHeight;
              const innerTop = cfg.doubleFirst ? startY + GAP : startY;
              const innerBottom = cfg.doubleLast ? startY + cfg.rowCount * lineHeight - GAP : startY + cfg.rowCount * lineHeight;
              let xOuterL = startX,
                xOuterR = endX;
              let xInnerL = startX,
                xInnerR = endX;
              if (cfg.ruledClosed && cfg.ruledClosedDouble) {
                xOuterL = startX - GAP;
                xOuterR = endX + GAP;
                xInnerL = startX + GAP;
                xInnerR = endX - GAP;
              }

              const addLine = (y, w, xStart, xEnd, extra = {}) => {
                gridLines.push(
                  new fabric.Line([xStart, y, xEnd, y], {
                    stroke: cfg.gridColor,
                    strokeWidth: w,
                    selectable: false,
                    evented: false,
                    isGrid: true,
                    strokeLineCap: "butt",
                    excludeFromExport: true,
                    originX: "center",
                    originY: "center",
                    ...extra,
                  }),
                );
              };
              for (let i = 0; i <= cfg.rowCount; i++) {
                const y = startY + i * lineHeight;
                if (i === 0 && cfg.doubleFirst) {
                  addLine(y - GAP, thickW, xOuterL, xOuterR);
                  addLine(y + GAP, Math.max(1, cfg.strokeWidth), xInnerL, xInnerR);
                } else if (i === cfg.rowCount && cfg.doubleLast) {
                  addLine(y - GAP, Math.max(1, cfg.strokeWidth), xInnerL, xInnerR);
                  addLine(y + GAP, thickW, xOuterL, xOuterR);
                } else {
                  addLine(
                    y,
                    cfg.strokeWidth,
                    xInnerL,
                    xInnerR,
                    dashArr && i > 0 && i < cfg.rowCount
                      ? {
                          strokeDashArray: dashArr,
                        }
                      : {},
                  );
                }
              }

              if (cfg.ruledClosed) {
                const edgeBase = {
                  stroke: cfg.gridColor,
                  selectable: false,
                  evented: false,
                  isGrid: true,
                  excludeFromExport: true,
                  originX: "center",
                  originY: "center",
                  strokeLineCap: "butt",
                };
                const extendDist = thickW / 2;
                const outerY1 = outerTop - extendDist;
                const outerY2 = outerBottom + extendDist;
                const drawEdge = (x, side) => {
                  if (cfg.ruledClosedDouble) {
                    const outerX = side === "left" ? x - GAP : x + GAP;
                    const innerX = side === "left" ? x + GAP : x - GAP;
                    const innerY1 = innerTop - Math.max(1, cfg.strokeWidth) / 2;
                    const innerY2 = innerBottom + Math.max(1, cfg.strokeWidth) / 2;
                    return [
                      new fabric.Line([outerX, outerY1, outerX, outerY2], {
                        ...edgeBase,
                        strokeWidth: thickW,
                      }),
                      new fabric.Line([innerX, innerY1, innerX, innerY2], {
                        ...edgeBase,
                        strokeWidth: Math.max(1, cfg.strokeWidth),
                      }),
                    ];
                  }
                  return [
                    new fabric.Line([x, outerY1, x, outerY2], {
                      ...edgeBase,
                      strokeWidth: Math.max(1, cfg.strokeWidth),
                    }),
                  ];
                };
                [...drawEdge(startX, "left"), ...drawEdge(endX, "right")].forEach((l) => gridLines.push(l));
              }

              gridLines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            english: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const endX = App.state.baseWidth - cfg.marginRight;
              const startY = cfg.marginTop + cfg.englishOffset;
              const usableHeight = App.state.baseHeight - startY - cfg.marginBottom;
              if (usableHeight <= 0 || endX - startX <= 0) return;
              const lineGap = Math.max(cfg.englishLineGap, 1);
              const groupGap = Math.max(0, cfg.englishGroupGap ?? cfg.englishLineGap);
              const cellHeight = lineGap * 3;
              const maxGroups = Math.max(0, Math.floor((usableHeight + groupGap) / (cellHeight + groupGap)));
              const staffCount = Math.min(cfg.rowCount, maxGroups);
              if (staffCount <= 0) return;
              const dashArr = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              const lines = [];
              for (let s = 0; s < staffCount; s++) {
                const base = startY + s * (cellHeight + groupGap);
                for (let i = 0; i < 4; i++) {
                  const y = base + i * lineGap;
                  lines.push(
                    new fabric.Line([startX, y, endX, y], {
                      stroke: cfg.gridColor,
                      strokeWidth: cfg.strokeWidth,
                      strokeDashArray: i === 2 || !dashArr ? null : dashArr,
                      selectable: false,
                      evented: false,
                      isGrid: true,
                      excludeFromExport: true,
                      originX: "center",
                      originY: "center",
                    }),
                  );
                }
              }
              lines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            grid: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const endX = App.state.baseWidth - cfg.marginRight;
              const startY = cfg.marginTop;
              const endY = App.state.baseHeight - cfg.marginBottom;
              if (endX - startX <= 0 || endY - startY <= 0) return;
              const cols = Math.max(1, cfg.gridColumns || 1);
              const cellSizeX = (endX - startX) / cols;
              let rows = Math.max(1, Math.round((endY - startY) / cellSizeX));
              let cellSize = (endY - startY) / rows;
              cellSize = Math.min(cellSize, cellSizeX);
              rows = Math.max(1, Math.round((endY - startY) / cellSize));
              cellSize = (endY - startY) / rows;
              const gridW = cellSize * cols;
              const gridH = endY - startY;
              const dash = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              const lines = [];
              for (let i = 1; i < cols; i++) {
                const x = startX + i * cellSize;
                lines.push(
                  new fabric.Line([x, startY, x, startY + gridH], {
                    stroke: cfg.gridColor,
                    strokeWidth: cfg.strokeWidth,
                    strokeDashArray: dash,
                    selectable: false,
                    evented: false,
                    isGrid: true,
                    excludeFromExport: true,
                    originX: "center",
                    originY: "center",
                    strokeLineCap: "butt",
                  }),
                );
              }
              for (let j = 1; j < rows; j++) {
                const y = startY + j * cellSize;
                lines.push(
                  new fabric.Line([startX, y, startX + gridW, y], {
                    stroke: cfg.gridColor,
                    strokeWidth: cfg.strokeWidth,
                    strokeDashArray: dash,
                    selectable: false,
                    evented: false,
                    isGrid: true,
                    excludeFromExport: true,
                    originX: "center",
                    originY: "center",
                    strokeLineCap: "butt",
                  }),
                );
              }

              this._drawBorder(canvas, startX, startY, gridW, gridH, cfg);
              lines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            composition: function (cfg, canvas) {
              if (cfg.rowCount <= 0) return;
              const startX = cfg.marginLeft;
              const startY = cfg.marginTop;
              const availW = App.state.baseWidth - cfg.marginLeft - cfg.marginRight;
              const availH = App.state.baseHeight - cfg.marginTop - cfg.marginBottom;
              if (availW <= 0 || availH <= 0) return;
              const colCount = Math.max(1, cfg.columnCount);
              const rowCount = Math.max(1, cfg.rowCount);
              const cellW = availW / colCount;
              const totalRowH = availH / rowCount;
              const cellH = totalRowH * 0.75;
              const lines = [];
              const hLineOpts = {
                stroke: cfg.gridColor,
                strokeWidth: cfg.strokeWidth,
                selectable: false,
                evented: false,
                isGrid: true,
                excludeFromExport: true,
                originX: "center",
                originY: "center",
                strokeLineCap: "butt",
              };
              for (let r = 0; r < rowCount; r++) {
                const currentTop = startY + r * totalRowH;
                const currentBottom = currentTop + cellH;
                for (let c = 1; c < colCount; c++) {
                  const x = startX + c * cellW;
                  lines.push(new fabric.Line([x, currentTop, x, currentBottom], hLineOpts));
                }

                lines.push(new fabric.Line([startX, currentTop, startX + availW, currentTop], hLineOpts));
                lines.push(new fabric.Line([startX, currentBottom, startX + availW, currentBottom], hLineOpts));
              }

              this._drawBorder(canvas, startX, startY, availW, availH, cfg);
              lines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            music: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const endX = App.state.baseWidth - cfg.marginRight;
              const availHeight = App.state.baseHeight - cfg.marginTop - cfg.marginBottom;
              if (availHeight <= 0 || endX - startX <= 0) return;
              let lineGap = Math.max(1, cfg.staffLineGap);
              let groupGap = Math.max(0, cfg.staffGroupGap);
              const lineCount = Math.max(1, cfg.staffLineCount);
              const spaceCount = Math.max(0, lineCount - 1);
              const staffHeight = lineGap * spaceCount;
              let totalHeight = cfg.staffCount * staffHeight + (cfg.staffCount - 1) * groupGap;
              if (totalHeight > availHeight) {
                const scale = availHeight / totalHeight;
                lineGap *= scale;
                groupGap *= scale;
              }

              const finalStaffHeight = lineGap * spaceCount;
              const startY = cfg.marginTop + (availHeight - (cfg.staffCount * finalStaffHeight + (cfg.staffCount - 1) * groupGap)) / 2;
              const lines = [];
              for (let s = 0; s < cfg.staffCount; s++) {
                const top = startY + s * (finalStaffHeight + groupGap);
                for (let i = 0; i < lineCount; i++) {
                  const y = top + i * lineGap;
                  lines.push(
                    new fabric.Line([startX, y, endX, y], {
                      stroke: cfg.gridColor,
                      strokeWidth: cfg.strokeWidth,
                      selectable: false,
                      evented: false,
                      isGrid: true,
                      excludeFromExport: true,
                      originX: "center",
                      originY: "center",
                    }),
                  );
                }
              }
              lines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            // --- 辅助：田字格/米字格/回字格/九宫格通用绘制 ---
            drawTianBase: function (cfg, canvas, options = {}) {
              const borderPad = cfg.doubleBorder ? 4 + cfg.strokeWidth : cfg.strokeWidth / 2;
              const startX = Math.max(cfg.marginLeft, borderPad);
              const startY = Math.max(cfg.marginTop, borderPad);
              const endX = App.state.baseWidth - Math.max(cfg.marginRight, borderPad);
              const endY = App.state.baseHeight - Math.max(cfg.marginBottom, borderPad);
              if (endX - startX <= 0 || endY - startY <= 0) return;
              let baseSize = Math.max(6, cfg.tianSize);
              let cols = Math.max(1, Math.round((endX - startX) / baseSize));
              let rows = Math.max(1, Math.round((endY - startY) / baseSize));
              let size = Math.min((endX - startX) / cols, (endY - startY) / rows);
              rows = Math.max(1, Math.round((endY - startY) / size));
              size = (endY - startY) / rows;
              cols = Math.max(1, Math.round((endX - startX) / size));
              size = Math.min(size, (endX - startX) / cols);
              const gridW = cols * size;
              const gridH = rows * size;
              const scale = cfg.tianInnerScale || 0.4;
              const calculatedWidth = cfg.strokeWidth * scale;
              const innerWidth = Math.max(0.3, Math.min(calculatedWidth, cfg.strokeWidth - 0.1));
              const innerDash = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              const lines = [];
              for (let c = 1; c < cols; c++) {
                const x = startX + c * size;
                lines.push(
                  new fabric.Line([x, startY, x, startY + gridH], {
                    stroke: cfg.gridColor,
                    strokeWidth: cfg.strokeWidth,
                    selectable: false,
                    evented: false,
                    isGrid: true,
                    excludeFromExport: true,
                    originX: "center",
                    originY: "center",
                    strokeLineCap: "butt",
                  }),
                );
              }
              for (let r = 1; r < rows; r++) {
                const y = startY + r * size;
                lines.push(
                  new fabric.Line([startX, y, startX + gridW, y], {
                    stroke: cfg.gridColor,
                    strokeWidth: cfg.strokeWidth,
                    selectable: false,
                    evented: false,
                    isGrid: true,
                    excludeFromExport: true,
                    originX: "center",
                    originY: "center",
                    strokeLineCap: "butt",
                  }),
                );
              }

              const innerOpts = {
                selectable: false,
                evented: false,
                isGrid: true,
                excludeFromExport: true,
                originX: "center",
                originY: "center",
                strokeLineCap: "butt",
              };
              for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                  const x = startX + c * size;
                  const y = startY + r * size;
                  const cx = x + size / 2;
                  const cy = y + size / 2;
                  if (options.subGrid) {
                    const nCols = Math.max(1, cfg.jiuCols);
                    const nRows = Math.max(1, cfg.jiuRows);
                    if (nCols > 1) {
                      const stepX = size / nCols;
                      for (let i = 1; i < nCols; i++) {
                        const lx = x + stepX * i;
                        lines.push(
                          new fabric.Line([lx, y, lx, y + size], {
                            stroke: cfg.gridColor,
                            strokeWidth: innerWidth,
                            strokeDashArray: innerDash,
                            ...innerOpts,
                          }),
                        );
                      }
                    }
                    if (nRows > 1) {
                      const stepY = size / nRows;
                      for (let j = 1; j < nRows; j++) {
                        const ly = y + stepY * j;
                        lines.push(
                          new fabric.Line([x, ly, x + size, ly], {
                            stroke: cfg.gridColor,
                            strokeWidth: innerWidth,
                            strokeDashArray: innerDash,
                            ...innerOpts,
                          }),
                        );
                      }
                    }
                  }

                  if (options.cross !== false) {
                    lines.push(
                      new fabric.Line([x, cy, x + size, cy], {
                        stroke: cfg.gridColor,
                        strokeWidth: innerWidth,
                        strokeDashArray: innerDash,
                        ...innerOpts,
                      }),
                    );
                    lines.push(
                      new fabric.Line([cx, y, cx, y + size], {
                        stroke: cfg.gridColor,
                        strokeWidth: innerWidth,
                        strokeDashArray: innerDash,
                        ...innerOpts,
                      }),
                    );
                  }
                  if (options.diagonals) {
                    lines.push(
                      new fabric.Line([x, y, x + size, y + size], {
                        stroke: cfg.gridColor,
                        strokeWidth: innerWidth,
                        strokeDashArray: innerDash,
                        ...innerOpts,
                      }),
                    );
                    lines.push(
                      new fabric.Line([x, y + size, x + size, y], {
                        stroke: cfg.gridColor,
                        strokeWidth: innerWidth,
                        strokeDashArray: innerDash,
                        ...innerOpts,
                      }),
                    );
                  }
                  if (options.innerSquare) {
                    const safeW = Math.min(cfg.huiInnerW, size);
                    const safeH = Math.min(cfg.huiInnerH, size);
                    lines.push(
                      new fabric.Rect({
                        left: cx,
                        top: cy,
                        width: safeW,
                        height: safeH,
                        fill: "transparent",
                        stroke: cfg.gridColor,
                        strokeWidth: innerWidth,
                        strokeDashArray: innerDash,
                        ...innerOpts,
                      }),
                    );
                  }
                }
              }

              this._drawBorder(canvas, startX, startY, gridW, gridH, cfg);
              lines.forEach((l) => {
                canvas.add(l);
                canvas.sendToBack(l);
              });
            },

            dots: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const startY = cfg.marginTop;
              const endX = App.state.baseWidth - cfg.marginRight;
              const endY = App.state.baseHeight - cfg.marginBottom;
              const w = endX - startX;
              const h = endY - startY;
              if (w <= 0 || h <= 0) return;
              const space = Math.max(2, cfg.dotSpace);
              const r = cfg.dotSize / 2;
              const epsilon = 0.01;
              const rowHeight = cfg.dotStagger ? (space * Math.sqrt(3)) / 2 : space;
              const cols = Math.ceil(w / space);
              const rows = Math.ceil(h / rowHeight);
              const contentW = cols * space;
              const contentH = rows * rowHeight;
              const offsetX = (w - contentW) / 2 + (cfg.dotStagger ? space / 4 : 0);
              const offsetY = (h - contentH) / 2;
              let pathData = "";
              for (let row = -1; row <= rows + 1; row++) {
                const isStagger = cfg.dotStagger && row % 2 !== 0;
                const staggerX = isStagger ? space / 2 : 0;
                for (let col = -1; col <= cols + 1; col++) {
                  const cx = startX + offsetX + col * space + staggerX;
                  const cy = startY + offsetY + row * rowHeight;
                  if (cx - r < startX - epsilon || cx + r > endX + epsilon || cy - r < startY - epsilon || cy + r > endY + epsilon) {
                    continue;
                  }

                  const cxF = cx.toFixed(2);
                  const cy1 = (cy - r).toFixed(2);
                  const cy2 = (cy + r).toFixed(2);
                  const rF = r.toFixed(2);
                  pathData += `M ${cxF} ${cy1} A ${rF} ${rF} 0 1 1 ${cxF} ${cy2} A ${rF} ${rF} 0 1 1 ${cxF} ${cy1} `;
                }
              }

              this._addPathToCanvas(canvas, pathData, cfg, {
                objectCaching: false,
                stroke: null,
                strokeWidth: 0,
                fill: cfg.gridColor,
              });
            },

            triangle: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const startY = cfg.marginTop;
              const endX = App.state.baseWidth - cfg.marginRight;
              const endY = App.state.baseHeight - cfg.marginBottom;
              const w = endX - startX;
              const h = endY - startY;
              if (w <= 0 || h <= 0) return;
              const side = Math.max(2, cfg.geoSize);
              const triHeight = (Math.sqrt(3) / 2) * side;
              const cols = Math.ceil(w / side) + 2;
              const rows = Math.ceil(h / triHeight) + 2;
              let pathData = "";
              const addClippedLine = (x1, y1, x2, y2) => {
                const line = Utils.clipLine(x1, y1, x2, y2, startX, startY, endX, endY);
                if (line) {
                  pathData += `M ${line.x1.toFixed(2)} ${line.y1.toFixed(2)} L ${line.x2.toFixed(2)} ${line.y2.toFixed(2)} `;
                }
              };
              for (let row = -1; row < rows; row++) {
                const yBase = startY + row * triHeight;
                const offsetX = row % 2 === 0 ? 0 : side / 2;
                for (let col = -1; col < cols; col++) {
                  const cx = startX + col * side + offsetX;
                  if (cx < startX - side && cx > endX + side && yBase < startY - triHeight && yBase > endY + triHeight) continue;
                  addClippedLine(cx, yBase, cx - side / 2, yBase + triHeight);
                  addClippedLine(cx - side / 2, yBase + triHeight, cx + side / 2, yBase + triHeight);
                  addClippedLine(cx + side / 2, yBase + triHeight, cx, yBase);
                }
              }

              const dash = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              this._addPathToCanvas(canvas, pathData, cfg, {
                objectCaching: false,
                fill: "transparent",
                strokeLineCap: "square",
                strokeDashArray: dash,
              });
            },

            hexagon: function (cfg, canvas) {
              const startX = cfg.marginLeft;
              const startY = cfg.marginTop;
              const endX = App.state.baseWidth - cfg.marginRight;
              const endY = App.state.baseHeight - cfg.marginBottom;
              const w = endX - startX;
              const h = endY - startY;
              if (w <= 0 || h <= 0) return;
              const r = cfg.geoSize;
              const hexW = Math.sqrt(3) * r;
              const vertDist = 1.5 * r;
              const cols = Math.ceil(w / hexW) + 2;
              const rows = Math.ceil(h / vertDist) + 2;
              let pathData = "";
              const addClippedLine = (x1, y1, x2, y2) => {
                const line = Utils.clipLine(x1, y1, x2, y2, startX, startY, endX, endY);
                if (line) {
                  pathData += `M ${line.x1.toFixed(2)} ${line.y1.toFixed(2)} L ${line.x2.toFixed(2)} ${line.y2.toFixed(2)} `;
                }
              };
              for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                  const xOffset = row % 2 !== 0 ? hexW / 2 : 0;
                  const cx = startX + col * hexW + xOffset;
                  const cy = startY + row * vertDist;
                  if (cx < startX - hexW || cx > endX + hexW || cy < startY - r || cy > endY + r) continue;
                  const pts = [];
                  for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 180) * (30 + 60 * i);
                    pts.push({
                      x: cx + r * Math.cos(angle),
                      y: cy + r * Math.sin(angle),
                    });
                  }
                  for (let i = 0; i < 6; i++) {
                    addClippedLine(pts[i].x, pts[i].y, pts[(i + 1) % 6].x, pts[(i + 1) % 6].y);
                  }
                }
              }

              const dash = cfg.gridDashed ? [cfg.gridDashArray, cfg.gridDashArray] : null;
              this._addPathToCanvas(canvas, pathData, cfg, {
                objectCaching: false,
                fill: "transparent",
                strokeLineCap: "square",
                strokeDashArray: dash,
              });
            },

            label: function (cfg, canvas) {
              if (App.state.label.mode !== "design") return;
              const w = App.state.baseWidth;
              const h = App.state.baseHeight;
              canvas.add(
                new fabric.Rect({
                  left: 0,
                  top: 0,
                  width: w,
                  height: h,
                  fill: "transparent",
                  strokeWidth: 1,
                  selectable: false,
                  evented: false,
                  isGrid: true,
                }),
              );
            },
            
            _addPathToCanvas: function (canvas, pathData, cfg, styleOpts) {
              if (!pathData || pathData.length === 0) return;
              const opts = {
                fill: "transparent",
                stroke: cfg.gridColor,
                strokeWidth: cfg.strokeWidth,
                selectable: false,
                evented: false,
                isGrid: true,
                excludeFromExport: true,
                objectCaching: false,
                noScaleCache: true,
                strokeLineCap: "round",
                strokeLineJoin: "round",
                ...(styleOpts || {}),
              };
              const path = new fabric.Path(pathData, opts);
              canvas.add(path);
              canvas.sendToBack(path);
            },

            tianzige: function (cfg, canvas) {
              this.drawTianBase(cfg, canvas, {
                cross: true,
              });
            },
            mizige: function (cfg, canvas) {
              this.drawTianBase(cfg, canvas, {
                cross: true,
                diagonals: true,
              });
            },
            huizige: function (cfg, canvas) {
              this.drawTianBase(cfg, canvas, {
                cross: true,
                innerSquare: true,
                squareRatio: cfg.tianInnerScale || 0.5,
              });
            },
            jiugongge: function (cfg, canvas) {
              this.drawTianBase(cfg, canvas, {
                subGrid: true,
                cross: false,
                diagonals: false,
                innerSquare: false,
              });
            },

            _drawBorder: function (canvas, x, y, w, h, cfg) {
              if (cfg.doubleBorder) this._drawDoubleFrame(canvas, x, y, w, h, cfg);
              else this._drawSingleFrame(canvas, x, y, w, h, cfg);
            },

            _drawSingleFrame: function (canvas, x, y, w, h, cfg) {
              canvas.add(
                new fabric.Rect({
                  fill: "transparent",
                  stroke: cfg.gridColor,
                  selectable: false,
                  evented: false,
                  isGrid: true,
                  excludeFromExport: true,
                  originX: "left",
                  originY: "top",
                  objectCaching: false,
                  strokeLineCap: "square",
                  strokeLineJoin: "miter",
                  left: x,
                  top: y,
                  width: w,
                  height: h,
                  strokeWidth: cfg.strokeWidth,
                }),
              );
            },

            _drawDoubleFrame: function (canvas, x, y, w, h, cfg) {
              const GAP = 3;
              const thickW = cfg.strokeWidth + 2;
              const thinW = Math.max(1, cfg.strokeWidth);
              const common = {
                fill: "transparent",
                stroke: cfg.gridColor,
                selectable: false,
                evented: false,
                isGrid: true,
                excludeFromExport: true,
                originX: "center",
                originY: "center",
                strokeLineJoin: "miter",
                strokeLineCap: "square",
                objectCaching: false,
              };
              const centerX = x + w / 2;
              const centerY = y + h / 2;
              canvas.add(
                new fabric.Rect({
                  ...common,
                  left: centerX,
                  top: centerY,
                  width: w,
                  height: h,
                  strokeWidth: thinW,
                }),
              );
              const offset = GAP + thinW / 2 + thickW / 2;
              canvas.add(
                new fabric.Rect({
                  ...common,
                  left: centerX,
                  top: centerY,
                  width: w + offset * 2,
                  height: h + offset * 2,
                  strokeWidth: thickW,
                }),
              );
            },
          },

          init: function () {
            const select = document.getElementById("paperType");
            if (select) {
              select.innerHTML = "";
              Object.keys(this.defaults).forEach((key) => {
                const opt = document.createElement("option");
                opt.value = key;
                opt.innerText = this.defaults[key].label;
                select.appendChild(opt);
              });
            }

            const initialType = select.value || "blank";
            this.changeType(initialType, true);
            this.updateSize();
          },

          changeType: function (type, applyDefaults = false) {
            App.state.paperType = type;
            document.querySelectorAll("[data-paper-types]").forEach((el) => {
              const types = (el.dataset.paperTypes || "").split(",").map((t) => t.trim());
              el.classList.toggle("hidden", !types.includes(type));
            });
            if (type === "label") {
              document.getElementById("labelModeToggle").classList.remove("hidden");
              App.state.label.mode = "design";
              App.state.label.designContent = null;
              App.label.updateToggleButtonUI();
            } else {
              document.getElementById("labelModeToggle").classList.add("hidden");
              if (App.state.label.mode === "preview") App.label.enterDesign();
              const fitLabel = document.getElementById("fitLabelSize");
              if (fitLabel) fitLabel.checked = false;
            }

            if (applyDefaults && this.defaults[type]) {
              const specificConfig = this.defaults[type];
              const baseDefaults = {
                marginTop: 25,
                marginBottom: 25,
                marginLeft: 20,
                marginRight: 20,
                paperBgColor: "#ffffff",
                gridColor: "#000000",
                strokeWidth: 1,
                doubleFirst: false,
                doubleLast: false,
                ruledClosed: false,
                gridDashed: false,
              };
              const finalConfig = { ...baseDefaults, ...specificConfig };
              Object.keys(finalConfig).forEach((key) => {
                if (key === "label") return;
                const el = document.getElementById(key);
                if (el) el.type === "checkbox" ? (el.checked = !!finalConfig[key]) : (el.value = finalConfig[key]);
              });
            }

            this.updateSettings();
            this.updateSize();
          },

          updateSettings: function () {
            const rc = document.getElementById("rowCount");
            if (rc) document.getElementById("rowCountDisplay").value = rc.value;
            const cc = document.getElementById("columnCount");
            if (cc) document.getElementById("columnCountDisplay").value = cc.value;
            const gc = document.getElementById("gridColumns");
            if (gc) document.getElementById("gridColDisplay").value = gc.value;
            App.state.hasUnsavedChanges = true;
            App.draft.schedule();
            if (App.state.paperType !== "label") {
              this.drawPaper();
            } else if (App.state.label.mode === "design") {
              App.paper.updateSize();
            } else {
              App.label.renderPreview();
            }
          },

          getSettings: function () {
            const el = (id) => document.getElementById(id);
            const val = (id, def) => (el(id) ? el(id).value : def);
            const mmVal = (id, def) => {
              if (!el(id)) return def;
              const n = parseFloat(el(id).value);
              return isNaN(n) ? def : n;
            };
            const intVal = (id, def) => {
              const n = parseInt(val(id, def), 10);
              return isNaN(n) ? def : n;
            };
            const floatVal = (id, def) => {
              const n = parseFloat(val(id, def));
              return isNaN(n) ? def : n;
            };
            const chk = (id) => (el(id) ? el(id).checked : false);
            const cfg = {
              customW: intVal("customW", 210),
              customH: intVal("customH", 297),
              type: val("paperType", "ruled"),
              marginTop: mmVal("marginTop", 25) * CONFIG.MM_TO_PX,
              marginBottom: mmVal("marginBottom", 25) * CONFIG.MM_TO_PX,
              marginLeft: mmVal("marginLeft", 20) * CONFIG.MM_TO_PX,
              marginRight: mmVal("marginRight", 20) * CONFIG.MM_TO_PX,
              rowCount: intVal("rowCount", 20),
              gridColor: val("gridColor", "#000000"),
              strokeWidth: floatVal("strokeWidth", 1),
              doubleFirst: chk("doubleFirst"),
              paperOrientation: chk("paperOrientation"),
              dual: chk("paperDual"),
              doubleLast: chk("doubleLast"),
              gridDashed: chk("gridDashed"),
              gridDashArray: intVal("gridDashArray", 4),
              paperBgColor: val("paperBgColor", "#ffffff"),
              englishOffset: mmVal("englishOffset", 0) * CONFIG.MM_TO_PX,
              englishLineGap: mmVal("englishLineGap", 6) * CONFIG.MM_TO_PX,
              englishGroupGap: mmVal("englishGroupGap", 6) * CONFIG.MM_TO_PX,
              columnCount: intVal("columnCount", 12),
              gridColumns: intVal("gridColumns", 24),
              staffCount: intVal("staffCount", 8),
              staffLineGap: mmVal("staffLineGap", 3) * CONFIG.MM_TO_PX,
              staffGroupGap: mmVal("staffGroupGap", 12) * CONFIG.MM_TO_PX,
              staffLineCount: intVal("staffLineCount", 5),
              tianSize: mmVal("tianSize", 20) * CONFIG.MM_TO_PX,
              geoSize: mmVal("geoSize", 10) * CONFIG.MM_TO_PX,
              tianInnerScale: floatVal("tianInnerScale", 0.5),
              ruledClosed: chk("ruledClosed"),
              dotStagger: chk("dotStagger"),
              ruledClosedDouble: chk("ruledClosedDouble"),
              doubleBorder: chk("doubleBorder"),
              huiInnerW: mmVal("huiInnerW", 10) * CONFIG.MM_TO_PX,
              huiInnerH: mmVal("huiInnerH", 10) * CONFIG.MM_TO_PX,
              dotSpace: mmVal("dotSpace", 5) * CONFIG.MM_TO_PX,
              dotSize: mmVal("dotSize", 1) * CONFIG.MM_TO_PX,
              jiuCols: intVal("jiuCols", 3),
              jiuRows: intVal("jiuRows", 3),
              labelWidth: floatVal("labelWidth", 50),
              labelHeight: floatVal("labelHeight", 30),
              labelCols: intVal("labelCols", 3),
              labelRows: intVal("labelRows", 7),
              labelGapH: floatVal("labelGapH", 2.5),
              labelGapV: floatVal("labelGapV", 2.5),
              labelQuantity: intVal("labelQuantity", 1),
              showCropMarks: chk("showCropMarks"),
            };
            if (chk("fitLabelSize")) {
              cfg.labelCols = cfg.labelRows = 1;
              cfg.showCropMarks = false;
              cfg.marginTop = cfg.marginBottom = cfg.marginLeft = cfg.marginRight = cfg.labelGapH = cfg.labelGapV = 0;
            }

            return cfg;
          },

          updateSize: function () {
            const el = (id) => document.getElementById(id);
            const type = el("paperType").value;
            const sizeKey = el("paperSize").value;
            const fitLabel = el("fitLabelSize") && el("fitLabelSize").checked;
            const isDesign = type === "label" && App.state.label.mode === "design";
            App.state.paperType = type;
             const customSizeInputs = el("customSizeInputs");
              if (customSizeInputs) {
                if (sizeKey === "CUSTOM") {
                  customSizeInputs.classList.remove("hidden");
                } else {
                  customSizeInputs.classList.add("hidden");
                }
              }
            if (el("paperOptions")) {
              ["paperOptions", "showMarks", "labelLayout"].forEach((k) => {
                const element = el(k);
                if (element) element.style.display = type === "label" && fitLabel ? "none" : "";
              });
            }

            let w, h;
            const isLand = el("paperOrientation").checked;
            if (isDesign) {
              const cfg = this.getSettings();
              [w, h] = [cfg.labelWidth, cfg.labelHeight];
            } else {
              if (type === "label" && fitLabel) {
                w = parseFloat(el("labelWidth").value) || 50;
                h = parseFloat(el("labelHeight").value) || 30;
              } else {
                let pw, ph;
                if (sizeKey === "CUSTOM") {
                  pw = parseFloat(el("customW").value) || 210;
                  ph = parseFloat(el("customH").value) || 297;
                } else {
                  const sizeDef = CONFIG.SIZES[sizeKey] || CONFIG.SIZES["A4"];
                  pw = sizeDef.w;
                  ph = sizeDef.h;
                }

                [w, h] = isLand ? [Math.max(pw, ph), Math.min(pw, ph)] : [Math.min(pw, ph), Math.max(pw, ph)];
              }
            }

            const dualWrapper = el("dualOptionWrapper");
            if (dualWrapper) {
              if (type !== "label" && isLand) {
                dualWrapper.classList.remove("hidden");
              } else {
                dualWrapper.classList.add("hidden");
                if (el("paperDual").checked) el("paperDual").checked = false;
              }
            }

            const labelText = `${isDesign ? "标签设计" : fitLabel && type === "label" ? "单张标签" : sizeKey} (${w} x ${h} mm)`;
            if (el("canvasSizeLabel")) el("canvasSizeLabel").innerText = labelText;
            App.state.currentPaper = { w, h };
            App.state.baseWidth = w * CONFIG.MM_TO_PX;
            App.state.baseHeight = h * CONFIG.MM_TO_PX;
            App.zoom.autoFit();
            if (type === "label" && App.state.label.mode === "preview") {
              App.label.renderPreview();
            } else {
              this.drawPaper();
            }
            App.ruler.draw();
          },

          drawPaper: function () {
            const cfg = this.getSettings();
            const canvas = App.canvas;
            canvas.remove(...canvas.getObjects().filter((o) => o.isGrid));
            canvas.setBackgroundColor(cfg.paperBgColor, canvas.requestRenderAll.bind(canvas));
            const renderer = this.renderers[cfg.type] || this.renderers.ruled;
            try {
              if (cfg.dual && App.state.baseWidth > App.state.baseHeight) {
                const originalBaseWidth = App.state.baseWidth;
                const halfWidth = originalBaseWidth / 2;
                const originalAdd = canvas.add.bind(canvas);
                App.state.baseWidth = halfWidth;
                renderer.call(this.renderers, cfg, canvas);
                canvas.add = function (...objects) {
                  objects.forEach((obj) => {
                    if (obj) {
                      obj.left += halfWidth;
                      if (obj.type === "line") {
                        obj.setCoords();
                      }
                    }
                  });
                  originalAdd(...objects);
                };
                renderer.call(this.renderers, cfg, canvas);
                canvas.add = originalAdd;
                App.state.baseWidth = originalBaseWidth;
                const midLine = new fabric.Line([halfWidth, 0, halfWidth, App.state.baseHeight], {
                  stroke: "#ccc",
                  strokeWidth: 1,
                  strokeDashArray: [10, 10],
                  selectable: false,
                  evented: false,
                  isGrid: true,
                  isCutLine: true,
                  originX: "center",
                  originY: "center",
                });
                canvas.add(midLine);
                canvas.sendToBack(midLine);
              } else {
                renderer.call(this.renderers, cfg, canvas);
              }
            } catch (e) {
              console.warn("Render Error:", e);
            }
            canvas.requestRenderAll();
          },

          drawGrid: function () {
            if (App.state.paperType === "label" && App.state.label.mode === "preview") {
              App.label.renderPreview();
            } else {
              this.drawPaper();
            }
          },

          clearBackground: function () {
            if (!App.canvas.backgroundImage) return;
            App.canvas.setBackgroundImage(null, () => {
              App.canvas.renderAll();
              App.state.editingBackground = false;
              App.canvas.discardActiveObject();
              App.ui.updateInspector();
              App.ui.updateLayerList();
              App.history.saveState();
              Utils.toast("背景图片已移除");
            });
          },
          autoLayoutLabels: function () {
            const type = document.getElementById("paperType").value;
            if (type !== "label") return;
            const el = (id) => document.getElementById(id);
            const val = (id) => parseFloat(el(id).value) || 0;
            const sizeKey = el("paperSize").value;
            let sheetW, sheetH;
            if (sizeKey === "CUSTOM") {
              sheetW = val("customW");
              sheetH = val("customH");
            } else {
              const s = CONFIG.SIZES[sizeKey];
              sheetW = s.w;
              sheetH = s.h;
            }
            const isLand = el("paperOrientation").checked;
            const finalSheetW = isLand ? Math.max(sheetW, sheetH) : Math.min(sheetW, sheetH);
            const finalSheetH = isLand ? Math.min(sheetW, sheetH) : Math.max(sheetW, sheetH);
            const marginTop = val("marginTop");
            const marginBottom = val("marginBottom");
            const marginLeft = val("marginLeft");
            const marginRight = val("marginRight");
            const labelW = val("labelWidth");
            const labelH = val("labelHeight");
            const gapH = val("labelGapH");
            const gapV = val("labelGapV");
            if (labelW <= 0 || labelH <= 0) return;
            const availW = finalSheetW - marginLeft - marginRight;
            const availH = finalSheetH - marginTop - marginBottom;
            const cols = Math.floor((availW + gapH) / (labelW + gapH));
            const rows = Math.floor((availH + gapV) / (labelH + gapV));
            el("labelCols").value = Math.max(1, cols);
            el("labelRows").value = Math.max(1, rows);
            App.paper.updateSettings();
          },
          calcLabelSizeFromGrid: function () {
            const el = (id) => document.getElementById(id);
            const val = (id) => parseFloat(el(id).value) || 0;
            const sizeKey = el("paperSize").value;
            let sheetW, sheetH;
            if (sizeKey === "CUSTOM") {
              sheetW = val("customW");
              sheetH = val("customH");
            } else {
              const s = CONFIG.SIZES[sizeKey];
              sheetW = s.w;
              sheetH = s.h;
            }
            const isLand = el("paperOrientation").checked;
            const finalSheetW = isLand ? Math.max(sheetW, sheetH) : Math.min(sheetW, sheetH);
            const finalSheetH = isLand ? Math.min(sheetW, sheetH) : Math.max(sheetW, sheetH);
            const marginTop = val("marginTop");
            const marginBottom = val("marginBottom");
            const marginLeft = val("marginLeft");
            const marginRight = val("marginRight");
            const gapH = val("labelGapH");
            const gapV = val("labelGapV");
            const cols = parseInt(el("labelCols").value) || 1;
            const rows = parseInt(el("labelRows").value) || 1;
            if (cols < 1 || rows < 1) return Utils.toast("行列数必须大于0", "error");
            const availW = finalSheetW - marginLeft - marginRight;
            const availH = finalSheetH - marginTop - marginBottom;
            const totalGapW = (cols - 1) * gapH;
            const totalGapH = (rows - 1) * gapV;
            let newW = (availW - totalGapW) / cols;
            let newH = (availH - totalGapH) / rows;
            newW = Math.floor(newW * 10) / 10;
            newH = Math.floor(newH * 10) / 10;
            if (newW <= 0 || newH <= 0) {
              return Utils.toast("计算结果无效，请检查边距或间距设置", "error");
            }

            el("labelWidth").value = newW;
            el("labelHeight").value = newH;
            this.updateSettings();
          },
        },

        zoom: {
          change: function (delta, point) {
            const oldScale = App.state.zoom;
            const newScale = Math.max(0.1, Math.min(5, oldScale + delta));
            if (newScale === oldScale) return;
            this.apply(newScale);
            if (point) {
              const ct = document.getElementById("scrollContainer");
              const factor = newScale / oldScale;
              ct.scrollLeft = (ct.scrollLeft + point.x) * factor - point.x;
              ct.scrollTop = (ct.scrollTop + point.y) * factor - point.y;
            }
          },

          autoFit: function () {
            const ct = document.getElementById("scrollContainer");
            const isLabelDesign = App.state.paperType === "label" && App.state.label.mode === "design";
            const maxScale = isLabelDesign ? 5.0 : 1.2;
            const scale = Math.min(maxScale, (ct.clientWidth - 60) / App.state.baseWidth, (ct.clientHeight - 60) / App.state.baseHeight);
            this.apply(scale);
            setTimeout(() => {
              const mt = parseFloat(document.getElementById("zoomViewport").style.marginTop) || 40;
              const h = App.state.baseHeight * scale;
              const w = App.state.baseWidth * scale;
              ct.scrollTop = (h + mt + 20 - ct.clientHeight) / 2;
              ct.scrollLeft = (w - ct.clientWidth) / 2 + 30;
            }, 0);
          },

          apply: function (scale) {
            App.state.zoom = scale;
            const w = Math.round(App.state.baseWidth * scale);
            const h = Math.round(App.state.baseHeight * scale);
            App.canvas
              .setDimensions({
                width: w,
                height: h,
              })
              .setZoom(scale);
            const vp = document.getElementById("zoomViewport");
            const ct = document.getElementById("scrollContainer");
            if (vp && ct) {
              vp.style.width = w + "px";
              vp.style.height = h + "px";
              const mt = Math.max(40, (ct.clientHeight - h) / 2);
              vp.style.marginTop = mt + "px";
            }

            document.getElementById("zoomPercent").innerText = Math.round(scale * 100) + "%";
            App.canvas.requestRenderAll();
            App.ruler.draw();
          },
        },

        events: {
          initEvents: function () {
            const container = document.getElementById("scrollContainer");
            const canvasWrap = document.getElementById("canvasWrapper");
            let startX = 0,
              startY = 0,
              scrollLeft = 0,
              scrollTop = 0;
            let dragOrigin = null,
              isDragThresholdPassed = false;
            const updateSelectionQueue = (e) => {
              if (App.state.isReplacingObject) return;
              const { selected, deselected } = e;
              if (selected) {
                selected.forEach((o) => {
                  if (!App.state.selectionQueue.includes(o)) {
                    App.state.selectionQueue.push(o);
                  }

                  const isLocked = o.lockMovementX;
                  const isDynamic = o.isDynamicDate || o.isDynamicPageNum || o.isSerialNumber || (o.dataBinding && o.dataBinding.type === "variable");
                  o.set("editable", !isLocked && !isDynamic);
                });
              }
              if (deselected)
                deselected.forEach((o) => {
                  const idx = App.state.selectionQueue.indexOf(o);
                  if (idx > -1) App.state.selectionQueue.splice(idx, 1);
                });
              App.ui.updateInspector();
            };
            const handleLiveTransform = (e) => {
              const t = e.target;
              if (e.transform?.action === "scale" && t.isTable) t.__tableScaling = true;
              if (["i-text", "textbox", "text"].includes(t.type) && e.transform?.action === "scale") {
                if (Math.abs(t.scaleX - t.scaleY) < 0.01 && Math.abs(t.scaleX - 1) > 0.001) {
                  const newSize = t.fontSize * t.scaleX;
                  t.set({
                    fontSize: newSize,
                    scaleX: 1,
                    scaleY: 1,
                  });
                  if (t.type === "textbox") t.width *= t.scaleX;
                  const propSize = document.getElementById("propSize");
                  if (propSize) propSize.value = Utils.px2pt(newSize);
                }
              }

              if (!this._uiUpdateRaf) {
                this._uiUpdateRaf = requestAnimationFrame(() => {
                  App.ui.updateGeo(null, null, t);
                  this._uiUpdateRaf = null;
                });
              }

              if (dragOrigin && !isDragThresholdPassed && e.transform?.action === "drag") {
                if (Math.abs(t.left - dragOrigin.left) > 3 || Math.abs(t.top - dragOrigin.top) > 3) isDragThresholdPassed = true;
                else
                  t.set({
                    left: dragOrigin.left,
                    top: dragOrigin.top,
                  });
              }
            };
            const handleObjectModified = (e) => {
              const t = e.target;
              if (!t) return;
              if (t.isTable && t.__tableScaling) {
                t.__tableScaling = false;
                App.tableEditor.normalizeScaledTable(t);
              }
              if (t.isBarcode && t.barcodeConfig) {
                if (Math.abs(t.scaleX - 1) > 0.01 || Math.abs(t.scaleY - 1) > 0.01) {
                  App.barcode.handleResize(t);
                  return;
                }
              }

              if (t.isSmartRect) {
                const finalW = t.width * t.scaleX;
                const finalH = t.height * t.scaleY;
                if (Math.abs(t.scaleX - 1) > 0.001 || Math.abs(t.scaleY - 1) > 0.001) {
                    t.set({
                        width: finalW,
                        height: finalH,
                        scaleX: 1,
                        scaleY: 1
                    });
                    App.tools.updateSmartCorner('refresh');
                    App.ui.updateInspector(); 
                    return;
                }
              }

              if (t.type === "textbox") {
                const finalW = Math.round(t.width * t.scaleX);
                const finalH = Math.round(t.height * t.scaleY);
                const finalFontSize = t.fontSize * t.scaleY;
                t.set({
                  width: Math.max(finalW, 50),
                  fontSize: finalFontSize,
                  scaleX: 1,
                  scaleY: 1,
                });
                if (finalH > t.height) t.set("height", finalH);
                t.__manualHeight = finalH;
                t.setCoords();
              }
              App.ui.updateInspector();
              App.canvas.requestRenderAll();
            };
            App.canvas.on({
              "mouse:down": (opt) => {
                const target = opt.target;
                const isAlt = opt.e.altKey;
                if (target && !isAlt && !target.isGrid) {
                  dragOrigin = {
                    left: target.left,
                    top: target.top,
                  };
                  isDragThresholdPassed = false;
                } else {
                  dragOrigin = null;
                }

                if (!target || target.isGrid) {
                  if (isAlt) {
                    App.state.isPanning = false;
                    App.canvas.selection = true;
                    App.canvas.defaultCursor = "default";
                  } else {
                    App.state.isPanning = true;
                    App.canvas.selection = false;
                    startX = opt.e.clientX;
                    startY = opt.e.clientY;
                    scrollLeft = container.scrollLeft;
                    scrollTop = container.scrollTop;
                    App.canvas.setCursor("grabbing");
                  }
                }
              },
              "mouse:up": () => {
                dragOrigin = null;
                isDragThresholdPassed = false;
                if (App.state.isPanning) {
                  App.state.isPanning = false;
                  App.canvas.selection = true;
                  App.canvas.defaultCursor = "default";
                  App.canvas.setCursor("default");
                }
              },
              "mouse:dblclick": (opt) => {
                if (opt.target && opt.target.isTable) App.tableEditor.open(opt.target);
              },
              "selection:created": updateSelectionQueue,
              "selection:updated": updateSelectionQueue,
              "selection:cleared": () => {
                if (App.state.isReplacingObject) return;
                App.state.selectionQueue = [];
                App.ui.updateInspector();
              },

              "text:editing:entered": (e) => {
                const t = e.target;
                if (t.syncMode === "ref" && t.refId) {
                  const parent = App.content.findObjectBySharedId(t.refId);
                  if (parent && parent.rawContent !== undefined) {
                    t.text = String(parent.rawContent);
                  } else {
                    t.text = t.rawContent !== undefined ? String(t.rawContent) : t.text;
                  }
                } else if (t.rawContent !== undefined) {
                  t.text = String(t.rawContent);
                }

                if (t.hiddenTextarea) t.hiddenTextarea.value = t.text;
                App.canvas.requestRenderAll();
              },

              "text:editing:exited": (e) => {
                const t = e.target;
                t.rawContent = t.text;
                App.content.setRawContent(t, t.text);
                App.ui.updateInspector();
                App.history.saveState();
              },

              "object:moving": handleLiveTransform,
              "object:scaling": handleLiveTransform,
              "object:rotating": handleLiveTransform,
              "object:resizing": handleLiveTransform,
              "object:modified": handleObjectModified,
            });
            document.addEventListener(
              "mousemove",
              (e) => {
                if (App.state.isPanning) {
                  e.preventDefault();
                  container.scrollLeft = scrollLeft - (e.clientX - startX);
                  container.scrollTop = scrollTop - (e.clientY - startY);
                }
              },
              {
                passive: false,
              },
            );
            container.addEventListener(
              "wheel",
              (e) => {
                if (e.ctrlKey || e.metaKey || !App.state.isPanning) {
                  e.preventDefault();
                  e.stopPropagation();
                  const rect = container.getBoundingClientRect();
                  App.zoom.change(e.deltaY > 0 ? -0.1 : 0.1, {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }
              },
              {
                passive: false,
              },
            );
            container.addEventListener("mousedown", (e) => {
              if (["scrollContainer", "zoomViewport", "canvasWrapper"].includes(e.target.id) && App.canvas.getActiveObject()) {
                App.canvas.discardActiveObject();
                App.canvas.requestRenderAll();
                App.ui.updateInspector();
              }
            });
            container.addEventListener(
              "scroll",
              Utils.throttle(() => App.ruler.draw(), 10),
            );
            window.addEventListener(
              "resize",
              Utils.throttle(() => App.zoom.autoFit(), 200),
            );
            const fieldListContainer = document.getElementById("dsFieldList");
            if (fieldListContainer) {
              fieldListContainer.addEventListener("dragstart", (e) => {
                const target = e.target.closest("li");
                if (target && target.dataset.field) {
                  const data = {
                    sheet: target.dataset.sheet,
                    field: target.dataset.field,
                  };
                  e.dataTransfer.setData("application/paper-field", JSON.stringify(data));
                  e.dataTransfer.effectAllowed = "copy";
                }
              });
            }

            canvasWrap.addEventListener("dragover", (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "copy";
            });
            canvasWrap.addEventListener("drop", (e) => {
              e.preventDefault();
              const rawData = e.dataTransfer.getData("application/paper-field");
              if (!rawData) return;
              try {
                const { sheet, field } = JSON.parse(rawData);
                const rect = App.canvas.getElement().getBoundingClientRect();
                const zoom = App.canvas.getZoom();
                const x = (e.clientX - rect.left) / zoom;
                const y = (e.clientY - rect.top) / zoom;
                let initialText = field;
                const ds = App.state.dataSource;
                if (ds.isActive && ds.data.length > 0) {
                  const row = ds.data[App.state.currentDataIndex || 0];
                  const val = row[field];
                  if (val !== undefined && val !== null) initialText = String(val);
                }

                const textObj = new fabric.IText(initialText, {
                  left: x,
                  top: y,
                  fontSize: Utils.pt2px(20),
                  fontFamily: "SourceHanSansCN",
                  fill: "#000000",
                  originX: "left",
                  originY: "top",
                });
                textObj.dataBinding = {
                  type: "variable",
                  sheet,
                  field,
                };
                App.tools._addToCanvas(textObj);
                App.dataSource.refreshBindingState();
              } catch (err) {
                console.error("Drop error", err);
              }
            });
            const bindInput = (id, handler) => {
              const el = document.getElementById(id);
              if (el) {
                el.onchange = function () {
                  handler.call(this);
                };
              }
            };
            bindInput("imgUpload", function () {
              App.tools.handleImageUpload(this);
            });
            bindInput("projectImportInput", function () {
              App.io.loadProject(this.files[0]);
            });
            bindInput("templatePackImportInput", function () {
              App.templates.importLocal(this.files);
              this.value = "";
            });
            bindInput("imgReplaceInput", function () {
              App.tools.replaceActiveImage(this);
            });
            const bindModalClose = (id) => {
              const el = document.getElementById(id);
              if (el) {
                el.onclick = (e) => {
                  if (e.target.id === id) App.ui.hideModal(id);
                };
              }
            };
            bindModalClose("welcomeModal");
            bindModalClose("contactModal");
            bindModalClose("sponsorModal");
            bindModalClose("pngExportModal");
            document.addEventListener("fullscreenchange", () => {
              const icon = document.getElementById("fsIcon");
              if (icon) {
                icon.className = `ph ph-corners-${document.fullscreenElement ? "in" : "out"} text-lg`;
              }
              setTimeout(() => {
                App.zoom.autoFit();
                App.ruler.init();
              }, 100);
            });
            window.addEventListener("beforeunload", (e) => {
              App.draft.flush();
              if (App.state.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = "未保存更改";
                return "未保存更改";
              }
            });
            window.addEventListener("pagehide", () => {
              App.draft.flush();
            });
            document.addEventListener("visibilitychange", () => {
              if (document.hidden) App.draft.flush();
            });
          },

          initHotkeys: function () {
            const isInput = () => ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) || document.activeElement?.contentEditable === "true";
            hotkeys("ctrl+z,command+z", (e) => {
              if (!isInput()) {
                e.preventDefault();
                App.history.undo();
              }
            });
            hotkeys("ctrl+l,command+l", (e) => {
              e.preventDefault();
              App.tools.toggleLock();
            });
            hotkeys("ctrl+y,command+y", (e) => {
              if (!isInput()) {
                e.preventDefault();
                App.history.redo();
              }
            });
            hotkeys("ctrl+s,command+s", (e) => {
              e.preventDefault();
              App.io.saveProject();
            });
            hotkeys("ctrl+o,command+o", (e) => {
              e.preventDefault();
              document.getElementById("projectImportInput").click();
            });
            hotkeys("ctrl+p,command+p", (e) => {
              e.preventDefault();
              App.io.print();
            });
            hotkeys("del,backspace", (e) => {
              if (!isInput()) {
                e.preventDefault();
                App.tools.deleteActive();
              }
            });
            hotkeys("ctrl+c,command+c", (e) => {
              if (window.getSelection().toString().length > 0) {
                return;
              }

              if (!isInput() && App.canvas.getActiveObject()) {
                e.preventDefault();
                App.io.copy();
              }
            });
            hotkeys("ctrl+v,command+v", (e) => {
              if (!isInput() && App.state.clipboard) {
                e.preventDefault();
                App.io.paste();
              }
            });
            hotkeys("up,down,left,right", (e, h) => {
              if (!isInput() && App.canvas.getActiveObject()) {
                e.preventDefault();
                App.tools.nudge(h.key);
              }
            });
            hotkeys("ctrl+g,command+g", (e) => {
              e.preventDefault();
              App.tools.group();
            });
            hotkeys("ctrl+shift+g,command+shift+g", (e) => {
              e.preventDefault();
              App.tools.ungroup();
            });
          },
        },

        loadLocalFonts: async function () {
          if (App.state.localFontsLoaded || !window.queryLocalFonts) return;
          try {
            App.state.localFontsLoaded = true;
            const fonts = await App.fontManager.queryLocalFonts();
            const sortedFonts = fonts.sort((a, b) => {
              if (a.family === b.family) {
                return a.fullName.localeCompare(b.fullName);
              }
              return a.family.localeCompare(b.family);
            });
            if (!document.getElementById("local-fonts-style")) {
              const style = document.createElement("style");
              style.id = "local-fonts-style";
              let cssText = "";
              for (const f of sortedFonts) {
                cssText += `@font-face { font-family: "${f.postscriptName}"; src: local("${f.postscriptName}"), local("${f.fullName}"); }\n`;
              }
              style.textContent = cssText;
              document.head.appendChild(style);
              setTimeout(() => {
                if (App.canvas) App.canvas.requestRenderAll();
              }, 100);
            }

            const targetIds = ["propFont", "floatFontFamily"];
            targetIds.forEach((id) => {
              const select = document.getElementById(id);
              if (!select) return;
              const seen = new Set([...select.options].map((o) => o.value));
              if (!seen.has("---sep---")) select.add(new Option("--- 本地系统字体 ---", "---sep---", true, true));
              for (const f of sortedFonts) {
                if (!seen.has(f.postscriptName)) {
                  seen.add(f.postscriptName);
                  const opt = new Option(f.fullName, f.postscriptName);
                  opt.style.fontFamily = `"${f.postscriptName}"`;
                  select.add(opt);
                }
              }

              if (typeof FontPicker !== 'undefined') FontPicker.refresh(select);
            });
          } catch (e) {
            console.warn("Font Access Error", e);
            App.state.localFontsLoaded = false;
          }
        },

        tools: {
          _getCenter: () => ({
            left: App.state.baseWidth / 2,
            top: App.state.baseHeight / 2,
          }),

          _addToCanvas: function (obj) {
            App.canvas.add(obj);
            App.canvas.setActiveObject(obj);
            App.canvas.requestRenderAll();
            App.ui.updateLayerList();
            App.history.saveState();
          },

          addText: function () {
            this._addToCanvas(
              new fabric.IText("双击编辑文本", {
                ...this._getCenter(),
                fontSize: Utils.pt2px(20),
                fontFamily: "SourceHanSansCN",
                fill: "#000000",
                originY: "center",
                originX: "left",
                textAlign: "left",
                prefix: "",
                suffix: "",
              }),
            );
          },

          addParagraph: function () {
            const textbox = new fabric.Textbox("在此输入段落文本...\n支持自动换行。", {
              left: 100,
              top: 100,
              width: App.state.baseWidth - Utils.mm2px(50),
              fontSize: Utils.pt2px(20),
              fontFamily: "SourceHanSansCN",
              fill: "#000000",
              splitByGrapheme: true,
              lockScalingFlip: true,
              minWidth: 50,
            });
            const ctrl = textbox.controls;
            ctrl.ml.actionHandler = ctrl.mr.actionHandler = fabric.controlsUtils.scalingX;
            ctrl.mt.actionHandler = ctrl.mb.actionHandler = fabric.controlsUtils.scalingY;
            textbox.__manualHeight = textbox.height;
            textbox.on("editing:exited", function () {
              if (this.__manualHeight && this.height < this.__manualHeight) {
                this.set("height", this.__manualHeight);
                this.setCoords();
                App.canvas.requestRenderAll();
              }
            });
            textbox.on("changed", function () {
              if (this.height > this.__manualHeight) this.__manualHeight = this.height;
            });
            this._addToCanvas(textbox);
          },

          addDate: function () {
            const cfg = App.paper.getSettings();
            const isDyn = App.state.dataSource.isActive || App.state.paperType === "label";
            const opts = isDyn
              ? {
                  text: "时间预览",
                  left: App.state.baseWidth / 2,
                  top: App.state.baseHeight - Utils.mm2px(20),
                  originX: "center",
                  font: "SourceHanSansCN",
                  fill: "#000000",
                  size: 12,
                  editable: false,
                }
              : {
                  text: "____年__月__日",

                  left: App.state.baseWidth - cfg.marginRight,
                  top: Math.max(Utils.mm2px(5), cfg.marginTop - 35),
                  originX: "right",
                  font: "SourceHanSansCN",
                  fill: "#000000",
                  size: 14,
                  editable: true,
                };
            const obj = new fabric.IText(opts.text, {
              left: opts.left,
              top: opts.top,
              originX: opts.originX,
              originY: "center",
              fontSize: Utils.pt2px(opts.size),
              fontFamily: opts.font,
              fill: opts.fill,
              editable: opts.editable,
            });
            if (isDyn) {
              obj.isDynamicDate = true;
              obj.dateConfig = {
                showDate: true,
                showTime: true,
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm:ss",
                offsetDays: 0,
                offsetMinutes: 0,
              };
              obj.set("text", Utils.formatDate(new Date(), null, obj.dateConfig));
            }

            this._addToCanvas(obj);
            App.ui.updateInspector();
          },

          addPageNum: function () {
            const hasDataSource = App.state.dataSource.isActive || App.state.paperType === "label";
            const cfg = App.paper.getSettings();
            const pageObj = new fabric.IText(hasDataSource ? "第 1 页" : "第   页", {
              left: App.state.baseWidth / 2,
              top: App.state.baseHeight - Utils.mm2px(20),
              fontSize: Utils.pt2px(20),
              fontFamily: "SourceHanSansCN",
              fill: "#000000",
              originX: "center",
              originY: "center",
              editable: false,
            });
            if (hasDataSource) {
              pageObj.isDynamicPageNum = true;
              pageObj.pageConfig = {
                format: "第 {page} 页",
                startFrom: 1,
              };
            }

            this._addToCanvas(pageObj);
            App.ui.updateInspector();
          },

          addLine: function () {
            const cfg = App.paper.getSettings();
            const contentWidth = App.state.baseWidth - cfg.marginLeft - cfg.marginRight;
            this._addToCanvas(
              new fabric.Line([0, 0, contentWidth, 0], {
                left: App.state.baseWidth / 2,
                top: App.state.baseHeight / 2,
                stroke: cfg.gridColor,
                strokeWidth: 2,
                originX: "center",
                originY: "center",
              }),
            );
          },

          addShape: function (type) {
            const comm = {
              ...this._getCenter(),
              fill: App.paper.getSettings().gridColor,
              strokeWidth: 0,
              originX: "center",
              originY: "center",
            };
            let obj;
            if (type === "rect")
              obj = new fabric.Rect({
                ...comm,
                width: 100,
                height: 100,
              });
            else if (type === "circle")
              obj = new fabric.Circle({
                ...comm,
                radius: 50,
              });
            else if (type === "triangle")
              obj = new fabric.Triangle({
                ...comm,
                width: 100,
                height: 100,
              });
            else if (type === "diamond") {
              const w = 100;
              const h = 100;
              const points = [
                { x: w / 2, y: 0 },
                { x: w, y: h / 2 },
                { x: w / 2, y: h },
                { x: 0, y: h / 2 },
              ];
              obj = new fabric.Polygon(points, {
                ...comm,
                width: w,
                height: h,
                fill: comm.fill,
              });
            } else if (type === "star") {
              const pts = [];
              for (let i = 0; i < 10; i++) {
                const r = i % 2 === 0 ? 50 : 19.1;
                const a = (Math.PI * i) / 5 - Math.PI / 2;
                pts.push({
                  x: Math.cos(a) * r,
                  y: Math.sin(a) * r,
                });
              }
              obj = new fabric.Polygon(pts, {
                ...comm,
                fill: comm.fill,
              });
            }
            if (obj) this._addToCanvas(obj);
          },

          handleImageUpload: function (input) {
            if (input.files?.[0]) {
              const reader = new FileReader();
              reader.onload = (e) =>
                fabric.Image.fromURL(e.target.result, (img) => {
                  const canvasW = App.state.baseWidth;
                  const canvasH = App.state.baseHeight;
                  const targetW = canvasW * 0.8;
                  const targetH = canvasH * 0.8;
                  const scaleX = targetW / img.width;
                  const scaleY = targetH / img.height;
                  const scale = Math.min(scaleX, scaleY);
                  img.scale(scale);
                  img.set({
                    left: canvasW / 2,
                    top: canvasH / 2,
                    originX: "center",
                    originY: "center",
                  });
                  this._addToCanvas(img);
                  input.value = "";
                });
              reader.readAsDataURL(input.files[0]);
            }
          },
          addSerialNumber: function () {
            const hasDataSource = App.state.dataSource.isActive || App.state.paperType === "label";
            const serialObj = new fabric.IText("1", {
              left: App.state.baseWidth / 2,
              top: App.state.baseHeight / 2,
              fontSize: Utils.pt2px(20),
              fontFamily: "SourceHanSansCN",
              fill: "#000000",
              originX: "center",
              originY: "center",
              editable: false,
            });
            serialObj.isSerialNumber = true;
            serialObj.serialConfig = {
              startValue: "1",
              step: 1,
              repeat: 1,
              changeType: "increment",
              generateCount: hasDataSource ? 1 : 10,
              showTotal: false,
              totalSeparator: "/",
            };
            this._addToCanvas(serialObj);
            App.ui.updateInspector();
          },

          _calculateSerialNumber: function (config, index) {
            const cyclePosition = Math.floor(index / config.repeat);
            const startStr = String(config.startValue);
            const regex = /(\d+)(?=\D*$)/;
            const match = startStr.match(regex);
            if (!match) return startStr;
            const originalNumStr = match[0];
            const startNum = parseInt(originalNumStr, 10);
            const padLen = originalNumStr.length;
            const limit = Math.pow(10, padLen);
            let currentNum;
            if (config.changeType === "increment") {
              currentNum = startNum + cyclePosition * config.step;
            } else {
              let rawNum = startNum - cyclePosition * config.step;
              currentNum = ((rawNum % limit) + limit) % limit;
            }
            const currentNumStr = String(currentNum).padStart(padLen, "0");
            return startStr.replace(regex, currentNumStr);
          },

          _formatSerialNumber: function (config, index) {
            const serialNumber = this._calculateSerialNumber(config, index);
            if (!config.showTotal) return serialNumber;
            return serialNumber + (config.totalSeparator || "/") + config.generateCount;
          },

          replaceActiveImage: function (input) {
            if (!input.files || !input.files[0]) return;
            const file = input.files[0];
            let act = App.canvas.getActiveObject();
            let isBgMode = false;
            if (!act && App.state.editingBackground && App.canvas.backgroundImage) {
              act = App.canvas.backgroundImage;
              isBgMode = true;
            }

            if (!act || (act.type !== "image" && !isBgMode)) {
              input.value = "";
              return Utils.toast("请先选中图片", "error");
            }

            if (isBgMode && App.state.paperType === "label" && App.state.label.mode === "preview") {
              App.label.enterDesign();
              act = App.canvas.backgroundImage;
            }

            const onImageUpdated = (imgObj) => {
              if (isBgMode) {
                const w = App.state.baseWidth;
                const h = App.state.baseHeight;
                // 原逻辑看似是 scaleX/scaleY 直接拉伸适配，或者按比例。

                imgObj.scaleX = w / imgObj.width;
                imgObj.scaleY = h / imgObj.height;
                imgObj.left = w / 2;
                imgObj.top = h / 2;
                imgObj.originX = "center";
                imgObj.originY = "center";
                Utils.toast("背景已更新");
              } else {
                Utils.toast("图片已替换");
              }
            };
            if (isBgMode && !act) {
              const reader = new FileReader();
              reader.onload = (e) => {
                fabric.Image.fromURL(e.target.result, (img) => {
                  App.canvas.setBackgroundImage(img, () => {
                    onImageUpdated(img);
                    App.state.editingBackground = true;
                    App.ui.updateInspector();
                    App.history.saveState();
                  });
                });
              };
              reader.readAsDataURL(file);
            } else {
              this._updateImageSrc(act, file, onImageUpdated);
            }

            input.value = "";
          },

          setAsBackground: function () {
            const act = App.canvas.getActiveObject();
            if (act && act.type === "image") {
              App.canvas.setBackgroundImage(
                act,
                () => {
                  App.canvas.remove(act);
                  if (App.canvas.backgroundImage) {
                    App.canvas.backgroundImage.printBackground = true;
                  }

                  App.canvas.requestRenderAll();
                  App.state.editingBackground = true;
                  App.ui.updateInspector();
                  App.history.saveState();
                  Utils.toast("已设为背景");
                },
                {
                  ...act.toObject(["originX", "originY", "left", "top", "scaleX", "scaleY", "angle", "opacity"]),
                },
              );
            } else Utils.toast("请先选中一张图片", "error");
          },

          togglePrintBackground: function (checked) {
            if (App.canvas.backgroundImage) {
              App.canvas.backgroundImage.printBackground = checked;
              App.history.saveState();
            }
          },
          fillPaper: function () {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "image") return Utils.toast("请先选中一张图片", "error");
            const w = App.state.baseWidth;
            const h = App.state.baseHeight;
            act.set({
              angle: 0,
              left: w / 2,
              top: h / 2,
              originX: "center",
              originY: "center",
              scaleX: w / act.width,
              scaleY: h / act.height,
            });
            act.setCoords();
            App.canvas.requestRenderAll();
            App.ui.updateInspector();
            App.history.saveState();
          },

          deleteActive: function () {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            if (act.type === "activeSelection") {
              const objects = act.getObjects();
              const toDelete = objects.filter((o) => !o.lockMovementX);
              const lockedCount = objects.length - toDelete.length;
              if (toDelete.length > 0) {
                toDelete.forEach((o) => App.canvas.remove(o));
                if (lockedCount > 0) Utils.toast(`已删除 ${toDelete.length} 个对象，${lockedCount} 个锁定对象被保留`);
              } else {
                Utils.toast("所选对象全部已锁定，无法删除", "error");
              }
              App.canvas.discardActiveObject();
            } else {
              if (act.lockMovementX) {
                Utils.toast("对象已锁定，无法删除", "error");
                return;
              }

              App.canvas.remove(act);
              App.canvas.discardActiveObject();
            }

            App.ui.updateLayerList();
            App.ui.updateInspector();
            App.history.saveState();
          },

          nudge: function (dir) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            if (dir === "up") act.top -= 2;
            else if (dir === "down") act.top += 2;
            if (dir === "left") act.left -= 2;
            else if (dir === "right") act.left += 2;
            act.setCoords();
            App.canvas.requestRenderAll();
            App.ui.updateGeo(null, null, act);
          },

          updateSmartCorner: function (key, value) {
            const act = App.canvas.getActiveObject();
            if (!act || (act.type !== "rect" && !act.isSmartRect)) return;
            let cfg = act.cornerConfig || {
              tl: 0,
              tr: 0,
              bl: 0,
              br: 0,
              style: "round",
            };
            if (key !== "refresh") {
              if (key === "all") {
                const v = parseInt(value) || 0;
                cfg.tl = cfg.tr = cfg.bl = cfg.br = v;
                ["tl", "tr", "bl", "br"].forEach((k) => (document.getElementById("corner" + k.toUpperCase()).value = v));
                document.getElementById("masterRadiusVal").innerText = v;
              } else if (key === "style") cfg.style = value;
              else cfg[key] = parseInt(value) || 0;
            }

            const currentScaleX = act.scaleX || 1;
            const currentScaleY = act.scaleY || 1;
            const finalW = act.width * currentScaleX;
            const finalH = act.height * currentScaleY;
            const pathData = Utils.generateSmartRectPath(finalW, finalH, cfg, cfg.style);
            const center = act.getCenterPoint();
            const safeProps = act.toObject(["fill", "stroke", "strokeWidth", "opacity", "angle", "strokeDashArray", "strokeLineCap", "strokeLineJoin", "shadow", "globalCompositeOperation"]);
            const propsToRemove = ["type", "width", "height", "scaleX", "scaleY", "left", "top", "path", "pathOffset"];
            propsToRemove.forEach((prop) => delete safeProps[prop]);
            const newObj = new fabric.Path(pathData, {
              ...safeProps,
              isSmartRect: true,
              cornerConfig: cfg,
              width: finalW,  
              height: finalH, 
              scaleX: 1,      
              scaleY: 1,      
              originX: "center",
              originY: "center",
              left: center.x,
              top: center.y,
            });
            const idx = App.canvas.getObjects().indexOf(act);
            App.canvas.discardActiveObject();
            App.canvas.remove(act);
            App.canvas.insertAt(newObj, idx, true);
            App.canvas.setActiveObject(newObj);
            App.canvas.requestRenderAll();
            App.ui.updateInspector();
            App.history.saveState();
          },
          rotate: function (delta) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            let newAngle = (act.angle || 0) + delta;
            newAngle = newAngle % 360;
            act.rotate(newAngle);
            act.setCoords();
            App.canvas.requestRenderAll();
            App.ui.updateGeo("angle", newAngle);
            App.history.saveState();
            App.ui.updateInspector();
          },
          flip: function (dir) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const prop = dir === "x" ? "flipX" : "flipY";
            if (act.type === "activeSelection") {
              const grp = act.toGroup();
              grp.set(prop, !grp[prop]);
              App.canvas.setActiveObject(grp.toActiveSelection());
            } else act.set(prop, !act[prop]);
            App.canvas.requestRenderAll();
            App.history.saveState();
          },
          addBarcode: async function () {
            const config = {
              ...App.barcode.defaults,
            };
            try {
              const obj = await App.barcode.createOrUpdate(null, config);
              this._addToCanvas(obj);
            } catch (e) {
              Utils.toast("创建条码失败: " + e.message, "error");
            }
          },
          group: function () {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "activeSelection") return;
            act.toGroup();
            App.canvas.requestRenderAll();
            App.ui.updateLayerList();
            App.ui.updateInspector();
            App.history.saveState();
          },

          ungroup: function () {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "group") return;
            if (act.isTable || act.isBarcode) {
              Utils.toast("特殊组件无法解组", "info");
              return;
            }

            act.toActiveSelection();
            App.canvas.requestRenderAll();
            App.ui.updateLayerList();
            App.ui.updateInspector();
            App.history.saveState();
          },
          toggleLock: function () {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const isLocked = act.lockMovementX;
            const newState = !isLocked;
            const setLockState = (obj, state) => {
              obj.lockMovementX = state;
              obj.lockMovementY = state;
              obj.lockRotation = state;
              obj.lockScalingX = state;
              obj.lockScalingY = state;
              obj.hasControls = !state;
              obj.selectable = true;
              obj.hoverCursor = state ? "not-allowed" : "move";
              if (["i-text", "textbox", "text"].includes(obj.type)) {
                const isDynamic = obj.isDynamicDate || obj.isDynamicPageNum || obj.isSerialNumber || (obj.dataBinding && obj.dataBinding.type === "variable");
                obj.set("editable", !state && !isDynamic);
              }
            };
            if (act.type === "activeSelection") {
              act.forEachObject((o) => setLockState(o, newState));
              setLockState(act, newState);
            } else {
              setLockState(act, newState);
            }

            App.canvas.requestRenderAll();
            App.ui.updateInspector();
            App.history.saveState();
            Utils.toast(newState ? "对象已锁定" : "对象已解锁");
          },
          _updateImageSrc: function (fabricObj, file, callback) {
            const reader = new FileReader();
            reader.onload = (e) => {
              fabricObj.setSrc(e.target.result, () => {
                if (callback) callback(fabricObj);
                fabricObj.setCoords();
                App.canvas.requestRenderAll();
                App.ui.updateInspector();
                App.history.saveState();
              });
            };
            reader.readAsDataURL(file);
          },
        },

        tableEditor: {
          state: {
            rows: 3,
            cols: 3,
            colWidths: [100, 100, 100],
            rowHeights: [44, 44, 44],
            data: [],
            selected: [],
            resizing: null,
            resizeIndex: -1,
            resizeStartVal: 0,
            resizeStartSize: 0,
            isSelecting: false,
            selectAnchor: null,
            editingTarget: null,
            zoom: 1, 
          },
          els: {},

          init: function () {
            this.cacheDom();
            this.attachEvents();
          },

          cacheDom: function () {
            const get = (id) => document.getElementById(id);
            this.els = {
              modal: get("tableModal"),
              gridBody: get("tableGridBody"),
              wrapper: get("tableWrapper"),
              editArea: get("tableEditArea"),
              floatMenu: get("tableFloatMenu"),
              insertBtn: get("tableInsertBtn"),
              cancelBtn: get("tableCancelBtn"),
              
              floatFont: get("floatFontFamily"),
              floatSize: get("floatFontSize"),
              floatBold: get("floatBoldBtn"),
              floatBorderW: get("floatBorderWidth"),
              floatBorderC: get("floatBorderColorInput"),
              floatBorderInd: get("floatBorderColorInd"),
              floatBg: get("floatBgInput"),
              floatBgInd: get("floatBgIndicator"),
              floatText: get("floatTextInput"),
              floatTextInd: get("floatTextIndicator"),
              floatMerge: get("floatMergeBtn"),
              floatSplit: get("floatSplitBtn"),
              floatDataBindWrapper: get("floatDataBindWrapper"),
              floatDataBind: get("floatDataBind"),
              editorZoom: get("tableEditorZoom"),
              editorZoomVal: get("tableEditorZoomVal"),
              inputRows: get("tableEditorRowsInput"),
              inputCols: get("tableEditorColsInput"),
            };
          },

          attachEvents: function () {
            const e = this.els;
            if (!e.modal) return;
            e.insertBtn?.addEventListener("click", () => this.insertIntoCanvas());
            e.cancelBtn?.addEventListener("click", () => this.close());
            e.floatMerge?.addEventListener("click", () => this.mergeSelection());
            e.floatSplit?.addEventListener("click", () => this.splitSelection());
            e.floatBold?.addEventListener("click", () => this.toggleStyle("bold"));
            e.floatDataBind?.addEventListener("change", () => {
              this.applyDataBinding(e.floatDataBind.value);
            });
            const bindInput = (el, key, indicator) => {
              el?.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => {
                const val = el.type === "number" ? parseFloat(el.value) : el.value;
                this.applyStyle({
                  [key]: val,
                });
                if (indicator) indicator.style.backgroundColor = el.value;
              });
            };
            bindInput(e.floatBg, "bg", e.floatBgInd);
            bindInput(e.floatText, "textColor", e.floatTextInd);
            bindInput(e.floatBorderC, "borderColor", e.floatBorderInd);
            bindInput(e.floatBorderW, "borderWidth");
            bindInput(e.floatSize, "fontSize");
            bindInput(e.floatFont, "fontFamily");
            if (e.gridBody) {
              e.gridBody.addEventListener("mousedown", (ev) => this.handleMouseDown(ev));
              e.gridBody.addEventListener("input", (ev) => this.handleCellInput(ev));
              e.gridBody.addEventListener("contextmenu", (ev) => ev.preventDefault());
            }

            document.addEventListener("mousemove", (ev) => this.handleMouseMove(ev));
            document.addEventListener("mouseup", () => this.handleMouseUp());
            e.editArea?.addEventListener("mousedown", (ev) => {
              if (ev.target === e.editArea) this.clearSelection();
            });
            if (e.inputRows) {
              e.inputRows.addEventListener("change", (ev) => {
                let val = parseInt(ev.target.value);
                if (val < 1) val = 1;
                this.resizeTable(val, this.state.cols);
              });
            }
            if (e.inputCols) {
              e.inputCols.addEventListener("change", (ev) => {
                let val = parseInt(ev.target.value);
                if (val < 1) val = 1;
                this.resizeTable(this.state.rows, val);
              });
            }
          },
          resizeTable: function (targetRows, targetCols) {
            const s = this.state;
            targetRows = Math.min(100, Math.max(1, targetRows));
            targetCols = Math.min(60, Math.max(1, targetCols));
            const oldRows = s.rows;
            const oldCols = s.cols;
            if (targetRows > oldRows) {
              for (let i = 0; i < targetRows - oldRows; i++) {
                s.data.push(
                  Array(s.cols)
                    .fill(null)
                    .map(() => this.createCell()),
                );
                s.rowHeights.push(44);
              }
            } else if (targetRows < oldRows) {
              s.data.length = targetRows;
              s.rowHeights.length = targetRows;
            }
            s.rows = targetRows;
            if (targetCols > oldCols) {
              s.data.forEach((row) => {
                for (let i = 0; i < targetCols - oldCols; i++) {
                  row.push(this.createCell());
                }
              });
              for (let i = 0; i < targetCols - oldCols; i++) {
                s.colWidths.push(100);
              }
            } else if (targetCols < oldCols) {
              s.data.forEach((row) => {
                row.length = targetCols;
              });
              s.colWidths.length = targetCols;
            }
            s.cols = targetCols;
            this.updateInputs();
            this.renderGrid();
          },
          updateInputs: function () {
            if (this.els.inputRows) this.els.inputRows.value = this.state.rows;
            if (this.els.inputCols) this.els.inputCols.value = this.state.cols;
          },
          setZoom: function (val) {
            const v = parseFloat(val);
            this.state.zoom = v;
            if (this.els.wrapper) {
              this.els.wrapper.style.transform = `scale(${v})`;
              this.els.wrapper.style.transformOrigin = "center top";
            }
            if (this.els.editorZoomVal) {
              this.els.editorZoomVal.innerText = Math.round(v * 100) + "%";
            }
            if (this.els.editorZoom) {
              this.els.editorZoom.value = v;
            }
            this.updateFloatMenu();
          },

          changeZoom: function (delta) {
            let newZoom = this.state.zoom + delta;
            newZoom = Math.max(0.5, Math.min(3, newZoom));
            this.setZoom(newZoom);
          },

          createCell: function () {
            return {
              text: "",
              bg: "transparent",
              textColor: "#000000",
              fontFamily: "SourceHanSansCN",
              fontSize: 14,
              align: "center",
              colspan: 1,
              rowspan: 1,
              hidden: false,
              bold: false,
              italic: false,
              borderWidth: 0.5,
              borderColor: "#666666",
              dataBinding: null,
              refId: null,
              syncMode: "none",
            };
          },
          applyDataBinding: function (val) {
            const cells = this.getSelectedCells();
            if (!cells.length) return;
            const ds = App.state.dataSource;
            let binding = null;
            let refId = null;
            let syncMode = "none";
            let previewText = "";
            if (val) {
              if (val.startsWith("ref:")) {
                refId = val.substring(4);
                syncMode = "ref";
                previewText = App.content.getSharedValue(refId) || `{${refId}}`;
              } else if (ds.isActive) {
                const [sheet, field] = val.split(":");
                binding = {
                  type: "variable",
                  sheet,
                  field,
                };
                if (ds.data.length > 0) {
                  const row = ds.data[App.state.currentDataIndex || 0];
                  if (row) previewText = String(row[field] || "");
                } else {
                  previewText = `{${field}}`;
                }
              }
            }

            cells.forEach(({ cell }) => {
              cell.dataBinding = null;
              cell.refId = null;
              cell.syncMode = "none";
              if (syncMode === "ref") {
                cell.refId = refId;
                cell.syncMode = "ref";
                cell.text = previewText;
              } else if (binding) {
                cell.dataBinding = binding;
                cell.text = previewText;
              }
            });
            this.renderGrid();
          },
          open: function (target = null) {
            this.state.selected = [];
            this.setZoom(1);
            this.updateFloatMenu();
            if (target?.isTable && target.tableData) {
              this.state.editingTarget = target;
              const d = target.tableData;
              this.state.rows = d.rows;
              this.state.cols = d.cols;
              this.state.colWidths = d.colWidths || Array(d.cols).fill(d.cellWidth || 100);
              this.state.rowHeights = d.rowHeights || Array(d.rows).fill(d.cellHeight || 44);
              this.state.data = this.normalizeCells(d.cells);
              this.els.insertBtn.innerHTML = '<i class="ph ph-check-circle text-lg"></i> 更新表格';
            } else {
              this.state.editingTarget = null;
              this.resetData(3, 3);
              this.els.insertBtn.innerHTML = '<i class="ph ph-plus-circle text-lg"></i> 插入表格';
            }
            this.updateInputs();
            this.renderGrid();
            this.els.modal.classList.remove("hidden");
            this.els.modal.classList.add("flex");
          },

          close: function () {
            this.els.modal.classList.add("hidden");
            this.els.modal.classList.remove("flex");
            this.clearSelection();
            this.state.editingTarget = null;
          },

          resetData: function (rows, cols) {
            this.state.rows = rows;
            this.state.cols = cols;
            this.state.colWidths = Array(cols).fill(100);
            this.state.rowHeights = Array(rows).fill(44);
            this.state.data = Array(rows)
              .fill(null)
              .map(() =>
                Array(cols)
                  .fill(null)
                  .map(() => this.createCell()),
              );
          },

          addCR: function (type, pos) {
            const s = this.state;
            if (type === "row") {
              const newRow = Array(s.cols)
                .fill(null)
                .map(() => this.createCell());
              if (pos === "top") {
                s.data.unshift(newRow);
                s.rowHeights.unshift(44);
              } else {
                s.data.push(newRow);
                s.rowHeights.push(44);
              }
              s.rows++;
            } else {
              s.data.forEach((row) => {
                const cell = this.createCell();
                if (pos === "left") row.unshift(cell);
                else row.push(cell);
              });
              if (pos === "left") s.colWidths.unshift(100);
              else s.colWidths.push(100);
              s.cols++;
            }
            this.updateInputs();
            this.renderGrid();
          },

          deleteCR: function (type) {
            const sels = this.getSelectedCells();
            if (!sels.length) return Utils.toast("请先选择单元格", "error");
            const indices = new Set();
            sels.forEach((s) => indices.add(type === "row" ? s.row : s.col));
            const sortedIndices = Array.from(indices).sort((a, b) => b - a);
            if (type === "row" && this.state.rows - sortedIndices.length < 1) return Utils.toast("至少保留一行", "error");
            if (type === "col" && this.state.cols - sortedIndices.length < 1) return Utils.toast("至少保留一列", "error");
            if (type === "row") {
              sortedIndices.forEach((idx) => {
                this.state.data.splice(idx, 1);
                this.state.rowHeights.splice(idx, 1);
              });
              this.state.rows -= sortedIndices.length;
            } else {
              sortedIndices.forEach((idx) => {
                this.state.colWidths.splice(idx, 1);
                this.state.data.forEach((row) => row.splice(idx, 1));
              });
              this.state.cols -= sortedIndices.length;
            }
            this.clearSelection();
            this.updateInputs();
            this.renderGrid();
            Utils.toast(`已删除 ${sortedIndices.length} ${type === "row" ? "行" : "列"}`);
          },

          renderGrid: function () {
            const body = this.els.gridBody;
            if (!body) return;
            body.innerHTML = "";
            this.state.data.forEach((row, r) => {
              const tr = document.createElement("tr");
              row.forEach((cell, c) => {
                if (cell.hidden) return;
                const td = document.createElement("td");
                let w = 0,
                  h = 0;
                for (let i = 0; i < cell.colspan; i++) w += this.state.colWidths[c + i];
                for (let i = 0; i < cell.rowspan; i++) h += this.state.rowHeights[r + i];
                td.dataset.row = r;
                td.dataset.col = c;
                td.rowSpan = cell.rowspan;
                td.colSpan = cell.colspan;
                td.innerText = cell.text || "";
                td.contentEditable = true;
                Object.assign(td.style, {
                  backgroundColor: cell.bg,
                  color: cell.textColor,
                  textAlign: cell.align,
                  fontFamily: cell.fontFamily,
                  fontSize: cell.fontSize + "px",
                  fontWeight: cell.bold ? "bold" : "normal",
                  border: `${cell.borderWidth ?? 1}px solid ${cell.borderColor ?? "#cbd5e1"}`,
                  width: w + "px",
                  height: h + "px",
                  minWidth: "20px",
                });
                tr.appendChild(td);
              });
              body.appendChild(tr);
            });
            this.paintSelection();
          },

          handleMouseMove: function (e) {
            if (this.state.resizing) {
              e.preventDefault();
              const zoom = this.state.zoom || 1;
              const currentVal = this.state.resizing.includes("col") ? e.clientX : e.clientY;
              const startVal = this.state.resizeStartVal;
              // 如果是 left/top 边缘，鼠标向负方向移动时，尺寸应该增加，所以要反向计算
              let delta = (currentVal - startVal) / zoom;
              if (this.state.resizing === "col-left" || this.state.resizing === "row-top") {
                delta = -delta;
              }

              const newSize = Math.max(20, this.state.resizeStartSize + delta);
              if (this.state.resizing.includes("col")) {
                this.state.colWidths[this.state.resizeIndex] = newSize;
                const cells = this.els.gridBody.querySelectorAll(`td[data-col="${this.state.resizeIndex}"]`);
                cells.forEach((cell) => {
                  if (cell.style.display !== "none" && cell.colSpan === 1) {
                    cell.style.width = newSize + "px";
                  }
                });
              } else {
                this.state.rowHeights[this.state.resizeIndex] = newSize;
                const rows = this.els.gridBody.children;
                const targetRow = rows[this.state.resizeIndex];
                if (targetRow) {
                  Array.from(targetRow.children).forEach((cell) => {
                    if (cell.rowSpan === 1) {
                      cell.style.height = newSize + "px";
                    }
                  });
                }
              }
              return;
            }

            const td = e.target.closest("td");
            if (this.state.isSelecting && td && this.els.gridBody.contains(td)) {
              this.selectRange(this.state.selectAnchor, {
                r: +td.dataset.row,
                c: +td.dataset.col,
              });
              return;
            }

            if (!td || !this.els.gridBody.contains(td)) {
              document.body.style.cursor = "default";
              return;
            }

            const rect = td.getBoundingClientRect();
            const hitTest = 6;
            const onRight = Math.abs(e.clientX - rect.right) < hitTest;
            const onBottom = Math.abs(e.clientY - rect.bottom) < hitTest;
            const isFirstCol = parseInt(td.dataset.col) === 0;
            const isFirstRow = parseInt(td.dataset.row) === 0;
            const onLeft = isFirstCol && Math.abs(e.clientX - rect.left) < hitTest;
            const onTop = isFirstRow && Math.abs(e.clientY - rect.top) < hitTest;
            if (onRight || onLeft) {
              td.style.cursor = "col-resize";
              td.dataset.edge = onRight ? "right" : "left";
            } else if (onBottom || onTop) {
              td.style.cursor = "row-resize";
              td.dataset.edge = onBottom ? "bottom" : "top";
            } else {
              td.style.cursor = "text";
              delete td.dataset.edge;
            }
          },

          handleMouseDown: function (e) {
            const td = e.target.closest("td");
            if (!td || (e.button !== 0 && e.button !== 2)) return;
            const edge = td.dataset.edge;
            if (edge && e.button === 0) {
              e.preventDefault();
              let colIdx = parseInt(td.dataset.col);
              let rowIdx = parseInt(td.dataset.row);
              if (edge === "right") colIdx += (parseInt(td.colSpan) || 1) - 1;
              if (edge === "bottom") rowIdx += (parseInt(td.rowSpan) || 1) - 1;
              if (edge === "right" || edge === "left") {
                this.state.resizing = edge === "left" ? "col-left" : "col";
                this.state.resizeStartVal = e.clientX;
                this.state.resizeIndex = colIdx;
                this.state.resizeStartSize = this.state.colWidths[colIdx];
                document.body.style.cursor = "col-resize";
              } else {
                this.state.resizing = edge === "top" ? "row-top" : "row";
                this.state.resizeStartVal = e.clientY;
                this.state.resizeIndex = rowIdx;
                this.state.resizeStartSize = this.state.rowHeights[rowIdx];
                document.body.style.cursor = "row-resize";
              }
            } else {
              this.state.isSelecting = true;
              this.state.selectAnchor = {
                r: +td.dataset.row,
                c: +td.dataset.col,
              };
              this.selectRange(this.state.selectAnchor, this.state.selectAnchor);
            }
          },

          handleMouseUp: function () {
            if (this.state.resizing) {
              this.state.resizing = null;
              document.body.style.cursor = "default";
              this.renderGrid();
            }
            if (this.state.isSelecting) {
              this.state.isSelecting = false;
              this.updateFloatMenu();
            }
          },

          selectRange: function (start, end) {
            const minR = Math.min(start.r, end.r),
              maxR = Math.max(start.r, end.r);
            const minC = Math.min(start.c, end.c),
              maxC = Math.max(start.c, end.c);
            this.state.selected = [];
            for (let r = minR; r <= maxR; r++)
              for (let c = minC; c <= maxC; c++)
                this.state.selected.push({
                  row: r,
                  col: c,
                });
            this.paintSelection();
          },

          paintSelection: function () {
            const selMap = new Set(this.state.selected.map((s) => `${s.row},${s.col}`));
            this.els.gridBody.querySelectorAll("td").forEach((td) => td.classList.toggle("selected", selMap.has(`${td.dataset.row},${td.dataset.col}`)));
          },

          clearSelection: function () {
            this.state.selected = [];
            this.paintSelection();
            this.updateFloatMenu();
          },

          updateFloatMenu: function () {
            const menu = this.els.floatMenu;
            const ds = App.state.dataSource;
            const sharedKeys = App.content.getAvailableSharedIds();
            if (this.state.selected.length === 0) {
              menu.classList.add("hidden");
              return;
            }

            const selectedTds = this.els.gridBody.querySelectorAll("td.selected");
            if (selectedTds.length === 0) return;
            let minTop = Infinity,
              minLeft = Infinity,
              maxRight = -Infinity;
            selectedTds.forEach((td) => {
              const r = td.getBoundingClientRect();
              if (r.top < minTop) minTop = r.top;
              if (r.left < minLeft) minLeft = r.left;
              if (r.right > maxRight) maxRight = r.right;
            });
            const containerRect = this.els.editArea.getBoundingClientRect();
            menu.style.top = minTop - containerRect.top + this.els.editArea.scrollTop + "px";
            menu.style.left = minLeft + (maxRight - minLeft) / 2 - containerRect.left + this.els.editArea.scrollLeft + "px";
            menu.classList.remove("hidden");
            const isSingleSelection = this.state.selected.length === 1;
            const hasDataSource = ds.isActive && ds.headers.length > 0;
            const hasSharedVars = sharedKeys.length > 0;
            const bindWrapper = this.els.floatDataBindWrapper;
            const bindSelect = this.els.floatDataBind;
            if (isSingleSelection && (hasDataSource || hasSharedVars) && bindWrapper && bindSelect) {
              bindWrapper.classList.remove("hidden");
              const cellData = this.getSelectedCells()[0].cell;
              const currentSheet = ds.currentSheet;
              bindSelect.innerHTML = '<option value="">不绑定数据</option>';
              if (hasDataSource) {
                ds.headers.forEach((header) => {
                  const optionValue = `${currentSheet}:${header}`;
                  const opt = document.createElement("option");
                  opt.value = optionValue;
                  opt.innerText = header;
                  if (cellData.dataBinding && cellData.dataBinding.sheet === currentSheet && cellData.dataBinding.field === header) {
                    opt.selected = true;
                  }
                  groupExcel.appendChild(opt);
                });
                bindSelect.appendChild(groupExcel);
              }

              if (hasSharedVars) {
                const groupShared = document.createElement("optgroup");
                groupShared.label = "共享字段";
                sharedKeys.forEach((key) => {
                  const optionValue = `ref:${key}`;
                  const opt = document.createElement("option");
                  opt.value = optionValue;
                  opt.innerText = key;
                  if (cellData.syncMode === "ref" && cellData.refId === key) {
                    opt.selected = true;
                  }
                  groupShared.appendChild(opt);
                });
                bindSelect.appendChild(groupShared);
              }
            } else if (bindWrapper) {
              bindWrapper.classList.add("hidden");
            }

            const firstCell = this.getSelectedCells()[0]?.cell;
            if (firstCell) {
              const sync = (el, val, ind) => {
                if (!el) return;
                if (el.type === "color" || el.hasAttribute("data-coloris")) {
                  el.value = val === "transparent" || val === "rgba(0, 0, 0, 0)" ? "#ffffff" : val;
                } else {
                  el.value = val;
                }

                if (ind) {
                  ind.style.backgroundColor = val;
                  ind.style.boxShadow = !val || val === "transparent" || val === "#ffffff" ? "inset 0 0 0 1px #cbd5e1" : "none";
                }
              };
              sync(this.els.floatBg, firstCell.bg, this.els.floatBgInd);
              sync(this.els.floatText, firstCell.textColor, this.els.floatTextInd);
              sync(this.els.floatBorderC, firstCell.borderColor, this.els.floatBorderInd);
              if (this.els.floatBorderW) this.els.floatBorderW.value = firstCell.borderWidth;
              if (this.els.floatSize) this.els.floatSize.value = firstCell.fontSize;
              if (this.els.floatFont) {
                this.els.floatFont.value = firstCell.fontFamily;
                if (typeof FontPicker !== 'undefined') FontPicker.setValue(this.els.floatFont, firstCell.fontFamily);
              }
              if (this.els.floatBold) {
                this.els.floatBold.classList.toggle("text-slate-900", !!firstCell.bold);
                this.els.floatBold.classList.toggle("bg-gray-100", !!firstCell.bold);
              }
            }
          },

          handleCellInput: function (e) {
            const td = e.target;
            const cell = this.state.data[td.dataset.row]?.[td.dataset.col];
            if (cell) cell.text = td.innerText;
          },
          getSelectedCells: function () {
            return this.state.selected
              .map((p) => ({
                ...p,
                cell: this.state.data[p.row]?.[p.col],
              }))
              .filter((i) => i.cell && !i.cell.hidden);
          },
          applyStyle: function (updates) {
            this.getSelectedCells().forEach(({ cell }) => Object.assign(cell, updates));
            this.renderGrid();
          },
          toggleStyle: function (key) {
            const cells = this.getSelectedCells();
            if (!cells.length) return;
            const val = !cells[0].cell[key];
            cells.forEach(({ cell }) => (cell[key] = val));
            this.renderGrid();
          },

          mergeSelection: function () {
            const cells = this.getSelectedCells();
            if (cells.length < 2) return Utils.toast("请选择至少两个单元格", "error");
            const rows = cells.map((c) => c.row),
              cols = cells.map((c) => c.col);
            const minRow = Math.min(...rows),
              maxRow = Math.max(...rows),
              minCol = Math.min(...cols),
              maxCol = Math.max(...cols);
            if ((maxRow - minRow + 1) * (maxCol - minCol + 1) !== cells.length) return Utils.toast("请选择矩形区域", "error");
            if (cells.some(({ cell }) => cell.rowspan > 1 || cell.colspan > 1)) return Utils.toast("区域含已合并单元格", "error");
            const base = this.state.data[minRow][minCol];
            let mergedText = base.text;
            cells.forEach((c, idx) => {
              if (idx > 0 && c.cell.text.trim()) mergedText += " " + c.cell.text;
            });
            base.text = mergedText;
            base.rowspan = maxRow - minRow + 1;
            base.colspan = maxCol - minCol + 1;
            for (let r = minRow; r <= maxRow; r++) {
              for (let c = minCol; c <= maxCol; c++) {
                if (r === minRow && c === minCol) continue;
                this.state.data[r][c].hidden = true;
                this.state.data[r][c].text = "";
              }
            }
            this.state.selected = [
              {
                row: minRow,
                col: minCol,
              },
            ];
            this.renderGrid();
            this.updateFloatMenu();
          },

          splitSelection: function () {
            const target = this.getSelectedCells()[0];
            if (!target || (target.cell.rowspan === 1 && target.cell.colspan === 1)) return;
            const { row, col } = target;
            const cell = target.cell;
            const maxRow = row + cell.rowspan - 1;
            const maxCol = col + cell.colspan - 1;
            cell.rowspan = 1;
            cell.colspan = 1;
            for (let r = row; r <= maxRow; r++) for (let c = col; c <= maxCol; c++) if (r !== row || c !== col) this.state.data[r][c] = this.createCell();
            this.state.selected = [
              {
                row,
                col,
              },
            ];
            this.renderGrid();
            this.updateFloatMenu();
          },

          normalizeCells: function (cells) {
            return cells
              ? cells.map((row) =>
                  row.map((c) => ({
                    ...this.createCell(),
                    ...c,
                  })),
                )
              : [];
          },

          insertIntoCanvas: function () {
            if (!App.canvas) return;
            const config = {
              rows: this.state.rows,
              cols: this.state.cols,
              colWidths: [...this.state.colWidths],
              rowHeights: [...this.state.rowHeights],
              cells: JSON.parse(JSON.stringify(this.state.data)),
            };
            if (!this.state.editingTarget && App.state.paperType === "label" && App.state.label.mode === "design") {
              const totalW = config.colWidths.reduce((a, b) => a + b, 0);
              const totalH = config.rowHeights.reduce((a, b) => a + b, 0);
              const targetW = App.state.baseWidth * 0.9;
              const targetH = App.state.baseHeight * 0.9;
              const scaleX = targetW / totalW;
              const scaleY = targetH / totalH;
              const scale = Math.min(scaleX, scaleY);
              if (scale !== 1) {
                config.colWidths = config.colWidths.map((w) => w * scale);
                config.rowHeights = config.rowHeights.map((h) => h * scale);
                config.cells.forEach((row) => {
                  row.forEach((cell) => {
                    if (cell.fontSize) {
                      cell.fontSize = Math.max(4, Math.round(cell.fontSize * scale * 10) / 10);
                    }
                    if (cell.borderWidth) {
                      cell.borderWidth = Math.max(0.1, cell.borderWidth * scale);
                    }
                  });
                });
              }
            }

            if (this.state.editingTarget) {
              this._replaceTableOnCanvas(this.state.editingTarget, config);
              Utils.toast("表格已更新");
            } else {
              App.tools._addToCanvas(this.buildFabricTable(config));
              Utils.toast("表格已插入");
            }
            if (App.dataSource) App.dataSource.refreshBindingState();
            this.close();
          },

          buildFabricTable: function (config) {
            const objs = [];
            const colAcc = [0];
            config.colWidths.forEach((w, i) => colAcc.push(colAcc[i] + w));
            const rowAcc = [0];
            config.rowHeights.forEach((h, i) => rowAcc.push(rowAcc[i] + h));
            const totalW = colAcc[colAcc.length - 1],
              totalH = rowAcc[rowAcc.length - 1];
            const offsetX = totalW / 2,
              offsetY = totalH / 2;
            for (let r = 0; r < config.rows; r++) {
              for (let c = 0; c < config.cols; c++) {
                const cell = config.cells[r][c];
                if (!cell || cell.hidden) continue;
                const cellW = colAcc[c + cell.colspan] - colAcc[c];
                const cellH = rowAcc[r + cell.rowspan] - rowAcc[r];
                const left = colAcc[c] + cellW / 2 - offsetX;
                const top = rowAcc[r] + cellH / 2 - offsetY;
                objs.push(
                  new fabric.Rect({
                    left,
                    top,
                    width: cellW,
                    height: cellH,
                    fill: cell.bg || "#ffffff",
                    stroke: cell.borderColor || "#000",
                    strokeWidth: cell.borderWidth ?? 1,
                    originX: "center",
                    originY: "center",
                  }),
                );
                if (cell.text && cell.text.trim()) {
                  const padding = Math.min(8, cellW * 0.15);
                  const textWidth = Math.max(0, cellW - padding);
                  objs.push(
                    new fabric.Textbox(cell.text, {
                      left,
                      top,
                      width: textWidth,
                      fontSize: cell.fontSize || 14,
                      fontFamily: cell.fontFamily || "SourceHanSerifCN-Bold",
                      fontWeight: cell.bold ? "bold" : "normal",
                      fontStyle: cell.italic ? "italic" : "normal",
                      fill: cell.textColor || "#000",
                      textAlign: cell.align || "center",
                      originX: "center",
                      originY: "center",
                      splitByGrapheme: true,
                      editable: false,
                    }),
                  );
                }
              }
            }
            objs.push(
              new fabric.Rect({
                left: 0,
                top: 0,
                width: totalW,
                height: totalH,
                fill: "transparent",
                strokeWidth: 0,
                originX: "center",
                originY: "center",
                excludeFromExport: true,
              }),
            );
            return new fabric.Group(objs, {
              left: App.state.baseWidth / 2,
              top: App.state.baseHeight / 2,
              originX: "center",
              originY: "center",
              isTable: true,
              tableData: config,
              lockScalingX: false,
              lockScalingY: false,
              hasControls: true,
              hasBorders: true,
              lockUniScaling: false,
            });
          },

          _replaceTableOnCanvas: function (target, data) {
            const center = target.getCenterPoint();
            const preserved = {
              angle: target.angle,
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              opacity: target.opacity,
            };
            const newGroup = this.buildFabricTable(data);
            newGroup.set({
              left: center.x,
              top: center.y,
              ...preserved,
            });
            const idx = App.canvas.getObjects().indexOf(target);
            App.canvas.remove(target);
            App.canvas.insertAt(newGroup, idx >= 0 ? idx : undefined, true);
            App.canvas.setActiveObject(newGroup);
            App.canvas.requestRenderAll();
            App.ui.updateLayerList();
            App.history.saveState();
            this.state.editingTarget = newGroup;
          },

          normalizeScaledTable: function (tableObj) {
            if (!tableObj?.isTable || !tableObj.tableData) return;
            const sX = tableObj.scaleX || 1;
            const sY = tableObj.scaleY || 1;
            if (Math.abs(sX - 1) < 0.001 && Math.abs(sY - 1) < 0.001) return;
            const d = JSON.parse(JSON.stringify(tableObj.tableData));
            if (!d.colWidths) d.colWidths = Array(d.cols).fill(d.cellWidth || 100);
            if (!d.rowHeights) d.rowHeights = Array(d.rows).fill(d.cellHeight || 44);
            d.colWidths = d.colWidths.map((w) => w * sX);
            d.rowHeights = d.rowHeights.map((h) => h * sY);
            if (d.cells)
              d.cells.forEach((row) =>
                row.forEach((cell) => {
                  if (cell && cell.fontSize) {
                    cell.fontSize = Math.max(4, Math.round(cell.fontSize * sX * 10) / 10);
                  }
                  if (cell.borderWidth) {
                    const rawWidth = cell.borderWidth * Math.min(sX, sY);
                    cell.borderWidth = Math.max(0.1, Math.round(rawWidth * 10) / 10);
                  }
                }),
              );
            tableObj.scaleX = 1;
            tableObj.scaleY = 1;
            this._replaceTableOnCanvas(tableObj, d);
          },
          updateActiveTableStyle: function (styleUpdates) {
            const act = App.canvas.getActiveObject();
            if (!act || !act.isTable || !act.tableData) return;
            act.tableData.cells.forEach((row) => {
              row.forEach((cell) => {
                Object.assign(cell, styleUpdates);
              });
            });
            const transform = act.toObject(["left", "top", "scaleX", "scaleY", "angle", "opacity", "originX", "originY"]);
            const newGroup = this.buildFabricTable(act.tableData);
            newGroup.set(transform);
            const idx = App.canvas.getObjects().indexOf(act);
            App.canvas.discardActiveObject();
            App.canvas.remove(act);
            App.canvas.insertAt(newGroup, idx, true);
            App.canvas.setActiveObject(newGroup);
            App.canvas.requestRenderAll();
            App.history.saveState();
          },
        },

        barcode: {
          defaults: {
            type: "code128",
            text: "12345678910",
            scaleX: 2,
            scaleY: 1,
            color: "#000000",
            includeText: true,
            textAlign: "center",
            barheight: 10,
            showText: true,
            ecc: "Q",
            fontSize: 10,
            textGap: 0,
          },

          errorIconPath: "./static/barcode-error.svg",

          is2DType: function (type) {
            return ["qrcode", "microqrcode", "datamatrix", "gs1datamatrix", "azteccode", "maxicode", "pdf417", "micropdf417", "hanxin", "dotcode", "gridmatrix"].includes(type);
          },

          generateSVG: function (config) {
            try {
              if (!config.text || String(config.text).trim() === "") throw new Error("数据为空");
              const is2D = this.is2DType(config.type);
              const opts = {
                bcid: config.type,
                text: config.text,
                scale: config.scaleX || 2,
                textxalign: config.textAlign || "center",
                barcolor: config.color.replace("#", ""),
                textcolor: config.color.replace("#", ""),
              };
              if (!is2D) {
                opts.height = parseInt(config.barheight) || 10;
                opts.includetext = config.showText;
                opts.textsize = parseInt(config.fontSize) || 10;
                opts.textyoffset = parseInt(config.textGap) || 0;
              }

              if (config.type === "qrcode" || config.type === "microqrcode") {
                opts.eclevel = config.ecc || "L";
              }

              const svg = bwipjs.toSVG(opts);
              return { svg, error: null };
            } catch (e) {
              return { svg: null, error: e.message };
            }
          },

          createErrorObj: function (targetObj, config, errorMsg) {
            return new Promise((resolve) => {
              fabric.loadSVGFromURL(this.errorIconPath, (objects, options) => {
                let errObj;
                if (!objects || objects.length === 0) {
                  errObj = new fabric.Textbox("ERROR", { width: 100, fontSize: 14, backgroundColor: "#fee2e2" });
                } else {
                  errObj = fabric.util.groupSVGElements(objects, options);
                }

                const safeConfig = JSON.parse(JSON.stringify(config));
                errObj.set({
                  isBarcode: true,
                  barcodeConfig: safeConfig,
                  originX: "center",
                  originY: "center",
                  lockUniScaling: false,
                });
                if (targetObj) {
                  errObj.set({
                    left: targetObj.left,
                    top: targetObj.top,
                    angle: targetObj.angle,
                    dataBinding: targetObj.dataBinding,
                    scaleX: targetObj.scaleX,
                    scaleY: targetObj.scaleY,
                  });
                } else {
                  const center = App.tools._getCenter();
                  errObj.set({ left: center.left, top: center.top });
                }
                resolve(errObj);
              });
            });
          },

          createOrUpdate: async function (targetObj, config, shouldResetScale = false) {
            const res = this.generateSVG(config);
            if (res.error) return this.createErrorObj(targetObj, config, res.error);
            return new Promise((resolve) => {
              fabric.loadSVGFromString(res.svg, (objects, options) => {
                const loadedObj = fabric.util.groupSVGElements(objects, options);
                const commonProps = {
                  isBarcode: true,
                  barcodeConfig: JSON.parse(JSON.stringify(config)),
                  originX: "center",
                  originY: "center",
                  lockUniScaling: this.is2DType(config.type),
                };
                if (targetObj) {
                  loadedObj.set({
                    left: targetObj.left,
                    top: targetObj.top,
                    angle: targetObj.angle,
                    scaleX: shouldResetScale ? 1 : targetObj.scaleX,
                    scaleY: shouldResetScale ? 1 : targetObj.scaleY,
                  });
                  loadedObj.rawContent = targetObj.rawContent;
                  loadedObj.prefixRaw = targetObj.prefixRaw !== undefined ? targetObj.prefixRaw : targetObj.prefix || "";
                  loadedObj.suffixRaw = targetObj.suffixRaw !== undefined ? targetObj.suffixRaw : targetObj.suffix || "";
                  loadedObj.prefix = loadedObj.prefixRaw;
                  loadedObj.suffix = loadedObj.suffixRaw;
                  loadedObj.set({
                    dataBinding: targetObj.dataBinding,
                    sharedId: targetObj.sharedId,
                    refId: targetObj.refId,
                    syncMode: targetObj.syncMode,

                    isSerialNumber: targetObj.isSerialNumber,
                    serialConfig: targetObj.serialConfig,
                    isDynamicDate: targetObj.isDynamicDate,
                    dateConfig: targetObj.dateConfig,
                    isDynamicPageNum: targetObj.isDynamicPageNum,
                    pageConfig: targetObj.pageConfig,
                  });
                } else {
                  const center = App.tools._getCenter();
                  loadedObj.set({
                    left: center.left,
                    top: center.top,
                    rawContent: config.text,
                    prefixRaw: "",
                    suffixRaw: "",
                    prefix: "",
                    suffix: "",
                    syncMode: "none",
                  });
                }

                Object.assign(loadedObj, commonProps);
                resolve(loadedObj);
              });
            });
          },

          handleResize: function (target) {
            const cfg = target.barcodeConfig;
            const is2D = this.is2DType(cfg.type);
            let newScaleX = (cfg.scaleX || 2) * target.scaleX;
            newScaleX = Math.max(1, Math.min(10, newScaleX));
            let newHeight = cfg.barheight;
            if (!is2D) {
              newHeight = (cfg.barheight || 10) * target.scaleY;
              newHeight = Math.max(1, Math.min(150, newHeight));
            } else {
            }

            cfg.scaleX = newScaleX;
            cfg.barheight = newHeight;
            this.createOrUpdate(target, cfg, true).then((newObj) => {
              App.ui._replaceObject(target, newObj);
              if (App.canvas.getActiveObject() === newObj) {
                const elH = document.getElementById("bcBarHeight");
                if (elH) elH.value = Math.round(newHeight);
              }
            });
          },

          toggleOptions: function (type) {
            const is2D = this.is2DType(type);
            document.getElementById("bc1DOptions").classList.toggle("hidden", is2D);
            const show2DPanel = type === "qrcode" || type === "microqrcode";
            document.getElementById("bc2DOptions").classList.toggle("hidden", !show2DPanel);
          },

          toggleSharedMode: function (isChecked) {
            const textArea = document.getElementById("bcText");
            const select = document.getElementById("bcSharedSelect");
            if (isChecked) {
              textArea.classList.add("hidden");
              select.classList.remove("hidden");
              App.ui.refreshSharedSelectForBarcode();
            } else {
              textArea.classList.remove("hidden");
              select.classList.add("hidden");
              const act = App.canvas.getActiveObject();
              if (act) textArea.value = act.rawContent || "";
            }
            this.applySettings();
          },
          applySettings: async function () {
            const act = App.canvas.getActiveObject();
            if (!act || !act.isBarcode) return;
            const getVal = (id) => document.getElementById(id).value;
            const getChk = (id) => document.getElementById(id).checked;
            const newVisualConfig = {
              type: getVal("bcType"),
              color: getVal("bcColor"),
              showText: getChk("bcShowText"),
              textAlign: getVal("bcTextAlign"),
              barheight: parseInt(getVal("bcBarHeight")) || 10,
              fontSize: parseInt(getVal("bcFontSize")) || 10,
              textGap: parseInt(getVal("bcTextGap")) || 0,
              ecc: getVal("bcEcc"),
              scaleX: act.barcodeConfig.scaleX || 2,
            };
            if (act.barcodeConfig.type !== newVisualConfig.type) {
              newVisualConfig.scaleX = 2;
            }

            act.barcodeConfig = { ...act.barcodeConfig, ...newVisualConfig };
            const useShared = getChk("bcUseShared");
            const isVariable = act.dataBinding && act.dataBinding.type === "variable";
            const isAuto = act.isSerialNumber || act.isDynamicDate || act.isDynamicPageNum;
            if (!isVariable && !isAuto) {
              if (useShared) {
                const refId = getVal("bcSharedSelect");
                if (refId) {
                  act.syncMode = "ref";
                  act.refId = refId;
                }
              } else {
                act.syncMode = "none";
                act.refId = null;
                act.rawContent = getVal("bcText");
              }
            }

            await App.content.render(act);
            this.toggleOptions(newVisualConfig.type);
            App.history.saveState();
          },
        },

        ui: {
          setDataType: function (type) {
            const act = App.canvas.getActiveObject();
            if (!act || (!["i-text", "textbox", "text"].includes(act.type) && !act.isBarcode && act.type !== "image")) return;
            if (act.syncMode === "ref") {
              act.syncMode = "none";
              act.refId = null;
            }

            delete act.dataBinding;
            act.isSerialNumber = false;
            act.isDynamicDate = false;
            if (!act.isBarcode && act.type !== "image") act.set("editable", true);
            let newValue = null;
            if (type === "static") {
              newValue = act.rawContent || "";
            } else if (type === "variable") {
              const ds = App.state.dataSource;
              act.dataBinding = {
                type: "variable",
                sheet: ds.currentSheet || (ds.sheetNames.length ? ds.sheetNames[0] : ""),
                field: ds.headers.length ? ds.headers[0] : "",
              };
              if (!act.isBarcode && act.type !== "image") act.set("editable", false);
              if (ds.isActive && ds.data.length > 0 && act.dataBinding.field) {
                const row = ds.data[App.state.currentDataIndex || 0];
                newValue = row ? String(row[act.dataBinding.field] || "") : "";
              } else {
                newValue = act.dataBinding.field ? `{${act.dataBinding.field}}` : act.isBarcode ? "123456" : "变量预览";
              }
            } else if (type === "serial") {
              act.isSerialNumber = true;
              if (!act.serialConfig) {
                act.serialConfig = {
                  startValue: "1",
                  step: 1,
                  repeat: 1,
                  changeType: "increment",
                  generateCount: 10,
                  showTotal: false,
                  totalSeparator: "/",
                };
              }
              if (!act.isBarcode) act.set("editable", false);
              newValue = App.tools._formatSerialNumber(act.serialConfig, App.state.currentDataIndex || 0);
            } else if (type === "date") {
              act.isDynamicDate = true;
              if (!act.dateConfig) {
                act.dateConfig = {
                  showDate: true,
                  showTime: false,
                  dateFormat: "YYYY-MM-DD",
                  timeFormat: "HH:mm:ss",
                  offsetDays: 0,
                  offsetMinutes: 0,
                };
              }
              if (!act.isBarcode) act.set("editable", false);
              newValue = Utils.formatDate(new Date(), null, act.dateConfig);
            }

            if (newValue !== null) {
              act.rawContent = newValue;
              App.content.render(act);
            }

            if (act.isEditing && typeof act.exitEditing === "function") act.exitEditing();
            setTimeout(() => App.ui.updateInspector(), 0);
            App.history.saveState();
          },
          updateGeo: function (key, val, targetObj = null) {
            const act = targetObj || App.canvas.getActiveObject();
            if (!act) return;
            if (val === undefined || val === null) {
              const p = act.getPointByOrigin("left", "top");
              document.getElementById("propX").value = Utils.px2mm(p.x).toFixed(1);
              document.getElementById("propY").value = Utils.px2mm(p.y).toFixed(1);
              document.getElementById("propAngle").value = Math.round(act.angle);
              document.getElementById("propW").value = Utils.px2mm(act.getScaledWidth()).toFixed(1);
              document.getElementById("propH").value = Utils.px2mm(act.getScaledHeight()).toFixed(1);
            } else {
              const numVal = parseFloat(val);
              if (isNaN(numVal)) return;
              if (key === "angle") act.set("angle", numVal);
              else {
                const pxVal = Utils.mm2px(numVal);
                if (key === "left" || key === "top") {
                  let cx = parseFloat(document.getElementById("propX").value),
                    cy = parseFloat(document.getElementById("propY").value);
                  act.setPositionByOrigin(new fabric.Point(Utils.mm2px(key === "left" ? numVal : cx), Utils.mm2px(key === "top" ? numVal : cy)), "left", "top");
                } else if (key === "width") act.type === "textbox" ? act.set("width", pxVal) : act.set("scaleX", pxVal / act.width);
                else if (key === "height") act.set("scaleY", pxVal / act.height);
              }
              if (act.isTable && (key === "width" || key === "height")) {
                act.setCoords();
                App.tableEditor.normalizeScaledTable(act);
                return;
              }
              act.setCoords();
              App.canvas.requestRenderAll();
              App.history.saveState();
            }
          },

          setProp: function (key, val) {
            const act = App.canvas.getActiveObject();
            if (act) {
              if (act.isTable) {
                const map = {};
                if (key === "fontFamily") map.fontFamily = val;
                if (key === "fontSize") map.fontSize = val;
                if (key === "fill") map.textColor = val;
                if (key === "textAlign") map.align = val;
                if (key === "stroke") map.borderColor = val;
                if (key === "strokeWidth") map.borderWidth = parseFloat(val);
                if (Object.keys(map).length > 0) {
                  App.tableEditor.updateActiveTableStyle(map);
                }
                return;
              }

              if (key === "textAlign" && ["i-text", "textbox", "text"].includes(act.type)) {
                const validOrigin = val === "justify" ? "left" : val;
                let anchorPoint;
                if (validOrigin === "left") {
                  anchorPoint = act.getPointByOrigin("left", "top");
                } else if (validOrigin === "right") {
                  anchorPoint = act.getPointByOrigin("right", "top");
                } else {
                  anchorPoint = act.getPointByOrigin("center", "top");
                }
                act.set("textAlign", val);
                act.set("originX", validOrigin);
                act.setPositionByOrigin(anchorPoint, validOrigin, "top");
                act.setCoords();
              } else {
                if (key === "strokeWidth" && val > 0 && (!act.stroke || act.stroke === "transparent")) {
                  act.set("stroke", "#666666");
                  const colorPicker = document.getElementById("shapeStroke") || document.getElementById("lineColor");
                  if (colorPicker) colorPicker.value = "#666666";
                }

                act.type === "activeSelection" ? act.forEachObject((o) => o.set(key, val)) : act.set(key, val);
              }

              if (key === "fontFamily") {
                App.fontManager.ensureBundledFont(val).then(() => App.canvas.requestRenderAll());
              }
              App.canvas.requestRenderAll();
              App.history.saveState();
              App.ui.updateGeo(null, null, act);
            }
          },

          updateLineDash: function () {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "line") return;
            const v = parseFloat(document.getElementById("lineDashVal").value) || 5;
            act.set("strokeDashArray", document.getElementById("lineDashCheck").checked ? [v, v] : null);
            App.canvas.requestRenderAll();
            App.history.saveState();
          },

          toggleStyle: function (style) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            if (act.isTable) {
              const cell = act.tableData.cells[0][0];
              let update = {};
              if (style === "bold") update.bold = !cell.bold;
              if (style === "italic") update.italic = !cell.italic;
              if (Object.keys(update).length > 0) {
                App.tableEditor.updateActiveTableStyle(update);
                document.getElementById("btnBold").classList.toggle("active", update.bold !== undefined ? update.bold : cell.bold);
                document.getElementById("btnItalic").classList.toggle("active", update.italic !== undefined ? update.italic : cell.italic);
              }
              return;
            }
            if (style === "bold") act.set("fontWeight", act.fontWeight === "bold" ? "normal" : "bold");
            else if (style === "italic") act.set("fontStyle", act.fontStyle === "italic" ? "normal" : "italic");
            else if (style === "underline") act.set("underline", !act.underline);
            App.canvas.requestRenderAll();
            this.updateInspector();
            App.history.saveState();
          },
          toggleVertical: function () {
            const act = App.canvas.getActiveObject();
            if (!act || !["i-text", "text", "textbox"].includes(act.type)) return;
            const isVert = !!act.isVertical;
            const text = act.text || "";
            if (!isVert) {
              act._prevLineHeight = act.lineHeight;
              act._prevTextAlign = act.textAlign;
              const paragraphs = text.split("\n");
              const vertParagraphs = paragraphs.map((p) => {
                return p.split("").join("\n");
              });
              const vertText = vertParagraphs.join("\n\n");
              act.set({
                text: vertText,
                isVertical: true,
                textAlign: "center",
                lineHeight: 1,
                width: act.type === "textbox" ? act.width : undefined,
              });
            } else {
              const vertParagraphs = text.split(/\n\n/);
              const horizParagraphs = vertParagraphs.map((p) => {
                return p.replace(/\n/g, "");
              });
              const horizText = horizParagraphs.join("\n");
              act.set({
                text: horizText,
                isVertical: false,
                textAlign: act._prevTextAlign || "left",
                lineHeight: act._prevLineHeight || 1.2,
              });
            }

            act.setCoords();
            App.canvas.requestRenderAll();
            this.updateInspector();
            App.history.saveState();
          },

          updateShapeDash: function () {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const isChecked = document.getElementById("shapeDashCheck").checked;
            const v = parseInt(document.getElementById("shapeDashVal").value) || 5;
            act.set("strokeDashArray", isChecked ? [v, v] : null);
            App.canvas.requestRenderAll();
            App.history.saveState();
          },

          toggleShapeFill: function () {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const noFill = document.getElementById("shapeNoFill").checked;
            const wrapper = document.getElementById("shapeFillWrapper");
            if (act.isTable) {
              if (noFill) {
                App.tableEditor.updateActiveTableStyle({
                  bg: "transparent",
                });
                wrapper.classList.add("opacity-50", "pointer-events-none");
              } else {
                const color = document.getElementById("shapeFill").value || "#ffffff";
                App.tableEditor.updateActiveTableStyle({
                  bg: color,
                });
                wrapper.classList.remove("opacity-50", "pointer-events-none");
              }
              return;
            }

            if (noFill) {
              if (act.fill !== "transparent") act._lastColor = act.fill;
              act.set("fill", "transparent");
              wrapper.classList.add("opacity-50", "pointer-events-none");
              if (!act.strokeWidth || act.strokeWidth === 0) {
                const defaultStroke = "#666666";
                const defaultWidth = 0.5;
                act.set({
                  stroke: defaultStroke,
                  strokeWidth: defaultWidth,
                });
                const elColor = document.getElementById("shapeStroke");
                const elWidth = document.getElementById("shapeStrokeWidth");
                if (elColor) elColor.value = defaultStroke;
                if (elWidth) elWidth.value = defaultWidth;
              }
            } else {
              const color = act._lastColor || document.getElementById("shapeFill").value || "#666666";
              act.set("fill", color);
              wrapper.classList.remove("opacity-50", "pointer-events-none");
              document.getElementById("shapeFill").value = color;
            }
            App.canvas.requestRenderAll();
            App.history.saveState();
          },

          setShapeFill: function (val) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            if (act.isTable) {
              App.tableEditor.updateActiveTableStyle({
                bg: val,
              });
              document.getElementById("shapeNoFill").checked = false;
              document.getElementById("shapeFillWrapper").classList.remove("opacity-50", "pointer-events-none");
              return;
            }

            act.set("fill", val);
            act._lastColor = val;
            document.getElementById("shapeNoFill").checked = false;
            document.getElementById("shapeFillWrapper").classList.remove("opacity-50", "pointer-events-none");
            App.canvas.requestRenderAll();
            App.history.saveState();
          },

          updateToolbarState: function () {
            const act = App.canvas.getActiveObject();
            let count = 0;
            let type = "";
            if (act) {
              type = act.type;
              if (type === "activeSelection") {
                count = act.getObjects().length;
              } else {
                count = 1;
              }
            }

            const canTune = count >= 1;
            document.querySelectorAll(".tune-btn").forEach((btn) => (btn.disabled = !canTune));
            const canAlign = count >= 2;
            document.querySelectorAll(".align-btn").forEach((btn) => (btn.disabled = !canAlign));
            const canDistribute = count >= 3;
            document.querySelectorAll(".dist-btn").forEach((btn) => (btn.disabled = !canDistribute));
            const btnGroup = document.getElementById("btnGroup");
            const btnUngroup = document.getElementById("btnUngroup");
            if (btnGroup) {
              btnGroup.disabled = type !== "activeSelection";
            }

            if (btnUngroup) {
              const isGenericGroup = type === "group" && !act.isTable && !act.isBarcode;
              btnUngroup.disabled = !isGenericGroup;
            }
            const btnLock = document.getElementById("btnLock");
            if (btnLock) {
              btnLock.disabled = !act;
              if (act) {
                const isLocked = act.lockMovementX;
                btnLock.innerHTML = isLocked ? '<i class="ph ph-lock-key text-red-600"></i>' : '<i class="ph ph-lock-key-open"></i>';
                btnLock.classList.toggle("bg-red-50", !!isLocked);
              }
            }
          },

          updateInspector: function () {
            const ui = this._getUIProxy();
            const act = App.canvas.getActiveObject();
            if (act) App.state.editingBackground = false;
            const hasBgImage = !!App.canvas.backgroundImage;
            if (!hasBgImage && App.state.editingBackground) App.state.editingBackground = false;
            const isBgEdit = App.state.editingBackground && hasBgImage;
            const hasSelection = !!act || isBgEdit;
            this.updateToolbarState();
            const allPanels = [
              "selectionControls",
              "dataTypeTabs",
              "affixProps",
              "geoProps",
              "transProps",
              "textProps",
              "imgProps",
              "lineProps",
              "shapeProps",
              "tableProps",
              "rectCornerControl",
              "dataProps",
              "barcodeProps",
              "dateProps",
              "pageNumProps",
              "serialProps",
              "sharedProps",
            ];
            allPanels.forEach((id) => ui(id).show(false));
            document.getElementById("dataTypeTabs")?.classList.replace("grid-cols-2", "grid-cols-4");
            ui("noSelection").show(!hasSelection);
            if (!hasSelection) {
              this.updateLayerList();
              return;
            }

            ui("selectionControls").show(true);
            const propLockBtn = document.getElementById("propLockBtn");
            const propLockIcon = document.getElementById("propLockIcon");
            const propLockText = document.getElementById("propLockText");
            if (propLockBtn && act) {
              const isLocked = act.lockMovementX;
              propLockIcon.className = isLocked ? "ph ph-lock-key text-red-600 text-lg" : "ph ph-lock-key-open text-lg";
              propLockText.innerText = isLocked ? "已锁定" : "未锁定";
              propLockText.className = isLocked ? "text-[10px] text-red-600 font-bold" : "text-[10px] text-slate-400";
            }

            if (isBgEdit) {
              this._renderBackgroundProps(ui, App.canvas.backgroundImage);
            } else if (act) {
              ui("geoProps").show(true);
              ui("transProps").show(true);
              this.updateGeo(null, null, act);
              ui("propOpacity").val(act.opacity || 1);
              ui("opacityVal").text(Math.round((act.opacity || 1) * 100) + "%");
              const supportsAffix = ["i-text", "textbox", "text"].includes(act.type) || act.isBarcode;
              ui("affixProps").show(supportsAffix);
              if (supportsAffix) {
                ui("propPrefix").val(act.prefixRaw !== undefined ? act.prefixRaw : act.prefix || "");
                ui("propSuffix").val(act.suffixRaw !== undefined ? act.suffixRaw : act.suffix || "");
              }

              const supportsDataBinding = ["i-text", "textbox", "text"].includes(act.type) || act.isBarcode;
              let currentType = "static";
              if (supportsDataBinding) {
                ui("dataTypeTabs").show(true);
                if (act.dataBinding && act.dataBinding.type === "variable") currentType = "variable";
                else if (act.isSerialNumber) currentType = "serial";
                else if (act.isDynamicDate) currentType = "date";
                ["static", "variable", "serial", "date"].forEach((type) => {
                  const btn = document.getElementById(`dtBtn-${type}`);
                  if (btn) {
                    const isActive = type === currentType;
                    btn.className = isActive
                      ? "py-1.5 text-center rounded-md transition text-[10px] font-bold bg-white text-red-600 shadow-sm ring-1 ring-black/5"
                      : "py-1.5 text-center rounded-md transition text-[10px] font-bold text-slate-500 hover:text-slate-700 hover:bg-gray-200/50";
                  }
                });
                if (currentType === "variable") {
                  ui("dataProps").show(true);
                  this._updateVDPUI(ui, act);
                } else if (currentType === "serial") {
                  ui("serialProps").show(true);
                  const cfg = act.serialConfig || {};
                  ui("serialStartValue").val(cfg.startValue);
                  ui("serialStep").val(cfg.step);
                  ui("serialRepeat").val(cfg.repeat);
                  ui("serialChangeType").val(cfg.changeType);
                  const wrapper = document.getElementById("serialGenerateCountWrapper");
                  if (wrapper) {
                    const isLabelMode = App.state.paperType === "label";
                    if (isLabelMode) {
                      wrapper.classList.add("hidden");
                    } else {
                      wrapper.classList.remove("hidden");
                      ui("serialGenerateCount").val(cfg.generateCount || 10);
                    }
                  }
                  ui("serialShowTotal").check(cfg.showTotal || false);
                  const sepWrapper = document.getElementById("serialTotalSeparatorWrapper");
                  if (sepWrapper) {
                    sepWrapper.classList.toggle("hidden", !cfg.showTotal);
                  }
                  ui("serialTotalSeparator").val(cfg.totalSeparator || "/");
                  this.updateSerialTotalPreviewDemo(cfg);
                  this.updateSerialPreview(cfg);
                } else if (currentType === "date") {
                  ui("dateProps").show(true);
                  const cfg = act.dateConfig || {};
                  const dSel = document.getElementById("dateFormat");
                  const tSel = document.getElementById("timeFormat");
                  if (dSel && dSel.options.length === 0) {
                    DATE_FMT_OPTS.forEach((o) => dSel.add(new Option(o.l, o.v)));
                    TIME_FMT_OPTS.forEach((o) => tSel.add(new Option(o.l, o.v)));
                  }
                  ui("dateShowDate").check(cfg.showDate);
                  ui("dateShowTime").check(cfg.showTime);
                  ui("dateFormat").val(cfg.dateFormat);
                  ui("timeFormat").val(cfg.timeFormat);
                  ui("dateOffsetDays").val(cfg.offsetDays || 0);
                  ui("dateOffsetMinutes").val(cfg.offsetMinutes || 0);
                  document.getElementById("dateFormatWrapper").classList.toggle("hidden", !cfg.showDate);
                  document.getElementById("timeFormatWrapper").classList.toggle("hidden", !cfg.showTime);
                }
              }

              if (act.isBarcode) {
                this._updateBarcodePanel(ui, act, currentType);
              } else if (["i-text", "textbox", "text"].includes(act.type)) {
                this._updateTextPanel(ui, act);
              } else if (act.type === "activeSelection") {
                this._handleMultiSelection(ui, act);
              } else if (act.isTable) {
                this._updateTablePanel(ui, act);
              } else if (act.type === "image") {
                this._updateImagePanel(ui, act, false);
              } else if (act.type === "line") {
                this._updateLinePanel(ui, act);
              } else if (["rect", "circle", "triangle", "polygon", "path"].includes(act.type)) {
                this._updateShapePanel(ui, act);
              }
            }

            this.updateLayerList();
          },
          setSharedId: function (val) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const cleanVal = val.trim();
            act.set("sharedId", cleanVal);
            if (cleanVal) {
              App.variables.set(cleanVal, act.text || "", act);
            }
            App.history.saveState();
          },
          toggleSyncMode: function (mode) {
            const sharePanel = document.getElementById("syncPanel_share");
            const refPanel = document.getElementById("syncPanel_ref");
            const act = App.canvas.getActiveObject();
            if (mode === "none") {
              sharePanel.classList.add("hidden");
              refPanel.classList.add("hidden");
              if (act) {
                this.clearSyncData();
              }
            } else if (mode === "share") {
              sharePanel.classList.remove("hidden");
              refPanel.classList.add("hidden");
              if (act) document.getElementById("propSharedInput").value = act.sharedId || "";
            } else if (mode === "ref") {
              sharePanel.classList.add("hidden");
              refPanel.classList.remove("hidden");
              this.refreshSharedSelect();
              const select = document.getElementById("propSharedSelect");
              if (select) select.value = act.refId || "";
            }
          },

          refreshSharedSelect: function () {
            const select = document.getElementById("propSharedSelect");
            const act = App.canvas.getActiveObject();
            const currentId = act ? act.sharedId : "";
            select.innerHTML = '<option value="">选择共享字段</option>';
            const keys = App.content.getAvailableSharedIds();
            if (keys.length === 0) {
              const opt = document.createElement("option");
              opt.text = "(暂无共享字段)";
              opt.disabled = true;
              select.add(opt);
            }

            keys.forEach((key) => {
              const opt = document.createElement("option");
              opt.value = key;
              opt.text = key;
              if (key === currentId) opt.selected = true;
              select.add(opt);
            });
          },
          saveSharedId: function () {
            const input = document.getElementById("propSharedInput");
            const val = input.value.trim();
            if (!val) return Utils.toast("请输入共享名称", "error");
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const exists = App.canvas.getObjects().some((obj) => {
              return obj !== act && obj.sharedId === val && obj.syncMode === "share";
            });
            if (exists) {
              return Utils.toast(`共享名称 "${val}" 已存在，请使用其他名称`, "error");
            }
            act.set({
              sharedId: val,
              syncMode: "share",
            });
            App.content.render(act);
            App.history.saveState();
            Utils.toast(`已设置共享字段: ${val}`);
            App.ui.updateInspector();
          },
          applyRefId: function (val) {
            if (!val) return;
            const act = App.canvas.getActiveObject();
            if (!act) return;
            act.set("refId", val);
            act.set("syncMode", "ref");
            act.set("editable", true);
            App.content.render(act);
            App.history.saveState();
            App.ui.updateInspector();
          },

          clearSyncData: function () {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            act.set({
              sharedId: null,
              refId: null,
              syncMode: "none",
              editable: true,
            });
            const input = document.getElementById("propSharedInput");
            if (input) input.value = "";
            const select = document.getElementById("propSharedSelect");
            if (select) select.value = "";
            const noneRadio = document.querySelector('input[name="syncMode"][value="none"]');
            if (noneRadio) noneRadio.checked = true;
            document.getElementById("syncPanel_ref")?.classList.add("hidden");
            document.getElementById("syncPanel_share")?.classList.add("hidden");
            App.history.saveState();
            Utils.toast("已取消同步");
            App.ui.updateInspector();
          },

          _renderBackgroundProps: function (ui, bgObj) {
            ui("propOpacity").val(bgObj.opacity || 1);
            ui("opacityVal").text(Math.round((bgObj.opacity || 1) * 100) + "%");
            this._updateImagePanel(ui, bgObj, true);
          },

          _updateImagePanel: function (ui, obj, isBackground) {
            ui("imgProps").show(true);
            ui("affixProps").show(false);
            if (isBackground) {
              ui("imgNormalControls").show(false);
              ui("imgBgControls").show(true);
              document.getElementById("vdpImgDirCtrl").classList.add("hidden");
              const shouldPrint = obj.printBackground !== false;
              ui("checkPrintBg").check(shouldPrint);
            } else {
              ui("imgNormalControls").show(true);
              ui("imgBgControls").show(false);
              ui("dataTypeTabs").show(true);
              document.getElementById("dataTypeTabs")?.classList.replace("grid-cols-4", "grid-cols-2");
              const btnStatic = document.getElementById("dtBtn-static");
              const btnVariable = document.getElementById("dtBtn-variable");
              ["dtBtn-serial", "dtBtn-date"].forEach((id) => document.getElementById(id)?.classList.add("hidden"));
              const isVar = obj.dataBinding && obj.dataBinding.type === "variable";
              if (isVar) {
                ui("imgProps").show(false);
              }

              const activeClass = "py-1.5 text-center rounded-md transition text-[10px] font-bold bg-white text-red-600 shadow-sm ring-1 ring-black/5";
              const normalClass = "py-1.5 text-center rounded-md transition text-[10px] font-bold text-slate-500 hover:text-slate-700 hover:bg-gray-200/50";
              if (btnStatic) btnStatic.className = !isVar ? activeClass : normalClass;
              if (btnVariable) btnVariable.className = isVar ? activeClass : normalClass;
              if (isVar) {
                ui("dataProps").show(true);
                this._updateVDPUI(ui, obj);
                const dirCtrl = document.getElementById("vdpImgDirCtrl");
                const statusText = document.getElementById("vdpImgDirStatus");
                const btnText = document.getElementById("vdpImgDirBtnText");
                if (dirCtrl) {
                  dirCtrl.classList.remove("hidden");
                  if (obj.imgDirId && obj.imgDirName) {
                    statusText.innerText = `📁 ${obj.imgDirName}`;
                    statusText.className = "text-[10px] text-green-600 font-bold truncate max-w-[120px] inline-block align-bottom";
                    btnText.innerText = "更改文件夹...";
                    statusText.title = obj.imgDirName;
                  } else {
                    statusText.innerText = "未单独设置";
                    statusText.className = "text-[10px] text-orange-500 font-bold";
                    btnText.innerText = "设置图片文件夹...";
                  }
                }
              } else {
                ui("dataProps").show(false);
                document.getElementById("vdpImgDirCtrl").classList.add("hidden");
              }
            }
          },

          _handleMultiSelection: function (ui, act) {
            const objs = act.getObjects();
            const types = new Set(objs.map((o) => o.type));
            const isOnly = (...args) => [...types].every((t) => args.includes(t));
            if (isOnly("i-text", "textbox", "text")) {
              this._updateTextPanel(ui, objs[0]);
            } else if (isOnly("rect", "circle", "triangle", "polygon", "path")) {
              this._updateShapePanel(ui, objs[0]);
              ui("rectCornerControl").show(false);
            } else if (isOnly("line")) {
              this._updateLinePanel(ui, objs[0]);
            }
          },

          updateDateConfig: function (key, value) {
            const act = App.canvas.getActiveObject();
            if (!act || !act.isDynamicDate) return;
            const cfg = act.dateConfig;
            if (key === "showDate" && !value && !cfg.showTime) {
              document.getElementById("dateShowDate").checked = true;
              return Utils.toast("日期和时间至少显示一项", "info");
            }
            if (key === "showTime" && !value && !cfg.showDate) {
              document.getElementById("dateShowTime").checked = true;
              return Utils.toast("日期和时间至少显示一项", "info");
            }

            cfg[key] = value;
            if (key === "showDate") document.getElementById("dateFormatWrapper").classList.toggle("hidden", !value);
            if (key === "showTime") document.getElementById("timeFormatWrapper").classList.toggle("hidden", !value);
            const newText = Utils.formatDate(new Date(), null, cfg);
            act.rawContent = newText;
            App.content.render(act);
            App.history.saveState();
          },

          updatePageConfig: function (key, value) {
            const act = App.canvas.getActiveObject();
            if (!act || !act.isDynamicPageNum) return;
            act.pageConfig[key] = value;
            const currentPage = (App.state.currentDataIndex || 0) + act.pageConfig.startFrom;
            const totalPages = App.dataSource.calculateTotalPages();
            let text = act.pageConfig.format.replace("{page}", currentPage).replace("{total}", totalPages);
            act.set("text", text);
            App.canvas.requestRenderAll();
            App.history.saveState();
          },
          updateSerialConfig: function (key, value) {
            const act = App.canvas.getActiveObject();
            if (!act || (!act.isSerialNumber && !act.isBarcode)) return;
            if (!act.serialConfig) return;
            act.serialConfig[key] = value;

            if (key === "showTotal") {
              const sepWrapper = document.getElementById("serialTotalSeparatorWrapper");
              if (sepWrapper) {
                sepWrapper.classList.toggle("hidden", !value);
              }
              this.updateSerialTotalPreviewDemo(act.serialConfig);
            }
            if (key === "totalSeparator") {
              this.updateSerialTotalPreviewDemo(act.serialConfig);
            }

            this.updateSerialPreview(act.serialConfig);
            if (key === "generateCount") {
              App.dataSource.updateNavUI();
              if (act.serialConfig.showTotal) {
                const currentIndex = App.state.currentDataIndex || 0;
                let newText = App.tools._formatSerialNumber(act.serialConfig, currentIndex);
                act.rawContent = newText;
                App.content.render(act);
              }
            } else {
              const currentIndex = App.state.currentDataIndex || 0;
              let newText = App.tools._formatSerialNumber(act.serialConfig, currentIndex);
              act.rawContent = newText;
              App.content.render(act);
            }

            App.history.saveState();
          },

          updateSerialPreview: function (config) {
            const preview = [];
            const previewCount = 6;
            for (let i = 0; i < previewCount; i++) {
              let text = App.tools._formatSerialNumber(config, i);
              preview.push(text);
            }

            const previewText = preview.join(", ") + "...";
            const el = document.getElementById("serialPreviewText");
            if (el) el.innerText = "预览: " + previewText;
          },

          updateSerialTotalPreviewDemo: function (config) {
            const el = document.getElementById("serialTotalPreviewDemo");
            if (!el) return;
            let sample = App.tools._formatSerialNumber(config, 0);
            el.innerText = sample;
          },
          _getUIProxy: function () {
            return (id) => {
              const el = document.getElementById(id);
              return {
                el,
                val: (v) => {
                  if (el) {
                    el.value = v ?? "";
                    if (typeof FontPicker !== 'undefined') FontPicker.setValue(el, v ?? "");
                  }
                  return this._getUIProxy()(id);
                },
                text: (v) => {
                  if (el) el.innerText = v;
                  return this._getUIProxy()(id);
                },
                check: (v) => {
                  if (el) el.checked = !!v;
                  return this._getUIProxy()(id);
                },
                show: (force = true) => {
                  if (el) el.classList.toggle("hidden", !force);
                  return this._getUIProxy()(id);
                },
                parentShow: (force = true) => {
                  if (el && el.parentElement) el.parentElement.classList.toggle("hidden", !force);
                  return this._getUIProxy()(id);
                },
                active: (force) => {
                  if (el) el.classList.toggle("active", !!force);
                  return this._getUIProxy()(id);
                },
              };
            };
          },

          _updateBarcodePanel: function (ui, act, currentType) {
            ui("barcodeProps").show(true);
            const cfg = act.barcodeConfig || {};
            const isAutoGenerated = act.isSerialNumber || act.isDynamicDate || currentType === "variable";
            const inputContainer = document.getElementById("bcText").parentElement;
            if (isAutoGenerated) {
              if (inputContainer) inputContainer.classList.add("hidden");
              const sharedCheck = document.getElementById("bcUseShared");
              if (sharedCheck && sharedCheck.parentElement && sharedCheck.parentElement.parentElement) {
                sharedCheck.parentElement.parentElement.classList.add("hidden");
              }
            } else {
              if (inputContainer) inputContainer.classList.remove("hidden");
              const sharedCheck = document.getElementById("bcUseShared");
              if (sharedCheck && sharedCheck.parentElement && sharedCheck.parentElement.parentElement) {
                sharedCheck.parentElement.parentElement.classList.remove("hidden");
              }

              const isSharedRef = act.syncMode === "ref";
              const checkbox = document.getElementById("bcUseShared");
              const textArea = document.getElementById("bcText");
              const select = document.getElementById("bcSharedSelect");
              checkbox.checked = isSharedRef;
              if (!isSharedRef) {
                ui("bcText").val(act.rawContent !== undefined ? act.rawContent : cfg.text);
              }
            }

            ui("bcType").val(cfg.type);
            ui("bcColor").val(cfg.color);
            ui("bcShowText").check(cfg.showText !== false);
            ui("bcTextAlign").val(cfg.textAlign || "center");
            ui("bcBarHeight").val(cfg.barheight || 10);
            ui("bcFontSize").val(cfg.fontSize || 10);
            ui("bcTextGap").val(cfg.textGap || 0);
            ui("bcEcc").val(cfg.ecc || "Q");
            App.barcode.toggleOptions(cfg.type);
          },

          _updateTablePanel: function (ui, act) {
            ui("tableProps").show(true);
            ui("textProps").show(true);
            ui("shapeProps").show(true);
            ui("affixProps").show(false);
            ui("propLineHeight").parentShow(false);
            ui("propCharSpacing").parentShow(false);
            ui("shapeDash").show(false);
            ui("rectCornerControl").show(false);
            const cell = act.tableData.cells[0]?.[0] || App.tableEditor.createCell();
            ui("propFont").val(cell.fontFamily);
            ui("propSize").val(Utils.px2pt(cell.fontSize));
            ui("propColor").val(cell.textColor);
            ui("btnBold").active(cell.bold);
            ui("btnItalic").active(cell.italic);
            ui("btnUnderline").active(false);
            ui("btnVertical").active(!!act.isVertical);
            const isTransparent = cell.bg === "transparent" || !cell.bg;
            ui("shapeFill").val(isTransparent ? "#f2f2f2" : cell.bg);
            if (ui("shapeFillWrapper").el) ui("shapeFillWrapper").el.classList.remove("opacity-50", "pointer-events-none");
            ui("shapeNoFill").check(cell.bg === "transparent");
            ui("shapeStroke").val(cell.borderColor);
            ui("shapeStrokeWidth").val(cell.borderWidth);
            ui("varSettings").show(false);
          },

          _updateTextPanel: function (ui, act) {
            ui("textProps").show(true);
            ui("sharedProps").show(true);
            ui("propLineHeight")
              .parentShow(true)
              .val(act.lineHeight || 1.2);
            ui("lineHeightVal").val(act.lineHeight || 1.2);
            ui("propCharSpacing")
              .parentShow(true)
              .val(act.charSpacing || 0);
            ui("charSpacingVal").val(act.charSpacing || 0);
            ui("propFont").val(act.fontFamily);
            ui("propSize").val(Utils.px2pt(act.fontSize));
            ui("propColor").val(act.fill);
            ui("btnBold").active(act.fontWeight === "bold");
            ui("btnItalic").active(act.fontStyle === "italic");
            ui("btnUnderline").active(!!act.underline);
            ui("btnVertical").active(!!act.isVertical);
            const sharedId = act.sharedId;
            const radios = document.getElementsByName("syncMode");
            const sharePanel = document.getElementById("syncPanel_share");
            const refPanel = document.getElementById("syncPanel_ref");
            const input = document.getElementById("propSharedInput");
            const btn = document.getElementById("propSharedBtn");
            const hint = document.getElementById("propSharedHint");
            sharePanel.classList.add("hidden");
            refPanel.classList.add("hidden");
            const currentMode = act.syncMode || (sharedId ? "share" : "none");
            radios.forEach((r) => (r.checked = r.value === currentMode));
            if (currentMode === "share") {
              sharePanel.classList.remove("hidden");
              if (input) {
                input.value = sharedId || "";
                input.disabled = true;
              }
              if (btn) {
                btn.innerText = "删除";
                btn.onclick = () => App.ui.clearSyncData();
              }
              if (hint) {
                hint.innerHTML = `提示：在其他字段前后缀中输入<b class="text-red-600">{${sharedId}}</b>可引用。`;
              }
            } else if (currentMode === "ref") {
              refPanel.classList.remove("hidden");
              this.refreshSharedSelect();
              const select = document.getElementById("propSharedSelect");
              if (select) select.value = act.refId || "";
            } else {
              if (input) {
                input.value = "";
                input.disabled = false;
              }
              if (btn) {
                btn.innerText = "保存";
                btn.onclick = () => App.ui.saveSharedId();
              }
              if (hint) {
                hint.innerHTML = `提示：在其他字段前后缀中输入 {共享字段名} 可引用。`;
              }
            }

            if (typeof act.prefixRaw === "undefined") act.prefixRaw = act.prefix || "";
            if (typeof act.suffixRaw === "undefined") act.suffixRaw = act.suffix || "";
            const pRaw = act.prefixRaw !== undefined ? act.prefixRaw : act.prefix || "";
            const sRaw = act.suffixRaw !== undefined ? act.suffixRaw : act.suffix || "";
            ui("propPrefix").val(pRaw);
            ui("propSuffix").val(sRaw);
            if (act.isDynamicPageNum) {
              ui("pageNumProps").show(true);
              ui("pageFormat").val(act.pageConfig.format);
              ui("pageStartFrom").val(act.pageConfig.startFrom);
              ui("dataTypeTabs").show(false);
            } else {
              ui("pageNumProps").show(false);
            }
          },

          _updateLinePanel: function (ui, act) {
            ui("lineProps").show(true);
            ui("lineColor").val(act.stroke);
            ui("lineStrokeWidth").val(act.strokeWidth);
            const dash = act.strokeDashArray;
            ui("lineDashCheck").check(!!(dash && dash.length));
            ui("lineDashVal").val((dash && dash[0]) || 5);
          },

          _updateShapePanel: function (ui, act) {
            ui("shapeProps").show(true);
            ui("affixProps").show(false);
            const isTransparent = act.fill === "transparent" || !act.fill;
            ui("shapeNoFill").check(isTransparent);
            const wrapper = ui("shapeFillWrapper").el;
            if (wrapper) {
              if (isTransparent) {
                wrapper.classList.add("opacity-50", "pointer-events-none");
                ui("shapeFill").val(act._lastColor || "#666666");
              } else {
                wrapper.classList.remove("opacity-50", "pointer-events-none");
                ui("shapeFill").val(act.fill);
              }
            }
            ui("shapeStroke").val(act.stroke || "#666666");
            ui("shapeStrokeWidth").val(act.strokeWidth || 0);
            const dash = act.strokeDashArray;
            ui("shapeDash")
              .check(!!(dash && dash.length))
              .parentShow(true);
            ui("shapeDashVal").val((dash && dash[0]) || 5);
            if (act.type === "rect" || act.isSmartRect) {
              ui("rectCornerControl").show(true);
              const conf = act.cornerConfig || {
                tl: act.rx || 0,
                tr: act.rx || 0,
                bl: act.rx || 0,
                br: act.rx || 0,
                style: "round",
              };
              ui("cornerStyle").val(conf.style);
              ["tl", "tr", "bl", "br"].forEach((k) => ui(`corner${k.toUpperCase()}`).val(conf[k]));
              if (conf.tl === conf.tr && conf.tr === conf.bl && conf.bl === conf.br) {
                ui("masterRadius").val(conf.tl);
                ui("masterRadiusVal").val(conf.tl);
              }
            }
          },

          _updateVDPUI: function (ui, act) {
            const ds = App.state.dataSource;
            if (!ds.isActive || !ds.workbook) {
              ui("noDataSourceTip").show(true);
              ui("bindControls").show(false);
              return;
            }

            ui("noDataSourceTip").show(false);
            ui("bindControls").show(true);
            const sheetSel = ui("bindSheet").el;
            if (sheetSel) {
              const targetSheet = (act.dataBinding && act.dataBinding.sheet) || ds.currentSheet;
              sheetSel.innerHTML = "";
              ds.sheetNames.forEach((s) => sheetSel.add(new Option(s, s)));
              sheetSel.value = targetSheet;
              let headers = [];
              if (targetSheet === ds.currentSheet) {
                headers = ds.headers;
              } else {
                try {
                  const ws = ds.workbook.Sheets[targetSheet];
                  if (ws) {
                    const json = XLSX.utils.sheet_to_json(ws, {
                      header: 1,
                    });
                    if (json.length > 0) headers = json[0].map((h) => String(h || "").trim());
                  }
                } catch (e) {}
              }

              const fieldSel = ui("bindField").el;
              if (fieldSel) {
                fieldSel.innerHTML = "";
                if (headers.length === 0) fieldSel.add(new Option("无字段", ""));
                else headers.forEach((f) => fieldSel.add(new Option(f, f)));
                fieldSel.value = (act.dataBinding && act.dataBinding.field) || "";
              }
            }
          },
          updateLayerList: function () {
            const list = document.getElementById("layerList");
            if (!list) return;
            list.innerHTML = "";
            const isLabelPreview = App.state.paperType === "label" && App.state.label.mode === "preview";
            let objs = [];
            let bgObj = null;
            if (isLabelPreview) {
              const designData = App.state.label.designContent;
              if (designData) {
                objs = (designData.objects || []).filter((o) => !o.isGrid).reverse();
                bgObj = designData.backgroundImage;
              }
            } else {
              objs = App.canvas
                .getObjects()
                .filter((o) => !o.isGrid)
                .reverse();
              bgObj = App.canvas.backgroundImage;
            }

            const activeRaw = App.canvas.getActiveObject();
            let activeObjs = [];
            if (!isLabelPreview && activeRaw) {
              activeObjs = activeRaw.type === "activeSelection" && activeRaw._objects ? activeRaw._objects : [activeRaw];
            }

            const renderItem = (config) => {
              const { icon, name, obj, isBg } = config;
              const isSelected = !isLabelPreview && (isBg ? App.state.editingBackground : activeObjs.includes(obj));
              const div = document.createElement("div");
              const cursorClass = isLabelPreview ? "cursor-default" : "cursor-pointer";
              const opacityClass = isLabelPreview ? "opacity-90" : "";
              const baseClass = `layer-item flex items-center justify-between px-3 py-2.5 border-b border-gray-100 last:border-b-0 text-xs transition-all select-none group border-l-4 ${cursorClass} ${opacityClass}`;
              const activeClass = "bg-red-50 border-l-red-500 text-red-600 font-bold";
              const normalClass = "bg-white border-l-transparent text-slate-600 hover:bg-gray-50";
              div.className = `${baseClass} ${isSelected ? activeClass : normalClass}`;
              if (!isBg && !isLabelPreview) div.setAttribute("draggable", "true");
              const deleteBtnHtml = `
                <button class="del-btn w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-red-600 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all shrink-0" title="删除">
                    <i class="ph ph-trash"></i>
                </button>`;
              div.innerHTML = `
                  <div class="flex items-center gap-2.5 overflow-hidden pointer-events-none flex-1">
                      <i class="ph ${icon} text-lg shrink-0 opacity-80"></i>
                      <span class="truncate layer-item-label"></span>
                  </div>
                  ${deleteBtnHtml}
              `;
              div.querySelector(".layer-item-label").textContent = String(name);
              if (!isLabelPreview) {
                div.fabricObj = obj;
                div.onclick = (e) => {
                  if (isBg) {
                    App.canvas.discardActiveObject();
                    App.canvas.requestRenderAll();
                    App.state.editingBackground = true;
                  } else {
                    App.state.editingBackground = false;
                    if (e.ctrlKey || e.metaKey) {
                      const idx = activeObjs.indexOf(obj);
                      let newSel = idx > -1 ? activeObjs.filter((o) => o !== obj) : [...activeObjs, obj];
                      if (newSel.length > 1) {
                        const sel = new fabric.ActiveSelection(newSel, { canvas: App.canvas });
                        App.canvas.setActiveObject(sel);
                      } else if (newSel.length === 1) {
                        App.canvas.setActiveObject(newSel[0]);
                      } else {
                        App.canvas.discardActiveObject();
                      }
                    } else {
                      App.canvas.setActiveObject(obj);
                    }
                  }
                  App.canvas.requestRenderAll();
                  this.updateInspector();
                };
                div.ondblclick = (e) => {
                  e.preventDefault();
                  if (!isSelected) div.click();
                  App.ui.switchTab("props");
                };
                if (!isBg) {
                  div.addEventListener("dragstart", (e) => {
                    div.classList.add("dragging");
                    e.dataTransfer.effectAllowed = "move";
                    if (!isSelected) {
                      App.canvas.setActiveObject(obj);
                      App.canvas.requestRenderAll();
                    }
                  });
                  div.addEventListener("dragend", () => {
                    div.classList.remove("dragging");
                    this._finalizeLayerOrder();
                  });
                }
              }

              const delBtn = div.querySelector(".del-btn");
              if (delBtn) {
                delBtn.onclick = (e) => {
                  e.stopPropagation();
                  if (isLabelPreview) {
                    const content = App.state.label.designContent;
                    if (isBg) {
                      delete content.backgroundImage;
                    } else {
                      if (content && content.objects) {
                        const idx = content.objects.indexOf(obj);
                        if (idx > -1) {
                          content.objects.splice(idx, 1);
                        }
                      }
                    }

                    App.label.renderPreview();
                    this.updateLayerList();
                    Utils.toast("已在预览中删除图层");
                  } else {
                    if (isBg) {
                      App.paper.clearBackground();
                    } else {
                      App.canvas.remove(obj);
                      App.canvas.discardActiveObject();
                      App.history.saveState();
                      App.state.editingBackground = false;
                      this.updateInspector();
                    }
                  }
                };
              }

              return div;
            };
            objs.forEach((o) => {
              let icon = "ph-square";
              let label = o.type;
              const checkType = (typeStr) => o.type === typeStr;
              if (o.isBarcode) {
                icon = "ph-barcode";
                label = "条码";
              } else if (o.isTable) {
                icon = "ph-table";
                label = "表格";
              } else if ((o.type || "").includes("text")) {
                icon = "ph-text-t";
                label = o.text ? o.text.substring(0, 12) : "文本";
              } else if (checkType("image")) {
                icon = "ph-image";
                label = "图片";
              } else if (checkType("line")) {
                icon = "ph-line-segment";
                label = "线条";
              } else if (["rect", "circle", "triangle"].includes(o.type)) {
                icon = "ph-shapes";
                label = "形状";
              } else if (checkType("group")) {
                icon = "ph-squares-four";
                label = "组合";
              }

              list.appendChild(
                renderItem({
                  icon,
                  name: label,
                  obj: o,
                  isBg: false,
                }),
              );
            });
            if (bgObj) {
              list.appendChild(
                renderItem({
                  icon: "ph-image-square",
                  name: "【背景】图片",
                  obj: bgObj,
                  isBg: true,
                }),
              );
            }

            if (!isLabelPreview) {
              list.ondragover = (e) => {
                e.preventDefault();
                const afterElement = this._getDragAfterElement(list, e.clientY);
                const draggable = document.querySelector(".dragging");
                if (!draggable) return;
                if (afterElement == null) {
                  const last = list.lastElementChild;
                  if (last && !last.getAttribute("draggable")) {
                    list.insertBefore(draggable, last);
                  } else {
                    list.appendChild(draggable);
                  }
                } else {
                  list.insertBefore(draggable, afterElement);
                }
              };
            }
          },
          switchTab: function (tabName) {
            const tabs = ["props", "layers", "data"];
            tabs.forEach((t) => {
              const btn = document.getElementById(`tabBtn-${t}`);
              const content = document.getElementById(`tabContent-${t}`);
              if (t === tabName) {
                btn.classList.add("bg-white", "text-slate-700", "border-red-600");
                btn.classList.remove("text-slate-500", "border-transparent", "hover:bg-gray-100");
                content.classList.remove("hidden");
              } else {
                btn.classList.remove("bg-white", "text-slate-700", "border-red-600");
                btn.classList.add("text-slate-500", "border-transparent", "hover:bg-gray-100");
                content.classList.add("hidden");
              }
            });
            if (tabName === "layers") {
              this.updateLayerList();
            }
          },

          updateBind: async function (key, val) {
            const act = App.canvas.getActiveObject();
            if (!act || !act.dataBinding) return;
            act.dataBinding[key] = val;
            const ds = App.state.dataSource;
            if (key === "sheet" && ds.workbook) {
              try {
                const worksheet = ds.workbook.Sheets[val];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const headers = json.length ? json[0].map((h) => String(h || "").trim()) : [];
                if (!headers.includes(act.dataBinding.field)) {
                  act.dataBinding.field = headers.length ? headers[0] : "";
                }
              } catch (e) {
                console.warn("Sheet switch error:", e);
              }
            }

            if (ds.isActive && ds.workbook) {
              const targetSheet = act.dataBinding.sheet;
              const targetField = act.dataBinding.field;
              if (!App.dataSource._sheetCache) App.dataSource._sheetCache = {};
              if (!App.dataSource._sheetCache[targetSheet]) {
                const ws = ds.workbook.Sheets[targetSheet];
                if (ws) {
                  App.dataSource._sheetCache[targetSheet] = XLSX.utils.sheet_to_json(ws, {
                    raw: false,
                    dateNF: "yyyy-mm-dd",
                    defval: "",
                  });
                }
              }

              const dataList = App.dataSource._sheetCache[targetSheet];
              const pageIndex = App.state.currentDataIndex || 0;
              let newRawValue = "";
              if (dataList && dataList.length > 0) {
                const safeIndex = Math.min(pageIndex, dataList.length - 1);
                const row = dataList[safeIndex];
                if (row) {
                  const rowVal = row[targetField];
                  newRawValue = rowVal !== undefined && rowVal !== null ? String(rowVal) : "";
                }
              } else {
                newRawValue = `{${targetField}}`;
              }

              if (act.type === "image") {
                await App.dataSource._updateImageAsync(act, newRawValue);
                App.canvas.requestRenderAll();
              } else {
                act.rawContent = newRawValue;
                App.content.render(act);
              }
            }
            this.updateInspector();
            App.history.saveState();
          },

          refreshSharedSelectForBarcode: function () {
            const select = document.getElementById("bcSharedSelect");
            const act = App.canvas.getActiveObject();
            const currentRefId = act ? act.refId : "";
            select.innerHTML = '<option value="">选择共享字段</option>';
            const keys = App.content.getAvailableSharedIds();
            if (keys.length === 0) {
              const opt = document.createElement("option");
              opt.text = "(暂无可用字段)";
              opt.disabled = true;
              select.add(opt);
            }

            keys.forEach((key) => {
              const opt = document.createElement("option");
              opt.value = key;
              opt.text = key;
              if (key === currentRefId) opt.selected = true;
              select.add(opt);
            });
          },
          _getDragAfterElement: function (container, y) {
            const draggableElements = [...container.querySelectorAll('.layer-item[draggable="true"]:not(.dragging)')];
            return draggableElements.reduce(
              (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                  return {
                    offset: offset,
                    element: child,
                  };
                } else {
                  return closest;
                }
              },
              {
                offset: Number.NEGATIVE_INFINITY,
              },
            ).element;
          },
          _replaceObject: function (oldObj, newObj) {
            const canvas = App.canvas;
            const idx = canvas.getObjects().indexOf(oldObj);
            if (idx === -1) return;
            const wasActive = canvas.getActiveObject() === oldObj;
            newObj.dataBinding = oldObj.dataBinding;
            newObj.rawContent = oldObj.rawContent;
            newObj.isSerialNumber = oldObj.isSerialNumber;
            newObj.serialConfig = oldObj.serialConfig;
            newObj.isDynamicDate = oldObj.isDynamicDate;
            newObj.dateConfig = oldObj.dateConfig;
            newObj.isDynamicPageNum = oldObj.isDynamicPageNum;
            newObj.pageConfig = oldObj.pageConfig;
            const wasHistoryLocked = App.history.locked;
            App.history.locked = true;
            App.state.isReplacingObject = true;
            try {
              canvas.remove(oldObj);
              canvas.insertAt(newObj, idx, false);
              if (wasActive) {
                canvas.setActiveObject(newObj);
              }
            } finally {
              App.history.locked = wasHistoryLocked;
              App.state.isReplacingObject = false;
            }

            if (!wasHistoryLocked) {
              App.history.saveState();
            }
          },
          _finalizeLayerOrder: function () {
            const list = document.getElementById("layerList");
            const gridObjects = App.canvas.getObjects().filter((o) => o.isGrid);
            const domOrderObjs = Array.from(list.children)
              .map((div) => div.fabricObj)
              .filter((o) => o);
            const newStackOrder = domOrderObjs.reverse();
            App.canvas._objects = [...gridObjects, ...newStackOrder];
            App.canvas.requestRenderAll();
            App.history.saveState();
          },
          showLoading: (m) => {
            const el = document.getElementById("loadingOverlay");
            if (el) {
              el.querySelector("p").innerText = m;
              el.classList.remove("hidden");
            }
          },
          hideLoading: () => document.getElementById("loadingOverlay")?.classList.add("hidden"),
          toggleFullScreen: () => (!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()),
          showModal: (id) => document.getElementById(id).classList.remove("hidden"),
          hideModal: (id) => document.getElementById(id).classList.add("hidden"),

          toggleExportMenu: function (e) {
            if (e && e.stopPropagation) e.stopPropagation();
            const el = document.querySelector(".export-dropdown");
            if (!el) return;
            el.classList.toggle("open");
            if (el.classList.contains("open")) {
              const close = (ev) => {
                if (!el.contains(ev.target) || (ev.target.closest && ev.target.closest(".export-menu button"))) {
                  el.classList.remove("open");
                  document.removeEventListener("click", close, true);
                }
              };
              setTimeout(() => document.addEventListener("click", close, true), 0);
            }
          },

          align: function (mode) {
            const activeObj = App.canvas.getActiveObject();
            const queue = App.state.selectionQueue;
            if (!activeObj || activeObj.type !== "activeSelection" || queue.length < 2) return Utils.toast("请按住 Shift 依次点击选择对象进行对齐", "info");
            const anchor = queue[0];
            App.canvas.discardActiveObject();
            const aRect = anchor.getBoundingRect(true);
            queue.forEach((obj) => {
              if (obj === anchor) return;
              const r = obj.getBoundingRect(true);
              let dx = 0,
                dy = 0;
              if (mode === "left") dx = aRect.left - r.left;
              else if (mode === "center") dx = aRect.left + aRect.width / 2 - (r.left + r.width / 2);
              else if (mode === "right") dx = aRect.left + aRect.width - (r.left + r.width);
              if (mode === "top") dy = aRect.top - r.top;
              else if (mode === "middle") dy = aRect.top + aRect.height / 2 - (r.top + r.height / 2);
              else if (mode === "bottom") dy = aRect.top + aRect.height - (r.top + r.height);
              if (dx !== 0 || dy !== 0) {
                obj.set({
                  left: obj.left + dx,
                  top: obj.top + dy,
                });
                obj.setCoords();
              }
            });
            App.canvas
              .setActiveObject(
                new fabric.ActiveSelection(queue, {
                  canvas: App.canvas,
                }),
              )
              .requestRenderAll();
            App.history.saveState();
          },

          alignObject: function (mode) {
            const act = App.canvas.getActiveObject();
            if (!act) return;
            const cfg = App.paper.getSettings();
            const areaL = cfg.marginLeft,
              areaR = App.state.baseWidth - cfg.marginRight;
            const areaT = cfg.marginTop,
              areaB = App.state.baseHeight - cfg.marginBottom;
            const r = act.getBoundingRect(true);
            let dx = 0,
              dy = 0;
            if (mode === "left") dx = areaL - r.left;
            else if (mode === "centerH") dx = areaL + (areaR - areaL) / 2 - (r.left + r.width / 2);
            else if (mode === "right") dx = areaR - (r.left + r.width);
            else if (mode === "top") dy = areaT - r.top;
            else if (mode === "middle") dy = areaT + (areaB - areaT) / 2 - (r.top + r.height / 2);
            else if (mode === "bottom") dy = areaB - (r.top + r.height);
            if (dx !== 0 || dy !== 0) {
              act
                .set({
                  left: act.left + dx,
                  top: act.top + dy,
                })
                .setCoords();
              App.canvas.requestRenderAll();
              this.updateGeo(null, null, act);
              App.history.saveState();
            }
          },

          distribute: function (mode) {
            const act = App.canvas.getActiveObject();
            if (!act || act.type !== "activeSelection" || act.getObjects().length < 3) return Utils.toast("至少需要3个元素", "info");
            const objs = act.getObjects();
            App.canvas.discardActiveObject();
            const isH = mode === "horizontal";
            objs.sort((a, b) => (isH ? a.left - b.left : a.top - b.top));
            const first = objs[0],
              last = objs[objs.length - 1];
            const getC = (o) => (isH ? o.getCenterPoint().x : o.getCenterPoint().y);
            const step = (getC(last) - getC(first)) / (objs.length - 1);
            objs.forEach((o, i) => {
              if (i > 0 && i < objs.length - 1) o.set(isH ? "left" : "top", (isH ? o.left : o.top) + (getC(first) + step * i - getC(o))).setCoords();
            });
            App.canvas
              .setActiveObject(
                new fabric.ActiveSelection(objs, {
                  canvas: App.canvas,
                }),
              )
              .requestRenderAll();
            this.updateInspector();
            App.history.saveState();
          },
        },

        // --- IO (导入/导出) ---
        io: {
          _getFontCss: () =>
            [...document.styleSheets]
              .flatMap((s) => {
                try {
                  return [...s.cssRules].filter((r) => r.type === CSSRule.FONT_FACE_RULE).map((r) => r.cssText);
                } catch {
                  return [];
                }
              })
              .join(""),
              
          _createPrintIframe: function (css = "") {
            const id = "print-iframe-sandbox";
            let f = document.getElementById(id);
            if (f) f.remove();
            f = document.createElement("iframe");
            f.id = id;
            f.style.cssText = "position:fixed;top:0;opacity:0;pointer-events:none;";
            document.body.appendChild(f);
            const doc = f.contentWindow.document;
            doc.open();
            doc.write(
              `<html><head><style>@page{size:${App.state.currentPaper.w}mm ${App.state.currentPaper.h}mm;margin:0}body{margin:0;display:flex;justify-content:center}${css}</style></head><body></body></html>`,
            );
            doc.close();
            return f;
          },

          _appendPrintPage: function (doc, svg, w, h) {
            const page = doc.createElement("div");
            page.style.cssText = `position:relative;width:${w}mm;height:${h}mm;overflow:hidden;break-after:page;page-break-after:always;`;
            const parsedSvg = new DOMParser().parseFromString(svg, "image/svg+xml");
            if (parsedSvg.documentElement.nodeName === "parsererror") {
              throw new Error("打印页面 SVG 解析失败");
            }
            page.appendChild(doc.importNode(parsedSvg.documentElement, true));
            doc.body.appendChild(page);
          },

           _getExportCanvas: async function (opts = {}) {
            const originalBg = App.canvas.backgroundImage;
            let shouldHideBg = false;
            if (originalBg && originalBg.printBackground === false) {
              shouldHideBg = true;
              App.canvas.backgroundImage = null;
            }
            
            const json = App.canvas.toJSON(CUSTOM_PROPS);
            if (shouldHideBg) {
              App.canvas.backgroundImage = originalBg;
            }
            if (opts.transparent) {
              delete json.background;
              delete json.overlay;
              delete json.overlayColor;
            }

            const grids = App.canvas
              .getObjects()
              .filter((o) => o.isGrid && !o.isCutLine)
              .map((o) => ({
                ...o.toObject(["stroke", "strokeWidth", "strokeDashArray", "x1", "y1", "x2", "y2"]),
                excludeFromExport: false,
              }));
            json.objects =[...grids, ...json.objects];
            const tC = new fabric.Canvas(null, {
              width: App.state.baseWidth,
              height: App.state.baseHeight,
              backgroundColor: opts.transparent ? null : App.paper.getSettings().paperBgColor,
            });
            return new Promise((resolve) => {
              tC.loadFromJSON(json, async () => {
                const processObj = (o) => {
                  if (["i-text", "text", "textbox"].includes(o.type)) {
                    o.text = App.content.compute(o);
                    if (o.fontWeight === "bold" || o.fontWeight === 700 || o.fontWeight === "bolder") {
                      o.set({
                        stroke: o.fill || "#000000",
                        strokeWidth: (o.fontSize || 14) * 0.008, 
                        strokeLineJoin: "round",
                        paintFirst: "stroke" 
                      });
                    }
                  } else if (o.type === "group" && o._objects) {
                    o._objects.forEach(processObj);
                  }
                };
                tC.getObjects().forEach(processObj);
                tC.renderAll();
                resolve(tC);
              });
            });
          },

          _renderExportPages: async function (cb) {
            const updateTasks = App.canvas.getObjects().map(async (o) => {
              if (o.isDynamicDate && o.dateConfig) {
                o.rawContent = Utils.formatDate(new Date(), null, o.dateConfig);
                return App.content.render(o);
              }
            });
            await Promise.all(updateTasks);
            App.canvas.requestRenderAll();

            const isLabelDesign = App.state.paperType === "label" && App.state.label.mode === "design";
            const isLabelPreview = App.state.paperType === "label" && App.state.label.mode === "preview";
            if (isLabelDesign) {
              App.label.enterPreview();
              await new Promise((r) => setTimeout(r, 100));
            }

            const totalPages = App.dataSource.calculateTotalPages();
            const shouldBatch = totalPages > 1 && !App.state.printCurrentOnly;
            const originalIndex = App.state.currentDataIndex;
            const originalLabelPage = App.state.label.previewPage || 0;
            const loopCount = shouldBatch ? totalPages : 1;
            const { w, h } = App.state.currentPaper;
            const results = [];
            try {
              for (let i = 0; i < loopCount; i++) {
                if (shouldBatch) {
                  if (isLabelPreview || isLabelDesign) {
                    App.state.label.previewPage = i;
                    await App.label.renderPreview();
                  } else {
                    await App.dataSource.renderPage(i);
                  }
                } else if (isLabelPreview) {
                  await App.label.renderPreview();
                }

                const result = await cb(i, loopCount, { w, h });
                if (result !== undefined) results.push(result);
              }
              return results;
            } finally {
              if (shouldBatch) {
                if (isLabelPreview || isLabelDesign) {
                  App.state.label.previewPage = originalLabelPage;
                  await App.label.renderPreview();
                } else {
                  await App.dataSource.renderPage(originalIndex);
                }
              }
            }
          },

          _downloadBlob: function (blob, fileName) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 10000);
          },

          _pageSVG: function (vC, extra = {}) {
            vC.setViewportTransform([1, 0, 0, 1, 0, 0]);
            return vC.toSVG({
              suppressPreamble: true,
              viewBox: { x: 0, y: 0, width: App.state.baseWidth, height: App.state.baseHeight },
              ...extra,
            });
          },

          print: async function () {
            try {
              const css = this._getFontCss() + " body { display: block !important; margin: 0; } @page { margin: 0; }";
              const printFrame = this._createPrintIframe(css);
              const printDoc = printFrame.contentWindow.document;
              const { w, h } = App.state.currentPaper;
              await this._renderExportPages(async () => {
                const vC = await this._getExportCanvas();
                const svg = this._pageSVG(vC);
                vC.dispose();
                this._appendPrintPage(printDoc, svg, w, h);
              });

              await new Promise((resolve) => {
                printFrame.contentWindow.requestAnimationFrame(() => printFrame.contentWindow.requestAnimationFrame(resolve));
              });
              printFrame.contentWindow.print();
            } catch (e) {
              console.error(e);
              Utils.toast("打印生成失败: " + e.message, "error");
            } finally {
              App.ui.hideLoading();
            }
          },

          exportPDF: async function () {
            try {
              const usedFonts = new Set();
              usedFonts.add("SourceHanSerifCN-Bold");
              App.canvas.getObjects().forEach((o) => {
                if (["i-text", "textbox", "text"].includes(o.type) && o.fontFamily) {
                  usedFonts.add(o.fontFamily);
                }
                if (o.isTable && o.tableData && o.tableData.cells) {
                  o.tableData.cells.flat().forEach((cell) => {
                    if (cell && cell.fontFamily) usedFonts.add(cell.fontFamily);
                  });
                }
              });
              if (App.fontManager.availableFonts.length === 0) {
                App.ui.showLoading("首次导出需加载系统字体...");
                await App.fontManager.queryLocalFonts();
              }

              App.ui.showLoading("正在准备 PDF...");
              const { w, h } = App.state.currentPaper;
              const orientation = w > h ? "l" : "p";
              const pdf = new window.jspdf.jsPDF({
                orientation: orientation,
                unit: "mm",
                format: [w, h],
                compress: true,
              });
              try {
                App.ui.showLoading("正在渲染 PDF..");
                await App.fontManager.applyToJsPDF(pdf, Array.from(usedFonts));
              } catch (fontErr) {
                console.warn("字体应用到 PDF 失败:", fontErr);
              }

              const settings = App.paper.getSettings();
              const typeLabel = App.paper.defaults[settings.type]?.label || "设计稿";
              let pageCount = 0;
              await this._renderExportPages(async (i) => {
                pageCount++;
                App.ui.showLoading(`正在生成第 ${i + 1} 页...`);
                const vC = await this._getExportCanvas();
                const svg = this._pageSVG(vC);
                vC.dispose();
                if (i > 0) pdf.addPage([w, h], orientation);
                await pdf.svg(new DOMParser().parseFromString(svg, "image/svg+xml").documentElement, {
                  x: 0,
                  y: 0,
                  width: w,
                  height: h,
                });
              });

              App.ui.showLoading("正在保存 PDF...");
              const fileName = `${typeLabel}_${Date.now()}.pdf`;
              pdf.save(fileName);
              Utils.toast(`PDF 导出成功 (${pageCount} 页)`);
            } catch (e) {
              console.error(e);
              Utils.toast("导出失败: " + e.message, "error");
            } finally {
              if (App.fontManager && typeof App.fontManager.clearCache === "function") {
                App.fontManager.clearCache();
              }
              App.ui.hideLoading();
            }
          },

          setPngScale: function (n) {
            const input = document.getElementById("pngScale");
            if (input) input.value = n;
            this.updatePngSizeHint();
          },

          updatePngSizeHint: function () {
            const scale = parseFloat(document.getElementById("pngScale")?.value) || 1;
            const el = document.getElementById("pngSizeHint");
            if (el) {
              el.innerText = `${Math.round(App.state.baseWidth * scale)} × ${Math.round(App.state.baseHeight * scale)} px`;
            }
          },

          exportPNG: async function () {
            const scale = parseFloat(document.getElementById("pngScale")?.value) || 1;
            const transparent = document.getElementById("pngTransparent")?.checked !== false;
            App.ui.showLoading("正在生成 PNG...");
            try {
              const settings = App.paper.getSettings();
              const typeLabel = App.paper.defaults[settings.type]?.label || "设计稿";
              const blobs = await this._renderExportPages(async (i, loopCount) => {
                App.ui.showLoading(`正在生成第 ${i + 1} 页 PNG (${scale}x)...`);
                const vC = await this._getExportCanvas({ transparent });
                vC.setViewportTransform([1, 0, 0, 1, 0, 0]);
                const canvasEl = vC.toCanvasElement(scale);
                vC.dispose();
                return await new Promise((resolve) => canvasEl.toBlob(resolve, "image/png"));
              });

              App.ui.showLoading("正在保存 PNG...");
              blobs.forEach((blob, i) => {
                const suffix = blobs.length > 1 ? `_${i + 1}` : "";
                const fileName = `${typeLabel}${suffix}_${scale}x${transparent ? "_透明" : ""}.png`;
                this._downloadBlob(blob, fileName);
              });
              Utils.toast(`PNG 导出成功 (${blobs.length} 页)`);
            } catch (e) {
              console.error(e);
              Utils.toast("导出失败: " + e.message, "error");
            } finally {
              App.ui.hideLoading();
            }
          },

          exportSVG: async function () {
            App.ui.showLoading("正在生成 SVG...");
            try {
              const settings = App.paper.getSettings();
              const typeLabel = App.paper.defaults[settings.type]?.label || "设计稿";
              const { w, h } = App.state.currentPaper;
              const svgs = await this._renderExportPages(async (i) => {
                App.ui.showLoading(`正在生成第 ${i + 1} 页 SVG...`);
                const vC = await this._getExportCanvas();
                const svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + this._pageSVG(vC, { width: w + "mm", height: h + "mm" });
                vC.dispose();
                return svg;
              });

              App.ui.showLoading("正在保存 SVG...");
              svgs.forEach((svg, i) => {
                const suffix = svgs.length > 1 ? `_${i + 1}` : "";
                const fileName = `${typeLabel}${suffix}_${Date.now()}.svg`;
                this._downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), fileName);
              });
              Utils.toast(`SVG 导出成功 (${svgs.length} 页)`);
            } catch (e) {
              console.error(e);
              Utils.toast("导出失败: " + e.message, "error");
            } finally {
              App.ui.hideLoading();
            }
          },

          saveProject: function () {
            const snapshot = App.project.buildSnapshot({ includeDataSource: true });
            const typeLabel = App.paper.defaults[snapshot.settings.type]?.label || "设计稿";
            const blob = new Blob([JSON.stringify(snapshot)], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${typeLabel}_${Date.now()}.paper`;
            a.click();
            URL.revokeObjectURL(a.href);
            Utils.toast("项目已保存");
            App.state.hasUnsavedChanges = false;
            App.draft.clear();
          },

          loadProjectData: function (data, opts = {}) {
            App.draft.suspend();
            try {
              if (data.settings) {
                const s = data.settings;
                const setV = (id, v) => document.getElementById(id) && (document.getElementById(id).value = v);
                const setC = (id, v) => document.getElementById(id) && (document.getElementById(id).checked = v);
                setV("paperType", s.type || "ruled");
                if (s.marginTop !== undefined) setV("marginTop", Math.round(Utils.px2mm(s.marginTop)));
                if (s.marginBottom !== undefined) setV("marginBottom", Math.round(Utils.px2mm(s.marginBottom)));
                if (s.marginLeft !== undefined) setV("marginLeft", Math.round(Utils.px2mm(s.marginLeft)));
                if (s.marginRight !== undefined) setV("marginRight", Math.round(Utils.px2mm(s.marginRight)));
                setV("rowCount", s.rowCount);
                setV("gridColor", s.gridColor);
                setV("strokeWidth", s.strokeWidth);
                setV("paperBgColor", s.paperBgColor || "#ffffff");
                if (s.customW) setV("customW", s.customW);
                if (s.customH) setV("customH", s.customH);
                if (s.paperOrientation !== undefined) setC("paperOrientation", s.paperOrientation);
                if (s.type === "label") {
                  if (s.labelWidth) setV("labelWidth", s.labelWidth);
                  if (s.labelHeight) setV("labelHeight", s.labelHeight);
                  if (s.labelCols) setV("labelCols", s.labelCols);
                  if (s.labelRows) setV("labelRows", s.labelRows);
                  if (s.labelGapH !== undefined) setV("labelGapH", s.labelGapH);
                  if (s.labelGapV !== undefined) setV("labelGapV", s.labelGapV);
                  if (s.labelQuantity) setV("labelQuantity", s.labelQuantity);
                  if (s.showCropMarks !== undefined) setC("showCropMarks", s.showCropMarks);
                  if (s.fitLabelSize !== undefined) setC("fitLabelSize", s.fitLabelSize);
                }

                setC("doubleFirst", s.doubleFirst);
                setC("doubleLast", s.doubleLast);
                setC("gridDashed", s.gridDashed);
                setV("gridDashArray", s.gridDashArray);
                setC("ruledClosed", !!s.ruledClosed);
                setC("ruledClosedDouble", !!s.ruledClosedDouble);
                setC("paperDual", !!s.dual);
                setC("doubleBorder", s.doubleBorder !== undefined ? s.doubleBorder : true);
                if (s.type === "english") {
                  setV("englishOffset", Utils.px2mm(s.englishOffset || 0).toFixed(1));
                  setV("englishLineGap", Utils.px2mm(s.englishLineGap || 6).toFixed(1));
                  setV("englishGroupGap", Utils.px2mm(s.englishGroupGap || 6).toFixed(1));
                }

                setV("columnCount", s.columnCount || 12);
                setV("gridColumns", s.gridColumns || 24);
                setV("squareDash", s.squareDash || 4);
                if (s.type === "music") {
                  setV("staffCount", s.staffCount || 8);
                  setV("staffLineCount", s.staffLineCount || 5);
                }
                setV("staffLineGap", Utils.px2mm(s.staffLineGap || 3).toFixed(1));
                setV("staffGroupGap", Utils.px2mm(s.staffGroupGap || 12).toFixed(1));
                if (["tianzige", "mizige", "huizige", "jiugongge"].includes(s.type)) {
                  setV("tianSize", Utils.px2mm(s.tianSize || 20).toFixed(1));
                  setV("tianInnerScale", s.tianInnerScale ?? 0.4);
                  if (s.type === "huizige") {
                    setV("huiInnerW", Utils.px2mm(s.huiInnerW || 10).toFixed(1));
                    setV("huiInnerH", Utils.px2mm(s.huiInnerH || 10).toFixed(1));
                  }
                  if (s.type === "jiugongge") {
                    setV("jiuCols", s.jiuCols || 3);
                    setV("jiuRows", s.jiuRows || 3);
                  }
                }

                if (s.type === "dots") {
                  setV("dotSpace", Utils.px2mm(s.dotSpace || 5).toFixed(1));
                  setV("dotSize", Utils.px2mm(s.dotSize || 1).toFixed(1));
                  setC("dotStagger", !!s.dotStagger);
                }

                if (s.type === "triangle" || s.type === "hexagon") {
                  setV("geoSize", Utils.px2mm(s.geoSize || 10).toFixed(1));
                }

                if (data.paperSize) setV("paperSize", data.paperSize);
              }

              App.dataSource.syncFromProject(data.dataSource);
              if (data.dataSource && data.dataSource.imgDirId) {
                App.dataSource.restoreImageDir(data.dataSource.imgDirId);
              }
              App.paper.changeType(document.getElementById("paperType").value || "ruled", false);
              App.paper.updateSize();
              App.canvas.clear();
              const done = () => {
                if (App.state.paperType === "label") {
                  App.state.label.mode = "design";
                  App.state.label.designContent = null;
                  App.label.updateToggleButtonUI();
                }
                App.paper.drawGrid();
                App.ui.hideModal("welcomeModal");
                App.ui.updateLayerList();
                App.canvas.getObjects().forEach((o) => {
                  if (!o.isGrid) {
                    o.set({
                      selectable: true,
                      evented: true,
                    });
                  }

                  if (["i-text", "textbox", "text"].includes(o.type)) {
                    const isDynamic = o.isDynamicDate || o.isDynamicPageNum || o.isSerialNumber || (o.dataBinding && o.dataBinding.type === "variable") || o.syncMode === "ref";
                    o.set("editable", !isDynamic);
                  }

                  if (o.isDynamicDate && o.dateConfig) {
                    o.rawContent = Utils.formatDate(new Date(), null, o.dateConfig);
                    App.content.render(o);
                  }
                });
                const fontFamilies = new Set();
                App.canvas.getObjects().forEach((o) => {
                  if (["i-text", "textbox", "text"].includes(o.type) && o.fontFamily) {
                    fontFamilies.add(o.fontFamily);
                  }
                  if (o.isTable && o.tableData && o.tableData.cells) {
                    o.tableData.cells.flat().forEach((cell) => {
                      if (cell && cell.fontFamily) fontFamilies.add(cell.fontFamily);
                    });
                  }
                });
                if (fontFamilies.size) {
                  Promise.all([...fontFamilies].map((f) => App.fontManager.ensureBundledFont(f))).then(() =>
                    App.canvas.requestRenderAll(),
                  );
                }
                App.history.reset();
                App.state.hasUnsavedChanges = !!opts.markUnsaved;
                App.ui.hideLoading();
                Utils.toast("项目加载成功");
                App.draft.resume();
              };
              data.canvasData ? App.canvas.loadFromJSON(data.canvasData, done) : done();
            } catch (e) {
              console.error(e);
              Utils.toast("数据解析异常: " + e.message, "error");
              App.ui.hideLoading();
              App.draft.resume();
            }
          },

          loadProject: function (file) {
            if (!file) return;
            App.ui.showLoading("打开中...");
            const r = new FileReader();
            r.onload = (e) => {
              try {
                this.loadProjectData(JSON.parse(e.target.result));
              } catch {
                Utils.toast("文件格式错误", "error");
              } finally {
                App.ui.hideLoading();
              }
            };
            r.readAsText(file);
          },

          copy: function () {
            const act = App.canvas.getActiveObject();
            if (act) {
              act.clone((c) => {
                App.state.clipboard = c;
                App.state.pasteCount = 0;
              }, CUSTOM_PROPS);
            }
          },

          paste: function () {
            if (!App.state.clipboard) return;
            App.state.pasteCount++;
            App.state.clipboard.clone((c) => {
              App.canvas.discardActiveObject();
              c.set({
                left: c.left + 20 * App.state.pasteCount,
                top: c.top + 20 * App.state.pasteCount,
                evented: true,
              });
              if (c.dataBinding) {
                c.dataBinding = JSON.parse(JSON.stringify(c.dataBinding));
              }
              if (c.dateConfig) c.dateConfig = JSON.parse(JSON.stringify(c.dateConfig));
              if (c.serialConfig) c.serialConfig = JSON.parse(JSON.stringify(c.serialConfig));
              if (c.barcodeConfig) c.barcodeConfig = JSON.parse(JSON.stringify(c.barcodeConfig));
              if (c.syncMode === "share" && c.sharedId) {
                c.syncMode = "ref";
                Utils.toast("已粘贴为引用对象");
              }

              if (c.isTable && c.tableData) {
                c.tableData = JSON.parse(JSON.stringify(c.tableData));
              }
              if (c.isSmartRect && c.cornerConfig) {
                c.cornerConfig = JSON.parse(JSON.stringify(c.cornerConfig));
              }

              if (c.type === "activeSelection") {
                c.canvas = App.canvas;
                c.forEachObject((o) => {
                  if (o.syncMode === "share" && o.sharedId) {
                    o.syncMode = "ref";
                  }
                  App.canvas.add(o);
                });
                c.setCoords();
              } else {
                App.canvas.add(c);
              }

              App.canvas.setActiveObject(c);
              if (c.syncMode === "ref" && c.sharedId) {
                App.ui.applyRefId(c.sharedId);
              }

              App.canvas.requestRenderAll();
              App.ui.updateLayerList();
              App.ui.updateInspector();
              App.history.saveState();
            }, CUSTOM_PROPS);
          },
        },
        
        content: {
          parseVariables: function (text) {
            if (!text) return "";
            const str = String(text);
            return str.replace(/\{([^}]+)\}/g, (match, key) => {
              const source = this.findObjectBySharedId(key);
              if (source) {
                return this.compute(source, true);
              }
              return match;
            });
          },
          compute: function (obj, isRecursiveCall = false) {
            if (!obj) return "";
            if (isRecursiveCall && obj._isComputing) return obj.rawContent || "";
            obj._isComputing = true;
            let raw = "";
            if (obj.syncMode === "ref" && obj.refId) {
              const parent = this.findObjectBySharedId(obj.refId);
              raw = parent ? this.compute(parent, true) : "{引用丢失}";
            } else {
              raw = String(obj.rawContent !== undefined ? obj.rawContent : obj.text || "");
            }

            let parsedRaw = this.parseVariables(raw);
            let myPre = obj.prefixRaw !== undefined ? obj.prefixRaw : obj.prefix || "";
            let mySuf = obj.suffixRaw !== undefined ? obj.suffixRaw : obj.suffix || "";
            myPre = this.parseVariables(myPre);
            mySuf = this.parseVariables(mySuf);
            obj._isComputing = false;
            return myPre + parsedRaw + mySuf;
          },

          findObjectBySharedId: function (id) {
            if (!id) return null;
            const objs = App.canvas.getObjects();
            return objs.find((o) => o.sharedId === id && o.syncMode === "share");
          },

          render: async function (obj) {
            if (!obj) return;
            if (obj._isRendering) return;
            obj._isRendering = true;
            try {
              const finalString = this.compute(obj);
              if (obj.isBarcode) {
                const newConfig = { ...obj.barcodeConfig, text: finalString };
                const newObj = await App.barcode.createOrUpdate(obj, newConfig);
                App.ui._replaceObject(obj, newObj);
              } else if (["i-text", "textbox", "text"].includes(obj.type)) {
                if (obj.text !== finalString) {
                  obj.set("text", finalString);
                }
              }

              if (obj.syncMode === "share" && obj.sharedId) {
                this.updateDependents(obj.sharedId);
              }
            } finally {
              obj._isRendering = false;
            }

            obj.setCoords();
            App.canvas.requestRenderAll();
          },

          updateDependents: function (sharedId) {
            const objs = App.canvas.getObjects();
            const variablePattern = new RegExp(`\\{${sharedId}\\}`);
            objs.forEach((o) => {
              if (o.syncMode === "ref" && o.refId === sharedId) {
                this.render(o);
                return;
              }

              const p = o.prefixRaw || o.prefix || "";
              const s = o.suffixRaw || o.suffix || "";
              const t = o.rawContent || o.text || "";
              if (variablePattern.test(p) || variablePattern.test(s) || variablePattern.test(t)) {
                this.render(o);
              }
            });
          },

          setRawContent: function (obj, val) {
            if (!obj) return;
            if (obj.syncMode === "ref" && obj.refId) {
              const parent = this.findObjectBySharedId(obj.refId);
              if (parent) {
                this.setRawContent(parent, val);
                return;
              } else {
                Utils.toast("关联源不存在，已转为静态文本");
                obj.syncMode = "none";
                obj.refId = null;
              }
            }

            obj.rawContent = val;
            this.render(obj);
            App.history.saveState();
          },

          setAffix: function (obj, type, val) {
            if (!obj) return;
            if (obj.rawContent === undefined || obj.rawContent === null) {
              let cleanText = String(obj.text || "");
              const oldPre = obj.prefixRaw !== undefined ? obj.prefixRaw : obj.prefix || "";
              const oldSuf = obj.suffixRaw !== undefined ? obj.suffixRaw : obj.suffix || "";
              if (oldPre && cleanText.startsWith(oldPre)) {
                cleanText = cleanText.substring(oldPre.length);
              }

              if (oldSuf && cleanText.endsWith(oldSuf)) {
                cleanText = cleanText.substring(0, cleanText.length - oldSuf.length);
              }

              obj.rawContent = cleanText;
            }

            if (type === "prefix") obj.prefixRaw = val;
            if (type === "suffix") obj.suffixRaw = val;
            obj[type] = val;
            this.render(obj);
            App.history.saveState();
          },

          getAvailableSharedIds: function () {
            const objs = App.canvas.getObjects();
            const ids = new Set();
            objs.forEach((o) => {
              if (o.syncMode === "share" && o.sharedId) {
                ids.add(o.sharedId);
              }
            });
            return Array.from(ids).sort();
          },

          getSharedValue: function (sharedId) {
            const sourceObj = this.findObjectBySharedId(sharedId);
            if (!sourceObj) return "";
            return this.compute(sourceObj);
          },
        },

        label: {
          toggleMode: function () {
            if (App.state.paperType !== "label") return;
            if (App.state.label.mode === "design") {
              this.enterPreview();
            } else {
              this.enterDesign();
            }
          },
          enterPreview: function () {
            const json = App.canvas.toJSON(CUSTOM_PROPS);
            json.objects = json.objects.filter((o) => !o.isGrid);
            App.state.label.designContent = json;
            App.state.label.mode = "preview";
            const isSingleMode = document.getElementById("fitLabelSize")?.checked;
            if (isSingleMode) {
              App.state.label.previewPage = App.state.currentDataIndex || 0;
            } else {
              App.state.label.previewPage = 0;
            }

            App.paper.updateSize();
            this.updateToggleButtonUI();
          },

          enterDesign: function () {
            App.state.label.mode = "design";
            if (App.state.label.designContent) {
              App.canvas.loadFromJSON(App.state.label.designContent, () => {
                App.canvas.forEachObject((o) => {
                  o.selectable = true;
                  o.evented = true;
                  o.setCoords();
                });
                App.paper.updateSize();
                this.updateToggleButtonUI();
                App.ui.updateLayerList();
                const isSingleMode = document.getElementById("fitLabelSize")?.checked;
                if (isSingleMode) {
                  const page = App.state.label.previewPage || 0;
                  const ds = App.state.dataSource;
                  if (ds.isActive && page < ds.data.length) {
                    App.state.currentDataIndex = page;
                  }
                }

                App.dataSource.renderPage(App.state.currentDataIndex);
              });
            } else {
              App.paper.updateSize();
              this.updateToggleButtonUI();
              App.dataSource.renderPage(App.state.currentDataIndex);
              App.ui.updateLayerList();
            }
          },
          renderPreview: async function () {
            const wasHistoryLocked = App.history.locked;
            App.history.locked = true;
            App.canvas.renderOnAddRemove = false;
            try {
              App.canvas.clear();
              const cfg = App.paper.getSettings();
              App.canvas.setBackgroundColor(cfg.paperBgColor || "#ffffff");
              App.canvas.backgroundImage = null;
              const designJSON = App.state.label.designContent;
              if (!designJSON) return;
              const labelW = Utils.mm2px(cfg.labelWidth);
              const labelH = Utils.mm2px(cfg.labelHeight);
              const gapH = Utils.mm2px(cfg.labelGapH);
              const gapV = Utils.mm2px(cfg.labelGapV);
              const startX = cfg.marginLeft;
              const startY = cfg.marginTop;
              const ds = App.state.dataSource;
              let totalLabelCount = 0;
              if (ds.isActive && ds.data.length > 0) {
                totalLabelCount = ds.data.length * cfg.labelQuantity;
              } else {
                totalLabelCount = cfg.labelQuantity;
              }

              const itemsPerPage = Math.max(1, cfg.labelCols * cfg.labelRows);
              const totalPages = Math.ceil(totalLabelCount / itemsPerPage);
              if (typeof App.state.label.previewPage === "undefined") App.state.label.previewPage = 0;
              let currentPage = App.state.label.previewPage;
              if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);
              App.state.label.previewPage = currentPage;
              const startItemIndex = currentPage * itemsPerPage;
              let drawnCount = 0;
              for (let r = 0; r < cfg.labelRows; r++) {
                for (let c = 0; c < cfg.labelCols; c++) {
                  const globalIndex = startItemIndex + drawnCount;
                  if (globalIndex >= totalLabelCount) break;
                  const currentX = startX + c * (labelW + gapH);
                  const currentY = startY + r * (labelH + gapV);
                  const dataIndex = ds.isActive && ds.data.length > 0 ? Math.floor(globalIndex / cfg.labelQuantity) : globalIndex;
                  await this._cloneDesignTo(designJSON, currentX, currentY, dataIndex, currentPage, totalPages);
                  drawnCount++;
                }
              }

              if (cfg.showCropMarks) {
                const lineOpts = {
                  fill: "transparent",
                  stroke: "#60a5fa",
                  strokeWidth: 0.5,
                  strokeDashArray: [4, 4],
                  selectable: false,
                  evented: false,
                  excludeFromExport: false,
                  originX: "left",
                  originY: "top",
                  isGrid: true,
                };
                for (let r = 0; r < cfg.labelRows; r++) {
                  const yTop = startY + r * (labelH + gapV);
                  const yBottom = yTop + labelH;
                  const rowStartX = startX;
                  const rowEndX = startX + cfg.labelCols * labelW + (cfg.labelCols - 1) * gapH;
                  if (r > 0 || cfg.marginTop > 0.5) App.canvas.add(new fabric.Line([rowStartX, yTop, rowEndX, yTop], lineOpts));
                  if (r < cfg.labelRows - 1 || cfg.marginBottom > 0.5) App.canvas.add(new fabric.Line([rowStartX, yBottom, rowEndX, yBottom], lineOpts));
                }
                for (let c = 0; c < cfg.labelCols; c++) {
                  const xLeft = startX + c * (labelW + gapH);
                  const xRight = xLeft + labelW;
                  const colStartY = startY;
                  const colEndY = startY + cfg.labelRows * labelH + (cfg.labelRows - 1) * gapV;
                  if (c > 0 || cfg.marginLeft > 0.5) App.canvas.add(new fabric.Line([xLeft, colStartY, xLeft, colEndY], lineOpts));
                  if (c < cfg.labelCols - 1 || cfg.marginRight > 0.5) App.canvas.add(new fabric.Line([xRight, colStartY, xRight, colEndY], lineOpts));
                }
              }

              App.dataSource.updateNavUI(currentPage, totalPages, true);
            } finally {
              App.canvas.renderOnAddRemove = true;
              App.canvas.requestRenderAll();
              App.history.locked = wasHistoryLocked;
            }
          },

          _cloneDesignTo: function (json, x, y, dataIndex, currentPage, totalPages) {
            return new Promise(async (resolve) => {
              if (json.backgroundImage) {
                await new Promise((r) => {
                  fabric.Image.fromObject(json.backgroundImage, (img) => {
                    if (img) {
                      img.left += x;
                      img.top += y;
                      img.set({
                        selectable: false,
                        evented: false,
                        excludeFromExport: false,
                        globalCompositeOperation: "source-over",
                      });
                      App.canvas.add(img);
                      img.sendToBack();
                    }
                    r();
                  });
                });
              }

              fabric.util.enlivenObjects(json.objects, async (objs) => {
                const processing = objs.map(async (o) => {
                  o.set({
                    left: o.left + x,
                    top: o.top + y,
                  });
                  const ds = App.state.dataSource;
                  const hasData = ds.isActive && ds.data[dataIndex];
                  const prefix = o.prefix || "";
                  const suffix = o.suffix || "";
                  if (o.isDynamicPageNum && o.pageConfig) {
                    const pageNum = currentPage + (o.pageConfig.startFrom || 1);
                    const total = totalPages || 1;
                    const pageText = o.pageConfig.format.replace("{page}", pageNum).replace("{total}", total);
                    o.rawContent = pageText;
                    o.set("text", prefix + pageText + suffix);
                  }

                  if (o.isSerialNumber && o.serialConfig) {
                    const serialText = App.tools._formatSerialNumber(o.serialConfig, dataIndex);
                    o.rawContent = serialText;
                    if (!o.isBarcode) {
                      o.set("text", prefix + serialText + suffix);
                    }
                  }

                  if (o.dataBinding && o.dataBinding.type === "variable" && hasData) {
                    const val = ds.data[dataIndex][o.dataBinding.field];
                    if (val !== undefined && val !== null) {
                      const valStr = String(val);
                      if (["i-text", "textbox", "text"].includes(o.type)) {
                        o.rawContent = valStr;
                        o.set("text", prefix + valStr + suffix);
                      }
                    }
                  }

                  if (o.isBarcode && o.dataBinding && o.dataBinding.type === "variable" && hasData) {
                    const val = ds.data[dataIndex][o.dataBinding.field];
                    if (val !== undefined && val !== null) {
                      try {
                        const newConfig = {
                          ...o.barcodeConfig,
                          text: String(val),
                        };
                        const newBarcodeObj = await App.barcode.createOrUpdate(o, newConfig);
                        o = newBarcodeObj;
                      } catch (err) {
                        console.warn("Label generation: Barcode error", err);
                      }
                    }
                  }

                  if (o.isTable && o.tableData && hasData) {
                    let tableChanged = false;
                    o.tableData.cells.forEach((row) => {
                      row.forEach((cell) => {
                        if (cell.dataBinding && cell.dataBinding.type === "variable") {
                          const val = ds.data[dataIndex][cell.dataBinding.field];
                          if (val !== undefined && val !== null) {
                            const valStr = String(val);
                            if (cell.text !== valStr) {
                              cell.text = valStr;
                              tableChanged = true;
                            }
                          }
                        }
                      });
                    });
                    if (tableChanged) {
                      const props = o.toObject(["left", "top", "scaleX", "scaleY", "angle", "opacity", "originX", "originY"]);
                      const newTableGroup = App.tableEditor.buildFabricTable(o.tableData);
                      newTableGroup.set(props);
                      o = newTableGroup;
                    }
                  }

                  o.set({
                    selectable: false,
                    evented: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockRotation: true,
                    lockScalingX: true,
                    lockScalingY: true,
                  });
                  App.canvas.add(o);
                });
                await Promise.all(processing);
                resolve();
              });
            });
          },

          updateToggleButtonUI: function () {
            const btn = document.getElementById("labelModeToggle");
            const isLabel = App.state.paperType === "label";
            const toolbar = document.querySelector("header > div:nth-child(2)");
            if (!isLabel) {
              btn.classList.add("hidden");
              if (toolbar) toolbar.classList.remove("pointer-events-none");
              return;
            }

            btn.classList.remove("hidden");
            const icon = btn.querySelector("i");
            const span = btn.querySelector("span");
            if (App.state.label.mode === "design") {
              icon.className = "ph ph-eye text-base";
              span.innerText = "预览模式";
              if (toolbar) toolbar.classList.remove("pointer-events-none");
            } else {
              icon.className = "ph ph-pencil-simple text-base";
              span.innerText = "设计模式";
              if (toolbar) toolbar.classList.add("pointer-events-none");
            }
          },
        },
        
        templates: {
          data: [],
          localData: [],
          query: "",
          selected: new Set(),
          selectMode: false,
          storageKey: "paperstudio:local-templates:v1",
          init: async function () {
            try {
              const [builtInTemplates, localTemplates] = await Promise.all([
                fetch("./templates/templates.json").then((response) => response.json()),
                idbKeyval.get(this.storageKey),
              ]);
              this.data = Array.isArray(builtInTemplates) ? builtInTemplates : [];
              this.localData = Array.isArray(localTemplates) ? localTemplates : [];
              this.render();
            } catch {
              Utils.toast("模板加载失败", "error");
            }
          },

          setQuery: function (query) {
            this.query = String(query || "").trim().toLowerCase();
            this.render();
          },

          _matchesQuery: function (template) {
            if (!this.query) return true;
            return [template.name, template.desc, ...(template.tags || [])].some((value) => String(value || "").toLowerCase().includes(this.query));
          },

          _createCard: function (template, isLocal = false) {
            const card = document.createElement("div");
            card.className = "template-card relative bg-white p-3 rounded-xl border border-gray-200 cursor-pointer transition hover:border-red-300 hover:shadow-sm flex flex-col gap-2";
            const preview = document.createElement("div");
            preview.className = "h-36 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100";
            const thumbnailSrc = template.thumbnail && String(template.thumbnail);
            const hasThumbnail =
              thumbnailSrc &&
              (thumbnailSrc.startsWith("data:image/") ||
                thumbnailSrc.startsWith("./") ||
                thumbnailSrc.startsWith("/") ||
                thumbnailSrc.startsWith("http://") ||
                thumbnailSrc.startsWith("https://"));
            if (hasThumbnail) {
              const image = document.createElement("img");
              image.src = thumbnailSrc;
              image.className = "h-full w-auto object-contain";
              image.alt = "模板缩略图";
              image.loading = "lazy";
              image.decoding = "async";
              image.onerror = () => {
                image.remove();
                const icon = document.createElement("i");
                icon.className = "ph ph-file-plus text-3xl text-gray-300";
                preview.appendChild(icon);
              };
              preview.appendChild(image);
            } else {
              const icon = document.createElement("i");
              icon.className = "ph ph-file-plus text-3xl text-gray-300";
              preview.appendChild(icon);
            }
            const info = document.createElement("div");
            const title = document.createElement("h3");
            title.className = "font-bold text-slate-700 text-sm truncate";
            title.textContent = template.name || "未命名模板";
            const desc = document.createElement("p");
            desc.className = "text-slate-400 text-xs line-clamp-2 min-h-[2.5em]";
            desc.textContent = template.desc || "无描述";
            info.append(title, desc);
            if (isLocal && template.tags?.length) {
              const tags = document.createElement("div");
              tags.className = "mt-1 flex flex-wrap gap-1";
              template.tags.forEach((tag) => {
                const chip = document.createElement("span");
                chip.className = "rounded bg-red-50 px-1.5 py-0.5 text-[10px] text-red-600";
                chip.textContent = tag;
                tags.appendChild(chip);
              });
              info.appendChild(tags);
            }
            card.append(preview, info);
            const select = isLocal ? document.createElement("button") : null;
            const applySelection = () => {
              if (!select) return;
              card.classList.toggle("selected", this.selected.has(template.id));
              this._updateSelectButton(select, template.id);
            };
            card.onclick = () => {
              if (this.selectMode) {
                if (isLocal) {
                  this.selected.has(template.id) ? this.selected.delete(template.id) : this.selected.add(template.id);
                  applySelection();
                  this._updateSelectionToolbar();
                } else {
                  Utils.toast("内置模板不支持选择", "info");
                }
              } else {
                this.load(template.id);
              }
            };
            if (select) {
              select.className = "absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow hover:text-red-600 text-slate-300";
              select.innerHTML = '<i class="ph ph-circle text-base"></i>';
              select.onclick = (event) => {
                event.stopPropagation();
                this.selected.has(template.id) ? this.selected.delete(template.id) : this.selected.add(template.id);
                applySelection();
                this._updateSelectionToolbar();
              };
              card.appendChild(select);
              applySelection();
            }
            if (isLocal) {
              const remove = document.createElement("button");
              remove.className = "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow hover:text-red-600";
              remove.title = "删除本地模板";
              remove.innerHTML = '<i class="ph ph-trash"></i>';
              remove.onclick = (event) => {
                event.stopPropagation();
                this.removeLocal(template.id);
              };
              card.appendChild(remove);
            }
            return card;
          },

          _updateSelectButton: function (button, id) {
            const isSelected = this.selected.has(id);
            button.title = isSelected ? "取消选择" : "选择用于导出";
            button.classList.toggle("text-red-600", isSelected);
            button.classList.toggle("text-slate-300", !isSelected);
            const icon = button.querySelector("i");
            if (icon) icon.className = `ph ${isSelected ? "ph-check-circle" : "ph-circle"} text-base`;
          },

          _visibleTemplates: function () {
            return this.localData.filter((template) => this._matchesQuery(template));
          },

          setSelectMode: function (enabled) {
            this.selectMode = !!enabled;
            if (this.selectMode) {
              const localIds = new Set(this.localData.map((template) => template.id));
              [...this.selected].forEach((id) => {
                if (!localIds.has(id)) this.selected.delete(id);
              });
            }
            this.render();
          },

          toggleSelectAll: function () {
            const visible = this._visibleTemplates();
            const allSelected = visible.length > 0 && visible.every((template) => this.selected.has(template.id));
            visible.forEach((template) => {
              if (allSelected) this.selected.delete(template.id);
              else this.selected.add(template.id);
            });
            this.render();
          },

          batchDelete: async function () {
            const targets = this.localData.filter((template) => this.selected.has(template.id));
            if (!targets.length) return Utils.toast("请先选择要删除的本地模板", "info");
            if (!window.confirm(`确定删除选中的 ${targets.length} 个本地模板吗？`)) return;
            const ids = new Set(targets.map((template) => template.id));
            this.localData = this.localData.filter((template) => !ids.has(template.id));
            ids.forEach((id) => this.selected.delete(id));
            await this._persistLocal();
            this.render();
            Utils.toast(`已删除 ${targets.length} 个本地模板`, "success");
          },

          _updateSelectionToolbar: function () {
            const bar = document.getElementById("templateSelectBar");
            const modeBtn = document.getElementById("templateSelectBtn");
            const count = this.selected.size;
            if (bar) bar.classList.toggle("hidden", !this.selectMode);
            if (modeBtn) {
              modeBtn.innerHTML = this.selectMode ? '<i class="ph ph-check text-xs"></i> 完成' : '<i class="ph ph-check-square text-xs"></i> 选择';
              modeBtn.classList.toggle("border-red-200", this.selectMode);
              modeBtn.classList.toggle("text-red-600", this.selectMode);
              modeBtn.classList.toggle("bg-red-50", this.selectMode);
              modeBtn.classList.toggle("border-gray-200", !this.selectMode);
              modeBtn.classList.toggle("text-slate-600", !this.selectMode);
            }
            const countEl = document.getElementById("templateSelectedCount");
            if (countEl) countEl.textContent = `已选 ${count} 项`;
            const allBtn = document.getElementById("templateSelectAllBtn");
            if (allBtn) {
              const visible = this._visibleTemplates();
              allBtn.textContent = visible.length > 0 && visible.every((template) => this.selected.has(template.id)) ? "取消全选" : "全选";
            }
            this._updateExportButton();
          },

          _updateExportButton: function () {
            const button = document.getElementById("exportLocalBtn");
            if (!button) return;
            const count = this.selected.size;
            button.title = count ? `导出选中的 ${count} 个模板` : "导出本地模板";
            button.classList.toggle("text-red-600", count > 0);
            button.classList.toggle("text-slate-500", count === 0);
          },

          render: function () {
            const grid = document.getElementById("templateGrid");
            if (!grid) return;
            grid.innerHTML = "";
            const appendSection = (title, templates, isLocal) => {
              if (!templates.length) return;
              const heading = document.createElement("div");
              heading.className = "col-span-2 pt-1 text-xs font-bold text-slate-500";
              heading.textContent = title;
              grid.appendChild(heading);
              templates.forEach((template) => grid.appendChild(this._createCard(template, isLocal)));
            };
            const local = this.localData.filter((template) => this._matchesQuery(template));
            const builtIn = this.data.filter((template) => this._matchesQuery(template));
            appendSection("本地模板", local, true);
            appendSection("内置模板", builtIn, false);
            if (!local.length && !builtIn.length) {
              const empty = document.createElement("p");
              empty.className = "col-span-2 py-12 text-center text-xs text-slate-400";
              empty.textContent = "未找到匹配的模板";
              grid.appendChild(empty);
            }
            this._updateSelectionToolbar();
          },

          _persistLocal: async function () {
            await idbKeyval.set(this.storageKey, this.localData);
          },

          _createProjectSnapshot: function () {
            return App.project.buildSnapshot({ includeDataSource: false });
          },

          saveCurrent: async function () {
            const name = window.prompt("模板名称", "未命名模板");
            if (name === null) return;
            const desc = window.prompt("模板描述（可留空）", "");
            if (desc === null) return;
            const tagsInput = window.prompt("标签（用逗号分隔，可留空）", "");
            if (tagsInput === null) return;
            try {
              const project = this._createProjectSnapshot();
              this.localData.unshift({
                id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                name: String(name).trim() || "未命名模板",
                desc: String(desc).trim() || "本地保存的模板",
                tags: [...new Set(String(tagsInput).split(/[,，]/).map((tag) => tag.trim()).filter(Boolean))],
                thumbnail: project.thumbnail,
                project,
                updatedAt: new Date().toISOString(),
              });
              await this._persistLocal();
              this.render();
              Utils.toast("本地模板已保存", "success");
            } catch (error) {
              console.error(error);
              Utils.toast("保存模板失败", "error");
            }
          },

          removeLocal: async function (id) {
            const template = this.localData.find((item) => item.id === id);
            if (!template || !window.confirm(`确定删除模板"${template.name}"吗？`)) return;
            this.localData = this.localData.filter((item) => item.id !== id);
            this.selected.delete(id);
            await this._persistLocal();
            this.render();
            Utils.toast("本地模板已删除");
          },

          exportLocal: async function () {
            if (this.selectMode && !this.selected.size) return Utils.toast("请先选择要导出的模板", "info");
            let targets;
            if (this.selected.size) {
              targets = [...this.localData, ...this.data].filter((template) => this.selected.has(template.id));
              if (!targets.length) return Utils.toast("没有可导出的模板", "info");
            } else {
              if (!this.localData.length) return Utils.toast("没有可导出的本地模板", "info");
              targets = this.localData.slice();
            }
            App.ui.showLoading("导出中...");
            try {
              const entries = [];
              for (const template of targets) {
                if (template.project) {
                  entries.push(template);
                } else if (template.url) {
                  try {
                    const project = await (await fetch(template.url)).json();
                    entries.push({ ...template, project });
                  } catch {
                    /* 内置模板下载失败则跳过 */
                  }
                }
              }
              if (!entries.length) return Utils.toast("导出失败", "error");
              const blob = new Blob([JSON.stringify({ format: "PaperStudioTemplatePack", version: 1, templates: entries })], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `PaperStudio模板_${Date.now()}.paper-templates.json`;
              link.click();
              setTimeout(() => URL.revokeObjectURL(url), 0);
              Utils.toast(`已导出 ${entries.length} 个模板`, "success");
            } catch (error) {
              console.error(error);
              Utils.toast("导出失败", "error");
            } finally {
              App.ui.hideLoading();
            }
          },

          _toLocalTemplate: function (name, desc, tags, thumbnail, project) {
            return {
              id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
              name: String(name || "未命名模板").slice(0, 100),
              desc: String(desc || "本地导入的模板").slice(0, 300),
              tags: [...new Set((Array.isArray(tags) ? tags : []).map((tag) => String(tag).trim()).filter(Boolean).slice(0, 20))],
              thumbnail: String(thumbnail || "").startsWith("data:image/") ? thumbnail : "",
              project,
              updatedAt: new Date().toISOString(),
            };
          },

          _resolveConflicts: function (templates) {
            const reserved = new Set(this.localData.map((template) => template.name));
            const added = [];
            let overwritten = 0;
            let skipped = 0;
            for (const template of templates) {
              if (!reserved.has(template.name)) {
                reserved.add(template.name);
                added.push(template);
                continue;
              }
              if (window.confirm(`模板"${template.name}"已存在，是否覆盖？`)) {
                const existing = this.localData.find((item) => item.name === template.name) || added.find((item) => item.name === template.name);
                if (existing) {
                  Object.assign(existing, {
                    name: template.name,
                    desc: template.desc,
                    tags: template.tags,
                    thumbnail: template.thumbnail,
                    project: template.project,
                    updatedAt: new Date().toISOString(),
                  });
                  overwritten++;
                } else {
                  skipped++;
                }
              } else {
                skipped++;
              }
            }
            return { added, overwritten, skipped };
          },

          importLocal: async function (files) {
            const fileList = files && typeof files.length === "number" ? Array.from(files) : files ? [files] : [];
            if (!fileList.length) return;
            const pending = [];
            let failed = 0;
            for (const file of fileList) {
              try {
                const data = JSON.parse(await file.text());

                if (data.format === "PaperStudioTemplatePack" && Array.isArray(data.templates)) {
                  data.templates
                    .filter((template) => template && template.project?.canvasData && template.project?.settings)
                    .forEach((template) => {
                      pending.push(this._toLocalTemplate(template.name, template.desc, template.tags, template.thumbnail, template.project));
                    });
                  continue;
                }

                if (data.settings && data.canvasData) {
                  const baseName = String(file.name || "").replace(/\.paper$/i, "").trim() || "未命名模板";
                  const project = JSON.parse(JSON.stringify(data));
                  project.dataSource = null;
                  pending.push(this._toLocalTemplate(baseName, "从 .paper 文件导入的模板", [], project.thumbnail, project));
                  continue;
                }

                failed++;
              } catch (error) {
                console.error(error);
                failed++;
              }
            }

            if (!pending.length) {
              Utils.toast(failed ? `导入失败：${failed} 个文件无效` : "没有可导入的模板", "error");
              return;
            }

            const { added, overwritten, skipped } = this._resolveConflicts(pending);
            if (!added.length && !overwritten) {
              Utils.toast(skipped ? `已取消 ${skipped} 个重名模板` : "没有可导入的模板", "info");
              return;
            }
            if (added.length) this.localData.unshift(...added);
            await this._persistLocal();
            this.render();
            const parts = [];
            if (added.length) parts.push(`已导入 ${added.length} 个模板`);
            if (overwritten) parts.push(`覆盖 ${overwritten} 个已有模板`);
            if (skipped) parts.push(`跳过 ${skipped} 个模板`);
            if (failed) parts.push(`跳过 ${failed} 个无效文件`);
            Utils.toast(parts.join("，"), "success");
          },

          load: async function (id) {
            const localTemplate = this.localData.find((template) => template.id === id);
            if (localTemplate) {
              App.ui.showLoading("加载本地模板...");
              try {
                await App.dataSource.close();
                App.io.loadProjectData(localTemplate.project);
              } catch (error) {
                console.error(error);
                App.ui.hideLoading();
                Utils.toast("加载本地模板失败", "error");
              }
              return;
            }
            if (id === "blank_a4" || !this.data.find((i) => i.id === id)?.url) {
              App.dataSource.close();
              App.ui.showLoading("创建中...");
              setTimeout(() => {
                App.draft.suspend();
                App.paper.changeType("blank", true);
                const defaults = {
                  paperSize: "A4",
                  paperOrientation: false,
                  marginTop: 25,
                  marginBottom: 25,
                  marginLeft: 20,
                  marginRight: 20,
                  paperBgColor: "#ffffff",
                };
                Object.entries(defaults).forEach(([k, v]) => {
                  const el = document.getElementById(k);
                  if (el) el.type === "checkbox" ? (el.checked = v) : (el.value = v);
                });
                App.paper.updateSize();
                App.canvas.clear();
                App.paper.drawPaper();
                App.ui.hideModal("welcomeModal");
                App.ui.updateLayerList();
                App.history.reset();
                App.draft.resume();
                App.ui.hideLoading();
              }, 200);
              return;
            }

            const t = this.data.find((i) => i.id === id);
            if (t?.url) {
              App.ui.showLoading("下载模板...");
              try {
                await App.dataSource.close();
                App.io.loadProjectData(await (await fetch(t.url)).json());
              } catch {
                Utils.toast("加载失败", "error");
                App.ui.hideLoading();
              }
            }
          },
        },

        ruler: {
          h: null,
          v: null,
          ctxH: null,
          ctxV: null,
          isEnabled: true,

          init: function () {
            this.h = document.getElementById("ruler-h");
            this.v = document.getElementById("ruler-v");
            if (!this.h || !this.v) return;
            this.ctxH = this.h.getContext("2d");
            this.ctxV = this.v.getContext("2d");
            this.draw();
          },

          draw: function (mouseX, mouseY) {
            if (!this.isEnabled || !this.h || !this.v) return;
            const dpr = window.devicePixelRatio || 1,
              thick = 20,
              zoom = App.state.zoom;
            const main = document.querySelector("main"),
              wrapper = document.getElementById("canvasWrapper");
            const w = main.clientWidth - thick,
              h = main.clientHeight - thick;
            [this.h, this.v].forEach((c, i) => {
              const size = i ? [thick, h] : [w, thick];
              if (c.width !== size[0] * dpr || c.height !== size[1] * dpr) {
                c.width = size[0] * dpr;
                c.height = size[1] * dpr;
                c.style.width = size[0] + "px";
                c.style.height = size[1] + "px";
              }
            });
            const mBox = main.getBoundingClientRect(),
              wBox = wrapper.getBoundingClientRect();
            const start = [wBox.left - mBox.left - thick, wBox.top - mBox.top - thick - 25]; 
            const pxPerMm = CONFIG.MM_TO_PX * zoom;
            const step = pxPerMm < 0.5 ? 50 : pxPerMm < 2 ? 10 : pxPerMm < 4 ? 5 : 1;
            const showMid = step * 5 * pxPerMm > 45;
            const drawAxis = (ctx, isVert, len, offset) => {
              ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, isVert ? thick : len, isVert ? len : thick);
              ctx.beginPath();
              ctx.strokeStyle = "#e2e8f0";
              ctx.lineWidth = 1;
              isVert ? (ctx.moveTo(19.5, 0), ctx.lineTo(19.5, len)) : (ctx.moveTo(0, 19.5), ctx.lineTo(len, 19.5));
              ctx.stroke();
              ctx.fillStyle = ctx.strokeStyle = "#a5a5a5";
              ctx.font = "10px sans-serif";
              ctx.beginPath();
              const min = Math.floor(-offset / pxPerMm),
                max = Math.ceil((len - offset) / pxPerMm);
              for (let mm = Math.floor(min / step) * step; mm <= max; mm += step) {
                const pos = offset + mm * pxPerMm;
                const isMajor = mm % (step * 10) === 0,
                  isMid = mm % (step * 5) === 0;
                const tickLen = isMajor ? 10 : isMid ? 6 : 4;
                if (isVert) {
                  ctx.moveTo(thick, pos);
                  ctx.lineTo(thick - tickLen, pos);
                } else {
                  ctx.moveTo(pos, thick);
                  ctx.lineTo(pos, thick - tickLen);
                }

                if (isMajor || (isMid && showMid)) {
                  if (isVert) {
                    ctx.save();
                    ctx.translate(10, pos + 2);
                    ctx.rotate(-1.57);
                    ctx.fillText(mm, 2, 0);
                    ctx.restore();
                  } else ctx.fillText(mm, pos + 2, 10);
                }
              }
              ctx.stroke();
            };
            drawAxis(this.ctxH, false, w, start[0]);
            drawAxis(this.ctxV, true, h, start[1]);
            if (mouseX != null) {
              const drawC = (ctx, isV, pos, max) => {
                if (pos < 0 || pos > max) return;
                ctx.strokeStyle = "#e11d48";
                ctx.beginPath();
                isV ? (ctx.moveTo(0, pos), ctx.lineTo(thick, pos)) : (ctx.moveTo(pos, 0), ctx.lineTo(pos, thick));
                ctx.stroke();
              };
              drawC(this.ctxH, false, mouseX - mBox.left - thick, w);
              drawC(this.ctxV, true, mouseY - mBox.top - thick, h);
            }
          },
        },
      };
      const FontPicker = {
        _instances: new Map(), 

        create(container, selectEl, onChange) {
          const getOptions = () => {
            const opts = [];
            for (const o of selectEl.options) {
              opts.push({ value: o.value, label: o.text, isSep: o.value === '---sep---' });
            }
            return opts;
          };
          const trigger = document.createElement('div');
          trigger.className = 'font-select-trigger';
          trigger.innerHTML = `<span class="font-select-trigger-label">加载中...</span><i class="ph ph-caret-down font-select-trigger-icon"></i>`;
          const dropdown = document.createElement('div');
          dropdown.className = 'font-select-dropdown';
          dropdown.innerHTML = `
            <div class="font-select-search-box">
              <input type="text" class="font-select-search-input" placeholder="搜索字体…" />
            </div>
            <div class="font-select-list"></div>
          `;
          container.appendChild(trigger);
          document.body.appendChild(dropdown);
          const labelEl = trigger.querySelector('.font-select-trigger-label');
          const searchInput = dropdown.querySelector('.font-select-search-input');
          const listEl = dropdown.querySelector('.font-select-list');
          let isOpen = false;
          let currentValue = selectEl.value || selectEl.options[0]?.value || '';
          const renderList = (filter = '') => {
            const opts = getOptions();
            const q = filter.trim().toLowerCase();
            listEl.innerHTML = '';
            let anyVisible = false;
            for (const opt of opts) {
              if (opt.isSep) {
                if (!q) {
                  const sep = document.createElement('div');
                  sep.className = 'font-select-option separator';
                  sep.textContent = opt.label;
                  listEl.appendChild(sep);
                }
                continue;
              }
              if (q && !opt.label.toLowerCase().includes(q) && !opt.value.toLowerCase().includes(q)) continue;
              anyVisible = true;
              const item = document.createElement('div');
              item.className = 'font-select-option' + (opt.value === currentValue ? ' selected' : '');
              item.textContent = opt.label;
              item.dataset.value = opt.value;
              const previewFamily = opt.value.replace(/^'|'$/g, '');
              item.style.fontFamily = `"${previewFamily}", sans-serif`;
              item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                setValue(opt.value, opt.label, true);
                close();
              });
              listEl.appendChild(item);
            }

            if (!anyVisible) {
              const empty = document.createElement('div');
              empty.className = 'font-select-empty';
              empty.textContent = '没有匹配的字体';
              listEl.appendChild(empty);
            }
          };
          const syncLabel = () => {
            const opts = getOptions();
            const found = opts.find(o => o.value === currentValue);
            labelEl.textContent = found ? found.label : currentValue;
          };
          const setValue = (val, _label, fireChange) => {
            currentValue = val;
            selectEl.value = val;
            syncLabel();
            if (fireChange) {
              selectEl.dispatchEvent(new Event('change', { bubbles: true }));
              if (onChange) onChange(val);
            }
          };
          const positionDropdown = () => {
            const rect = trigger.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropH = 280;
            dropdown.style.width = Math.max(container.offsetWidth, 200) + 'px';
            if (spaceBelow < dropH && rect.top > dropH) {
              dropdown.style.top = (rect.top - dropH + window.scrollY) + 'px';
            } else {
              dropdown.style.top = (rect.bottom + window.scrollY + 2) + 'px';
            }
            dropdown.style.left = rect.left + window.scrollX + 'px';
          };
          const open = () => {
            if (isOpen) return;
            App.loadLocalFonts().then(() => renderList(searchInput.value));
            isOpen = true;
            trigger.classList.add('open');
            dropdown.classList.add('open');
            positionDropdown();
            searchInput.value = '';
            renderList('');
            requestAnimationFrame(() => {
              const sel = listEl.querySelector('.selected');
              if (sel) sel.scrollIntoView({ block: 'nearest' });
              searchInput.focus();
            });
          };
          const close = () => {
            if (!isOpen) return;
            isOpen = false;
            trigger.classList.remove('open');
            dropdown.classList.remove('open');
          };
          trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? close() : open();
          });
          searchInput.addEventListener('input', () => renderList(searchInput.value));
          searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
          });
          document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && !dropdown.contains(e.target)) close();
          }, true);
          // 滚动/resize 时重新定位
          window.addEventListener('scroll', () => { if (isOpen) positionDropdown(); }, true);
          window.addEventListener('resize', () => { if (isOpen) positionDropdown(); });
          syncLabel();
          renderList('');
          const instance = { setValue, renderList, syncLabel, close, selectEl };
          FontPicker._instances.set(selectEl, instance);
          return instance;
        },

        setValue(selectEl, value) {
          const inst = FontPicker._instances.get(selectEl);
          if (inst) {
            inst.setValue(value, null, false);
          } else {
            selectEl.value = value;
          }
        },

        refresh(selectEl) {
          const inst = FontPicker._instances.get(selectEl);
          if (inst) {
            inst.syncLabel();
          }
        },
      };
      window.onload = function () {
        App.init();
        App.draft.ready = true;
        App.draft.checkDraft();
        const propFontSelect = document.getElementById('propFont');
        const propFontContainer = document.getElementById('propFontPicker');
        if (propFontSelect && propFontContainer) {
          FontPicker.create(propFontContainer, propFontSelect, (val) => {
            App.ui.setProp('fontFamily', val);
          });
        }

        const floatFontSelect = document.getElementById('floatFontFamily');
        const floatFontContainer = document.getElementById('floatFontFamilyPicker');
        if (floatFontSelect && floatFontContainer) {
          FontPicker.create(floatFontContainer, floatFontSelect, null);
        }
      };