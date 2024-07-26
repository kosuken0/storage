null;
var m;
m || (m = typeof Module !== 'undefined' ? Module : {});
(function(D) {
    function Bb(a, b, c, d) {
        a || (a = this);
        this.parent = a;
        this.zg = a.zg;
        this.ei = null;
        this.id = f.Sl++;
        this.name = b;
        this.mode = c;
        this.sg = {};
        this.vg = {};
        this.ii = d
    }
    function N(a) {
        if ("string" != typeof a)
            return 0;
        var b = 4 * a.length + 1
          , c = X(b);
        K(a, c, b);
        return c
    }
    function fa(a) {
        switch (a) {
        case 0:
            return 48;
        case 1:
            return 49;
        case 2:
            return 50;
        case 3:
            return 51;
        case 4:
            return 52;
        case 5:
            return 53;
        case 6:
            return 54;
        case 7:
            return 55;
        case 8:
            return 56;
        case 9:
            return 57;
        case 10:
            return 65;
        case 11:
            return 66;
        case 12:
            return 67;
        case 13:
            return 68;
        case 14:
            return 69;
        case 15:
            return 70;
        default:
            return 63
        }
    }
    function zc() {
        window.onbeforeunload = null;
        location.reload(!0)
    }
    function gb(a) {
        var b = document.activeElement
          , c = document.createElement("textarea");
        c.style.position = "fixed";
        c.style.top = 0;
        c.style.left = 0;
        c.style.width = "2em";
        c.style.height = "2em";
        c.style.margin = 0;
        c.style.padding = 0;
        c.style.border = "none";
        c.style.outline = "none";
        c.style.boxShadow = "none";
        c.style.background = "transparent";
        c.value = a;
        document.body.appendChild(c);
        c.focus();
        c.select();
        var d = !1;
        try {
            (d = document.execCommand("copy")) || console.log("execCommand copy failed")
        } catch (e) {}
        document.body.removeChild(c);
        d || window.prompt("Copy the following link to your clipboard:", a);
        b && b.focus()
    }
    function Ac(a) {
        return m.locateFile ? m.locateFile(a, pa) : pa + a
    }
    function ra(a, b, c) {
        var d = b + c;
        for (c = b; a[c] && !(c >= d); )
            ++c;
        if (16 < c - b && a.buffer && Cb)
            return Cb.decode(a.subarray(b, c));
        for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
                var g = a[b++] & 63;
                if (192 == (e & 224))
                    d += String.fromCharCode((e & 31) << 6 | g);
                else {
                    var h = a[b++] & 63;
                    e = 224 == (e & 240) ? (e & 15) << 12 | g << 6 | h : (e & 7) << 18 | g << 12 | h << 6 | a[b++] & 63;
                    65536 > e ? d += String.fromCharCode(e) : (e -= 65536,
                    d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023))
                }
            } else
                d += String.fromCharCode(e)
        }
        return d
    }
    function A(a, b) {
        return a ? ra(S, a, b) : ""
    }
    function Na(a, b, c, d) {
        if (!(0 < d))
            return 0;
        var e = c;
        d = c + d - 1;
        for (var g = 0; g < a.length; ++g) {
            var h = a.charCodeAt(g);
            if (55296 <= h && 57343 >= h) {
                var n = a.charCodeAt(++g);
                h = 65536 + ((h & 1023) << 10) | n & 1023
            }
            if (127 >= h) {
                if (c >= d)
                    break;
                b[c++] = h
            } else {
                if (2047 >= h) {
                    if (c + 1 >= d)
                        break;
                    b[c++] = 192 | h >> 6
                } else {
                    if (65535 >= h) {
                        if (c + 2 >= d)
                            break;
                        b[c++] = 224 | h >> 12
                    } else {
                        if (c + 3 >= d)
                            break;
                        b[c++] = 240 | h >> 18;
                        b[c++] = 128 | h >> 12 & 63
                    }
                    b[c++] = 128 | h >> 6 & 63
                }
                b[c++] = 128 | h & 63
            }
        }
        b[c] = 0;
        return c - e
    }
    function K(a, b, c) {
        return Na(a, S, b, c)
    }
    function Oa(a) {
        for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4,
            ++c) : b += 3
        }
        return b
    }
    function Pa() {
        qa++;
        m.monitorRunDependencies && m.monitorRunDependencies(qa)
    }
    function sa() {
        qa--;
        m.monitorRunDependencies && m.monitorRunDependencies(qa);
        if (0 == qa && (null !== hb && (clearInterval(hb),
        hb = null),
        xa)) {
            var a = xa;
            xa = null;
            a()
        }
    }
    function da(a) {
        if (m.onAbort)
            m.onAbort(a);
        a = "Aborted(" + a + ")";
        ba(a);
        ta = !0;
        Qa = 1;
        throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
    }
    function Db(a) {
        return a.startsWith("data:application/octet-stream;base64,")
    }
    function Eb(a) {
        try {
            if (a == ja && ya)
                return new Uint8Array(ya);
            if (Fb)
                return Fb(a);
            throw "both async and sync fetching of the wasm failed";
        } catch (b) {
            da(b)
        }
    }
    function Bc() {
        return ya || "function" != typeof fetch ? Promise.resolve().then(function() {
            return Eb(ja)
        }) : fetch(ja, {
            credentials: "same-origin"
        }).then(function(a) {
            if (!a.ok)
                throw "failed to load wasm binary file at '" + ja + "'";
            return a.arrayBuffer()
        }).catch(function() {
            return Eb(ja)
        })
    }
    function Gb(a) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + a + ")";
        this.status = a
    }
    function Cc(a, b, c) {
        a.addEventListener(b, c, {
            once: !0
        })
    }
    function Dc(a, b) {
        b || (b = [document, document.getElementById("canvas")]);
        ["keydown", "mousedown", "touchstart"].forEach(function(c) {
            b.forEach(function(d) {
                d && Cc(d, c, ()=>{
                    "suspended" === a.state && a.resume()
                }
                )
            })
        })
    }
    function Ra(a) {
        for (; 0 < a.length; )
            a.shift()(m)
    }
    function Hb(a) {
        var b = Ib();
        a = a();
        Jb(b);
        return a
    }
    function T(a) {
        var b = Sa[a];
        b || (a >= Sa.length && (Sa.length = a + 1),
        Sa[a] = b = Kb.get(a));
        return b
    }
    function ib(a, b, c) {
        a.includes("j") ? (a = m["dynCall_" + a],
        b = c && c.length ? a.apply(null, [b].concat(c)) : a.call(null, b)) : b = T(b).apply(null, c);
        return b
    }
    function Lb(a) {
        if (a instanceof Gb || "unwind" == a)
            return Qa;
        jb(1, a)
    }
    function Mb(a, b, c="i8") {
        c.endsWith("*") && (c = "*");
        switch (c) {
        case "i1":
            Z[a >> 0] = b;
            break;
        case "i8":
            Z[a >> 0] = b;
            break;
        case "i16":
            ua[a >> 1] = b;
            break;
        case "i32":
            l[a >> 2] = b;
            break;
        case "i64":
            U = [b >>> 0, (G = b,
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[a >> 2] = U[0];
            l[a + 4 >> 2] = U[1];
            break;
        case "float":
            I[a >> 2] = b;
            break;
        case "double":
            ea[a >> 3] = b;
            break;
        case "*":
            B[a >> 2] = b;
            break;
        default:
            da("invalid type for setValue: " + c)
        }
    }
    function Nb() {
        if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
            var a = new Uint8Array(1);
            return ()=>{
                crypto.getRandomValues(a);
                return a[0]
            }
        }
        return ()=>da("randomDevice")
    }
    function kb(a, b, c) {
        c = 0 < c ? c : Oa(a) + 1;
        c = Array(c);
        a = Na(a, c, 0, c.length);
        b && (c.length = a);
        return c
    }
    function Ec(a, b, c, d) {
        var e = d ? "" : "al " + a;
        Fc(a, g=>{
            g || da('Loading data file "' + a + '" failed (no arrayBuffer).');
            b(new Uint8Array(g));
            e && sa(e)
        }
        , ()=>{
            if (c)
                c();
            else
                throw 'Loading data file "' + a + '" failed.';
        }
        );
        e && Pa(e)
    }
    function za(a, b) {
        r.rg.Pi = a;
        r.rg.Qi = b;
        if (!r.rg.Eh)
            return 1;
        r.rg.Cj || (r.rg.Cj = !0);
        if (0 == a)
            r.rg.ph = function() {
                var d = Math.max(0, r.rg.nm + b - lb()) | 0;
                setTimeout(r.rg.Li, d)
            }
            ,
            r.rg.method = "timeout";
        else if (1 == a)
            r.rg.ph = function() {
                r.requestAnimationFrame(r.rg.Li)
            }
            ,
            r.rg.method = "rAF";
        else if (2 == a) {
            if ("undefined" == typeof setImmediate) {
                var c = [];
                addEventListener("message", d=>{
                    if ("setimmediate" === d.data || "setimmediate" === d.data.target)
                        d.stopPropagation(),
                        c.shift()()
                }
                , !0);
                setImmediate = function(d) {
                    c.push(d);
                    postMessage("setimmediate", "*")
                }
            }
            r.rg.ph = function() {
                setImmediate(r.rg.Li)
            }
            ;
            r.rg.method = "immediate"
        }
        return 0
    }
    function Ob(a) {
        Qa = a;
        if (!Gc) {
            if (m.onExit)
                m.onExit(a);
            ta = !0
        }
        jb(a, new Gb(a))
    }
    function Pb(a, b, c, d, e) {
        !r.rg.Eh || da("emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
        r.rg.Eh = a;
        r.rg.Vi = d;
        var g = r.rg.Dh;
        r.rg.Cj = !1;
        r.rg.Li = function() {
            if (!ta)
                if (0 < r.rg.Ak.length) {
                    var h = Date.now()
                      , n = r.rg.Ak.shift();
                    n.Eh(n.Vi);
                    if (r.rg.Bj) {
                        var q = r.rg.Bj
                          , u = 0 == q % 1 ? q - 1 : Math.floor(q);
                        r.rg.Bj = n.Cm ? u : (8 * q + (u + .5)) / 9
                    }
                    Aa('main loop blocker "' + n.name + '" took ' + (Date.now() - h) + " ms");
                    r.rg.um();
                    g < r.rg.Dh || setTimeout(r.rg.Li, 0)
                } else
                    g < r.rg.Dh || (r.rg.Zi = r.rg.Zi + 1 | 0,
                    1 == r.rg.Pi && 1 < r.rg.Qi && 0 != r.rg.Zi % r.rg.Qi ? r.rg.ph() : (0 == r.rg.Pi && (r.rg.nm = lb()),
                    r.rg.gm(a),
                    g < r.rg.Dh || ("object" == typeof SDL && SDL.audio && SDL.audio.Zl && SDL.audio.Zl(),
                    r.rg.ph())))
        }
        ;
        e || (b && 0 < b ? za(0, 1E3 / b) : za(1, 1),
        r.rg.ph());
        if (c)
            throw "unwind";
    }
    function Ta(a) {
        if (!ta)
            try {
                a()
            } catch (b) {
                Lb(b)
            }
    }
    function Qb(a, b) {
        return setTimeout(function() {
            Ta(a)
        }, b)
    }
    function Ba(a) {
        Ba.Ej || (Ba.Ej = {});
        Ba.Ej[a] || (Ba.Ej[a] = 1,
        ba(a))
    }
    function Ca(a) {
        var b = Oa(a) + 1
          , c = X(b);
        c && Na(a, Z, c, b);
        return c
    }
    function Rb(a, b) {
        mb.length = 0;
        var c;
        for (b >>= 2; c = S[a++]; )
            b += 105 != c & b,
            mb.push(105 == c ? l[b] : ea[b++ >> 1]),
            ++b;
        return mb
    }
    function Sb(a, b, c) {
        b = Rb(b, c);
        return Tb[a].apply(null, b)
    }
    function aa(a) {
        a = 2 < a ? A(a) : a;
        return Ua[a] || document.querySelector(a)
    }
    function Ub(a) {
        return Hb(function() {
            var b = Va(8)
              , c = b + 4
              , d = Va(a.id.length + 1);
            K(a.id, d, a.id.length + 1);
            if (d = aa(d))
                l[b >> 2] = d.width,
                l[c >> 2] = d.height;
            return [l[b >> 2], l[c >> 2]]
        })
    }
    function Vb(a, b, c) {
        a = aa(a);
        if (!a)
            return -4;
        a.width = b;
        a.height = c;
        return 0
    }
    function Wb(a, b, c) {
        a.Bm ? Hb(function() {
            var d = Va(a.id.length + 1);
            K(a.id, d, a.id.length + 1);
            Vb(d, b, c)
        }) : (a.width = b,
        a.height = c)
    }
    function Hc(a) {
        function b() {
            document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (document.removeEventListener("fullscreenchange", b),
            document.removeEventListener("webkitfullscreenchange", b),
            Wb(a, d, e),
            a.style.width = g,
            a.style.height = h,
            a.style.backgroundColor = n,
            q || (document.body.style.backgroundColor = "white"),
            document.body.style.backgroundColor = q,
            a.style.paddingLeft = u,
            a.style.paddingRight = w,
            a.style.paddingTop = z,
            a.style.paddingBottom = E,
            a.style.marginLeft = t,
            a.style.marginRight = F,
            a.style.marginTop = M,
            a.style.marginBottom = Q,
            document.body.style.margin = Y,
            document.documentElement.style.overflow = la,
            document.body.scroll = C,
            a.style.oh = R,
            a.Uh && a.Uh.kh.viewport(0, 0, d, e),
            Wa.ti && T(Wa.ti)(37, 0, Wa.Pj))
        }
        var c = Ub(a)
          , d = c[0]
          , e = c[1]
          , g = a.style.width
          , h = a.style.height
          , n = a.style.backgroundColor
          , q = document.body.style.backgroundColor
          , u = a.style.paddingLeft
          , w = a.style.paddingRight
          , z = a.style.paddingTop
          , E = a.style.paddingBottom
          , t = a.style.marginLeft
          , F = a.style.marginRight
          , M = a.style.marginTop
          , Q = a.style.marginBottom
          , Y = document.body.style.margin
          , la = document.documentElement.style.overflow
          , C = document.body.scroll
          , R = a.style.oh;
        document.addEventListener("fullscreenchange", b);
        document.addEventListener("webkitfullscreenchange", b);
        return b
    }
    function nb(a, b, c) {
        a.style.paddingLeft = a.style.paddingRight = c + "px";
        a.style.paddingTop = a.style.paddingBottom = b + "px"
    }
    function Xa(a) {
        return 0 > Ua.indexOf(a) ? a.getBoundingClientRect() : {
            left: 0,
            top: 0
        }
    }
    function ob(a, b) {
        if (0 != b.Dj || 0 != b.Xi) {
            Hc(a);
            var c = b.lm ? innerWidth : screen.width
              , d = b.lm ? innerHeight : screen.height
              , e = Xa(a)
              , g = e.width;
            e = e.height;
            var h = Ub(a)
              , n = h[0];
            h = h[1];
            3 == b.Dj ? (nb(a, (d - e) / 2, (c - g) / 2),
            c = g,
            d = e) : 2 == b.Dj && (c * h < n * d ? (g = h * c / n,
            nb(a, (d - g) / 2, 0),
            d = g) : (g = n * d / h,
            nb(a, 0, (c - g) / 2),
            c = g));
            a.style.backgroundColor || (a.style.backgroundColor = "black");
            document.body.style.backgroundColor || (document.body.style.backgroundColor = "black");
            a.style.width = c + "px";
            a.style.height = d + "px";
            1 == b.sl && (a.style.oh = "optimizeSpeed",
            a.style.oh = "-moz-crisp-edges",
            a.style.oh = "-o-crisp-edges",
            a.style.oh = "-webkit-optimize-contrast",
            a.style.oh = "optimize-contrast",
            a.style.oh = "crisp-edges",
            a.style.oh = "pixelated");
            g = 2 == b.Xi ? devicePixelRatio : 1;
            0 != b.Xi && (c = c * g | 0,
            d = d * g | 0,
            Wb(a, c, d),
            a.Uh && a.Uh.kh.viewport(0, 0, c, d))
        }
        if (a.requestFullscreen)
            a.requestFullscreen();
        else if (a.webkitRequestFullscreen)
            a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        else
            return v.fullscreenEnabled() ? -3 : -1;
        Wa = b;
        b.ti && T(b.ti)(37, 0, b.Pj);
        return 0
    }
    function pb(a) {
        if (a.requestPointerLock)
            a.requestPointerLock();
        else if (a.Ki)
            a.Ki();
        else
            return document.body.requestPointerLock || document.body.Ki ? -3 : -1;
        return 0
    }
    function Xb(a, b) {
        ea[a >> 3] = b.timestamp;
        for (var c = 0; c < b.axes.length; ++c)
            ea[a + 8 * c + 16 >> 3] = b.axes[c];
        for (c = 0; c < b.buttons.length; ++c)
            ea[a + 8 * c + 528 >> 3] = "object" == typeof b.buttons[c] ? b.buttons[c].value : b.buttons[c];
        for (c = 0; c < b.buttons.length; ++c)
            l[a + 4 * c + 1040 >> 2] = "object" == typeof b.buttons[c] ? b.buttons[c].pressed : 1 == b.buttons[c];
        l[a + 1296 >> 2] = b.connected;
        l[a + 1300 >> 2] = b.index;
        l[a + 8 >> 2] = b.axes.length;
        l[a + 12 >> 2] = b.buttons.length;
        K(b.id, a + 1304, 64);
        K(b.mapping, a + 1368, 64)
    }
    function ma(a, b, c, d) {
        for (var e = 0; e < a; e++) {
            var g = k[c]()
              , h = g && p.Fh(d);
            g ? (g.name = h,
            d[h] = g) : p.qg(1282);
            l[b + 4 * e >> 2] = h
        }
    }
    function Yb(a, b, c, d, e, g, h, n) {
        b = p.wg[b];
        if (a = k[a](b, c))
            d = n && K(a.name, n, d),
            e && (l[e >> 2] = d),
            g && (l[g >> 2] = a.size),
            h && (l[h >> 2] = a.type)
    }
    function Da(a, b) {
        B[a >> 2] = b;
        B[a + 4 >> 2] = (b - B[a >> 2]) / 4294967296
    }
    function Ya(a, b, c) {
        if (b) {
            var d = D;
            switch (a) {
            case 36346:
                d = 1;
                break;
            case 36344:
                0 != c && 1 != c && p.qg(1280);
                return;
            case 34814:
            case 36345:
                d = 0;
                break;
            case 34466:
                var e = k.getParameter(34467);
                d = e ? e.length : 0;
                break;
            case 33309:
                if (2 > p.Eg.version) {
                    p.qg(1282);
                    return
                }
                d = 2 * (k.getSupportedExtensions() || []).length;
                break;
            case 33307:
            case 33308:
                if (2 > p.Eg.version) {
                    p.qg(1280);
                    return
                }
                d = 33307 == a ? 3 : 0
            }
            if (d === D)
                switch (e = k.getParameter(a),
                typeof e) {
                case "number":
                    d = e;
                    break;
                case "boolean":
                    d = e ? 1 : 0;
                    break;
                case "string":
                    p.qg(1280);
                    return;
                case "object":
                    if (null === e)
                        switch (a) {
                        case 34964:
                        case 35725:
                        case 34965:
                        case 36006:
                        case 36007:
                        case 32873:
                        case 34229:
                        case 36662:
                        case 36663:
                        case 35053:
                        case 35055:
                        case 36010:
                        case 35097:
                        case 35869:
                        case 32874:
                        case 36389:
                        case 35983:
                        case 35368:
                        case 34068:
                            d = 0;
                            break;
                        default:
                            p.qg(1280);
                            return
                        }
                    else {
                        if (e instanceof Float32Array || e instanceof Uint32Array || e instanceof Int32Array || e instanceof Array) {
                            for (a = 0; a < e.length; ++a)
                                switch (c) {
                                case 0:
                                    l[b + 4 * a >> 2] = e[a];
                                    break;
                                case 2:
                                    I[b + 4 * a >> 2] = e[a];
                                    break;
                                case 4:
                                    Z[b + a >> 0] = e[a] ? 1 : 0
                                }
                            return
                        }
                        try {
                            d = e.name | 0
                        } catch (g) {
                            p.qg(1280);
                            ba("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")");
                            return
                        }
                    }
                    break;
                default:
                    p.qg(1280);
                    ba("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + e + " of type " + typeof e + "!");
                    return
                }
            switch (c) {
            case 1:
                Da(b, d);
                break;
            case 0:
                l[b >> 2] = d;
                break;
            case 2:
                I[b >> 2] = d;
                break;
            case 4:
                Z[b >> 0] = d ? 1 : 0
            }
        } else
            p.qg(1281)
    }
    function Zb(a, b, c, d) {
        if (c) {
            b = k.getIndexedParameter(a, b);
            switch (typeof b) {
            case "boolean":
                a = b ? 1 : 0;
                break;
            case "number":
                a = b;
                break;
            case "object":
                if (null === b)
                    switch (a) {
                    case 35983:
                    case 35368:
                        a = 0;
                        break;
                    default:
                        p.qg(1280);
                        return
                    }
                else if (b instanceof WebGLBuffer)
                    a = b.name | 0;
                else {
                    p.qg(1280);
                    return
                }
                break;
            default:
                p.qg(1280);
                return
            }
            switch (d) {
            case 1:
                Da(c, a);
                break;
            case 0:
                l[c >> 2] = a;
                break;
            case 2:
                I[c >> 2] = a;
                break;
            case 4:
                Z[c >> 0] = a ? 1 : 0;
                break;
            default:
                throw "internal emscriptenWebGLGetIndexed() error, bad type: " + d;
            }
        } else
            p.qg(1281)
    }
    function Ea(a) {
        var b = Oa(a) + 1
          , c = X(b);
        K(a, c, b);
        return c
    }
    function $b(a) {
        return "]" == a.slice(-1) && a.lastIndexOf("[")
    }
    function ac(a) {
        var b = a.oi, c = a.Mk, d;
        if (!b)
            for (a.oi = b = {},
            a.Lk = {},
            d = 0; d < k.getProgramParameter(a, 35718); ++d) {
                var e = k.getActiveUniform(a, d);
                var g = e.name;
                e = e.size;
                var h = $b(g);
                h = 0 < h ? g.slice(0, h) : g;
                var n = a.Ij;
                a.Ij += e;
                c[h] = [e, n];
                for (g = 0; g < e; ++g)
                    b[n] = g,
                    a.Lk[n++] = h
            }
    }
    function J(a) {
        var b = k.el;
        if (b) {
            var c = b.oi[a];
            "number" == typeof c && (b.oi[a] = c = k.getUniformLocation(b, b.Lk[a] + (0 < c ? "[" + c + "]" : "")));
            return c
        }
        p.qg(1282)
    }
    function qb(a, b, c, d) {
        if (c)
            if (a = p.wg[a],
            ac(a),
            a = k.getUniform(a, J(b)),
            "number" == typeof a || "boolean" == typeof a)
                switch (d) {
                case 0:
                    l[c >> 2] = a;
                    break;
                case 2:
                    I[c >> 2] = a
                }
            else
                for (b = 0; b < a.length; b++)
                    switch (d) {
                    case 0:
                        l[c + 4 * b >> 2] = a[b];
                        break;
                    case 2:
                        I[c + 4 * b >> 2] = a[b]
                    }
        else
            p.qg(1281)
    }
    function Za(a, b, c, d) {
        if (c)
            if (a = k.getVertexAttrib(a, b),
            34975 == b)
                l[c >> 2] = a && a.name;
            else if ("number" == typeof a || "boolean" == typeof a)
                switch (d) {
                case 0:
                    l[c >> 2] = a;
                    break;
                case 2:
                    I[c >> 2] = a;
                    break;
                case 5:
                    l[c >> 2] = Math.fround(a)
                }
            else
                for (b = 0; b < a.length; b++)
                    switch (d) {
                    case 0:
                        l[c + 4 * b >> 2] = a[b];
                        break;
                    case 2:
                        I[c + 4 * b >> 2] = a[b];
                        break;
                    case 5:
                        l[c + 4 * b >> 2] = Math.fround(a[b])
                    }
        else
            p.qg(1281)
    }
    function Fa(a) {
        a -= 5120;
        return 0 == a ? Z : 1 == a ? S : 2 == a ? ua : 4 == a ? l : 6 == a ? I : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? B : P
    }
    function Ga(a) {
        return 31 - Math.clz32(a.BYTES_PER_ELEMENT)
    }
    function Ic(a, b) {
        if (!v.fullscreenEnabled())
            return -1;
        a = aa(a);
        return a ? a.requestFullscreen || a.webkitRequestFullscreen ? v.Wi() ? ob(a, b) : b.kl ? (v.Xj(ob, 1, [a, b]),
        1) : -2 : -3 : -4
    }
    function Jc(a, b, c, d, e, g) {
        a = {
            target: aa(a),
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = T(d)(e, 0, b);
                n && (n = A(n));
                if (n)
                    return h.preventDefault(),
                    h.returnValue = n
            },
            Ng: c
        };
        v.Tg(a)
    }
    function bc(a, b, c, d, e, g) {
        v.ck || (v.ck = X(256));
        a = {
            target: aa(a),
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = h.target.id ? h.target.id : ""
                  , q = v.ck;
                K(v.ij(h.target), q + 0, 128);
                K(n, q + 128, 128);
                T(d)(e, q, b) && h.preventDefault()
            },
            Ng: c
        };
        v.Tg(a)
    }
    function cc(a, b, c, d, e, g) {
        v.dk || (v.dk = X(280));
        v.Tg({
            target: a,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = v.dk
                  , q = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
                  , u = !!q;
                l[n >> 2] = u;
                l[n + 4 >> 2] = v.fullscreenEnabled();
                var w = u ? q : v.Yl
                  , z = w && w.id ? w.id : "";
                K(v.ij(w), n + 8, 128);
                K(z, n + 136, 128);
                l[n + 264 >> 2] = w ? w.clientWidth : 0;
                l[n + 268 >> 2] = w ? w.clientHeight : 0;
                l[n + 272 >> 2] = screen.width;
                l[n + 276 >> 2] = screen.height;
                u && (v.Yl = q);
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function dc(a, b, c, d, e, g) {
        v.fk || (v.fk = X(1432));
        a = {
            target: aa(a),
            Wh: !0,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = v.fk;
                Xb(n, h.gamepad);
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        };
        v.Tg(a)
    }
    function rb(a, b, c, d, e, g) {
        v.pk || (v.pk = X(176));
        a = {
            target: aa(a),
            Wh: !0,
            Fg: g,
            Og: d,
            Rg: function(h) {
                var n = v.pk;
                ea[n >> 3] = h.timeStamp;
                var q = n >> 2;
                l[q + 2] = h.location;
                l[q + 3] = h.ctrlKey;
                l[q + 4] = h.shiftKey;
                l[q + 5] = h.altKey;
                l[q + 6] = h.metaKey;
                l[q + 7] = h.repeat;
                l[q + 8] = h.charCode;
                l[q + 9] = h.keyCode;
                l[q + 10] = h.which;
                K(h.key || "", n + 44, 32);
                K(h.code || "", n + 76, 32);
                K(h.char || "", n + 108, 32);
                K(h.locale || "", n + 140, 32);
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        };
        v.Tg(a)
    }
    function ec(a, b, c) {
        ea[a >> 3] = b.timeStamp;
        a >>= 2;
        l[a + 2] = b.screenX;
        l[a + 3] = b.screenY;
        l[a + 4] = b.clientX;
        l[a + 5] = b.clientY;
        l[a + 6] = b.ctrlKey;
        l[a + 7] = b.shiftKey;
        l[a + 8] = b.altKey;
        l[a + 9] = b.metaKey;
        ua[2 * a + 20] = b.button;
        ua[2 * a + 21] = b.buttons;
        l[a + 11] = b.movementX;
        l[a + 12] = b.movementY;
        c = Xa(c);
        l[a + 13] = b.clientX - c.left;
        l[a + 14] = b.clientY - c.top
    }
    function Ha(a, b, c, d, e, g) {
        v.uj || (v.uj = X(72));
        a = aa(a);
        v.Tg({
            target: a,
            Wh: "mousemove" != g && "mouseenter" != g && "mouseleave" != g,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                ec(v.uj, h, a);
                T(d)(e, v.uj, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function $a(a, b, c, d, e, g) {
        v.yk || (v.yk = X(260));
        v.Tg({
            target: a,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = v.yk
                  , q = document.pointerLockElement || document.cn || document.An || document.en;
                l[n >> 2] = !!q;
                var u = q && q.id ? q.id : "";
                K(v.ij(q), n + 4, 128);
                K(u, n + 132, 128);
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function Kc(a, b, c, d, e, g) {
        v.Kk || (v.Kk = X(36));
        a = aa(a);
        v.Tg({
            target: a,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                if (h.target == a) {
                    var n = document.body;
                    if (n) {
                        var q = v.Kk;
                        l[q >> 2] = h.detail;
                        l[q + 4 >> 2] = n.clientWidth;
                        l[q + 8 >> 2] = n.clientHeight;
                        l[q + 12 >> 2] = innerWidth;
                        l[q + 16 >> 2] = innerHeight;
                        l[q + 20 >> 2] = outerWidth;
                        l[q + 24 >> 2] = outerHeight;
                        l[q + 28 >> 2] = pageXOffset;
                        l[q + 32 >> 2] = pageYOffset;
                        T(d)(e, q, b) && h.preventDefault()
                    }
                }
            },
            Ng: c
        })
    }
    function ab(a, b, c, d, e, g) {
        v.Ik || (v.Ik = X(1696));
        a = aa(a);
        v.Tg({
            target: a,
            Wh: "touchstart" == g || "touchend" == g,
            Fg: g,
            Og: d,
            Rg: function(h) {
                for (var n, q = {}, u = h.touches, w = 0; w < u.length; ++w)
                    n = u[w],
                    n.mk = n.vk = 0,
                    q[n.identifier] = n;
                for (w = 0; w < h.changedTouches.length; ++w)
                    n = h.changedTouches[w],
                    n.mk = 1,
                    q[n.identifier] = n;
                for (w = 0; w < h.targetTouches.length; ++w)
                    q[h.targetTouches[w].identifier].vk = 1;
                u = v.Ik;
                ea[u >> 3] = h.timeStamp;
                var z = u >> 2;
                l[z + 3] = h.ctrlKey;
                l[z + 4] = h.shiftKey;
                l[z + 5] = h.altKey;
                l[z + 6] = h.metaKey;
                z += 7;
                var E = Xa(a)
                  , t = 0;
                for (w in q)
                    if (n = q[w],
                    l[z + 0] = n.identifier,
                    l[z + 1] = n.screenX,
                    l[z + 2] = n.screenY,
                    l[z + 3] = n.clientX,
                    l[z + 4] = n.clientY,
                    l[z + 5] = n.pageX,
                    l[z + 6] = n.pageY,
                    l[z + 7] = n.mk,
                    l[z + 8] = n.vk,
                    l[z + 9] = n.clientX - E.left,
                    l[z + 10] = n.clientY - E.top,
                    z += 13,
                    31 < ++t)
                        break;
                l[u + 8 >> 2] = t;
                T(d)(e, u, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function Lc(a, b, c, d, e, g) {
        v.Nk || (v.Nk = X(8));
        v.Tg({
            target: a,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = v.Nk
                  , q = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
                l[n >> 2] = document.hidden;
                l[n + 4 >> 2] = q;
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function Mc(a, b, c, d, e, g) {
        v.Ok || (v.Ok = X(104));
        v.Tg({
            target: a,
            Wh: !0,
            Fg: g,
            Og: d,
            Rg: function(h) {
                h = h || event;
                var n = v.Ok;
                ec(n, h, a);
                ea[n + 72 >> 3] = h.deltaX;
                ea[n + 80 >> 3] = h.deltaY;
                ea[n + 88 >> 3] = h.deltaZ;
                l[n + 96 >> 2] = h.deltaMode;
                T(d)(e, n, b) && h.preventDefault()
            },
            Ng: c
        })
    }
    function sb(a, b, c, d, e) {
        function g(R) {
            var ca = 0
              , ia = 0;
            R && (ia = C.response ? C.response.byteLength : 0,
            ca = X(ia),
            S.set(new Uint8Array(C.response), ca));
            B[a + 12 >> 2] = ca;
            O.Kg(a + 16, ia)
        }
        var h = B[a + 8 >> 2];
        if (h) {
            var n = A(h)
              , q = a + 112
              , u = A(q);
            u || (u = "GET");
            var w = B[q + 52 >> 2]
              , z = B[q + 56 >> 2]
              , E = !!B[q + 60 >> 2]
              , t = B[q + 68 >> 2]
              , F = B[q + 72 >> 2];
            h = B[q + 76 >> 2];
            var M = B[q + 80 >> 2]
              , Q = B[q + 84 >> 2];
            q = B[q + 88 >> 2];
            var Y = !!(w & 1)
              , la = !!(w & 2);
            w = !!(w & 64);
            t = t ? A(t) : D;
            F = F ? A(F) : D;
            var C = new XMLHttpRequest;
            C.withCredentials = E;
            C.open(u, n, !w, t, F);
            w || (C.timeout = z);
            C.yn = n;
            C.responseType = "arraybuffer";
            M && (n = A(M),
            C.overrideMimeType(n));
            if (h)
                for (; ; ) {
                    u = B[h >> 2];
                    if (!u)
                        break;
                    n = B[h + 4 >> 2];
                    if (!n)
                        break;
                    h += 8;
                    u = A(u);
                    n = A(n);
                    C.setRequestHeader(u, n)
                }
            O.Kj.push(C);
            B[a + 0 >> 2] = O.Kj.length;
            h = Q && q ? S.slice(Q, Q + q) : null;
            C.onload = R=>{
                g(Y && !la);
                var ca = C.response ? C.response.byteLength : 0;
                O.Kg(a + 24, 0);
                ca && O.Kg(a + 32, ca);
                P[a + 40 >> 1] = C.readyState;
                P[a + 42 >> 1] = C.status;
                C.statusText && K(C.statusText, a + 44, 64);
                200 <= C.status && 300 > C.status ? b && b(a, C, R) : c && c(a, C, R)
            }
            ;
            C.onerror = R=>{
                g(Y);
                var ca = C.status;
                O.Kg(a + 24, 0);
                O.Kg(a + 32, C.response ? C.response.byteLength : 0);
                P[a + 40 >> 1] = C.readyState;
                P[a + 42 >> 1] = ca;
                c && c(a, C, R)
            }
            ;
            C.ontimeout = R=>{
                c && c(a, C, R)
            }
            ;
            C.onprogress = R=>{
                var ca = Y && la && C.response ? C.response.byteLength : 0
                  , ia = 0;
                Y && la && (ia = X(ca),
                S.set(new Uint8Array(C.response), ia));
                B[a + 12 >> 2] = ia;
                O.Kg(a + 16, ca);
                O.Kg(a + 24, R.loaded - ca);
                O.Kg(a + 32, R.total);
                P[a + 40 >> 1] = C.readyState;
                3 <= C.readyState && 0 === C.status && 0 < R.loaded && (C.status = 200);
                P[a + 42 >> 1] = C.status;
                C.statusText && K(C.statusText, a + 44, 64);
                d && d(a, C, R);
                ia && Ia(ia)
            }
            ;
            C.onreadystatechange = R=>{
                P[a + 40 >> 1] = C.readyState;
                2 <= C.readyState && (P[a + 42 >> 1] = C.status);
                e && e(a, C, R)
            }
            ;
            try {
                C.send(h)
            } catch (R) {
                c && c(a, C, R)
            }
        } else
            c(a, 0, "no url specified!")
    }
    function fc(a, b, c, d, e) {
        if (a) {
            var g = B[b + 112 + 64 >> 2];
            g || (g = B[b + 8 >> 2]);
            var h = A(g);
            try {
                var n = a.transaction(["FILES"], "readwrite").objectStore("FILES").put(c, h);
                n.onsuccess = ()=>{
                    P[b + 40 >> 1] = 4;
                    P[b + 42 >> 1] = 200;
                    K("OK", b + 44, 64);
                    d(b, 0, h)
                }
                ;
                n.onerror = q=>{
                    P[b + 40 >> 1] = 4;
                    P[b + 42 >> 1] = 413;
                    K("Payload Too Large", b + 44, 64);
                    e(b, 0, q)
                }
            } catch (q) {
                e(b, 0, q)
            }
        } else
            e(b, 0, "IndexedDB not available!")
    }
    function Nc(a, b, c, d) {
        if (a) {
            var e = B[b + 112 + 64 >> 2];
            e || (e = B[b + 8 >> 2]);
            e = A(e);
            try {
                var g = a.transaction(["FILES"], "readonly").objectStore("FILES").get(e);
                g.onsuccess = h=>{
                    if (h.target.result) {
                        h = h.target.result;
                        var n = h.byteLength || h.length
                          , q = X(n);
                        S.set(new Uint8Array(h), q);
                        B[b + 12 >> 2] = q;
                        O.Kg(b + 16, n);
                        O.Kg(b + 24, 0);
                        O.Kg(b + 32, n);
                        P[b + 40 >> 1] = 4;
                        P[b + 42 >> 1] = 200;
                        K("OK", b + 44, 64);
                        c(b, 0, h)
                    } else
                        P[b + 40 >> 1] = 4,
                        P[b + 42 >> 1] = 404,
                        K("Not Found", b + 44, 64),
                        d(b, 0, "no data")
                }
                ;
                g.onerror = h=>{
                    P[b + 40 >> 1] = 4;
                    P[b + 42 >> 1] = 404;
                    K("Not Found", b + 44, 64);
                    d(b, 0, h)
                }
            } catch (h) {
                d(b, 0, h)
            }
        } else
            d(b, 0, "IndexedDB not available!")
    }
    function Oc(a, b, c, d) {
        if (a) {
            var e = B[b + 112 + 64 >> 2];
            e || (e = B[b + 8 >> 2]);
            e = A(e);
            try {
                var g = a.transaction(["FILES"], "readwrite").objectStore("FILES").delete(e);
                g.onsuccess = h=>{
                    h = h.target.result;
                    B[b + 12 >> 2] = 0;
                    O.Kg(b + 16, 0);
                    O.Kg(b + 24, 0);
                    O.Kg(b + 32, 0);
                    P[b + 40 >> 1] = 4;
                    P[b + 42 >> 1] = 200;
                    K("OK", b + 44, 64);
                    c(b, 0, h)
                }
                ;
                g.onerror = h=>{
                    P[b + 40 >> 1] = 4;
                    P[b + 42 >> 1] = 404;
                    K("Not Found", b + 44, 64);
                    d(b, 0, h)
                }
            } catch (h) {
                d(b, 0, h)
            }
        } else
            d(b, 0, "IndexedDB not available!")
    }
    function Ja() {
        if (!Ja.Gk) {
            var a = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: gc || "./this.program"
            }, b;
            for (b in tb)
                tb[b] === D ? delete a[b] : a[b] = tb[b];
            var c = [];
            for (b in a)
                c.push(b + "=" + a[b]);
            Ja.Gk = c
        }
        return Ja.Gk
    }
    function bb(a, b) {
        bb.Bk || (bb.Bk = Nb());
        for (var c = 0; c < b; c++)
            Z[a + c >> 0] = bb.Bk();
        return 0
    }
    function cb(a) {
        return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
    }
    function Pc(a, b, c, d) {
        function e(t, F, M) {
            for (t = "number" == typeof t ? t.toString() : t || ""; t.length < F; )
                t = M[0] + t;
            return t
        }
        function g(t, F) {
            return e(t, F, "0")
        }
        function h(t, F) {
            function M(Y) {
                return 0 > Y ? -1 : 0 < Y ? 1 : 0
            }
            var Q;
            0 === (Q = M(t.getFullYear() - F.getFullYear())) && 0 === (Q = M(t.getMonth() - F.getMonth())) && (Q = M(t.getDate() - F.getDate()));
            return Q
        }
        function n(t) {
            switch (t.getDay()) {
            case 0:
                return new Date(t.getFullYear() - 1,11,29);
            case 1:
                return t;
            case 2:
                return new Date(t.getFullYear(),0,3);
            case 3:
                return new Date(t.getFullYear(),0,2);
            case 4:
                return new Date(t.getFullYear(),0,1);
            case 5:
                return new Date(t.getFullYear() - 1,11,31);
            case 6:
                return new Date(t.getFullYear() - 1,11,30)
            }
        }
        function q(t) {
            var F = t.Bh;
            for (t = new Date((new Date(t.Ch + 1900,0,1)).getTime()); 0 < F; ) {
                var M = cb(t.getFullYear())
                  , Q = t.getMonth();
                M = (M ? hc : ic)[Q];
                if (F > M - t.getDate())
                    F -= M - t.getDate() + 1,
                    t.setDate(1),
                    11 > Q ? t.setMonth(Q + 1) : (t.setMonth(0),
                    t.setFullYear(t.getFullYear() + 1));
                else {
                    t.setDate(t.getDate() + F);
                    break
                }
            }
            Q = new Date(t.getFullYear() + 1,0,4);
            F = n(new Date(t.getFullYear(),0,4));
            Q = n(Q);
            return 0 >= h(F, t) ? 0 >= h(Q, t) ? t.getFullYear() + 1 : t.getFullYear() : t.getFullYear() - 1
        }
        var u = l[d + 40 >> 2];
        d = {
            qm: l[d >> 2],
            pm: l[d + 4 >> 2],
            Ri: l[d + 8 >> 2],
            Hj: l[d + 12 >> 2],
            Si: l[d + 16 >> 2],
            Ch: l[d + 20 >> 2],
            eh: l[d + 24 >> 2],
            Bh: l[d + 28 >> 2],
            vn: l[d + 32 >> 2],
            om: l[d + 36 >> 2],
            rm: u ? A(u) : ""
        };
        c = A(c);
        u = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
        };
        for (var w in u)
            c = c.replace(new RegExp(w,"g"), u[w]);
        var z = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
          , E = "January February March April May June July August September October November December".split(" ");
        u = {
            "%a": function(t) {
                return z[t.eh].substring(0, 3)
            },
            "%A": function(t) {
                return z[t.eh]
            },
            "%b": function(t) {
                return E[t.Si].substring(0, 3)
            },
            "%B": function(t) {
                return E[t.Si]
            },
            "%C": function(t) {
                return g((t.Ch + 1900) / 100 | 0, 2)
            },
            "%d": function(t) {
                return g(t.Hj, 2)
            },
            "%e": function(t) {
                return e(t.Hj, 2, " ")
            },
            "%g": function(t) {
                return q(t).toString().substring(2)
            },
            "%G": function(t) {
                return q(t)
            },
            "%H": function(t) {
                return g(t.Ri, 2)
            },
            "%I": function(t) {
                t = t.Ri;
                0 == t ? t = 12 : 12 < t && (t -= 12);
                return g(t, 2)
            },
            "%j": function(t) {
                for (var F = t.Hj, M = cb(t.Ch + 1900) ? hc : ic, Q = 0, Y = 0; Y <= t.Si - 1; Q += M[Y++])
                    ;
                return g(F + Q, 3)
            },
            "%m": function(t) {
                return g(t.Si + 1, 2)
            },
            "%M": function(t) {
                return g(t.pm, 2)
            },
            "%n": function() {
                return "\n"
            },
            "%p": function(t) {
                return 0 <= t.Ri && 12 > t.Ri ? "AM" : "PM"
            },
            "%S": function(t) {
                return g(t.qm, 2)
            },
            "%t": function() {
                return "\t"
            },
            "%u": function(t) {
                return t.eh || 7
            },
            "%U": function(t) {
                return g(Math.floor((t.Bh + 7 - t.eh) / 7), 2)
            },
            "%V": function(t) {
                var F = Math.floor((t.Bh + 7 - (t.eh + 6) % 7) / 7);
                2 >= (t.eh + 371 - t.Bh - 2) % 7 && F++;
                if (F)
                    53 == F && (M = (t.eh + 371 - t.Bh) % 7,
                    4 == M || 3 == M && cb(t.Ch) || (F = 1));
                else {
                    F = 52;
                    var M = (t.eh + 7 - t.Bh - 1) % 7;
                    (4 == M || 5 == M && cb(t.Ch % 400 - 1)) && F++
                }
                return g(F, 2)
            },
            "%w": function(t) {
                return t.eh
            },
            "%W": function(t) {
                return g(Math.floor((t.Bh + 7 - (t.eh + 6) % 7) / 7), 2)
            },
            "%y": function(t) {
                return (t.Ch + 1900).toString().substring(2)
            },
            "%Y": function(t) {
                return t.Ch + 1900
            },
            "%z": function(t) {
                t = t.om;
                var F = 0 <= t;
                t = Math.abs(t) / 60;
                return (F ? "+" : "-") + String("0000" + (t / 60 * 100 + t % 60)).slice(-4)
            },
            "%Z": function(t) {
                return t.rm
            },
            "%%": function() {
                return "%"
            }
        };
        c = c.replace(/%%/g, "\x00\x00");
        for (w in u)
            c.includes(w) && (c = c.replace(new RegExp(w,"g"), u[w](d)));
        c = c.replace(/\0\0/g, "%");
        w = kb(c, !1);
        if (w.length > b)
            return 0;
        Z.set(w, a);
        return w.length - 1
    }
    function jc() {
        function a() {
            if (!db && (db = !0,
            m.calledRun = !0,
            !ta)) {
                m.noFSInit || f.hh.mj || f.hh();
                f.lk = !1;
                oa.hh();
                Ra(kc);
                Ra(Qc);
                if (m.onRuntimeInitialized)
                    m.onRuntimeInitialized();
                if (lc) {
                    var b = m._main;
                    try {
                        var c = b(0, 0);
                        Qa = c;
                        Ob(c)
                    } catch (d) {
                        Lb(d)
                    }
                }
                if (m.postRun)
                    for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length; )
                        mc.unshift(m.postRun.shift());
                Ra(mc)
            }
        }
        if (!(0 < qa)) {
            if (m.preRun)
                for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length; )
                    nc.unshift(m.preRun.shift());
            Ra(nc);
            0 < qa || (m.setStatus ? (m.setStatus("Running..."),
            setTimeout(function() {
                setTimeout(function() {
                    m.setStatus("")
                }, 1);
                a()
            }, 1)) : a())
        }
    }
    var va = []
      , ka = []
      , y = []
      , Ka = []
      , ha = []
      , ub = []
      , Rc = []
      , vb = !1
      , wb = new TextDecoder("utf8")
      , Sc = function() {
        function a() {
            if (!b) {
                b = !0;
                var e = document.body
                  , g = document.body.firstChild
                  , h = document.getElementById("fontdetectHelper") || document.createElement("div");
                h.id = "fontdetectHelper";
                d = document.createElement("span");
                d.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                h.appendChild(d);
                e.insertBefore(h, g);
                h.style.position = "absolute";
                h.style.visibility = "hidden";
                h.style.top = "-200px";
                h.style.left = "-100000px";
                h.style.width = "100000px";
                h.style.height = "200px";
                h.style.fontSize = "100px"
            }
        }
        var b = !1
          , c = ["serif", "sans-serif", "monospace", "cursive", "fantasy"]
          , d = null;
        return {
            kn: function(e, g, h, n) {
                if (e) {
                    var q = n && n.Ql ? n.Ql : 100
                      , u = n && n.Rl ? n.Rl : 2E3;
                    if (g || h) {
                        if (b || a(),
                        this.Ai(e))
                            return void (g && g(e));
                        var w = this
                          , z = (new Date).getTime()
                          , E = setInterval(function() {
                            if (w.Ai(e))
                                return clearInterval(E),
                                void g(e);
                            (new Date).getTime() - z > u && (clearInterval(E),
                            h && h(e))
                        }, q)
                    }
                }
            },
            Ai: function(e) {
                var g = 0
                  , h = 0;
                b || a();
                for (var n = 0; n < c.length; ++n) {
                    if (d.style.fontFamily = '"' + e + '",' + c[n],
                    g = d.offsetWidth,
                    0 < n && g != h)
                        return !1;
                    h = g
                }
                return !0
            },
            Cn: function(e) {
                e = (e instanceof Element ? window.getComputedStyle(e).getPropertyValue("font-family") : window.Um ? (void 0)(e).Gm("font-family") : "").split(",");
                for (var g = e.shift(); g; ) {
                    g = g.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1");
                    for (var h = 0; h < c.length; h++)
                        if (g == c[h])
                            return g;
                    if (this.Ai(g))
                        return g;
                    g = e.shift()
                }
                return null
            }
        }
    }();
    "undefined" != typeof window && (document.addEventListener("paste", function(a) {
        try {
            var b = N(a.clipboardData.getData("text/plain"))
        } catch (c) {
            return
        }
        oc(b);
        Ia(b)
    }, {
        capture: !0
    }),
    window.onbeforeunload = function() {
        if (pc())
            return "Are you sure you want to leave?"
    }
    ,
    window.addEventListener("mousedown", function(a) {
        a.preventDefault = function() {}
    }, {
        capture: !0
    }),
    window.addEventListener("dragstart", function(a) {
        a.preventDefault()
    }, {
        capture: !0
    }),
    window.addEventListener("selectstart", function(a) {
        a.preventDefault()
    }, {
        capture: !0
    }),
    window.addEventListener("keydown", function(a) {
        var b = !0
          , c = a.keyCode;
        if (122 == c || 123 == c)
            b = !1;
        (a.ctrlKey || a.metaKey) && 86 == c && (b = !1);
        b || (a.preventDefault = function() {}
        )
    }, {
        capture: !0
    }),
    window.addEventListener("wheel", function(a) {
        var b = !1;
        a.wheelDeltaY ? a.wheelDeltaY === -3 * a.deltaY && (b = !0) : 0 === a.deltaMode && (b = !0);
        var c = a.deltaY / 175;
        b && (c *= 3);
        0 != a.deltaMode && (1 == a.deltaMode ? c /= 18 : 2 == a.deltaMode && (c /= 1E3));
        qc(c)
    }),
    window.cp6 = window.cp6 || {},
    window.cp6.disconnect = function() {
        rc()
    }
    ,
    window.cp6.forceServerID = function(a) {
        (a = N(a)) && sc(a);
        Ia(a)
    }
    ,
    window.cp6.setSkipTextCache = function(a) {
        tc(!!a)
    }
    );
    m = m || {};
    m.arguments = [];
    var xb = {}
      , eb = {};
    "undefined" != typeof window && window.addEventListener("beforeunload", function() {
        for (var a in eb) {
            var b = a;
            if (xb[b]) {
                try {
                    xb[b].close()
                } catch (c) {
                    console.error(c)
                }
                delete xb[b]
            }
            if (eb[b]) {
                try {
                    eb[b].close()
                } catch (c) {
                    console.error(c)
                }
                delete eb[b]
            }
            uc(b, 0)
        }
    });
    var vc = Object.assign({}, m), gc = "./this.program", jb = (a,b)=>{
        throw b;
    }
    , pa = "", Fb;
    "undefined" != typeof document && document.currentScript && (pa = document.currentScript.src);
    pa = 0 !== pa.indexOf("blob:") ? pa.substr(0, pa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
    var wc = a=>{
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.send(null);
        return b.responseText
    }
    ;
    var Fc = (a,b,c)=>{
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onload = ()=>{
            200 == d.status || 0 == d.status && d.response ? b(d.response) : c()
        }
        ;
        d.onerror = c;
        d.send(null)
    }
    ;
    var Tc = a=>document.title = a;
    var Aa = m.print || console.log.bind(console)
      , ba = m.printErr || console.warn.bind(console);
    Object.assign(m, vc);
    vc = null;
    m.thisProgram && (gc = m.thisProgram);
    m.quit && (jb = m.quit);
    var ya;
    m.wasmBinary && (ya = m.wasmBinary);
    var Gc = m.noExitRuntime || !0;
    "object" != typeof WebAssembly && da("no native wasm support detected");
    var xc, ta = !1, Qa, Cb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : D, fb, Z, S, ua, P, l, B, I, ea, Kb, nc = [], kc = [], Qc = [], Uc = [], mc = [], qa = 0, hb = null, xa = null;
    var ja = "client.wasm";
    Db(ja) || (ja = Ac(ja));
    var G, U, Tb = {
        1989920: ()=>N((new URL(window.location)).searchParams.get("state")),
        1990002: ()=>N((new URL(window.location)).searchParams.get("code")),
        1990083: a=>{
            a = new URL(A(a));
            var b = new URL(window.location)
              , c = !1;
            a.searchParams.forEach(function(d, e) {
                -1 == b.searchParams.getAll(e).indexOf(d) && (c = !0)
            });
            return c ? !1 : !0
        }
        ,
        1990351: ()=>{
            try {
                var a = new URL(window.location);
                a.searchParams.delete("state");
                a.searchParams.delete("code");
                a.searchParams.delete("oauth2");
                window.history.replaceState({}, document.title, a)
            } catch (b) {
                console.error(b)
            }
        }
        ,
        1990584: ()=>N(navigator.userAgent),
        1990633: ()=>N(document.referrer),
        1990680: ()=>N(navigator.language),
        1990728: ()=>{
            if ("undefined" == typeof OffscreenCanvas)
                return !1;
            try {
                return null != (new OffscreenCanvas(4,4)).getContext("2d")
            } catch (a) {
                return !1
            }
        }
        ,
        1990882: (a,b,c)=>{
            a = new OffscreenCanvas(a,b);
            c = a.getContext("2d", {
                storage: c ? "discardable" : "persistent"
            });
            if (0 < Ka.length) {
                var d = Ka.pop();
                y[d] = c
            } else
                d = y.length,
                y.push(c);
            a.wk = function() {
                yb(d)
            }
            ;
            a.xk = function() {
                zb(d)
            }
            ;
            return d
        }
        ,
        1991316: (a,b,c)=>{
            var d = document.createElement("canvas");
            d.width = a;
            d.height = b;
            a = d.getContext("2d", {
                storage: c ? "discardable" : "persistent"
            });
            if (0 < Ka.length) {
                var e = Ka.pop();
                y[e] = a
            } else
                e = y.length,
                y.push(a);
            d.wk = function() {
                yb(e)
            }
            ;
            d.xk = function() {
                zb(e)
            }
            ;
            return e
        }
        ,
        1991794: a=>{
            a = y[a];
            a.direction && (a.direction = "ltr")
        }
        ,
        1991867: a=>{
            var b = y[a].canvas;
            Ka.push(a);
            delete b.wk;
            delete b.xk;
            b.width = 0;
            b.height = 0;
            y[a] = null
        }
        ,
        1992061: a=>{
            y[a].save()
        }
        ,
        1992090: a=>{
            y[a].restore()
        }
        ,
        1992122: a=>{
            y[a].setTransform(1, 0, 0, 1, 0, 0)
        }
        ,
        1992175: (a,b,c,d,e,g,h)=>{
            y[a].setTransform(b, c, d, e, g, h)
        }
        ,
        1992234: (a,b,c)=>{
            a = y[a].canvas;
            a.width = b;
            a.height = c
        }
        ,
        1992315: (a,b,c)=>{
            a = y[a].canvas;
            l[b >> 2] = a.width;
            l[c >> 2] = a.height
        }
        ,
        1992422: a=>{
            y[a].fill()
        }
        ,
        1992451: (a,b,c)=>{
            y[a].fill(ha[b], c ? "nonzero" : "evenodd")
        }
        ,
        1992521: a=>{
            y[a].stroke()
        }
        ,
        1992552: (a,b)=>{
            y[a].stroke(ha[b])
        }
        ,
        1992596: a=>{
            y[a].clip()
        }
        ,
        1992625: (a,b)=>{
            y[a].clip(ha[b])
        }
        ,
        1992667: a=>{
            y[a].beginPath()
        }
        ,
        1992701: a=>{
            y[a].closePath()
        }
        ,
        1992735: (a,b,c,d,e)=>{
            y[a].rect(b, c, d, e)
        }
        ,
        1992778: a=>{
            a = y[a];
            var b = a.canvas;
            a.clearRect(0, 0, b.width, b.height)
        }
        ,
        1992885: (a,b,c,d,e)=>{
            y[a].clearRect(b, c, d, e)
        }
        ,
        1992973: a=>{
            y[a].fillRect(0, 0, 1, 1)
        }
        ,
        1993016: (a,b,c)=>{
            y[a].strokeRect(0, 0, b, c)
        }
        ,
        1993063: a=>"string" == typeof y[a].strokeStyle,
        1993123: (a,b,c,d)=>{
            b |= 0;
            c |= 0;
            d |= 0;
            y[a].fillStyle = String.fromCharCode(35, fa(b >> 4 & 15), fa(b & 15), fa(c >> 4 & 15), fa(c & 15), fa(d >> 4 & 15), fa(d & 15))
        }
        ,
        1993393: (a,b,c,d)=>{
            b |= 0;
            c |= 0;
            d |= 0;
            y[a].strokeStyle = String.fromCharCode(35, fa(b >> 4 & 15), fa(b & 15), fa(c >> 4 & 15), fa(c & 15), fa(d >> 4 & 15), fa(d & 15))
        }
        ,
        1993665: (a,b)=>{
            y[a].globalAlpha = b
        }
        ,
        1993704: (a,b)=>{
            y[a].globalAlpha = b
        }
        ,
        1993743: (a,b,c)=>{
            y[a].moveTo(b, c)
        }
        ,
        1993780: (a,b,c)=>{
            y[a].lineTo(b, c)
        }
        ,
        1993817: (a,b,c,d,e)=>{
            y[a].quadraticCurveTo(b, c, d, e)
        }
        ,
        1993872: (a,b,c,d,e,g,h)=>{
            y[a].bezierCurveTo(b, c, d, e, g, h)
        }
        ,
        1993932: (a,b,c,d,e,g,h)=>{
            y[a].arc(b, c, d, e, g, !!h)
        }
        ,
        1993984: (a,b,c,d,e,g,h,n,q)=>{
            y[a].ellipse(b, c, d, e, g, h, n, !!q)
        }
        ,
        1994048: (a,b)=>{
            y[a].lineWidth = b
        }
        ,
        1994085: (a,b)=>{
            y[a].drawImage(y[b].canvas, 0, 0)
        }
        ,
        1994148: (a,b)=>{
            y[a].drawImage(y[b].canvas, 0, 0, 1, 1)
        }
        ,
        1994217: (a,b,c,d,e,g)=>{
            y[a].drawImage(y[b].canvas, c, d, e, g, 0, 0, 1, 1)
        }
        ,
        1994302: (a,b,c,d,e)=>{
            y[a].fillText(wb.decode(S.subarray(b, b + c)), d, e)
        }
        ,
        1994371: (a,b,c,d,e)=>{
            y[a].strokeText(wb.decode(S.subarray(b, b + c)), d, e)
        }
        ,
        1994442: (a,b,c)=>y[a].measureText(wb.decode(S.subarray(b, b + c))).width,
        1994519: (a,b)=>{
            y[a].font = (2048 * b | 0) / 2048 + "px Ubuntu"
        }
        ,
        1994585: a=>{
            y[a].textAlign = "center"
        }
        ,
        1994628: a=>{
            y[a].lineCap = "butt"
        }
        ,
        1994667: a=>{
            y[a].lineCap = "round"
        }
        ,
        1994707: a=>{
            y[a].lineCap = "square"
        }
        ,
        1994748: a=>{
            y[a].lineJoin = "round"
        }
        ,
        1994789: a=>{
            y[a].lineJoin = "miter"
        }
        ,
        1994830: (a,b)=>{
            y[a].miterLimit = b
        }
        ,
        1994868: a=>{
            y[a].textBaseline = "middle"
        }
        ,
        1994914: a=>{
            y[a].textBaseline = "alphabetic"
        }
        ,
        1994964: a=>{
            y[a].setLineDash(Rc)
        }
        ,
        1995013: (a,b)=>{
            y[a].lineDashOffset = b
        }
        ,
        1995055: a=>{
            y[a].globalCompositeOperation = "source-over"
        }
        ,
        1995120: a=>{
            y[a].globalCompositeOperation = "copy"
        }
        ,
        1995178: a=>{
            y[a].globalCompositeOperation = "lighter"
        }
        ,
        1995239: (a,b,c,d,e,g)=>{
            y[a].putImageData(new ImageData(new Uint8ClampedArray(fb,b,c * d * 4),c,d), e, g)
        }
        ,
        1995353: (a,b)=>{
            y[a].imageSmoothingEnabled = !!b
        }
        ,
        1995407: a=>N(y[a].canvas.toDataURL()),
        1995472: (a,b)=>{
            a = document.getElementById(A(a));
            if (null == a)
                return -1;
            b = a.getContext("2d", {
                alpha: !!b
            });
            y.push(b);
            return y.length - 1
        }
        ,
        1995692: ()=>{
            vb || (vb = Sc.Ai("Ubuntu"));
            return vb
        }
        ,
        1995794: ()=>/^((?!chrome|android|firefox|edge).)*safari/i.test(window.navigator.userAgent),
        1995885: a=>{
            a = A(a);
            var b = new WebSocket(a);
            (new URL(a)).hostname != (new URL(b.url)).hostname && (document.getElementById("loading").style.display = "none",
            document.getElementById("unsupported").style.display = "none",
            document.getElementById("errorDialog").style.display = "block",
            document.getElementById("canvas").style.display = "none");
            b.binaryType = "arraybuffer";
            b.gh = [];
            b.onopen = function() {
                b.gh.push([2, 0, 0]);
                La()
            }
            ;
            b.onerror = function() {
                b.gh.push([3, 0, 0]);
                La()
            }
            ;
            b.onclose = function() {
                b.gh.push([4, 0, 0]);
                La()
            }
            ;
            b.onmessage = function(c) {
                c = new Uint8Array(c.data);
                var d = X(c.length);
                Z.set(c, d);
                b.gh.push([1, d, c.length]);
                La()
            }
            ;
            for (a = 0; a < ka.length; ++a)
                if (null == ka[a])
                    return ka[a] = b,
                    a;
            ka.push(b);
            return ka.length - 1
        }
        ,
        1996638: a=>{
            var b = ka[a];
            b.onopen = b.onclose = b.onmessage = b.onerror = function() {}
            ;
            for (var c = 0; c < b.gh.length; ++c)
                Ia(b.gh[c][1]);
            b.gh = null;
            try {
                b.close()
            } catch (d) {}
            ka[a] = null
        }
        ,
        1996864: a=>1 == ka[a].readyState,
        1996908: (a,b,c)=>{
            a = ka[a];
            if (1 != a.readyState)
                return 0;
            try {
                a.send(Z.subarray(b, b + c))
            } catch (d) {
                return 0
            }
            return 1
        }
        ,
        1997045: (a,b,c)=>{
            a = ka[a];
            if (0 == a.gh.length)
                return 0;
            a = a.gh.shift();
            B[b >> 2] = a[1];
            l[c >> 2] = a[2];
            return a[0]
        }
        ,
        1997197: a=>!!(A(a)in window),
        1997240: (a,b,c)=>!!window[A(a)][A(b)][A(c)],
        1997315: (a,b,c)=>!!window[A(a)][A(b)][A(c)],
        1997390: (a,b,c)=>!!window[A(a)][A(b)][A(c)],
        1997465: (a,b,c)=>!!window[A(a)][A(b)](A(c)),
        1997540: (a,b,c)=>0 < window[A(a)][A(b)](A(c)).length,
        1997624: ()=>{
            var a = document.getElementById("canvas")
              , b = document.createElement("canvas");
            b.id = "canvasOverlay";
            a.parentNode.insertBefore(b, a.nextSibling)
        }
        ,
        1997833: ()=>window.innerWidth,
        1997863: ()=>window.innerHeight,
        1997894: ()=>{
            var a = document.getElementById("canvas")
              , b = document.getElementById("canvasOverlay");
            b.width != a.width && (b.width = a.width);
            b.height != a.height && (b.height = a.height)
        }
        ,
        1998164: a=>{
            document.getElementById("canvas").dataset.fakeLandscape = a ? "true" : "false"
        }
        ,
        1998273: ()=>{
            if (!document.referrer)
                return !1;
            var a = (new URL(document.referrer)).host;
            if ("florr.io" == a || -1 == a.indexOf("florr"))
                return !1;
            window.top.location = "https://florr.io/";
            return !0
        }
        ,
        1998499: ()=>{
            if (window == window.top || window.parent == window.top)
                return !1;
            window.top.location = "https://florr.io/";
            return !0
        }
        ,
        1998629: ()=>{
            try {
                window.screen.orientation.lock("landscape").catch(function() {})
            } catch (a) {}
        }
        ,
        1998716: ()=>{
            function a() {
                console.log("%cDO NOT PASTE ANYTHING IN HERE. IF YOU DIDN'T WRITE THE CODE, YOU DON'T KNOW WHAT IT DOES. IT MIGHT CAUSE YOUR ACCOUNT TO GET BANNED. YOU HAVE BEEN WARNED. DO NOT TRUST OTHERS.", "background: #f00; color: #fff; border-radius: 2px; padding: 2px;")
            }
            setInterval(a, 5E3);
            a()
        }
        ,
        1999025: ()=>"https:" == location.protocol,
        1999067: (a,b,c)=>{
            var d = new Image;
            d.Kl = !1;
            d.onload = function() {
                d.Kl = !0
            }
            ;
            var e = A(a);
            d.onerror = function() {
                console.error("Failed to load image " + e)
            }
            ;
            0 == e.indexOf("static/") ? (a = "application/octet-binary",
            115 == S[b] && (a = "image/svg+xml"),
            d.src = window.URL.createObjectURL(new Blob([new Uint8Array(fb,b,c - b)],{
                type: a
            }))) : d.src = e;
            for (b = 0; b < va.length; ++b)
                if (null == va[b])
                    return va[b] = d,
                    b;
            va.push(d);
            return va.length - 1
        }
        ,
        1999710: a=>{
            va[a] = null
        }
        ,
        1999737: ()=>!!(window.googletag && "undefined" != typeof window.google_srt && window.aiptag && window.aiptag.cmd && window.aiptag.cmd.player && window.aiptag.cmd.player.push && window.aiptag.adplayer && window.aiptag.adplayer.startPreRoll),
        2000028: a=>{
            ub.push(a);
            ha[a] = null
        }
        ,
        2000079: ()=>{
            var a = new Path2D;
            if (0 < ub.length) {
                var b = ub.pop();
                ha[b] = a;
                return b
            }
            ha.push(a);
            return ha.length - 1
        }
        ,
        2000260: (a,b,c)=>{
            ha[a].moveTo(b, c)
        }
        ,
        2000294: (a,b,c)=>{
            ha[a].lineTo(b, c)
        }
        ,
        2000328: (a,b,c,d,e)=>{
            ha[a].quadraticCurveTo(b, c, d, e)
        }
        ,
        2000380: (a,b,c,d,e,g,h)=>{
            ha[a].bezierCurveTo(b, c, d, e, g, h)
        }
        ,
        2000437: a=>{
            ha[a].closePath()
        }
        ,
        2000468: ()=>"https:" == location.protocol,
        2000510: ()=>"undefined" != typeof performance && performance.now,
        2000574: a=>a ? performance.now() : Date.now(),
        2000622: ()=>N(location.hostname),
        2000669: ()=>"undefined" != typeof window.Android,
        2000721: ()=>-1 != window.navigator.userAgent.indexOf("Android") && /\bwv\b/.test(window.navigator.userAgent),
        2000830: ()=>/webview/i.test(window.navigator.userAgent),
        2000886: ()=>/\(Linux; Android [0-9.]+; [^\)]*Build/i.test(window.navigator.userAgent),
        2000972: a=>{
            gb(A(a))
        }
        ,
        2001012: a=>{
            gb(A(a))
        }
        ,
        2001052: ()=>{
            document.getElementById("canvas").style.cursor = "default"
        }
        ,
        2001116: ()=>{
            document.getElementById("canvas").style.cursor = "pointer"
        }
        ,
        2001180: ()=>{
            document.getElementById("canvas").style.cursor = "text"
        }
        ,
        2001241: a=>N(window.prompt(void 0, A(a))),
        2001310: a=>{
            try {
                window.location = A(a)
            } catch (b) {
                console.error(b)
            }
        }
        ,
        2001387: a=>{
            try {
                window.open(A(a), "_blank").focus()
            } catch (b) {
                console.error(b)
            }
        }
        ,
        2001477: ()=>N(window.location.hash.slice(1)),
        2001536: ()=>{
            if (window.location.hash) {
                try {
                    window.history.replaceState(null, "", window.location.origin + window.location.pathname + window.location.search);
                    return
                } catch (a) {}
                "#" != window.location.hash && (window.location.hash = "")
            }
        }
        ,
        2001782: ()=>-1 != navigator.userAgent.indexOf("iPhone") || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android") || -1 != navigator.userAgent.indexOf("Mobile") || -1 != navigator.userAgent.indexOf("Tablet"),
        2002024: ()=>-1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Tablet"),
        2002124: ()=>-1 != navigator.userAgent.indexOf("iPhone") || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Macintosh"),
        2002274: ()=>window.innerWidth < window.innerHeight,
        2002325: a=>Ca(encodeURIComponent(A(a))),
        2002388: a=>{
            var b = A(a);
            setTimeout(function() {
                window.onbeforeunload = null;
                var c = new URL(window.location);
                c.hash = "";
                c.searchParams.set("cp6_web_hash", b);
                window.location = c
            }, 500)
        }
        ,
        2002613: ()=>{
            setTimeout(zc, 500)
        }
        ,
        2002646: (a,b)=>{
            window.localStorage[A(a)] = A(b)
        }
        ,
        2002708: a=>{
            delete window.localStorage[A(a)]
        }
        ,
        2002758: a=>N(window.localStorage[A(a)] || null),
        2002833: ()=>"zh" == window.navigator.language.slice(0, 2),
        2002890: ()=>N(navigator.userAgent),
        2002939: ()=>N(navigator.language),
        2002987: ()=>N(navigator.vendor || ""),
        2003039: ()=>N((navigator.languages || []).join(",")),
        2003106: ()=>N(Array.prototype.slice.apply(window.navigator.mimeTypes).map(function(a) {
            return a.type + "," + a.suffixes
        }).join(";")),
        2003255: ()=>N(Array.prototype.slice.apply(navigator.plugins).map(function(a) {
            return a.name
        }).join(",")),
        2003376: ()=>N((new Date).getTimezoneOffset().toString()),
        2003449: ()=>N(screen.width + "x" + screen.height + "x" + window.devicePixelRatio),
        2003545: a=>{
            gb(A(a))
        }
        ,
        2003586: ()=>{
            try {
                return window.localStorage,
                !1
            } catch (a) {
                return !0
            }
        }
        ,
        2003658: ()=>"https:" == location.protocol,
        2003700: ()=>"undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext ? !0 : !1,
        2003847: ()=>"undefined" !== typeof navigator.mediaDevices && "undefined" !== typeof navigator.mediaDevices.getUserMedia || "undefined" !== typeof navigator.webkitGetUserMedia ? !0 : !1,
        2004081: a=>{
            "undefined" === typeof m.SDL2 && (m.SDL2 = {});
            var b = m.SDL2;
            a ? b.capture = {} : b.audio = {};
            b.Bg || ("undefined" !== typeof AudioContext ? b.Bg = new AudioContext : "undefined" !== typeof webkitAudioContext && (b.Bg = new webkitAudioContext),
            b.Bg && Dc(b.Bg));
            return b.Bg === D ? -1 : 0
        }
        ,
        2004574: ()=>m.SDL2.Bg.sampleRate,
        2004642: (a,b,c,d)=>{
            function e() {}
            function g(n) {
                h.capture.mi !== D && (clearTimeout(h.capture.mi),
                h.capture.mi = D);
                h.capture.Ii = h.Bg.createMediaStreamSource(n);
                h.capture.Mg = h.Bg.createScriptProcessor(b, a, 1);
                h.capture.Mg.onaudioprocess = function(q) {
                    h !== D && h.capture !== D && (q.outputBuffer.getChannelData(0).fill(0),
                    h.capture.Yi = q.inputBuffer,
                    ib("vi", c, [d]))
                }
                ;
                h.capture.Ii.connect(h.capture.Mg);
                h.capture.Mg.connect(h.Bg.destination);
                h.capture.stream = n
            }
            var h = m.SDL2;
            h.capture.Ni = h.Bg.createBuffer(a, b, h.Bg.sampleRate);
            h.capture.Ni.getChannelData(0).fill(0);
            h.capture.mi = setTimeout(function() {
                h.capture.Yi = h.capture.Ni;
                ib("vi", c, [d])
            }, b / h.Bg.sampleRate * 1E3);
            navigator.mediaDevices !== D && navigator.mediaDevices.getUserMedia !== D ? navigator.mediaDevices.getUserMedia({
                audio: !0,
                video: !1
            }).then(g).catch(e) : navigator.webkitGetUserMedia !== D && navigator.webkitGetUserMedia({
                audio: !0,
                video: !1
            }, g, e)
        }
        ,
        2006294: (a,b,c,d)=>{
            var e = m.SDL2;
            e.audio.Mg = e.Bg.createScriptProcessor(b, 0, a);
            e.audio.Mg.onaudioprocess = function(g) {
                e !== D && e.audio !== D && (e.audio.Vj = g.outputBuffer,
                ib("vi", c, [d]))
            }
            ;
            e.audio.Mg.connect(e.Bg.destination)
        }
        ,
        2006704: (a,b)=>{
            for (var c = m.SDL2, d = c.capture.Yi.numberOfChannels, e = 0; e < d; ++e) {
                var g = c.capture.Yi.getChannelData(e);
                if (g.length != b)
                    throw "Web Audio capture buffer length mismatch! Destination size: " + g.length + " samples vs expected " + b + " samples!";
                if (1 == d)
                    for (var h = 0; h < b; ++h)
                        Mb(a + 4 * h, g[h], "float");
                else
                    for (h = 0; h < b; ++h)
                        Mb(a + 4 * (h * d + e), g[h], "float")
            }
        }
        ,
        2007309: (a,b)=>{
            for (var c = m.SDL2, d = c.audio.Vj.numberOfChannels, e = 0; e < d; ++e) {
                var g = c.audio.Vj.getChannelData(e);
                if (g.length != b)
                    throw "Web Audio output buffer length mismatch! Destination size: " + g.length + " samples vs expected " + b + " samples!";
                for (var h = 0; h < b; ++h)
                    g[h] = I[a + (h * d + e << 2) >> 2]
            }
        }
        ,
        2007789: a=>{
            var b = m.SDL2;
            if (a) {
                b.capture.mi !== D && clearTimeout(b.capture.mi);
                if (b.capture.stream !== D) {
                    a = b.capture.stream.getAudioTracks();
                    for (var c = 0; c < a.length; c++)
                        b.capture.stream.removeTrack(a[c]);
                    b.capture.stream = D
                }
                b.capture.Mg !== D && (b.capture.Mg.onaudioprocess = function() {}
                ,
                b.capture.Mg.disconnect(),
                b.capture.Mg = D);
                b.capture.Ii !== D && (b.capture.Ii.disconnect(),
                b.capture.Ii = D);
                b.capture.Ni !== D && (b.capture.Ni = D);
                b.capture = D
            } else
                b.audio.Mg != D && (b.audio.Mg.disconnect(),
                b.audio.Mg = D),
                b.audio = D;
            b.Bg !== D && b.audio === D && b.capture === D && (b.Bg.close(),
            b.Bg = D)
        }
        ,
        2008961: (a,b,c)=>{
            m.SDL2 || (m.SDL2 = {});
            var d = m.SDL2;
            d.cl !== m.canvas && (d.Wg = m.createContext(m.canvas, !1, !0),
            d.cl = m.canvas);
            if (d.w !== a || d.Al !== b || d.Dl !== d.Wg)
                d.image = d.Wg.createImageData(a, b),
                d.w = a,
                d.Al = b,
                d.Dl = d.Wg;
            a = d.image.data;
            b = c >> 2;
            var e = 0;
            if ("undefined" !== typeof CanvasPixelArray && a instanceof CanvasPixelArray)
                for (c = a.length; e < c; ) {
                    var g = l[b];
                    a[e] = g & 255;
                    a[e + 1] = g >> 8 & 255;
                    a[e + 2] = g >> 16 & 255;
                    a[e + 3] = 255;
                    b++;
                    e += 4
                }
            else if (d.gl !== a && (d.fl = new Int32Array(a.buffer),
            d.hl = new Uint8Array(a.buffer),
            d.gl = a),
            a = d.fl,
            c = a.length,
            a.set(l.subarray(b, b + c)),
            a = d.hl,
            b = 3,
            e = b + 4 * c,
            0 == c % 8)
                for (; b < e; )
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0,
                    a[b] = 255,
                    b = b + 4 | 0;
            else
                for (; b < e; )
                    a[b] = 255,
                    b = b + 4 | 0;
            d.Wg.putImageData(d.image, 0, 0)
        }
        ,
        2010430: (a,b,c,d,e)=>{
            var g = document.createElement("canvas");
            g.width = a;
            g.height = b;
            var h = g.getContext("2d");
            a = h.createImageData(a, b);
            b = a.data;
            e >>= 2;
            var n = 0, q;
            if ("undefined" !== typeof CanvasPixelArray && b instanceof CanvasPixelArray)
                for (q = b.length; n < q; ) {
                    var u = l[e];
                    b[n] = u & 255;
                    b[n + 1] = u >> 8 & 255;
                    b[n + 2] = u >> 16 & 255;
                    b[n + 3] = u >> 24 & 255;
                    e++;
                    n += 4
                }
            else
                b = new Int32Array(b.buffer),
                q = b.length,
                b.set(l.subarray(e, e + q));
            h.putImageData(a, 0, 0);
            c = 0 === c && 0 === d ? "url(" + g.toDataURL() + "), auto" : "url(" + g.toDataURL() + ") " + c + " " + d + ", auto";
            d = X(c.length + 1);
            K(c, d, c.length + 1);
            return d
        }
        ,
        2011419: a=>{
            m.canvas && (m.canvas.style.cursor = A(a))
        }
        ,
        2011502: ()=>{
            m.canvas && (m.canvas.style.cursor = "none")
        }
        ,
        2011571: ()=>window.innerWidth,
        2011601: ()=>window.innerHeight,
        2011632: (a,b)=>{
            alert(A(a) + "\n\n" + A(b))
        }
        ,
        2011689: ()=>{
            var a = document.getElementById("xsolla-container");
            if (a) {
                var b = document.getElementById("xsolla-container2");
                b && (delete window.xsolla_window,
                delete a.dataset.active,
                b.removeChild(document.getElementById("xsolla-iframe")))
            }
        }
        ,
        2011995: ()=>{
            var a = document.getElementById("xsolla-container");
            return a ? !!a.dataset.active : !1
        }
        ,
        2012124: ()=>N(window.navigator.language || ""),
        2012185: ()=>N((window.navigator.languages || []).join(",")),
        2012257: ()=>(new Date).getTimezoneOffset(),
        2012300: ()=>N(window.navigator.platform || ""),
        2012361: ()=>N((window.navigator.userAgent || "").replace(/[0-9.]/gm, "")),
        2012449: ()=>N(window.navigator.vendor || ""),
        2012508: ()=>window.navigator.hardwareConcurrency,
        2012557: a=>{
            var b = document.getElementById("xsolla-container");
            if (b) {
                var c = document.getElementById("xsolla-container2");
                if (c) {
                    var d = document.createElement("iframe");
                    d.setAttribute("id", "xsolla-iframe");
                    d.setAttribute("src", A(a));
                    window.xsolla_window = d.contentWindow;
                    window.xsolla_listener_setup || (window.xsolla_listener_setup = !0,
                    window.addEventListener("message", function(e) {
                        e.source == window.xsolla_window && console.log("Received xsolla message:", e)
                    }),
                    (a = document.getElementById("xsolla-close")) && a.addEventListener("click", yc));
                    b.dataset.active = "true";
                    c.appendChild(d)
                }
            }
        }
    }, Sa = [], L = {
        pj: a=>"/" === a.charAt(0),
        mm: a=>/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1),
        vj: (a,b)=>{
            for (var c = 0, d = a.length - 1; 0 <= d; d--) {
                var e = a[d];
                "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1),
                c++) : c && (a.splice(d, 1),
                c--)
            }
            if (b)
                for (; c; c--)
                    a.unshift("..");
            return a
        }
        ,
        normalize: a=>{
            var b = L.pj(a)
              , c = "/" === a.substr(-1);
            (a = L.vj(a.split("/").filter(d=>!!d), !b).join("/")) || b || (a = ".");
            a && c && (a += "/");
            return (b ? "/" : "") + a
        }
        ,
        dirname: a=>{
            var b = L.mm(a);
            a = b[0];
            b = b[1];
            if (!a && !b)
                return ".";
            b && (b = b.substr(0, b.length - 1));
            return a + b
        }
        ,
        lh: a=>{
            if ("/" === a)
                return "/";
            a = L.normalize(a);
            a = a.replace(/\/$/, "");
            var b = a.lastIndexOf("/");
            return -1 === b ? a : a.substr(b + 1)
        }
        ,
        join: function() {
            return L.normalize(Array.prototype.slice.call(arguments, 0).join("/"))
        },
        uh: (a,b)=>L.normalize(a + "/" + b)
    }, na = {
        resolve: function() {
            for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
                b = 0 <= c ? arguments[c] : f.xi();
                if ("string" != typeof b)
                    throw new TypeError("Arguments to path.resolve must be strings");
                if (!b)
                    return "";
                a = b + "/" + a;
                b = L.pj(b)
            }
            a = L.vj(a.split("/").filter(d=>!!d), !b).join("/");
            return (b ? "/" : "") + a || "."
        },
        Ck: (a,b)=>{
            function c(h) {
                for (var n = 0; n < h.length && "" === h[n]; n++)
                    ;
                for (var q = h.length - 1; 0 <= q && "" === h[q]; q--)
                    ;
                return n > q ? [] : h.slice(n, q - n + 1)
            }
            a = na.resolve(a).substr(1);
            b = na.resolve(b).substr(1);
            a = c(a.split("/"));
            b = c(b.split("/"));
            for (var d = Math.min(a.length, b.length), e = d, g = 0; g < d; g++)
                if (a[g] !== b[g]) {
                    e = g;
                    break
                }
            d = [];
            for (g = e; g < a.length; g++)
                d.push("..");
            d = d.concat(b.slice(e));
            return d.join("/")
        }
    }, oa = {
        Jk: [],
        hh: function() {},
        un: function() {},
        register: function(a, b) {
            oa.Jk[a] = {
                input: [],
                Jg: [],
                Nh: b
            };
            f.Aj(a, oa.vg)
        },
        vg: {
            open: function(a) {
                var b = oa.Jk[a.node.ii];
                if (!b)
                    throw new f.pg(43);
                a.Ag = b;
                a.seekable = !1
            },
            close: function(a) {
                a.Ag.Nh.flush(a.Ag)
            },
            flush: function(a) {
                a.Ag.Nh.flush(a.Ag)
            },
            read: function(a, b, c, d) {
                if (!a.Ag || !a.Ag.Nh.ik)
                    throw new f.pg(60);
                for (var e = 0, g = 0; g < d; g++) {
                    try {
                        var h = a.Ag.Nh.ik(a.Ag)
                    } catch (n) {
                        throw new f.pg(29);
                    }
                    if (h === D && 0 === e)
                        throw new f.pg(6);
                    if (null === h || h === D)
                        break;
                    e++;
                    b[c + g] = h
                }
                e && (a.node.timestamp = Date.now());
                return e
            },
            write: function(a, b, c, d) {
                if (!a.Ag || !a.Ag.Nh.xj)
                    throw new f.pg(60);
                try {
                    for (var e = 0; e < d; e++)
                        a.Ag.Nh.xj(a.Ag, b[c + e])
                } catch (g) {
                    throw new f.pg(29);
                }
                d && (a.node.timestamp = Date.now());
                return e
            }
        },
        jl: {
            ik: function(a) {
                if (!a.input.length) {
                    var b = null;
                    "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "),
                    null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(),
                    null !== b && (b += "\n"));
                    if (!b)
                        return null;
                    a.input = kb(b, !0)
                }
                return a.input.shift()
            },
            xj: function(a, b) {
                null === b || 10 === b ? (Aa(ra(a.Jg, 0)),
                a.Jg = []) : 0 != b && a.Jg.push(b)
            },
            flush: function(a) {
                a.Jg && 0 < a.Jg.length && (Aa(ra(a.Jg, 0)),
                a.Jg = [])
            }
        },
        il: {
            xj: function(a, b) {
                null === b || 10 === b ? (ba(ra(a.Jg, 0)),
                a.Jg = []) : 0 != b && a.Jg.push(b)
            },
            flush: function(a) {
                a.Jg && 0 < a.Jg.length && (ba(ra(a.Jg, 0)),
                a.Jg = [])
            }
        }
    }, H = {
        dh: null,
        zg: function() {
            return H.createNode(null, "/", 16895, 0)
        },
        createNode: function(a, b, c, d) {
            if (f.Hl(c) || f.Il(c))
                throw new f.pg(63);
            H.dh || (H.dh = {
                dir: {
                    node: {
                        $g: H.sg.$g,
                        Hg: H.sg.Hg,
                        vh: H.sg.vh,
                        jh: H.sg.jh,
                        ki: H.sg.ki,
                        Rh: H.sg.Rh,
                        li: H.sg.li,
                        ji: H.sg.ji,
                        qh: H.sg.qh
                    },
                    stream: {
                        ah: H.vg.ah
                    }
                },
                file: {
                    node: {
                        $g: H.sg.$g,
                        Hg: H.sg.Hg
                    },
                    stream: {
                        ah: H.vg.ah,
                        read: H.vg.read,
                        write: H.vg.write,
                        Vh: H.vg.Vh,
                        Ih: H.vg.Ih,
                        Lh: H.vg.Lh
                    }
                },
                link: {
                    node: {
                        $g: H.sg.$g,
                        Hg: H.sg.Hg,
                        zh: H.sg.zh
                    },
                    stream: {}
                },
                Rj: {
                    node: {
                        $g: H.sg.$g,
                        Hg: H.sg.Hg
                    },
                    stream: f.Wk
                }
            });
            c = f.createNode(a, b, c, d);
            f.Gg(c.mode) ? (c.sg = H.dh.dir.node,
            c.vg = H.dh.dir.stream,
            c.ug = {}) : f.isFile(c.mode) ? (c.sg = H.dh.file.node,
            c.vg = H.dh.file.stream,
            c.yg = 0,
            c.ug = null) : f.ci(c.mode) ? (c.sg = H.dh.link.node,
            c.vg = H.dh.link.stream) : f.zi(c.mode) && (c.sg = H.dh.Rj.node,
            c.vg = H.dh.Rj.stream);
            c.timestamp = Date.now();
            a && (a.ug[b] = c,
            a.timestamp = c.timestamp);
            return c
        },
        Qm: function(a) {
            return a.ug ? a.ug.subarray ? a.ug.subarray(0, a.yg) : new Uint8Array(a.ug) : new Uint8Array(0)
        },
        ak: function(a, b) {
            var c = a.ug ? a.ug.length : 0;
            c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0),
            0 != c && (b = Math.max(b, 256)),
            c = a.ug,
            a.ug = new Uint8Array(b),
            0 < a.yg && a.ug.set(c.subarray(0, a.yg), 0))
        },
        em: function(a, b) {
            if (a.yg != b)
                if (0 == b)
                    a.ug = null,
                    a.yg = 0;
                else {
                    var c = a.ug;
                    a.ug = new Uint8Array(b);
                    c && a.ug.set(c.subarray(0, Math.min(b, a.yg)));
                    a.yg = b
                }
        },
        sg: {
            $g: function(a) {
                var b = {};
                b.ml = f.zi(a.mode) ? a.id : 1;
                b.nj = a.id;
                b.mode = a.mode;
                b.Ul = 1;
                b.uid = 0;
                b.zl = 0;
                b.ii = a.ii;
                f.Gg(a.mode) ? b.size = 4096 : f.isFile(a.mode) ? b.size = a.yg : b.size = f.ci(a.mode) ? a.link.length : 0;
                b.Oj = new Date(a.timestamp);
                b.tk = new Date(a.timestamp);
                b.Uj = new Date(a.timestamp);
                b.Rk = 4096;
                b.Sk = Math.ceil(b.size / b.Rk);
                return b
            },
            Hg: function(a, b) {
                b.mode !== D && (a.mode = b.mode);
                b.timestamp !== D && (a.timestamp = b.timestamp);
                b.size !== D && H.em(a, b.size)
            },
            vh: function() {
                throw f.fj[44];
            },
            jh: function(a, b, c, d) {
                return H.createNode(a, b, c, d)
            },
            ki: function(a, b, c) {
                if (f.Gg(a.mode)) {
                    try {
                        var d = f.ih(b, c)
                    } catch (g) {}
                    if (d)
                        for (var e in d.ug)
                            throw new f.pg(55);
                }
                delete a.parent.ug[a.name];
                a.parent.timestamp = Date.now();
                a.name = c;
                b.ug[c] = a;
                b.timestamp = a.parent.timestamp;
                a.parent = b
            },
            Rh: function(a, b) {
                delete a.ug[b];
                a.timestamp = Date.now()
            },
            li: function(a, b) {
                var c = f.ih(a, b), d;
                for (d in c.ug)
                    throw new f.pg(55);
                delete a.ug[b];
                a.timestamp = Date.now()
            },
            ji: function(a) {
                var b = [".", ".."], c;
                for (c in a.ug)
                    a.ug.hasOwnProperty(c) && b.push(c);
                return b
            },
            qh: function(a, b, c) {
                a = H.createNode(a, b, 41471, 0);
                a.link = c;
                return a
            },
            zh: function(a) {
                if (!f.ci(a.mode))
                    throw new f.pg(28);
                return a.link
            }
        },
        vg: {
            read: function(a, b, c, d, e) {
                var g = a.node.ug;
                if (e >= a.node.yg)
                    return 0;
                a = Math.min(a.node.yg - e, d);
                if (8 < a && g.subarray)
                    b.set(g.subarray(e, e + a), c);
                else
                    for (d = 0; d < a; d++)
                        b[c + d] = g[e + d];
                return a
            },
            write: function(a, b, c, d, e, g) {
                if (!d)
                    return 0;
                a = a.node;
                a.timestamp = Date.now();
                if (b.subarray && (!a.ug || a.ug.subarray)) {
                    if (g)
                        return a.ug = b.subarray(c, c + d),
                        a.yg = d;
                    if (0 === a.yg && 0 === e)
                        return a.ug = b.slice(c, c + d),
                        a.yg = d;
                    if (e + d <= a.yg)
                        return a.ug.set(b.subarray(c, c + d), e),
                        d
                }
                H.ak(a, e + d);
                if (a.ug.subarray && b.subarray)
                    a.ug.set(b.subarray(c, c + d), e);
                else
                    for (g = 0; g < d; g++)
                        a.ug[e + g] = b[c + g];
                a.yg = Math.max(a.yg, e + d);
                return d
            },
            ah: function(a, b, c) {
                1 === c ? b += a.position : 2 === c && f.isFile(a.node.mode) && (b += a.node.yg);
                if (0 > b)
                    throw new f.pg(28);
                return b
            },
            Vh: function(a, b, c) {
                H.ak(a.node, b + c);
                a.node.yg = Math.max(a.node.yg, b + c)
            },
            Ih: function(a, b, c, d, e) {
                if (!f.isFile(a.node.mode))
                    throw new f.pg(43);
                a = a.node.ug;
                if (e & 2 || a.buffer !== fb) {
                    if (0 < c || c + b < a.length)
                        a = a.subarray ? a.subarray(c, c + b) : Array.prototype.slice.call(a, c, c + b);
                    c = !0;
                    da();
                    b = void 0;
                    if (!b)
                        throw new f.pg(48);
                    Z.set(a, b)
                } else
                    c = !1,
                    b = a.byteOffset;
                return {
                    nn: b,
                    ym: c
                }
            },
            Lh: function(a, b, c, d, e) {
                if (!f.isFile(a.node.mode))
                    throw new f.pg(43);
                if (e & 2)
                    return 0;
                H.vg.write(a, b, 0, d, c, !1);
                return 0
            }
        }
    }, f = {
        root: null,
        fi: [],
        Yj: {},
        streams: [],
        Sl: 1,
        bh: null,
        Wj: "/",
        mj: !1,
        lk: !0,
        pg: null,
        fj: {},
        rl: null,
        Oi: 0,
        xg: (a,b={})=>{
            a = na.resolve(f.xi(), a);
            if (!a)
                return {
                    path: "",
                    node: null
                };
            b = Object.assign({
                dj: !0,
                zj: 0
            }, b);
            if (8 < b.zj)
                throw new f.pg(32);
            a = L.vj(a.split("/").filter(h=>!!h), !1);
            for (var c = f.root, d = "/", e = 0; e < a.length; e++) {
                var g = e === a.length - 1;
                if (g && b.parent)
                    break;
                c = f.ih(c, a[e]);
                d = L.uh(d, a[e]);
                f.th(c) && (!g || g && b.dj) && (c = c.ei.root);
                if (!g || b.Zg)
                    for (g = 0; f.ci(c.mode); )
                        if (c = f.zh(d),
                        d = na.resolve(L.dirname(d), c),
                        c = f.xg(d, {
                            zj: b.zj + 1
                        }).node,
                        40 < g++)
                            throw new f.pg(32);
            }
            return {
                path: d,
                node: c
            }
        }
        ,
        nh: a=>{
            for (var b; ; ) {
                if (f.Bi(a))
                    return a = a.zg.sk,
                    b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
                b = b ? a.name + "/" + b : a.name;
                a = a.parent
            }
        }
        ,
        kj: (a,b)=>{
            for (var c = 0, d = 0; d < b.length; d++)
                c = (c << 5) - c + b.charCodeAt(d) | 0;
            return (a + c >>> 0) % f.bh.length
        }
        ,
        jk: a=>{
            var b = f.kj(a.parent.id, a.name);
            a.xh = f.bh[b];
            f.bh[b] = a
        }
        ,
        kk: a=>{
            var b = f.kj(a.parent.id, a.name);
            if (f.bh[b] === a)
                f.bh[b] = a.xh;
            else
                for (b = f.bh[b]; b; ) {
                    if (b.xh === a) {
                        b.xh = a.xh;
                        break
                    }
                    b = b.xh
                }
        }
        ,
        ih: (a,b)=>{
            var c = f.Ll(a);
            if (c)
                throw new f.pg(c,a);
            for (c = f.bh[f.kj(a.id, b)]; c; c = c.xh) {
                var d = c.name;
                if (c.parent.id === a.id && d === b)
                    return c
            }
            return f.vh(a, b)
        }
        ,
        createNode: (a,b,c,d)=>{
            a = new f.Pk(a,b,c,d);
            f.jk(a);
            return a
        }
        ,
        bj: a=>{
            f.kk(a)
        }
        ,
        Bi: a=>a === a.parent,
        th: a=>!!a.ei,
        isFile: a=>32768 === (a & 61440),
        Gg: a=>16384 === (a & 61440),
        ci: a=>40960 === (a & 61440),
        zi: a=>8192 === (a & 61440),
        Hl: a=>24576 === (a & 61440),
        Il: a=>4096 === (a & 61440),
        Tm: a=>49152 === (a & 49152),
        tl: {
            r: 0,
            "r+": 2,
            w: 577,
            "w+": 578,
            a: 1089,
            "a+": 1090
        },
        Ol: a=>{
            var b = f.tl[a];
            if ("undefined" == typeof b)
                throw Error("Unknown file open mode: " + a);
            return b
        }
        ,
        bk: a=>{
            var b = ["r", "w", "rw"][a & 3];
            a & 512 && (b += "w");
            return b
        }
        ,
        yh: (a,b)=>{
            if (f.lk)
                return 0;
            if (!b.includes("r") || a.mode & 292) {
                if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
                    return 2
            } else
                return 2;
            return 0
        }
        ,
        Ll: a=>{
            var b = f.yh(a, "x");
            return b ? b : a.sg.vh ? 0 : 2
        }
        ,
        tj: (a,b)=>{
            try {
                return f.ih(a, b),
                20
            } catch (c) {}
            return f.yh(a, "wx")
        }
        ,
        Hi: (a,b,c)=>{
            try {
                var d = f.ih(a, b)
            } catch (e) {
                return e.Yg
            }
            if (a = f.yh(a, "wx"))
                return a;
            if (c) {
                if (!f.Gg(d.mode))
                    return 54;
                if (f.Bi(d) || f.nh(d) === f.xi())
                    return 10
            } else if (f.Gg(d.mode))
                return 31;
            return 0
        }
        ,
        Ml: (a,b)=>a ? f.ci(a.mode) ? 32 : f.Gg(a.mode) && ("r" !== f.bk(b) || b & 512) ? 31 : f.yh(a, f.bk(b)) : 44,
        Qk: 4096,
        Tl: (a=0,b=f.Qk)=>{
            for (; a <= b; a++)
                if (!f.streams[a])
                    return a;
            throw new f.pg(33);
        }
        ,
        Gh: a=>f.streams[a],
        Tj: (a,b,c)=>{
            f.ri || (f.ri = function() {
                this.Mi = {}
            }
            ,
            f.ri.prototype = {},
            Object.defineProperties(f.ri.prototype, {
                object: {
                    get: function() {
                        return this.node
                    },
                    set: function(d) {
                        this.node = d
                    }
                },
                flags: {
                    get: function() {
                        return this.Mi.flags
                    },
                    set: function(d) {
                        this.Mi.flags = d
                    }
                },
                position: {
                    get: function() {
                        return this.Mi.position
                    },
                    set: function(d) {
                        this.Mi.position = d
                    }
                }
            }));
            a = Object.assign(new f.ri, a);
            b = f.Tl(b, c);
            a.Zh = b;
            return f.streams[b] = a
        }
        ,
        Xk: a=>{
            f.streams[a] = null
        }
        ,
        Wk: {
            open: a=>{
                a.vg = f.ul(a.node.ii).vg;
                a.vg.open && a.vg.open(a)
            }
            ,
            ah: ()=>{
                throw new f.pg(70);
            }
        },
        rj: a=>a >> 8,
        an: a=>a & 255,
        wh: (a,b)=>a << 8 | b,
        Aj: (a,b)=>{
            f.Yj[a] = {
                vg: b
            }
        }
        ,
        ul: a=>f.Yj[a],
        hk: a=>{
            var b = [];
            for (a = [a]; a.length; ) {
                var c = a.pop();
                b.push(c);
                a.push.apply(a, c.fi)
            }
            return b
        }
        ,
        Hk: (a,b)=>{
            function c(h) {
                f.Oi--;
                return b(h)
            }
            function d(h) {
                if (h) {
                    if (!d.nl)
                        return d.nl = !0,
                        c(h)
                } else
                    ++g >= e.length && c(null)
            }
            "function" == typeof a && (b = a,
            a = !1);
            f.Oi++;
            1 < f.Oi && ba("warning: " + f.Oi + " FS.syncfs operations in flight at once, probably just doing extra work");
            var e = f.hk(f.root.zg)
              , g = 0;
            e.forEach(h=>{
                if (!h.type.Hk)
                    return d(null);
                h.type.Hk(h, a, d)
            }
            )
        }
        ,
        zg: (a,b,c)=>{
            var d = "/" === c
              , e = !c;
            if (d && f.root)
                throw new f.pg(10);
            if (!d && !e) {
                var g = f.xg(c, {
                    dj: !1
                });
                c = g.path;
                g = g.node;
                if (f.th(g))
                    throw new f.pg(10);
                if (!f.Gg(g.mode))
                    throw new f.pg(54);
            }
            b = {
                type: a,
                ln: b,
                sk: c,
                fi: []
            };
            a = a.zg(b);
            a.zg = b;
            b.root = a;
            d ? f.root = a : g && (g.ei = b,
            g.zg && g.zg.fi.push(b));
            return a
        }
        ,
        xn: a=>{
            a = f.xg(a, {
                dj: !1
            });
            if (!f.th(a.node))
                throw new f.pg(28);
            a = a.node;
            var b = a.ei
              , c = f.hk(b);
            Object.keys(f.bh).forEach(d=>{
                for (d = f.bh[d]; d; ) {
                    var e = d.xh;
                    c.includes(d.zg) && f.bj(d);
                    d = e
                }
            }
            );
            a.ei = null;
            a.zg.fi.splice(a.zg.fi.indexOf(b), 1)
        }
        ,
        vh: (a,b)=>a.sg.vh(a, b),
        jh: (a,b,c)=>{
            var d = f.xg(a, {
                parent: !0
            }).node;
            a = L.lh(a);
            if (!a || "." === a || ".." === a)
                throw new f.pg(28);
            var e = f.tj(d, a);
            if (e)
                throw new f.pg(e);
            if (!d.sg.jh)
                throw new f.pg(63);
            return d.sg.jh(d, a, b, c)
        }
        ,
        create: (a,b)=>{
            b = b !== D ? b : 438;
            return f.jh(a, b & 4095 | 32768, 0)
        }
        ,
        Sg: (a,b)=>{
            b = b !== D ? b : 511;
            return f.jh(a, b & 1023 | 16384, 0)
        }
        ,
        bn: (a,b)=>{
            a = a.split("/");
            for (var c = "", d = 0; d < a.length; ++d)
                if (a[d]) {
                    c += "/" + a[d];
                    try {
                        f.Sg(c, b)
                    } catch (e) {
                        if (20 != e.Yg)
                            throw e;
                    }
                }
        }
        ,
        Ji: (a,b,c)=>{
            "undefined" == typeof c && (c = b,
            b = 438);
            return f.jh(a, b | 8192, c)
        }
        ,
        qh: (a,b)=>{
            if (!na.resolve(a))
                throw new f.pg(44);
            var c = f.xg(b, {
                parent: !0
            }).node;
            if (!c)
                throw new f.pg(44);
            b = L.lh(b);
            var d = f.tj(c, b);
            if (d)
                throw new f.pg(d);
            if (!c.sg.qh)
                throw new f.pg(63);
            return c.sg.qh(c, b, a)
        }
        ,
        ki: (a,b)=>{
            var c = L.dirname(a)
              , d = L.dirname(b)
              , e = L.lh(a)
              , g = L.lh(b);
            var h = f.xg(a, {
                parent: !0
            });
            var n = h.node;
            h = f.xg(b, {
                parent: !0
            });
            h = h.node;
            if (!n || !h)
                throw new f.pg(44);
            if (n.zg !== h.zg)
                throw new f.pg(75);
            var q = f.ih(n, e);
            a = na.Ck(a, d);
            if ("." !== a.charAt(0))
                throw new f.pg(28);
            a = na.Ck(b, c);
            if ("." !== a.charAt(0))
                throw new f.pg(55);
            try {
                var u = f.ih(h, g)
            } catch (w) {}
            if (q !== u) {
                b = f.Gg(q.mode);
                if (e = f.Hi(n, e, b))
                    throw new f.pg(e);
                if (e = u ? f.Hi(h, g, b) : f.tj(h, g))
                    throw new f.pg(e);
                if (!n.sg.ki)
                    throw new f.pg(63);
                if (f.th(q) || u && f.th(u))
                    throw new f.pg(10);
                if (h !== n && (e = f.yh(n, "w")))
                    throw new f.pg(e);
                f.kk(q);
                try {
                    n.sg.ki(q, h, g)
                } catch (w) {
                    throw w;
                } finally {
                    f.jk(q)
                }
            }
        }
        ,
        li: a=>{
            var b = f.xg(a, {
                parent: !0
            }).node;
            a = L.lh(a);
            var c = f.ih(b, a)
              , d = f.Hi(b, a, !0);
            if (d)
                throw new f.pg(d);
            if (!b.sg.li)
                throw new f.pg(63);
            if (f.th(c))
                throw new f.pg(10);
            b.sg.li(b, a);
            f.bj(c)
        }
        ,
        ji: a=>{
            a = f.xg(a, {
                Zg: !0
            }).node;
            if (!a.sg.ji)
                throw new f.pg(54);
            return a.sg.ji(a)
        }
        ,
        Rh: a=>{
            var b = f.xg(a, {
                parent: !0
            }).node;
            if (!b)
                throw new f.pg(44);
            a = L.lh(a);
            var c = f.ih(b, a)
              , d = f.Hi(b, a, !1);
            if (d)
                throw new f.pg(d);
            if (!b.sg.Rh)
                throw new f.pg(63);
            if (f.th(c))
                throw new f.pg(10);
            b.sg.Rh(b, a);
            f.bj(c)
        }
        ,
        zh: a=>{
            a = f.xg(a).node;
            if (!a)
                throw new f.pg(44);
            if (!a.sg.zh)
                throw new f.pg(28);
            return na.resolve(f.nh(a.parent), a.sg.zh(a))
        }
        ,
        stat: (a,b)=>{
            a = f.xg(a, {
                Zg: !b
            }).node;
            if (!a)
                throw new f.pg(44);
            if (!a.sg.$g)
                throw new f.pg(63);
            return a.sg.$g(a)
        }
        ,
        Zm: a=>f.stat(a, !0),
        ui: (a,b,c)=>{
            a = "string" == typeof a ? f.xg(a, {
                Zg: !c
            }).node : a;
            if (!a.sg.Hg)
                throw new f.pg(63);
            a.sg.Hg(a, {
                mode: b & 4095 | a.mode & -4096,
                timestamp: Date.now()
            })
        }
        ,
        Vm: (a,b)=>{
            f.ui(a, b, !0)
        }
        ,
        Mm: (a,b)=>{
            a = f.Gh(a);
            if (!a)
                throw new f.pg(8);
            f.ui(a.node, b)
        }
        ,
        Qj: (a,b,c,d)=>{
            a = "string" == typeof a ? f.xg(a, {
                Zg: !d
            }).node : a;
            if (!a.sg.Hg)
                throw new f.pg(63);
            a.sg.Hg(a, {
                timestamp: Date.now()
            })
        }
        ,
        Wm: (a,b,c)=>{
            f.Qj(a, b, c, !0)
        }
        ,
        Nm: (a,b,c)=>{
            a = f.Gh(a);
            if (!a)
                throw new f.pg(8);
            f.Qj(a.node, b, c)
        }
        ,
        truncate: (a,b)=>{
            if (0 > b)
                throw new f.pg(28);
            a = "string" == typeof a ? f.xg(a, {
                Zg: !0
            }).node : a;
            if (!a.sg.Hg)
                throw new f.pg(63);
            if (f.Gg(a.mode))
                throw new f.pg(31);
            if (!f.isFile(a.mode))
                throw new f.pg(28);
            var c = f.yh(a, "w");
            if (c)
                throw new f.pg(c);
            a.sg.Hg(a, {
                size: b,
                timestamp: Date.now()
            })
        }
        ,
        Pm: (a,b)=>{
            a = f.Gh(a);
            if (!a)
                throw new f.pg(8);
            if (0 === (a.flags & 2097155))
                throw new f.pg(28);
            f.truncate(a.node, b)
        }
        ,
        zn: (a,b,c)=>{
            a = f.xg(a, {
                Zg: !0
            }).node;
            a.sg.Hg(a, {
                timestamp: Math.max(b, c)
            })
        }
        ,
        open: (a,b,c)=>{
            if ("" === a)
                throw new f.pg(44);
            b = "string" == typeof b ? f.Ol(b) : b;
            c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
            if ("object" == typeof a)
                var d = a;
            else {
                a = L.normalize(a);
                try {
                    d = f.xg(a, {
                        Zg: !(b & 131072)
                    }).node
                } catch (g) {}
            }
            var e = !1;
            if (b & 64)
                if (d) {
                    if (b & 128)
                        throw new f.pg(20);
                } else
                    d = f.jh(a, c, 0),
                    e = !0;
            if (!d)
                throw new f.pg(44);
            f.zi(d.mode) && (b &= -513);
            if (b & 65536 && !f.Gg(d.mode))
                throw new f.pg(54);
            if (!e && (c = f.Ml(d, b)))
                throw new f.pg(c);
            b & 512 && !e && f.truncate(d, 0);
            b &= -131713;
            d = f.Tj({
                node: d,
                path: f.nh(d),
                flags: b,
                seekable: !0,
                position: 0,
                vg: d.vg,
                sm: [],
                error: !1
            });
            d.vg.open && d.vg.open(d);
            !m.logReadFiles || b & 1 || (f.yj || (f.yj = {}),
            a in f.yj || (f.yj[a] = 1));
            return d
        }
        ,
        close: a=>{
            if (f.ai(a))
                throw new f.pg(8);
            a.jj && (a.jj = null);
            try {
                a.vg.close && a.vg.close(a)
            } catch (b) {
                throw b;
            } finally {
                f.Xk(a.Zh)
            }
            a.Zh = null
        }
        ,
        ai: a=>null === a.Zh,
        ah: (a,b,c)=>{
            if (f.ai(a))
                throw new f.pg(8);
            if (!a.seekable || !a.vg.ah)
                throw new f.pg(70);
            if (0 != c && 1 != c && 2 != c)
                throw new f.pg(28);
            a.position = a.vg.ah(a, b, c);
            a.sm = [];
            return a.position
        }
        ,
        read: (a,b,c,d,e)=>{
            if (0 > d || 0 > e)
                throw new f.pg(28);
            if (f.ai(a))
                throw new f.pg(8);
            if (1 === (a.flags & 2097155))
                throw new f.pg(8);
            if (f.Gg(a.node.mode))
                throw new f.pg(31);
            if (!a.vg.read)
                throw new f.pg(28);
            var g = "undefined" != typeof e;
            if (!g)
                e = a.position;
            else if (!a.seekable)
                throw new f.pg(70);
            b = a.vg.read(a, b, c, d, e);
            g || (a.position += b);
            return b
        }
        ,
        write: (a,b,c,d,e,g)=>{
            if (0 > d || 0 > e)
                throw new f.pg(28);
            if (f.ai(a))
                throw new f.pg(8);
            if (0 === (a.flags & 2097155))
                throw new f.pg(8);
            if (f.Gg(a.node.mode))
                throw new f.pg(31);
            if (!a.vg.write)
                throw new f.pg(28);
            a.seekable && a.flags & 1024 && f.ah(a, 0, 2);
            var h = "undefined" != typeof e;
            if (!h)
                e = a.position;
            else if (!a.seekable)
                throw new f.pg(70);
            b = a.vg.write(a, b, c, d, e, g);
            h || (a.position += b);
            return b
        }
        ,
        Vh: (a,b,c)=>{
            if (f.ai(a))
                throw new f.pg(8);
            if (0 > b || 0 >= c)
                throw new f.pg(28);
            if (0 === (a.flags & 2097155))
                throw new f.pg(8);
            if (!f.isFile(a.node.mode) && !f.Gg(a.node.mode))
                throw new f.pg(43);
            if (!a.vg.Vh)
                throw new f.pg(138);
            a.vg.Vh(a, b, c)
        }
        ,
        Ih: (a,b,c,d,e)=>{
            if (0 !== (d & 2) && 0 === (e & 2) && 2 !== (a.flags & 2097155))
                throw new f.pg(2);
            if (1 === (a.flags & 2097155))
                throw new f.pg(2);
            if (!a.vg.Ih)
                throw new f.pg(43);
            return a.vg.Ih(a, b, c, d, e)
        }
        ,
        Lh: (a,b,c,d,e)=>a && a.vg.Lh ? a.vg.Lh(a, b, c, d, e) : 0,
        gn: ()=>0,
        oj: (a,b,c)=>{
            if (!a.vg.oj)
                throw new f.pg(59);
            return a.vg.oj(a, b, c)
        }
        ,
        pn: (a,b={})=>{
            b.flags = b.flags || 0;
            b.encoding = b.encoding || "binary";
            if ("utf8" !== b.encoding && "binary" !== b.encoding)
                throw Error('Invalid encoding type "' + b.encoding + '"');
            var c, d = f.open(a, b.flags);
            a = f.stat(a).size;
            var e = new Uint8Array(a);
            f.read(d, e, 0, a, 0);
            "utf8" === b.encoding ? c = ra(e, 0) : "binary" === b.encoding && (c = e);
            f.close(d);
            return c
        }
        ,
        Gn: (a,b,c={})=>{
            c.flags = c.flags || 577;
            a = f.open(a, c.flags, c.mode);
            if ("string" == typeof b) {
                var d = new Uint8Array(Oa(b) + 1);
                b = Na(b, d, 0, d.length);
                f.write(a, d, 0, b, D, c.Uk)
            } else if (ArrayBuffer.isView(b))
                f.write(a, b, 0, b.byteLength, D, c.Uk);
            else
                throw Error("Unsupported data type");
            f.close(a)
        }
        ,
        xi: ()=>f.Wj,
        Am: a=>{
            a = f.xg(a, {
                Zg: !0
            });
            if (null === a.node)
                throw new f.pg(44);
            if (!f.Gg(a.node.mode))
                throw new f.pg(54);
            var b = f.yh(a.node, "x");
            if (b)
                throw new f.pg(b);
            f.Wj = a.path
        }
        ,
        Zk: ()=>{
            f.Sg("/tmp");
            f.Sg("/home");
            f.Sg("/home/web_user")
        }
        ,
        Yk: ()=>{
            f.Sg("/dev");
            f.Aj(f.wh(1, 3), {
                read: ()=>0,
                write: (b,c,d,e)=>e
            });
            f.Ji("/dev/null", f.wh(1, 3));
            oa.register(f.wh(5, 0), oa.jl);
            oa.register(f.wh(6, 0), oa.il);
            f.Ji("/dev/tty", f.wh(5, 0));
            f.Ji("/dev/tty1", f.wh(6, 0));
            var a = Nb();
            f.mh("/dev", "random", a);
            f.mh("/dev", "urandom", a);
            f.Sg("/dev/shm");
            f.Sg("/dev/shm/tmp")
        }
        ,
        al: ()=>{
            f.Sg("/proc");
            var a = f.Sg("/proc/self");
            f.Sg("/proc/self/fd");
            f.zg({
                zg: ()=>{
                    var b = f.createNode(a, "fd", 16895, 73);
                    b.sg = {
                        vh: (c,d)=>{
                            var e = f.Gh(+d);
                            if (!e)
                                throw new f.pg(8);
                            c = {
                                parent: null,
                                zg: {
                                    sk: "fake"
                                },
                                sg: {
                                    zh: ()=>e.path
                                }
                            };
                            return c.parent = c
                        }
                    };
                    return b
                }
            }, {}, "/proc/self/fd")
        }
        ,
        bl: ()=>{
            m.stdin ? f.mh("/dev", "stdin", m.stdin) : f.qh("/dev/tty", "/dev/stdin");
            m.stdout ? f.mh("/dev", "stdout", null, m.stdout) : f.qh("/dev/tty", "/dev/stdout");
            m.stderr ? f.mh("/dev", "stderr", null, m.stderr) : f.qh("/dev/tty1", "/dev/stderr");
            f.open("/dev/stdin", 0);
            f.open("/dev/stdout", 1);
            f.open("/dev/stderr", 1)
        }
        ,
        $j: ()=>{
            f.pg || (f.pg = function(a, b) {
                this.node = b;
                this.im = function(c) {
                    this.Yg = c
                }
                ;
                this.im(a);
                this.message = "FS error"
            }
            ,
            f.pg.prototype = Error(),
            f.pg.prototype.constructor = f.pg,
            [44].forEach(a=>{
                f.fj[a] = new f.pg(a);
                f.fj[a].stack = "<generic error, no stack>"
            }
            ))
        }
        ,
        Fj: ()=>{
            f.$j();
            f.bh = Array(4096);
            f.zg(H, {}, "/");
            f.Zk();
            f.Yk();
            f.al();
            f.rl = {
                MEMFS: H
            }
        }
        ,
        hh: (a,b,c)=>{
            f.hh.mj = !0;
            f.$j();
            m.stdin = a || m.stdin;
            m.stdout = b || m.stdout;
            m.stderr = c || m.stderr;
            f.bl()
        }
        ,
        on: ()=>{
            f.hh.mj = !1;
            for (var a = 0; a < f.streams.length; a++) {
                var b = f.streams[a];
                b && f.close(b)
            }
        }
        ,
        hj: (a,b)=>{
            var c = 0;
            a && (c |= 365);
            b && (c |= 146);
            return c
        }
        ,
        Om: (a,b)=>{
            a = f.Ui(a, b);
            return a.cj ? a.object : null
        }
        ,
        Ui: (a,b)=>{
            try {
                var c = f.xg(a, {
                    Zg: !b
                });
                a = c.path
            } catch (e) {}
            var d = {
                Bi: !1,
                cj: !1,
                error: 0,
                name: null,
                path: null,
                object: null,
                Vl: !1,
                Xl: null,
                Wl: null
            };
            try {
                c = f.xg(a, {
                    parent: !0
                }),
                d.Vl = !0,
                d.Xl = c.path,
                d.Wl = c.node,
                d.name = L.lh(a),
                c = f.xg(a, {
                    Zg: !b
                }),
                d.cj = !0,
                d.path = c.path,
                d.object = c.node,
                d.name = c.node.name,
                d.Bi = "/" === c.path
            } catch (e) {
                d.error = e.Yg
            }
            return d
        }
        ,
        Em: (a,b)=>{
            a = "string" == typeof a ? a : f.nh(a);
            for (b = b.split("/").reverse(); b.length; ) {
                var c = b.pop();
                if (c) {
                    var d = L.uh(a, c);
                    try {
                        f.Sg(d)
                    } catch (e) {}
                    a = d
                }
            }
            return d
        }
        ,
        $k: (a,b,c,d,e)=>{
            a = L.uh("string" == typeof a ? a : f.nh(a), b);
            return f.create(a, f.hj(d, e))
        }
        ,
        Sj: (a,b,c,d,e,g)=>{
            var h = b;
            a && (a = "string" == typeof a ? a : f.nh(a),
            h = b ? L.uh(a, b) : a);
            a = f.hj(d, e);
            h = f.create(h, a);
            if (c) {
                if ("string" == typeof c) {
                    b = Array(c.length);
                    d = 0;
                    for (e = c.length; d < e; ++d)
                        b[d] = c.charCodeAt(d);
                    c = b
                }
                f.ui(h, a | 146);
                b = f.open(h, 577);
                f.write(b, c, 0, c.length, 0, g);
                f.close(b);
                f.ui(h, a)
            }
            return h
        }
        ,
        mh: (a,b,c,d)=>{
            a = L.uh("string" == typeof a ? a : f.nh(a), b);
            b = f.hj(!!c, !!d);
            f.mh.rj || (f.mh.rj = 64);
            var e = f.wh(f.mh.rj++, 0);
            f.Aj(e, {
                open: g=>{
                    g.seekable = !1
                }
                ,
                close: ()=>{
                    d && d.buffer && d.buffer.length && d(10)
                }
                ,
                read: (g,h,n,q)=>{
                    for (var u = 0, w = 0; w < q; w++) {
                        try {
                            var z = c()
                        } catch (E) {
                            throw new f.pg(29);
                        }
                        if (z === D && 0 === u)
                            throw new f.pg(6);
                        if (null === z || z === D)
                            break;
                        u++;
                        h[n + w] = z
                    }
                    u && (g.node.timestamp = Date.now());
                    return u
                }
                ,
                write: (g,h,n,q)=>{
                    for (var u = 0; u < q; u++)
                        try {
                            d(h[n + u])
                        } catch (w) {
                            throw new f.pg(29);
                        }
                    q && (g.node.timestamp = Date.now());
                    return u
                }
            });
            return f.Ji(a, b, e)
        }
        ,
        ej: a=>{
            if (a.nk || a.Jl || a.link || a.ug)
                return !0;
            if ("undefined" != typeof XMLHttpRequest)
                throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            if (wc)
                try {
                    a.ug = kb(wc(a.url), !0),
                    a.yg = a.ug.length
                } catch (b) {
                    throw new f.pg(29);
                }
            else
                throw Error("Cannot load without read() or XMLHttpRequest.");
        }
        ,
        Dm: (a,b,c,d,e)=>{
            if ("undefined" != typeof XMLHttpRequest)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            c = {
                nk: !1,
                url: c
            };
            var g = f.$k(a, b, c, d, e);
            c.ug ? g.ug = c.ug : c.url && (g.ug = null,
            g.url = c.url);
            Object.defineProperties(g, {
                yg: {
                    get: function() {
                        return this.ug.length
                    }
                }
            });
            var h = {};
            Object.keys(g.vg).forEach(n=>{
                var q = g.vg[n];
                h[n] = function() {
                    f.ej(g);
                    return q.apply(null, arguments)
                }
            }
            );
            h.read = (n,q,u,w,z)=>{
                f.ej(g);
                n = n.node.ug;
                if (z >= n.length)
                    q = 0;
                else {
                    w = Math.min(n.length - z, w);
                    if (n.slice)
                        for (var E = 0; E < w; E++)
                            q[u + E] = n[z + E];
                    else
                        for (E = 0; E < w; E++)
                            q[u + E] = n.get(z + E);
                    q = w
                }
                return q
            }
            ;
            h.Ih = ()=>{
                f.ej(g);
                da();
                throw new f.pg(48);
            }
            ;
            g.vg = h;
            return g
        }
        ,
        Fm: (a,b,c,d,e,g,h,n,q,u)=>{
            function w(t) {
                function F(M) {
                    u && u();
                    n || f.Sj(a, b, M, d, e, q);
                    g && g();
                    sa(E)
                }
                r.Bl(t, z, F, ()=>{
                    h && h();
                    sa(E)
                }
                ) || F(t)
            }
            var z = b ? na.resolve(L.uh(a, b)) : a
              , E = "cp " + z;
            Pa(E);
            "string" == typeof c ? Ec(c, t=>w(t), h) : w(c)
        }
        ,
        indexedDB: ()=>window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
        Lj: ()=>"EM_FS_" + window.location.pathname,
        Mj: 20,
        Th: "FILE_DATA",
        tn: (a,b,c)=>{
            b = b || (()=>{}
            );
            c = c || (()=>{}
            );
            var d = f.indexedDB();
            try {
                var e = d.open(f.Lj(), f.Mj)
            } catch (g) {
                return c(g)
            }
            e.onupgradeneeded = ()=>{
                Aa("creating db");
                e.result.createObjectStore(f.Th)
            }
            ;
            e.onsuccess = ()=>{
                var g = e.result.transaction([f.Th], "readwrite")
                  , h = g.objectStore(f.Th)
                  , n = 0
                  , q = 0
                  , u = a.length;
                a.forEach(w=>{
                    w = h.put(f.Ui(w).object.ug, w);
                    w.onsuccess = ()=>{
                        n++;
                        n + q == u && (0 == q ? b() : c())
                    }
                    ;
                    w.onerror = ()=>{
                        q++;
                        n + q == u && (0 == q ? b() : c())
                    }
                }
                );
                g.onerror = c
            }
            ;
            e.onerror = c
        }
        ,
        Xm: (a,b,c)=>{
            b = b || (()=>{}
            );
            c = c || (()=>{}
            );
            var d = f.indexedDB();
            try {
                var e = d.open(f.Lj(), f.Mj)
            } catch (g) {
                return c(g)
            }
            e.onupgradeneeded = c;
            e.onsuccess = ()=>{
                var g = e.result;
                try {
                    var h = g.transaction([f.Th], "readonly")
                } catch (z) {
                    c(z);
                    return
                }
                var n = h.objectStore(f.Th)
                  , q = 0
                  , u = 0
                  , w = a.length;
                a.forEach(z=>{
                    var E = n.get(z);
                    E.onsuccess = ()=>{
                        f.Ui(z).cj && f.Rh(z);
                        f.Sj(L.dirname(z), L.lh(z), E.result, !0, !0, !0);
                        q++;
                        q + u == w && (0 == u ? b() : c())
                    }
                    ;
                    E.onerror = ()=>{
                        u++;
                        q + u == w && (0 == u ? b() : c())
                    }
                }
                );
                h.onerror = c
            }
            ;
            e.onerror = c
        }
    }, V = {
        xm: 5,
        Tk: function(a, b, c) {
            if (L.pj(b))
                return b;
            if (-100 === a)
                a = f.xi();
            else {
                a = f.Gh(a);
                if (!a)
                    throw new f.pg(8);
                a = a.path
            }
            if (0 == b.length) {
                if (!c)
                    throw new f.pg(44);
                return a
            }
            return L.uh(a, b)
        },
        Km: function(a, b, c) {
            try {
                var d = a(b)
            } catch (e) {
                if (e && e.node && L.normalize(b) !== L.normalize(f.nh(e.node)))
                    return -54;
                throw e;
            }
            l[c >> 2] = d.ml;
            l[c + 4 >> 2] = 0;
            l[c + 8 >> 2] = d.nj;
            l[c + 12 >> 2] = d.mode;
            l[c + 16 >> 2] = d.Ul;
            l[c + 20 >> 2] = d.uid;
            l[c + 24 >> 2] = d.zl;
            l[c + 28 >> 2] = d.ii;
            l[c + 32 >> 2] = 0;
            U = [d.size >>> 0, (G = d.size,
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[c + 40 >> 2] = U[0];
            l[c + 44 >> 2] = U[1];
            l[c + 48 >> 2] = 4096;
            l[c + 52 >> 2] = d.Sk;
            U = [Math.floor(d.Oj.getTime() / 1E3) >>> 0, (G = Math.floor(d.Oj.getTime() / 1E3),
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[c + 56 >> 2] = U[0];
            l[c + 60 >> 2] = U[1];
            l[c + 64 >> 2] = 0;
            U = [Math.floor(d.tk.getTime() / 1E3) >>> 0, (G = Math.floor(d.tk.getTime() / 1E3),
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[c + 72 >> 2] = U[0];
            l[c + 76 >> 2] = U[1];
            l[c + 80 >> 2] = 0;
            U = [Math.floor(d.Uj.getTime() / 1E3) >>> 0, (G = Math.floor(d.Uj.getTime() / 1E3),
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[c + 88 >> 2] = U[0];
            l[c + 92 >> 2] = U[1];
            l[c + 96 >> 2] = 0;
            U = [d.nj >>> 0, (G = d.nj,
            1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
            l[c + 104 >> 2] = U[0];
            l[c + 108 >> 2] = U[1];
            return 0
        },
        Jm: function(a, b, c, d, e) {
            f.Lh(b, S.slice(a, a + c), e, c, d)
        },
        Sh: D,
        get: function() {
            V.Sh += 4;
            return l[V.Sh - 4 >> 2]
        },
        yl: function(a) {
            return A(a)
        },
        Hh: function(a) {
            a = f.Gh(a);
            if (!a)
                throw new f.pg(8);
            return a
        }
    };
    var lb = ()=>performance.now();
    var r = {
        rg: {
            Cj: !1,
            ph: null,
            method: "",
            Dh: 0,
            Eh: null,
            Vi: 0,
            Pi: 0,
            Qi: 0,
            Zi: 0,
            Ak: [],
            pause: function() {
                r.rg.ph = null;
                r.rg.Dh++
            },
            resume: function() {
                r.rg.Dh++;
                var a = r.rg.Pi
                  , b = r.rg.Qi
                  , c = r.rg.Eh;
                r.rg.Eh = null;
                Pb(c, 0, !1, r.rg.Vi, !0);
                za(a, b);
                r.rg.ph()
            },
            um: function() {
                if (m.setStatus) {
                    var a = m.statusMessage || "Please wait..."
                      , b = r.rg.Bj
                      , c = r.rg.Lm;
                    b ? b < c ? m.setStatus(a + " (" + (c - b) + "/" + c + ")") : m.setStatus(a) : m.setStatus("")
                }
            },
            gm: function(a) {
                ta || m.preMainLoop && !1 === m.preMainLoop() || (Ta(a),
                m.postMainLoop && m.postMainLoop())
            }
        },
        bi: !1,
        wj: !1,
        rk: [],
        Fn: [],
        hh: function() {
            function a() {
                r.wj = document.pointerLockElement === m.canvas || document.mozPointerLockElement === m.canvas || document.webkitPointerLockElement === m.canvas || document.msPointerLockElement === m.canvas
            }
            m.preloadPlugins || (m.preloadPlugins = []);
            if (!r.Gl) {
                r.Gl = !0;
                try {
                    r.yi = !0
                } catch (c) {
                    r.yi = !1,
                    ba("warning: no blob constructor, cannot create blobs with mimetypes")
                }
                r.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : r.yi ? null : ba("warning: no BlobBuilder");
                r.si = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : D;
                m.uk || "undefined" != typeof r.si || (ba("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."),
                m.uk = !0);
                m.preloadPlugins.push({
                    canHandle: function(c) {
                        return !m.uk && /\.(jpg|jpeg|png|bmp)$/i.test(c)
                    },
                    handle: function(c, d, e, g) {
                        var h = null;
                        if (r.yi)
                            try {
                                h = new Blob([c],{
                                    type: r.gj(d)
                                }),
                                h.size !== c.length && (h = new Blob([(new Uint8Array(c)).buffer],{
                                    type: r.gj(d)
                                }))
                            } catch (u) {
                                Ba("Blob constructor present but fails: " + u + "; falling back to blob builder")
                            }
                        h || (h = new r.BlobBuilder,
                        h.append((new Uint8Array(c)).buffer),
                        h = h.getBlob());
                        var n = r.si.createObjectURL(h)
                          , q = new Image;
                        q.onload = ()=>{
                            q.complete || da("Image " + d + " could not be decoded");
                            var u = document.createElement("canvas");
                            u.width = q.width;
                            u.height = q.height;
                            u.getContext("2d").drawImage(q, 0, 0);
                            r.si.revokeObjectURL(n);
                            e && e(c)
                        }
                        ;
                        q.onerror = ()=>{
                            Aa("Image " + n + " could not be decoded");
                            g && g()
                        }
                        ;
                        q.src = n
                    }
                });
                m.preloadPlugins.push({
                    canHandle: function(c) {
                        return !m.hn && c.substr(-4)in {
                            ".ogg": 1,
                            ".wav": 1,
                            ".mp3": 1
                        }
                    },
                    handle: function(c, d, e, g) {
                        function h() {
                            q || (q = !0,
                            e && e(c))
                        }
                        function n() {
                            q || (q = !0,
                            new Audio,
                            g && g())
                        }
                        var q = !1;
                        if (r.yi) {
                            try {
                                var u = new Blob([c],{
                                    type: r.gj(d)
                                })
                            } catch (z) {
                                return n()
                            }
                            u = r.si.createObjectURL(u);
                            var w = new Audio;
                            w.addEventListener("canplaythrough", ()=>h(w), !1);
                            w.onerror = function() {
                                if (!q) {
                                    ba("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
                                    for (var z = "", E = 0, t = 0, F = 0; F < c.length; F++)
                                        for (E = E << 8 | c[F],
                                        t += 8; 6 <= t; ) {
                                            var M = E >> t - 6 & 63;
                                            t -= 6;
                                            z += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[M]
                                        }
                                    2 == t ? (z += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(E & 3) << 4],
                                    z += "==") : 4 == t && (z += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(E & 15) << 2],
                                    z += "=");
                                    w.src = "data:audio/x-" + d.substr(-3) + ";base64," + z;
                                    h(w)
                                }
                            }
                            ;
                            w.src = u;
                            Qb(function() {
                                h(w)
                            }, 1E4)
                        } else
                            return n()
                    }
                });
                var b = m.canvas;
                b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || (()=>{}
                ),
                b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || (()=>{}
                ),
                b.exitPointerLock = b.exitPointerLock.bind(document),
                document.addEventListener("pointerlockchange", a, !1),
                document.addEventListener("mozpointerlockchange", a, !1),
                document.addEventListener("webkitpointerlockchange", a, !1),
                document.addEventListener("mspointerlockchange", a, !1),
                m.elementPointerLock && b.addEventListener("click", c=>{
                    !r.wj && m.canvas.requestPointerLock && (m.canvas.requestPointerLock(),
                    c.preventDefault())
                }
                , !1))
            }
        },
        Bl: function(a, b, c, d) {
            r.hh();
            var e = !1;
            m.preloadPlugins.forEach(function(g) {
                !e && g.canHandle(b) && (g.handle(a, b, c, d),
                e = !0)
            });
            return e
        },
        Xh: function(a, b, c, d) {
            if (b && m.Wg && a == m.canvas)
                return m.Wg;
            var e;
            if (b) {
                var g = {
                    antialias: !1,
                    alpha: !1,
                    sj: 2
                };
                if (d)
                    for (var h in d)
                        g[h] = d[h];
                if ("undefined" != typeof p && (e = p.Xh(a, g)))
                    var n = p.getContext(e).kh
            } else
                n = a.getContext("2d");
            if (!n)
                return null;
            c && (b || "undefined" == typeof k || da("cannot set in module if GLctx is used, but we are a non-GL context that would replace it"),
            m.Wg = n,
            b && p.di(e),
            m.vm = b,
            r.rk.forEach(function(q) {
                q()
            }),
            r.hh());
            return n
        },
        Hm: function() {},
        ek: !1,
        Di: D,
        Ph: D,
        requestFullscreen: function(a, b) {
            function c() {
                r.bi = !1;
                var g = d.parentNode;
                (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === g ? (d.exitFullscreen = r.exitFullscreen,
                r.Di && d.requestPointerLock(),
                r.bi = !0,
                r.Ph ? r.jm() : r.pi(d)) : (g.parentNode.insertBefore(d, g),
                g.parentNode.removeChild(g),
                r.Ph ? r.km() : r.pi(d));
                if (m.onFullScreen)
                    m.onFullScreen(r.bi);
                if (m.onFullscreen)
                    m.onFullscreen(r.bi)
            }
            r.Di = a;
            r.Ph = b;
            "undefined" == typeof r.Di && (r.Di = !0);
            "undefined" == typeof r.Ph && (r.Ph = !1);
            var d = m.canvas;
            r.ek || (r.ek = !0,
            document.addEventListener("fullscreenchange", c, !1),
            document.addEventListener("mozfullscreenchange", c, !1),
            document.addEventListener("webkitfullscreenchange", c, !1),
            document.addEventListener("MSFullscreenChange", c, !1));
            var e = document.createElement("div");
            d.parentNode.insertBefore(e, d);
            e.appendChild(d);
            e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? ()=>e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (e.webkitRequestFullScreen ? ()=>e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
            e.requestFullscreen()
        },
        exitFullscreen: function() {
            if (!r.bi)
                return !1;
            (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}
            ).apply(document, []);
            return !0
        },
        Mh: 0,
        ql: function(a) {
            var b = Date.now();
            if (0 === r.Mh)
                r.Mh = b + 1E3 / 60;
            else
                for (; b + 2 >= r.Mh; )
                    r.Mh += 1E3 / 60;
            setTimeout(a, Math.max(r.Mh - b, 0))
        },
        requestAnimationFrame: function(a) {
            if ("function" == typeof requestAnimationFrame)
                requestAnimationFrame(a);
            else {
                var b = r.ql;
                b(a)
            }
        },
        sn: function(a) {
            return Qb(a)
        },
        rn: function(a) {
            return r.requestAnimationFrame(function() {
                Ta(a)
            })
        },
        gj: function(a) {
            return {
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                bmp: "image/bmp",
                ogg: "audio/ogg",
                wav: "audio/wav",
                mp3: "audio/mpeg"
            }[a.substr(a.lastIndexOf(".") + 1)]
        },
        getUserMedia: function(a) {
            window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
            window.getUserMedia(a)
        },
        vl: function(a) {
            return a.movementX || a.mozMovementX || a.webkitMovementX || 0
        },
        wl: function(a) {
            return a.movementY || a.mozMovementY || a.webkitMovementY || 0
        },
        Rm: function(a) {
            switch (a.type) {
            case "DOMMouseScroll":
                var b = a.detail / 3;
                break;
            case "mousewheel":
                b = a.wheelDelta / 120;
                break;
            case "wheel":
                b = a.deltaY;
                switch (a.deltaMode) {
                case 0:
                    b /= 100;
                    break;
                case 1:
                    b /= 3;
                    break;
                case 2:
                    b *= 80;
                    break;
                default:
                    throw "unrecognized mouse wheel delta mode: " + a.deltaMode;
                }
                break;
            default:
                throw "unrecognized mouse wheel event: " + a.type;
            }
            return b
        },
        Jh: 0,
        Kh: 0,
        gi: 0,
        hi: 0,
        touches: {},
        qk: {},
        zm: function(a) {
            if (r.wj)
                "mousemove" != a.type && "mozMovementX"in a ? r.gi = r.hi = 0 : (r.gi = r.vl(a),
                r.hi = r.wl(a)),
                "undefined" != typeof SDL ? (r.Jh = SDL.Jh + r.gi,
                r.Kh = SDL.Kh + r.hi) : (r.Jh += r.gi,
                r.Kh += r.hi);
            else {
                var b = m.canvas.getBoundingClientRect()
                  , c = m.canvas.width
                  , d = m.canvas.height
                  , e = "undefined" != typeof window.scrollX ? window.scrollX : window.pageXOffset
                  , g = "undefined" != typeof window.scrollY ? window.scrollY : window.pageYOffset;
                if ("touchstart" === a.type || "touchend" === a.type || "touchmove" === a.type) {
                    var h = a.wn;
                    if (h !== D)
                        if (e = h.pageX - (e + b.left),
                        g = h.pageY - (g + b.top),
                        e *= c / b.width,
                        g *= d / b.height,
                        b = {
                            x: e,
                            y: g
                        },
                        "touchstart" === a.type)
                            r.qk[h.identifier] = b,
                            r.touches[h.identifier] = b;
                        else if ("touchend" === a.type || "touchmove" === a.type)
                            (a = r.touches[h.identifier]) || (a = b),
                            r.qk[h.identifier] = a,
                            r.touches[h.identifier] = b
                } else
                    h = a.pageX - (e + b.left),
                    a = a.pageY - (g + b.top),
                    h *= c / b.width,
                    a *= d / b.height,
                    r.gi = h - r.Jh,
                    r.hi = a - r.Kh,
                    r.Jh = h,
                    r.Kh = a
            }
        },
        fm: [],
        Jj: function() {
            var a = m.canvas;
            r.fm.forEach(function(b) {
                b(a.width, a.height)
            })
        },
        hm: function(a, b, c) {
            r.pi(m.canvas, a, b);
            c || r.Jj()
        },
        En: 0,
        Dn: 0,
        jm: function() {
            "undefined" != typeof SDL && (l[SDL.screen >> 2] = B[SDL.screen >> 2] | 8388608);
            r.pi(m.canvas);
            r.Jj()
        },
        km: function() {
            "undefined" != typeof SDL && (l[SDL.screen >> 2] = B[SDL.screen >> 2] & -8388609);
            r.pi(m.canvas);
            r.Jj()
        },
        pi: function(a, b, c) {
            b && c ? (a.wm = b,
            a.Cl = c) : (b = a.wm,
            c = a.Cl);
            var d = b
              , e = c;
            m.forcedAspectRatio && 0 < m.forcedAspectRatio && (d / e < m.forcedAspectRatio ? d = Math.round(e * m.forcedAspectRatio) : e = Math.round(d / m.forcedAspectRatio));
            if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
                var g = Math.min(screen.width / d, screen.height / e);
                d = Math.round(d * g);
                e = Math.round(e * g)
            }
            r.Ph ? (a.width != d && (a.width = d),
            a.height != e && (a.height = e),
            "undefined" != typeof a.style && (a.style.removeProperty("width"),
            a.style.removeProperty("height"))) : (a.width != b && (a.width = b),
            a.height != c && (a.height = c),
            "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"),
            a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"),
            a.style.removeProperty("height"))))
        }
    }
      , x = {
        errorCode: 12288,
        aj: !1,
        Eg: 0,
        wi: 0,
        vi: 0,
        Dg: {
            alpha: !1,
            depth: !1,
            stencil: !1,
            antialias: !1
        },
        Qh: {},
        tg: function(a) {
            x.errorCode = a
        },
        Vk: function(a, b, c, d, e) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (b)
                for (; ; ) {
                    a = l[b >> 2];
                    if (12321 == a)
                        x.Dg.alpha = 0 < l[b + 4 >> 2];
                    else if (12325 == a)
                        x.Dg.depth = 0 < l[b + 4 >> 2];
                    else if (12326 == a)
                        x.Dg.stencil = 0 < l[b + 4 >> 2];
                    else if (12337 == a)
                        a = l[b + 4 >> 2],
                        x.Dg.antialias = 0 < a;
                    else if (12338 == a)
                        a = l[b + 4 >> 2],
                        x.Dg.antialias = 1 == a;
                    else if (12544 == a)
                        x.Dg.Ym = 12547 != l[b + 4 >> 2];
                    else if (12344 == a)
                        break;
                    b += 8
                }
            if (!(c && d || e))
                return x.tg(12300),
                0;
            e && (l[e >> 2] = 1);
            c && 0 < d && (l[c >> 2] = 62002);
            x.tg(12288);
            return 1
        }
    }
      , p = {
        counter: 1,
        sh: [],
        wg: [],
        $h: [],
        Oh: [],
        Ah: [],
        Ig: [],
        fh: [],
        Vg: [],
        jn: {},
        Cg: [],
        Ug: [],
        ni: [],
        rh: [],
        Qh: {},
        Fk: {},
        tm: 4,
        qg: function(a) {
            p.qj || (p.qj = a)
        },
        Fh: function(a) {
            for (var b = p.counter++, c = a.length; c < b; c++)
                a[c] = null;
            return b
        },
        xl: function(a, b, c, d) {
            a = "";
            for (var e = 0; e < b; ++e) {
                var g = d ? l[d + 4 * e >> 2] : -1;
                a += A(l[c + 4 * e >> 2], 0 > g ? D : g)
            }
            return a
        },
        Xh: function(a, b) {
            a.gk || (a.gk = a.getContext,
            a.getContext = function(d, e) {
                e = a.gk(d, e);
                return "webgl" == d == e instanceof WebGLRenderingContext ? e : null
            }
            );
            var c = a.getContext("webgl2", b);
            return c ? p.$l(c, b) : 0
        },
        $l: function(a, b) {
            var c = p.Fh(p.Vg)
              , d = {
                Sm: c,
                attributes: b,
                version: b.sj,
                kh: a
            };
            a.canvas && (a.canvas.Uh = d);
            p.Vg[c] = d;
            ("undefined" == typeof b.Zj || b.Zj) && p.El(d);
            return c
        },
        di: function(a) {
            p.Eg = p.Vg[a];
            m.Wg = k = p.Eg && p.Eg.kh;
            return !(a && !k)
        },
        getContext: function(a) {
            return p.Vg[a]
        },
        ll: function(a) {
            p.Eg === p.Vg[a] && (p.Eg = null);
            "object" == typeof v && v.cm(p.Vg[a].kh.canvas);
            p.Vg[a] && p.Vg[a].kh.canvas && (p.Vg[a].kh.canvas.Uh = D);
            p.Vg[a] = null
        },
        El: function(a) {
            a || (a = p.Eg);
            if (!a.Fl) {
                a.Fl = !0;
                var b = a.kh;
                b.Im = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                b.$m = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                2 <= a.version && (b.Lg = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                if (2 > a.version || !b.Lg)
                    b.Lg = b.getExtension("EXT_disjoint_timer_query");
                b.fn = b.getExtension("WEBGL_multi_draw");
                (b.getSupportedExtensions() || []).forEach(function(c) {
                    c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                })
            }
        }
    }
      , mb = []
      , v = {
        lj: 0,
        bm: function() {
            for (var a = v.Qg.length - 1; 0 <= a; --a)
                v.Ti(a);
            v.Qg = [];
            v.Pg = []
        },
        am: function() {
            v.dm || (Uc.push(v.bm),
            v.dm = !0)
        },
        Pg: [],
        Xj: function(a, b, c) {
            function d(h, n) {
                if (h.length != n.length)
                    return !1;
                for (var q in h)
                    if (h[q] != n[q])
                        return !1;
                return !0
            }
            for (var e in v.Pg) {
                var g = v.Pg[e];
                if (g.Gj == a && d(g.Nj, c))
                    return
            }
            v.Pg.push({
                Gj: a,
                zk: b,
                Nj: c
            });
            v.Pg.sort(function(h, n) {
                return h.zk < n.zk
            })
        },
        Dk: function(a) {
            for (var b = 0; b < v.Pg.length; ++b)
                v.Pg[b].Gj == a && (v.Pg.splice(b, 1),
                --b)
        },
        Wi: function() {
            return v.lj && v.dl.Wh
        },
        Ek: function() {
            if (v.Wi())
                for (var a = 0; a < v.Pg.length; ++a) {
                    var b = v.Pg[a];
                    v.Pg.splice(a, 1);
                    --a;
                    b.Gj.apply(null, b.Nj)
                }
        },
        Qg: [],
        cm: function(a, b) {
            for (var c = 0; c < v.Qg.length; ++c)
                v.Qg[c].target != a || b && b != v.Qg[c].Fg || v.Ti(c--)
        },
        Ti: function(a) {
            var b = v.Qg[a];
            b.target.removeEventListener(b.Fg, b.ol, b.Ng);
            v.Qg.splice(a, 1)
        },
        Tg: function(a) {
            function b(d) {
                ++v.lj;
                v.dl = a;
                v.Ek();
                a.Rg(d);
                v.Ek();
                --v.lj
            }
            if (a.Og)
                a.ol = b,
                a.target.addEventListener(a.Fg, b, a.Ng),
                v.Qg.push(a),
                v.am();
            else
                for (var c = 0; c < v.Qg.length; ++c)
                    v.Qg[c].target == a.target && v.Qg[c].Fg == a.Fg && v.Ti(c--)
        },
        ij: function(a) {
            return a ? a == window ? "#window" : a == screen ? "#screen" : a && a.nodeName ? a.nodeName : "" : ""
        },
        fullscreenEnabled: function() {
            return document.fullscreenEnabled || document.webkitFullscreenEnabled
        }
    }
      , Wa = {}
      , Ua = [0, document, window]
      , wa = []
      , O = {
        Kj: [],
        Kg: function(a, b) {
            B[a >> 2] = b;
            B[a + 4 >> 2] = b / 4294967296 | 0
        },
        openDatabase: function(a, b, c, d) {
            try {
                var e = indexedDB.open(a, b)
            } catch (g) {
                return d(g)
            }
            e.onupgradeneeded = g=>{
                g = g.target.result;
                g.objectStoreNames.contains("FILES") && g.deleteObjectStore("FILES");
                g.createObjectStore("FILES")
            }
            ;
            e.onsuccess = g=>c(g.target.result);
            e.onerror = g=>d(g)
        },
        Fj: function() {
            O.openDatabase("emscripten_filesystem", 1, a=>{
                O.Yh = a;
                sa("library_fetch_init")
            }
            , ()=>{
                O.Yh = !1;
                sa("library_fetch_init")
            }
            );
            "undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || Pa("library_fetch_init")
        }
    }
      , Vc = ["default", "low-power", "high-performance"]
      , tb = {}
      , hc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      , ic = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    Object.defineProperties(Bb.prototype, {
        read: {
            get: function() {
                return 365 === (this.mode & 365)
            },
            set: function(a) {
                a ? this.mode |= 365 : this.mode &= -366
            }
        },
        write: {
            get: function() {
                return 146 === (this.mode & 146)
            },
            set: function(a) {
                a ? this.mode |= 146 : this.mode &= -147
            }
        },
        Jl: {
            get: function() {
                return f.Gg(this.mode)
            }
        },
        nk: {
            get: function() {
                return f.zi(this.mode)
            }
        }
    });
    f.Pk = Bb;
    f.Fj();
    m.requestFullscreen = function(a, b) {
        r.requestFullscreen(a, b)
    }
    ;
    m.requestAnimationFrame = function(a) {
        r.requestAnimationFrame(a)
    }
    ;
    m.setCanvasSize = function(a, b, c) {
        r.hm(a, b, c)
    }
    ;
    m.pauseMainLoop = function() {
        r.rg.pause()
    }
    ;
    m.resumeMainLoop = function() {
        r.rg.resume()
    }
    ;
    m.getUserMedia = function() {
        r.getUserMedia()
    }
    ;
    m.createContext = function(a, b, c, d) {
        return r.Xh(a, b, c, d)
    }
    ;
    for (var k, Ab = 0; 32 > Ab; ++Ab)
        wa.push(Array(Ab));
    O.Fj();
    var Xc = {
        M: function(a, b, c) {
            V.Sh = c;
            try {
                var d = V.Hh(a);
                switch (b) {
                case 0:
                    var e = V.get();
                    return 0 > e ? -28 : f.Tj(d, e).Zh;
                case 1:
                case 2:
                    return 0;
                case 3:
                    return d.flags;
                case 4:
                    return e = V.get(),
                    d.flags |= e,
                    0;
                case 5:
                    return e = V.get(),
                    ua[e + 0 >> 1] = 2,
                    0;
                case 6:
                case 7:
                    return 0;
                case 16:
                case 8:
                    return -28;
                case 9:
                    return -1;
                default:
                    return -28
                }
            } catch (g) {
                if ("undefined" == typeof f || !(g instanceof f.pg))
                    throw g;
                return -g.Yg
            }
        },
        Ma: function(a, b, c) {
            V.Sh = c;
            try {
                var d = V.Hh(a);
                switch (b) {
                case 21509:
                case 21505:
                    return d.Ag ? 0 : -59;
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508:
                    return d.Ag ? 0 : -59;
                case 21519:
                    if (!d.Ag)
                        return -59;
                    var e = V.get();
                    return l[e >> 2] = 0;
                case 21520:
                    return d.Ag ? -28 : -59;
                case 21531:
                    return e = V.get(),
                    f.oj(d, b, e);
                case 21523:
                    return d.Ag ? 0 : -59;
                case 21524:
                    return d.Ag ? 0 : -59;
                default:
                    da("bad ioctl syscall " + b)
                }
            } catch (g) {
                if ("undefined" == typeof f || !(g instanceof f.pg))
                    throw g;
                return -g.Yg
            }
        },
        Na: function(a, b, c, d) {
            V.Sh = d;
            try {
                b = V.yl(b);
                b = V.Tk(a, b);
                var e = d ? V.get() : 0;
                return f.open(b, c, e).Zh
            } catch (g) {
                if ("undefined" == typeof f || !(g instanceof f.pg))
                    throw g;
                return -g.Yg
            }
        },
        Pa: function() {
            return Date.now()
        },
        e: function(a) {
            delete O.Kj[a - 1]
        },
        Oa: function() {
            return !0
        },
        b: function() {
            da("")
        },
        La: function(a) {
            if (12448 == a)
                return x.tg(12288),
                1;
            x.tg(12300);
            return 0
        },
        Xc: function(a, b, c, d, e) {
            return x.Vk(a, b, c, d, e)
        },
        Bc: function(a, b, c, d) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            for (a = 1; ; ) {
                b = l[d >> 2];
                if (12440 == b)
                    a = l[d + 4 >> 2];
                else if (12344 == b)
                    break;
                else
                    return x.tg(12292),
                    0;
                d += 8
            }
            if (2 > a || 3 < a)
                return x.tg(12293),
                0;
            x.Dg.sj = a - 1;
            x.Dg.Nl = 0;
            x.context = p.Xh(m.canvas, x.Dg);
            if (0 != x.context)
                return x.tg(12288),
                p.di(x.context),
                m.vm = !0,
                r.rk.forEach(function(e) {
                    e()
                }),
                p.di(null),
                62004;
            x.tg(12297);
            return 0
        },
        fc: function(a, b) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (62002 != b)
                return x.tg(12293),
                0;
            x.tg(12288);
            return 62006
        },
        qc: function(a, b) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (62004 != b)
                return x.tg(12294),
                0;
            p.ll(x.context);
            x.tg(12288);
            x.Eg == b && (x.Eg = 0);
            return 1
        },
        Wb: function(a, b) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (62006 != b)
                return x.tg(12301),
                1;
            x.wi == b && (x.wi = 0);
            x.vi == b && (x.vi = 0);
            x.tg(12288);
            return 1
        },
        Mc: function(a, b, c, d) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (62002 != b)
                return x.tg(12293),
                0;
            if (!d)
                return x.tg(12300),
                0;
            x.tg(12288);
            switch (c) {
            case 12320:
                return l[d >> 2] = x.Dg.alpha ? 32 : 24,
                1;
            case 12321:
                return l[d >> 2] = x.Dg.alpha ? 8 : 0,
                1;
            case 12322:
                return l[d >> 2] = 8,
                1;
            case 12323:
                return l[d >> 2] = 8,
                1;
            case 12324:
                return l[d >> 2] = 8,
                1;
            case 12325:
                return l[d >> 2] = x.Dg.depth ? 24 : 0,
                1;
            case 12326:
                return l[d >> 2] = x.Dg.stencil ? 8 : 0,
                1;
            case 12327:
                return l[d >> 2] = 12344,
                1;
            case 12328:
                return l[d >> 2] = 62002,
                1;
            case 12329:
                return l[d >> 2] = 0,
                1;
            case 12330:
                return l[d >> 2] = 4096,
                1;
            case 12331:
                return l[d >> 2] = 16777216,
                1;
            case 12332:
                return l[d >> 2] = 4096,
                1;
            case 12333:
                return l[d >> 2] = 0,
                1;
            case 12334:
                return l[d >> 2] = 0,
                1;
            case 12335:
                return l[d >> 2] = 12344,
                1;
            case 12337:
                return l[d >> 2] = x.Dg.antialias ? 4 : 0,
                1;
            case 12338:
                return l[d >> 2] = x.Dg.antialias ? 1 : 0,
                1;
            case 12339:
                return l[d >> 2] = 4,
                1;
            case 12340:
                return l[d >> 2] = 12344,
                1;
            case 12341:
            case 12342:
            case 12343:
                return l[d >> 2] = -1,
                1;
            case 12345:
            case 12346:
                return l[d >> 2] = 0,
                1;
            case 12347:
                return l[d >> 2] = 0,
                1;
            case 12348:
                return l[d >> 2] = 1;
            case 12349:
            case 12350:
                return l[d >> 2] = 0,
                1;
            case 12351:
                return l[d >> 2] = 12430,
                1;
            case 12352:
                return l[d >> 2] = 4,
                1;
            case 12354:
                return l[d >> 2] = 0,
                1;
            default:
                return x.tg(12292),
                0
            }
        },
        N: function() {
            x.tg(12288);
            return 62E3
        },
        Ca: function() {
            return x.errorCode
        },
        rd: function(a, b, c) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            b && (l[b >> 2] = 1);
            c && (l[c >> 2] = 4);
            x.aj = !0;
            x.tg(12288);
            return 1
        },
        Kb: function(a, b, c, d) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            if (0 != d && 62004 != d)
                return x.tg(12294),
                0;
            if (0 != c && 62006 != c || 0 != b && 62006 != b)
                return x.tg(12301),
                0;
            p.di(d ? x.context : null);
            x.Eg = d;
            x.vi = b;
            x.wi = c;
            x.tg(12288);
            return 1
        },
        Da: function(a, b) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            x.tg(12288);
            if (x.Qh[b])
                return x.Qh[b];
            switch (b) {
            case 12371:
                a = Ca("Emscripten");
                break;
            case 12372:
                a = Ca("1.4 Emscripten EGL");
                break;
            case 12373:
                a = Ca("");
                break;
            case 12429:
                a = Ca("OpenGL_ES");
                break;
            default:
                return x.tg(12300),
                0
            }
            return x.Qh[b] = a
        },
        zb: function() {
            if (x.aj)
                if (m.Wg)
                    if (m.Wg.isContextLost())
                        x.tg(12302);
                    else
                        return x.tg(12288),
                        1;
                else
                    x.tg(12290);
            else
                x.tg(12289);
            return 0
        },
        ob: function(a, b) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            0 == b ? za(0, 0) : za(1, b);
            x.tg(12288);
            return 1
        },
        gd: function(a) {
            if (62E3 != a)
                return x.tg(12296),
                0;
            x.Eg = 0;
            x.wi = 0;
            x.vi = 0;
            x.aj = !1;
            x.tg(12288);
            return 1
        },
        Ua: function() {
            x.tg(12288);
            return 1
        },
        db: function() {
            x.tg(12288);
            return 1
        },
        c: Sb,
        a: Sb,
        d: function(a, b, c) {
            b = Rb(b, c);
            return Tb[a].apply(null, b)
        },
        ua: function() {
            if (!v.fullscreenEnabled())
                return -1;
            v.Dk(ob);
            var a = Ua[1];
            if (a.exitFullscreen)
                a.fullscreenElement && a.exitFullscreen();
            else if (a.webkitExitFullscreen)
                a.webkitFullscreenElement && a.webkitExitFullscreen();
            else
                return -1;
            return 0
        },
        za: function() {
            v.Dk(pb);
            if (document.exitPointerLock)
                document.exitPointerLock();
            else if (document.Pl)
                document.Pl();
            else
                return -1;
            return 0
        },
        df: function() {
            throw "unwind";
        },
        h: function() {
            return devicePixelRatio
        },
        f: function(a, b, c) {
            a = aa(a);
            if (!a)
                return -4;
            a = Xa(a);
            ea[b >> 3] = a.width;
            ea[c >> 3] = a.height;
            return 0
        },
        oe: function(a, b) {
            if (0 > a || a >= v.Ci.length)
                return -5;
            if (!v.Ci[a])
                return -7;
            Xb(b, v.Ci[a]);
            return 0
        },
        m: lb,
        ze: function() {
            return v.Ci.length
        },
        Ba: function(a, b) {
            l[a >> 2] = screen.width;
            l[b >> 2] = screen.height
        },
        Y: function(a) {
            k.activeTexture(a)
        },
        X: function(a, b) {
            k.attachShader(p.wg[a], p.Ig[b])
        },
        Lc: function(a, b) {
            k.beginQuery(a, p.Cg[b])
        },
        na: function(a, b) {
            k.Lg.beginQueryEXT(a, p.Cg[b])
        },
        rc: function(a) {
            k.beginTransformFeedback(a)
        },
        W: function(a, b, c) {
            k.bindAttribLocation(p.wg[a], b, A(c))
        },
        V: function(a, b) {
            35051 == a ? k.$i = b : 35052 == a && (k.Xg = b);
            k.bindBuffer(a, p.sh[b])
        },
        nc: function(a, b, c) {
            k.bindBufferBase(a, b, p.sh[c])
        },
        oc: function(a, b, c, d, e) {
            k.bindBufferRange(a, b, p.sh[c], d, e)
        },
        U: function(a, b) {
            k.bindFramebuffer(a, p.$h[b])
        },
        T: function(a, b) {
            k.bindRenderbuffer(a, p.Oh[b])
        },
        qb: function(a, b) {
            k.bindSampler(a, p.Ug[b])
        },
        S: function(a, b) {
            k.bindTexture(a, p.Ah[b])
        },
        hb: function(a, b) {
            k.bindTransformFeedback(a, p.ni[b])
        },
        wc: function(a) {
            k.bindVertexArray(p.fh[a])
        },
        fa: function(a) {
            k.bindVertexArray(p.fh[a])
        },
        R: function(a, b, c, d) {
            k.blendColor(a, b, c, d)
        },
        Q: function(a) {
            k.blendEquation(a)
        },
        P: function(a, b) {
            k.blendEquationSeparate(a, b)
        },
        Kf: function(a, b) {
            k.blendFunc(a, b)
        },
        Jf: function(a, b, c, d) {
            k.blendFuncSeparate(a, b, c, d)
        },
        zc: function(a, b, c, d, e, g, h, n, q, u) {
            k.blitFramebuffer(a, b, c, d, e, g, h, n, q, u)
        },
        If: function(a, b, c, d) {
            c && b ? k.bufferData(a, S, d, c, b) : k.bufferData(a, b, d)
        },
        Hf: function(a, b, c, d) {
            c && k.bufferSubData(a, b, S, d, c)
        },
        Gf: function(a) {
            return k.checkFramebufferStatus(a)
        },
        Ff: function(a) {
            k.clear(a)
        },
        Qb: function(a, b, c, d) {
            k.clearBufferfi(a, b, c, d)
        },
        Rb: function(a, b, c) {
            k.clearBufferfv(a, b, I, c >> 2)
        },
        Tb: function(a, b, c) {
            k.clearBufferiv(a, b, l, c >> 2)
        },
        Sb: function(a, b, c) {
            k.clearBufferuiv(a, b, B, c >> 2)
        },
        Ef: function(a, b, c, d) {
            k.clearColor(a, b, c, d)
        },
        Df: function(a) {
            k.clearDepth(a)
        },
        Cf: function(a) {
            k.clearStencil(a)
        },
        Ab: function(a, b, c, d) {
            return k.clientWaitSync(p.rh[a], b, (c >>> 0) + 4294967296 * d)
        },
        Bf: function(a, b, c, d) {
            k.colorMask(!!a, !!b, !!c, !!d)
        },
        zf: function(a) {
            k.compileShader(p.Ig[a])
        },
        yf: function(a, b, c, d, e, g, h, n) {
            k.Xg || !h ? k.compressedTexImage2D(a, b, c, d, e, g, h, n) : k.compressedTexImage2D(a, b, c, d, e, g, S, n, h)
        },
        Rc: function(a, b, c, d, e, g, h, n, q) {
            k.Xg ? k.compressedTexImage3D(a, b, c, d, e, g, h, n, q) : k.compressedTexImage3D(a, b, c, d, e, g, h, S, q, n)
        },
        xf: function(a, b, c, d, e, g, h, n, q) {
            k.Xg || !n ? k.compressedTexSubImage2D(a, b, c, d, e, g, h, n, q) : k.compressedTexSubImage2D(a, b, c, d, e, g, h, S, q, n)
        },
        Qc: function(a, b, c, d, e, g, h, n, q, u, w) {
            k.Xg ? k.compressedTexSubImage3D(a, b, c, d, e, g, h, n, q, u, w) : k.compressedTexSubImage3D(a, b, c, d, e, g, h, n, q, S, w, u)
        },
        Ob: function(a, b, c, d, e) {
            k.copyBufferSubData(a, b, c, d, e)
        },
        wf: function(a, b, c, d, e, g, h, n) {
            k.copyTexImage2D(a, b, c, d, e, g, h, n)
        },
        vf: function(a, b, c, d, e, g, h, n) {
            k.copyTexSubImage2D(a, b, c, d, e, g, h, n)
        },
        Sc: function(a, b, c, d, e, g, h, n, q) {
            k.copyTexSubImage3D(a, b, c, d, e, g, h, n, q)
        },
        uf: function() {
            var a = p.Fh(p.wg)
              , b = k.createProgram();
            b.name = a;
            b.Gi = b.Ei = b.Fi = 0;
            b.Ij = 1;
            p.wg[a] = b;
            return a
        },
        tf: function(a) {
            var b = p.Fh(p.Ig);
            p.Ig[b] = k.createShader(a);
            return b
        },
        sf: function(a) {
            k.cullFace(a)
        },
        rf: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.sh[d];
                e && (k.deleteBuffer(e),
                e.name = 0,
                p.sh[d] = null,
                d == k.$i && (k.$i = 0),
                d == k.Xg && (k.Xg = 0))
            }
        },
        qf: function(a, b) {
            for (var c = 0; c < a; ++c) {
                var d = l[b + 4 * c >> 2]
                  , e = p.$h[d];
                e && (k.deleteFramebuffer(e),
                e.name = 0,
                p.$h[d] = null)
            }
        },
        of: function(a) {
            if (a) {
                var b = p.wg[a];
                b ? (k.deleteProgram(b),
                b.name = 0,
                p.wg[a] = null) : p.qg(1281)
            }
        },
        Oc: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.Cg[d];
                e && (k.deleteQuery(e),
                p.Cg[d] = null)
            }
        },
        pa: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.Cg[d];
                e && (k.Lg.deleteQueryEXT(e),
                p.Cg[d] = null)
            }
        },
        nf: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.Oh[d];
                e && (k.deleteRenderbuffer(e),
                e.name = 0,
                p.Oh[d] = null)
            }
        },
        sb: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.Ug[d];
                e && (k.deleteSampler(e),
                e.name = 0,
                p.Ug[d] = null)
            }
        },
        mf: function(a) {
            if (a) {
                var b = p.Ig[a];
                b ? (k.deleteShader(b),
                p.Ig[a] = null) : p.qg(1281)
            }
        },
        Bb: function(a) {
            if (a) {
                var b = p.rh[a];
                b ? (k.deleteSync(b),
                b.name = 0,
                p.rh[a] = null) : p.qg(1281)
            }
        },
        lf: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.Ah[d];
                e && (k.deleteTexture(e),
                e.name = 0,
                p.Ah[d] = null)
            }
        },
        gb: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2]
                  , e = p.ni[d];
                e && (k.deleteTransformFeedback(e),
                e.name = 0,
                p.ni[d] = null)
            }
        },
        vc: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2];
                k.deleteVertexArray(p.fh[d]);
                p.fh[d] = null
            }
        },
        ea: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = l[b + 4 * c >> 2];
                k.deleteVertexArray(p.fh[d]);
                p.fh[d] = null
            }
        },
        kf: function(a) {
            k.depthFunc(a)
        },
        jf: function(a) {
            k.depthMask(!!a)
        },
        hf: function(a, b) {
            k.depthRange(a, b)
        },
        gf: function(a, b) {
            k.detachShader(p.wg[a], p.Ig[b])
        },
        ff: function(a) {
            k.disable(a)
        },
        ef: function(a) {
            k.disableVertexAttribArray(a)
        },
        cf: function(a, b, c) {
            k.drawArrays(a, b, c)
        },
        Fb: function(a, b, c, d) {
            k.drawArraysInstanced(a, b, c, d)
        },
        aa: function(a, b, c, d) {
            k.drawArraysInstanced(a, b, c, d)
        },
        ad: function(a, b, c, d) {
            k.drawArraysInstanced(a, b, c, d)
        },
        bd: function(a, b, c, d) {
            k.drawArraysInstanced(a, b, c, d)
        },
        Sa: function(a, b, c, d) {
            k.drawArraysInstanced(a, b, c, d)
        },
        Hc: function(a, b) {
            for (var c = wa[a], d = 0; d < a; d++)
                c[d] = l[b + 4 * d >> 2];
            k.drawBuffers(c)
        },
        Yc: function(a, b) {
            for (var c = wa[a], d = 0; d < a; d++)
                c[d] = l[b + 4 * d >> 2];
            k.drawBuffers(c)
        },
        ba: function(a, b) {
            for (var c = wa[a], d = 0; d < a; d++)
                c[d] = l[b + 4 * d >> 2];
            k.drawBuffers(c)
        },
        bf: function(a, b, c, d) {
            k.drawElements(a, b, c, d)
        },
        Eb: function(a, b, c, d, e) {
            k.drawElementsInstanced(a, b, c, d, e)
        },
        $: function(a, b, c, d, e) {
            k.drawElementsInstanced(a, b, c, d, e)
        },
        Zc: function(a, b, c, d, e) {
            k.drawElementsInstanced(a, b, c, d, e)
        },
        _c: function(a, b, c, d, e) {
            k.drawElementsInstanced(a, b, c, d, e)
        },
        $c: function(a, b, c, d, e) {
            k.drawElementsInstanced(a, b, c, d, e)
        },
        Vc: function(a, b, c, d, e, g) {
            k.drawElements(a, d, e, g)
        },
        af: function(a) {
            k.enable(a)
        },
        $e: function(a) {
            k.enableVertexAttribArray(a)
        },
        Kc: function(a) {
            k.endQuery(a)
        },
        ma: function(a) {
            k.Lg.endQueryEXT(a)
        },
        pc: function() {
            k.endTransformFeedback()
        },
        Db: function(a, b) {
            return (a = k.fenceSync(a, b)) ? (b = p.Fh(p.rh),
            a.name = b,
            p.rh[b] = a,
            b) : 0
        },
        _e: function() {
            k.finish()
        },
        Ze: function() {
            k.flush()
        },
        Ye: function(a, b, c, d) {
            k.framebufferRenderbuffer(a, b, c, p.Oh[d])
        },
        Xe: function(a, b, c, d, e) {
            k.framebufferTexture2D(a, b, c, p.Ah[d], e)
        },
        xc: function(a, b, c, d, e) {
            k.framebufferTextureLayer(a, b, p.Ah[c], d, e)
        },
        We: function(a) {
            k.frontFace(a)
        },
        Ve: function(a, b) {
            ma(a, b, "createBuffer", p.sh)
        },
        Te: function(a, b) {
            ma(a, b, "createFramebuffer", p.$h)
        },
        Pc: function(a, b) {
            ma(a, b, "createQuery", p.Cg)
        },
        qa: function(a, b) {
            for (var c = 0; c < a; c++) {
                var d = k.Lg.createQueryEXT();
                if (!d) {
                    for (p.qg(1282); c < a; )
                        l[b + 4 * c++ >> 2] = 0;
                    break
                }
                var e = p.Fh(p.Cg);
                d.name = e;
                p.Cg[e] = d;
                l[b + 4 * c >> 2] = e
            }
        },
        Se: function(a, b) {
            ma(a, b, "createRenderbuffer", p.Oh)
        },
        tb: function(a, b) {
            ma(a, b, "createSampler", p.Ug)
        },
        Re: function(a, b) {
            ma(a, b, "createTexture", p.Ah)
        },
        fb: function(a, b) {
            ma(a, b, "createTransformFeedback", p.ni)
        },
        uc: function(a, b) {
            ma(a, b, "createVertexArray", p.fh)
        },
        da: function(a, b) {
            ma(a, b, "createVertexArray", p.fh)
        },
        Ue: function(a) {
            k.generateMipmap(a)
        },
        Qe: function(a, b, c, d, e, g, h) {
            Yb("getActiveAttrib", a, b, c, d, e, g, h)
        },
        Pe: function(a, b, c, d, e, g, h) {
            Yb("getActiveUniform", a, b, c, d, e, g, h)
        },
        Hb: function(a, b, c, d, e) {
            a = p.wg[a];
            if (a = k.getActiveUniformBlockName(a, b))
                e && 0 < c ? (c = K(a, e, c),
                d && (l[d >> 2] = c)) : d && (l[d >> 2] = 0)
        },
        Ib: function(a, b, c, d) {
            if (d)
                if (a = p.wg[a],
                35393 == c)
                    c = k.getActiveUniformBlockName(a, b),
                    l[d >> 2] = c.length + 1;
                else {
                    if (a = k.getActiveUniformBlockParameter(a, b, c),
                    null !== a)
                        if (35395 == c)
                            for (c = 0; c < a.length; c++)
                                l[d + 4 * c >> 2] = a[c];
                        else
                            l[d >> 2] = a
                }
            else
                p.qg(1281)
        },
        Mb: function(a, b, c, d, e) {
            if (e)
                if (0 < b && 0 == c)
                    p.qg(1281);
                else {
                    a = p.wg[a];
                    for (var g = [], h = 0; h < b; h++)
                        g.push(l[c + 4 * h >> 2]);
                    if (a = k.getActiveUniforms(a, g, d))
                        for (b = a.length,
                        h = 0; h < b; h++)
                            l[e + 4 * h >> 2] = a[h]
                }
            else
                p.qg(1281)
        },
        Oe: function(a, b, c, d) {
            a = k.getAttachedShaders(p.wg[a]);
            var e = a.length;
            e > b && (e = b);
            l[c >> 2] = e;
            for (b = 0; b < e; ++b)
                l[d + 4 * b >> 2] = p.Ig.indexOf(a[b])
        },
        Ne: function(a, b) {
            return k.getAttribLocation(p.wg[a], A(b))
        },
        Me: function(a, b) {
            Ya(a, b, 4)
        },
        ub: function(a, b, c) {
            c ? Da(c, k.getBufferParameter(a, b)) : p.qg(1281)
        },
        Le: function(a, b, c) {
            c ? l[c >> 2] = k.getBufferParameter(a, b) : p.qg(1281)
        },
        Je: function() {
            var a = k.getError() || p.qj;
            p.qj = 0;
            return a
        },
        Ie: function(a, b) {
            Ya(a, b, 2)
        },
        bc: function(a, b) {
            return k.getFragDataLocation(p.wg[a], A(b))
        },
        He: function(a, b, c, d) {
            a = k.getFramebufferAttachmentParameter(a, b, c);
            if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
                a = a.name | 0;
            l[d >> 2] = a
        },
        vb: function(a, b, c) {
            Zb(a, b, c, 1)
        },
        xb: function(a, b) {
            Ya(a, b, 1)
        },
        sc: function(a, b, c) {
            Zb(a, b, c, 0)
        },
        Ge: function(a, b) {
            Ya(a, b, 0)
        },
        Va: function(a, b, c, d, e) {
            if (0 > d)
                p.qg(1281);
            else if (e) {
                if (a = k.getInternalformatParameter(a, b, c),
                null !== a)
                    for (b = 0; b < a.length && b < d; ++b)
                        l[e + 4 * b >> 2] = a[b]
            } else
                p.qg(1281)
        },
        ab: function() {
            p.qg(1282)
        },
        Ee: function(a, b, c, d) {
            a = k.getProgramInfoLog(p.wg[a]);
            null === a && (a = "(unknown error)");
            b = 0 < b && d ? K(a, d, b) : 0;
            c && (l[c >> 2] = b)
        },
        Fe: function(a, b, c) {
            if (c)
                if (a >= p.counter)
                    p.qg(1281);
                else if (a = p.wg[a],
                35716 == b)
                    a = k.getProgramInfoLog(a),
                    null === a && (a = "(unknown error)"),
                    l[c >> 2] = a.length + 1;
                else if (35719 == b) {
                    if (!a.Gi)
                        for (b = 0; b < k.getProgramParameter(a, 35718); ++b)
                            a.Gi = Math.max(a.Gi, k.getActiveUniform(a, b).name.length + 1);
                    l[c >> 2] = a.Gi
                } else if (35722 == b) {
                    if (!a.Ei)
                        for (b = 0; b < k.getProgramParameter(a, 35721); ++b)
                            a.Ei = Math.max(a.Ei, k.getActiveAttrib(a, b).name.length + 1);
                    l[c >> 2] = a.Ei
                } else if (35381 == b) {
                    if (!a.Fi)
                        for (b = 0; b < k.getProgramParameter(a, 35382); ++b)
                            a.Fi = Math.max(a.Fi, k.getActiveUniformBlockName(a, b).length + 1);
                    l[c >> 2] = a.Fi
                } else
                    l[c >> 2] = k.getProgramParameter(a, b);
            else
                p.qg(1281)
        },
        ha: function(a, b, c) {
            c ? (a = p.Cg[a],
            b = 2 > p.Eg.version ? k.Lg.getQueryObjectEXT(a, b) : k.getQueryParameter(a, b),
            Da(c, "boolean" == typeof b ? b ? 1 : 0 : b)) : p.qg(1281)
        },
        ja: function(a, b, c) {
            c ? (a = k.Lg.getQueryObjectEXT(p.Cg[a], b),
            l[c >> 2] = "boolean" == typeof a ? a ? 1 : 0 : a) : p.qg(1281)
        },
        ga: function(a, b, c) {
            c ? (a = p.Cg[a],
            b = 2 > p.Eg.version ? k.Lg.getQueryObjectEXT(a, b) : k.getQueryParameter(a, b),
            Da(c, "boolean" == typeof b ? b ? 1 : 0 : b)) : p.qg(1281)
        },
        Ic: function(a, b, c) {
            c ? (a = k.getQueryParameter(p.Cg[a], b),
            l[c >> 2] = "boolean" == typeof a ? a ? 1 : 0 : a) : p.qg(1281)
        },
        ia: function(a, b, c) {
            c ? (a = k.Lg.getQueryObjectEXT(p.Cg[a], b),
            l[c >> 2] = "boolean" == typeof a ? a ? 1 : 0 : a) : p.qg(1281)
        },
        Jc: function(a, b, c) {
            c ? l[c >> 2] = k.getQuery(a, b) : p.qg(1281)
        },
        ka: function(a, b, c) {
            c ? l[c >> 2] = k.Lg.getQueryEXT(a, b) : p.qg(1281)
        },
        De: function(a, b, c) {
            c ? l[c >> 2] = k.getRenderbufferParameter(a, b) : p.qg(1281)
        },
        jb: function(a, b, c) {
            c ? I[c >> 2] = k.getSamplerParameter(p.Ug[a], b) : p.qg(1281)
        },
        kb: function(a, b, c) {
            c ? l[c >> 2] = k.getSamplerParameter(p.Ug[a], b) : p.qg(1281)
        },
        Be: function(a, b, c, d) {
            a = k.getShaderInfoLog(p.Ig[a]);
            null === a && (a = "(unknown error)");
            b = 0 < b && d ? K(a, d, b) : 0;
            c && (l[c >> 2] = b)
        },
        Ae: function(a, b, c, d) {
            a = k.getShaderPrecisionFormat(a, b);
            l[c >> 2] = a.rangeMin;
            l[c + 4 >> 2] = a.rangeMax;
            l[d >> 2] = a.precision
        },
        ye: function(a, b, c, d) {
            if (a = k.getShaderSource(p.Ig[a]))
                b = 0 < b && d ? K(a, d, b) : 0,
                c && (l[c >> 2] = b)
        },
        Ce: function(a, b, c) {
            c ? 35716 == b ? (a = k.getShaderInfoLog(p.Ig[a]),
            null === a && (a = "(unknown error)"),
            l[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = k.getShaderSource(p.Ig[a]),
            l[c >> 2] = a ? a.length + 1 : 0) : l[c >> 2] = k.getShaderParameter(p.Ig[a], b) : p.qg(1281)
        },
        xe: function(a) {
            var b = p.Qh[a];
            if (!b) {
                switch (a) {
                case 7939:
                    b = k.getSupportedExtensions() || [];
                    b = b.concat(b.map(function(d) {
                        return "GL_" + d
                    }));
                    b = Ea(b.join(" "));
                    break;
                case 7936:
                case 7937:
                case 37445:
                case 37446:
                    (b = k.getParameter(a)) || p.qg(1280);
                    b = b && Ea(b);
                    break;
                case 7938:
                    b = Ea("OpenGL ES 3.0 (" + k.getParameter(7938) + ")");
                    break;
                case 35724:
                    b = k.getParameter(35724);
                    var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                    null !== c && (3 == c[1].length && (c[1] += "0"),
                    b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                    b = Ea(b);
                    break;
                default:
                    p.qg(1280)
                }
                p.Qh[a] = b
            }
            return b
        },
        Pb: function(a, b) {
            if (2 > p.Eg.version)
                return p.qg(1282),
                0;
            var c = p.Fk[a];
            if (c)
                return 0 > b || b >= c.length ? (p.qg(1281),
                0) : c[b];
            switch (a) {
            case 7939:
                return c = k.getSupportedExtensions() || [],
                c = c.concat(c.map(function(d) {
                    return "GL_" + d
                })),
                c = c.map(function(d) {
                    return Ea(d)
                }),
                c = p.Fk[a] = c,
                0 > b || b >= c.length ? (p.qg(1281),
                0) : c[b];
            default:
                return p.qg(1280),
                0
            }
        },
        wb: function(a, b, c, d, e) {
            0 > c ? p.qg(1281) : e ? (a = k.getSyncParameter(p.rh[a], b),
            null !== a && (l[e >> 2] = a,
            d && (l[d >> 2] = 1))) : p.qg(1281)
        },
        we: function(a, b, c) {
            c ? I[c >> 2] = k.getTexParameter(a, b) : p.qg(1281)
        },
        ve: function(a, b, c) {
            c ? l[c >> 2] = k.getTexParameter(a, b) : p.qg(1281)
        },
        lc: function(a, b, c, d, e, g, h) {
            a = p.wg[a];
            if (a = k.getTransformFeedbackVarying(a, b))
                h && 0 < c ? (c = K(a.name, h, c),
                d && (l[d >> 2] = c)) : d && (l[d >> 2] = 0),
                e && (l[e >> 2] = a.size),
                g && (l[g >> 2] = a.type)
        },
        Jb: function(a, b) {
            return k.getUniformBlockIndex(p.wg[a], A(b))
        },
        Nb: function(a, b, c, d) {
            if (d)
                if (0 < b && (0 == c || 0 == d))
                    p.qg(1281);
                else {
                    a = p.wg[a];
                    for (var e = [], g = 0; g < b; g++)
                        e.push(A(l[c + 4 * g >> 2]));
                    if (a = k.getUniformIndices(a, e))
                        for (b = a.length,
                        g = 0; g < b; g++)
                            l[d + 4 * g >> 2] = a[g]
                }
            else
                p.qg(1281)
        },
        se: function(a, b) {
            b = A(b);
            if (a = p.wg[a]) {
                ac(a);
                var c = a.oi
                  , d = 0
                  , e = b
                  , g = $b(b);
                0 < g && (d = parseInt(b.slice(g + 1)) >>> 0,
                e = b.slice(0, g));
                if ((e = a.Mk[e]) && d < e[0] && (d += e[1],
                c[d] = c[d] || k.getUniformLocation(a, b)))
                    return d
            } else
                p.qg(1281);
            return -1
        },
        ue: function(a, b, c) {
            qb(a, b, c, 2)
        },
        te: function(a, b, c) {
            qb(a, b, c, 0)
        },
        cc: function(a, b, c) {
            qb(a, b, c, 0)
        },
        jc: function(a, b, c) {
            Za(a, b, c, 0)
        },
        ic: function(a, b, c) {
            Za(a, b, c, 0)
        },
        pe: function(a, b, c) {
            c ? l[c >> 2] = k.getVertexAttribOffset(a, b) : p.qg(1281)
        },
        re: function(a, b, c) {
            Za(a, b, c, 2)
        },
        qe: function(a, b, c) {
            Za(a, b, c, 5)
        },
        ne: function(a, b) {
            k.hint(a, b)
        },
        Za: function(a, b, c) {
            for (var d = wa[b], e = 0; e < b; e++)
                d[e] = l[c + 4 * e >> 2];
            k.invalidateFramebuffer(a, d)
        },
        Ya: function(a, b, c, d, e, g, h) {
            for (var n = wa[b], q = 0; q < b; q++)
                n[q] = l[c + 4 * q >> 2];
            k.invalidateSubFramebuffer(a, n, d, e, g, h)
        },
        me: function(a) {
            return (a = p.sh[a]) ? k.isBuffer(a) : 0
        },
        le: function(a) {
            return k.isEnabled(a)
        },
        ke: function(a) {
            return (a = p.$h[a]) ? k.isFramebuffer(a) : 0
        },
        je: function(a) {
            return (a = p.wg[a]) ? k.isProgram(a) : 0
        },
        Nc: function(a) {
            return (a = p.Cg[a]) ? k.isQuery(a) : 0
        },
        oa: function(a) {
            return (a = p.Cg[a]) ? k.Lg.isQueryEXT(a) : 0
        },
        ie: function(a) {
            return (a = p.Oh[a]) ? k.isRenderbuffer(a) : 0
        },
        rb: function(a) {
            return (a = p.Ug[a]) ? k.isSampler(a) : 0
        },
        he: function(a) {
            return (a = p.Ig[a]) ? k.isShader(a) : 0
        },
        Cb: function(a) {
            return k.isSync(p.rh[a])
        },
        ge: function(a) {
            return (a = p.Ah[a]) ? k.isTexture(a) : 0
        },
        eb: function(a) {
            return k.isTransformFeedback(p.ni[a])
        },
        tc: function(a) {
            return (a = p.fh[a]) ? k.isVertexArray(a) : 0
        },
        ca: function(a) {
            return (a = p.fh[a]) ? k.isVertexArray(a) : 0
        },
        fe: function(a) {
            k.lineWidth(a)
        },
        ee: function(a) {
            a = p.wg[a];
            k.linkProgram(a);
            a.oi = 0;
            a.Mk = {}
        },
        cb: function() {
            k.pauseTransformFeedback()
        },
        de: function(a, b) {
            3317 == a && (p.tm = b);
            k.pixelStorei(a, b)
        },
        ce: function(a, b) {
            k.polygonOffset(a, b)
        },
        $a: function() {
            p.qg(1280)
        },
        _a: function() {
            p.qg(1280)
        },
        la: function(a, b) {
            k.Lg.queryCounterEXT(p.Cg[a], b)
        },
        Wc: function(a) {
            k.readBuffer(a)
        },
        be: function(a, b, c, d, e, g, h) {
            if (k.$i)
                k.readPixels(a, b, c, d, e, g, h);
            else {
                var n = Fa(g);
                k.readPixels(a, b, c, d, e, g, n, h >> Ga(n))
            }
        },
        ae: function() {},
        $d: function(a, b, c, d) {
            k.renderbufferStorage(a, b, c, d)
        },
        yc: function(a, b, c, d, e) {
            k.renderbufferStorageMultisample(a, b, c, d, e)
        },
        bb: function() {
            k.resumeTransformFeedback()
        },
        _d: function(a, b) {
            k.sampleCoverage(a, !!b)
        },
        mb: function(a, b, c) {
            k.samplerParameterf(p.Ug[a], b, c)
        },
        lb: function(a, b, c) {
            k.samplerParameterf(p.Ug[a], b, I[c >> 2])
        },
        pb: function(a, b, c) {
            k.samplerParameteri(p.Ug[a], b, c)
        },
        nb: function(a, b, c) {
            k.samplerParameteri(p.Ug[a], b, l[c >> 2])
        },
        Zd: function(a, b, c, d) {
            k.scissor(a, b, c, d)
        },
        Yd: function() {
            p.qg(1280)
        },
        Xd: function(a, b, c, d) {
            b = p.xl(a, b, c, d);
            k.shaderSource(p.Ig[a], b)
        },
        Wd: function(a, b, c) {
            k.stencilFunc(a, b, c)
        },
        Vd: function(a, b, c, d) {
            k.stencilFuncSeparate(a, b, c, d)
        },
        Ud: function(a) {
            k.stencilMask(a)
        },
        Td: function(a, b) {
            k.stencilMaskSeparate(a, b)
        },
        Sd: function(a, b, c) {
            k.stencilOp(a, b, c)
        },
        Rd: function(a, b, c, d) {
            k.stencilOpSeparate(a, b, c, d)
        },
        Qd: function(a, b, c, d, e, g, h, n, q) {
            if (k.Xg)
                k.texImage2D(a, b, c, d, e, g, h, n, q);
            else if (q) {
                var u = Fa(n);
                k.texImage2D(a, b, c, d, e, g, h, n, u, q >> Ga(u))
            } else
                k.texImage2D(a, b, c, d, e, g, h, n, null)
        },
        Uc: function(a, b, c, d, e, g, h, n, q, u) {
            if (k.Xg)
                k.texImage3D(a, b, c, d, e, g, h, n, q, u);
            else if (u) {
                var w = Fa(q);
                k.texImage3D(a, b, c, d, e, g, h, n, q, w, u >> Ga(w))
            } else
                k.texImage3D(a, b, c, d, e, g, h, n, q, null)
        },
        Pd: function(a, b, c) {
            k.texParameterf(a, b, c)
        },
        Od: function(a, b, c) {
            k.texParameterf(a, b, I[c >> 2])
        },
        Nd: function(a, b, c) {
            k.texParameteri(a, b, c)
        },
        Md: function(a, b, c) {
            k.texParameteri(a, b, l[c >> 2])
        },
        Xa: function(a, b, c, d, e) {
            k.texStorage2D(a, b, c, d, e)
        },
        Wa: function(a, b, c, d, e, g) {
            k.texStorage3D(a, b, c, d, e, g)
        },
        Ld: function(a, b, c, d, e, g, h, n, q) {
            if (k.Xg)
                k.texSubImage2D(a, b, c, d, e, g, h, n, q);
            else if (q) {
                var u = Fa(n);
                k.texSubImage2D(a, b, c, d, e, g, h, n, u, q >> Ga(u))
            } else
                k.texSubImage2D(a, b, c, d, e, g, h, n, null)
        },
        Tc: function(a, b, c, d, e, g, h, n, q, u, w) {
            if (k.Xg)
                k.texSubImage3D(a, b, c, d, e, g, h, n, q, u, w);
            else if (w) {
                var z = Fa(u);
                k.texSubImage3D(a, b, c, d, e, g, h, n, q, u, z, w >> Ga(z))
            } else
                k.texSubImage3D(a, b, c, d, e, g, h, n, q, u, null)
        },
        mc: function(a, b, c, d) {
            a = p.wg[a];
            for (var e = [], g = 0; g < b; g++)
                e.push(A(l[c + 4 * g >> 2]));
            k.transformFeedbackVaryings(a, e, d)
        },
        Kd: function(a, b) {
            k.uniform1f(J(a), b)
        },
        Jd: function(a, b, c) {
            b && k.uniform1fv(J(a), I, c >> 2, b)
        },
        Id: function(a, b) {
            k.uniform1i(J(a), b)
        },
        Hd: function(a, b, c) {
            b && k.uniform1iv(J(a), l, c >> 2, b)
        },
        ac: function(a, b) {
            k.uniform1ui(J(a), b)
        },
        Yb: function(a, b, c) {
            b && k.uniform1uiv(J(a), B, c >> 2, b)
        },
        Gd: function(a, b, c) {
            k.uniform2f(J(a), b, c)
        },
        Fd: function(a, b, c) {
            b && k.uniform2fv(J(a), I, c >> 2, 2 * b)
        },
        Ed: function(a, b, c) {
            k.uniform2i(J(a), b, c)
        },
        Dd: function(a, b, c) {
            b && k.uniform2iv(J(a), l, c >> 2, 2 * b)
        },
        $b: function(a, b, c) {
            k.uniform2ui(J(a), b, c)
        },
        Xb: function(a, b, c) {
            b && k.uniform2uiv(J(a), B, c >> 2, 2 * b)
        },
        Cd: function(a, b, c, d) {
            k.uniform3f(J(a), b, c, d)
        },
        Bd: function(a, b, c) {
            b && k.uniform3fv(J(a), I, c >> 2, 3 * b)
        },
        Ad: function(a, b, c, d) {
            k.uniform3i(J(a), b, c, d)
        },
        zd: function(a, b, c) {
            b && k.uniform3iv(J(a), l, c >> 2, 3 * b)
        },
        _b: function(a, b, c, d) {
            k.uniform3ui(J(a), b, c, d)
        },
        Vb: function(a, b, c) {
            b && k.uniform3uiv(J(a), B, c >> 2, 3 * b)
        },
        yd: function(a, b, c, d, e) {
            k.uniform4f(J(a), b, c, d, e)
        },
        xd: function(a, b, c) {
            b && k.uniform4fv(J(a), I, c >> 2, 4 * b)
        },
        wd: function(a, b, c, d, e) {
            k.uniform4i(J(a), b, c, d, e)
        },
        vd: function(a, b, c) {
            b && k.uniform4iv(J(a), l, c >> 2, 4 * b)
        },
        Zb: function(a, b, c, d, e) {
            k.uniform4ui(J(a), b, c, d, e)
        },
        Ub: function(a, b, c) {
            b && k.uniform4uiv(J(a), B, c >> 2, 4 * b)
        },
        Gb: function(a, b, c) {
            a = p.wg[a];
            k.uniformBlockBinding(a, b, c)
        },
        ud: function(a, b, c, d) {
            b && k.uniformMatrix2fv(J(a), !!c, I, d >> 2, 4 * b)
        },
        Gc: function(a, b, c, d) {
            b && k.uniformMatrix2x3fv(J(a), !!c, I, d >> 2, 6 * b)
        },
        Ec: function(a, b, c, d) {
            b && k.uniformMatrix2x4fv(J(a), !!c, I, d >> 2, 8 * b)
        },
        td: function(a, b, c, d) {
            b && k.uniformMatrix3fv(J(a), !!c, I, d >> 2, 9 * b)
        },
        Fc: function(a, b, c, d) {
            b && k.uniformMatrix3x2fv(J(a), !!c, I, d >> 2, 6 * b)
        },
        Cc: function(a, b, c, d) {
            b && k.uniformMatrix3x4fv(J(a), !!c, I, d >> 2, 12 * b)
        },
        sd: function(a, b, c, d) {
            b && k.uniformMatrix4fv(J(a), !!c, I, d >> 2, 16 * b)
        },
        Dc: function(a, b, c, d) {
            b && k.uniformMatrix4x2fv(J(a), !!c, I, d >> 2, 8 * b)
        },
        Ac: function(a, b, c, d) {
            b && k.uniformMatrix4x3fv(J(a), !!c, I, d >> 2, 12 * b)
        },
        qd: function(a) {
            a = p.wg[a];
            k.useProgram(a);
            k.el = a
        },
        pd: function(a) {
            k.validateProgram(p.wg[a])
        },
        od: function(a, b) {
            k.vertexAttrib1f(a, b)
        },
        nd: function(a, b) {
            k.vertexAttrib1f(a, I[b >> 2])
        },
        md: function(a, b, c) {
            k.vertexAttrib2f(a, b, c)
        },
        ld: function(a, b) {
            k.vertexAttrib2f(a, I[b >> 2], I[b + 4 >> 2])
        },
        kd: function(a, b, c, d) {
            k.vertexAttrib3f(a, b, c, d)
        },
        jd: function(a, b) {
            k.vertexAttrib3f(a, I[b >> 2], I[b + 4 >> 2], I[b + 8 >> 2])
        },
        id: function(a, b, c, d, e) {
            k.vertexAttrib4f(a, b, c, d, e)
        },
        hd: function(a, b) {
            k.vertexAttrib4f(a, I[b >> 2], I[b + 4 >> 2], I[b + 8 >> 2], I[b + 12 >> 2])
        },
        ib: function(a, b) {
            k.vertexAttribDivisor(a, b)
        },
        _: function(a, b) {
            k.vertexAttribDivisor(a, b)
        },
        cd: function(a, b) {
            k.vertexAttribDivisor(a, b)
        },
        dd: function(a, b) {
            k.vertexAttribDivisor(a, b)
        },
        Ta: function(a, b) {
            k.vertexAttribDivisor(a, b)
        },
        hc: function(a, b, c, d, e) {
            k.vertexAttribI4i(a, b, c, d, e)
        },
        ec: function(a, b) {
            k.vertexAttribI4i(a, l[b >> 2], l[b + 4 >> 2], l[b + 8 >> 2], l[b + 12 >> 2])
        },
        gc: function(a, b, c, d, e) {
            k.vertexAttribI4ui(a, b, c, d, e)
        },
        dc: function(a, b) {
            k.vertexAttribI4ui(a, B[b >> 2], B[b + 4 >> 2], B[b + 8 >> 2], B[b + 12 >> 2])
        },
        kc: function(a, b, c, d, e) {
            k.vertexAttribIPointer(a, b, c, d, e)
        },
        fd: function(a, b, c, d, e, g) {
            k.vertexAttribPointer(a, b, c, !!d, e, g)
        },
        ed: function(a, b, c, d) {
            k.viewport(a, b, c, d)
        },
        yb: function(a, b, c, d) {
            k.waitSync(p.rh[a], b, (c >>> 0) + 4294967296 * d)
        },
        n: function() {
            return 0
        },
        ta: function() {
            return !0
        },
        Qa: function(a, b, c) {
            S.copyWithin(a, b, b + c)
        },
        va: function(a, b, c) {
            return Ic(a, {
                Dj: l[c >> 2],
                Xi: l[c + 4 >> 2],
                sl: l[c + 8 >> 2],
                kl: b,
                ti: l[c + 12 >> 2],
                Pj: l[c + 16 >> 2]
            })
        },
        J: function(a, b) {
            a = aa(a);
            return a ? a.requestPointerLock || a.Ki ? v.Wi() ? pb(a) : b ? (v.Xj(pb, 2, [a]),
            1) : -2 : -1 : -4
        },
        l: function() {
            da("OOM")
        },
        Ke: function() {
            return (v.Ci = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1
        },
        p: function(a, b, c) {
            if ("undefined" == typeof onbeforeunload)
                return -1;
            if (1 !== c)
                return -5;
            Jc(2, a, !0, b, 28, "beforeunload");
            return 0
        },
        B: function(a, b, c, d, e) {
            bc(a, b, c, d, 12, "blur", e);
            return 0
        },
        g: Vb,
        k: function(a, b, c) {
            a = aa(a);
            if (!a)
                return -4;
            a.style.width = b + "px";
            a.style.height = c + "px";
            return 0
        },
        C: function(a, b, c, d, e) {
            bc(a, b, c, d, 13, "focus", e);
            return 0
        },
        s: function(a, b, c, d, e) {
            if (!v.fullscreenEnabled())
                return -1;
            a = aa(a);
            if (!a)
                return -4;
            cc(a, b, c, d, 19, "fullscreenchange", e);
            cc(a, b, c, d, 19, "webkitfullscreenchange", e);
            return 0
        },
        j: function(a, b, c, d) {
            if (!navigator.getGamepads && !navigator.webkitGetGamepads)
                return -1;
            dc(2, a, b, c, 26, "gamepadconnected", d);
            return 0
        },
        i: function(a, b, c, d) {
            if (!navigator.getGamepads && !navigator.webkitGetGamepads)
                return -1;
            dc(2, a, b, c, 27, "gamepaddisconnected", d);
            return 0
        },
        v: function(a, b, c, d, e) {
            rb(a, b, c, d, 2, "keydown", e);
            return 0
        },
        t: function(a, b, c, d, e) {
            rb(a, b, c, d, 1, "keypress", e);
            return 0
        },
        u: function(a, b, c, d, e) {
            rb(a, b, c, d, 3, "keyup", e);
            return 0
        },
        pf: function(a, b, c) {
            a = T(a);
            Pb(a, b, c)
        },
        H: function(a, b, c, d, e) {
            Ha(a, b, c, d, 5, "mousedown", e);
            return 0
        },
        F: function(a, b, c, d, e) {
            Ha(a, b, c, d, 33, "mouseenter", e);
            return 0
        },
        E: function(a, b, c, d, e) {
            Ha(a, b, c, d, 34, "mouseleave", e);
            return 0
        },
        I: function(a, b, c, d, e) {
            Ha(a, b, c, d, 8, "mousemove", e);
            return 0
        },
        G: function(a, b, c, d, e) {
            Ha(a, b, c, d, 6, "mouseup", e);
            return 0
        },
        w: function(a, b, c, d, e) {
            if (!document || !document.body || !(document.body.requestPointerLock || document.body.dn || document.body.Bn || document.body.Ki))
                return -1;
            a = aa(a);
            if (!a)
                return -4;
            $a(a, b, c, d, 20, "pointerlockchange", e);
            $a(a, b, c, d, 20, "mozpointerlockchange", e);
            $a(a, b, c, d, 20, "webkitpointerlockchange", e);
            $a(a, b, c, d, 20, "mspointerlockchange", e);
            return 0
        },
        r: function(a, b, c, d, e) {
            Kc(a, b, c, d, 10, "resize", e);
            return 0
        },
        x: function(a, b, c, d, e) {
            ab(a, b, c, d, 25, "touchcancel", e);
            return 0
        },
        z: function(a, b, c, d, e) {
            ab(a, b, c, d, 23, "touchend", e);
            return 0
        },
        y: function(a, b, c, d, e) {
            ab(a, b, c, d, 24, "touchmove", e);
            return 0
        },
        A: function(a, b, c, d, e) {
            ab(a, b, c, d, 22, "touchstart", e);
            return 0
        },
        q: function(a, b, c, d) {
            Lc(Ua[1], a, b, c, 21, "visibilitychange", d);
            return 0
        },
        D: function(a, b, c, d, e) {
            a = aa(a);
            return "undefined" != typeof a.onwheel ? (Mc(a, b, c, d, 9, "wheel", e),
            0) : -1
        },
        wa: function(a) {
            Tc(A(a))
        },
        sa: function(a, b, c, d, e) {
            function g(W) {
                Q ? W() : Ta(W)
            }
            var h = a + 112
              , n = A(h)
              , q = B[h + 36 >> 2]
              , u = B[h + 40 >> 2]
              , w = B[h + 44 >> 2]
              , z = B[h + 48 >> 2]
              , E = B[h + 52 >> 2]
              , t = !!(E & 4)
              , F = !!(E & 32)
              , M = !!(E & 16)
              , Q = !!(E & 64)
              , Y = W=>{
                g(()=>{
                    q ? T(q)(W) : b && b(W)
                }
                )
            }
              , la = W=>{
                g(()=>{
                    w ? T(w)(W) : d && d(W)
                }
                )
            }
              , C = W=>{
                g(()=>{
                    u ? T(u)(W) : c && c(W)
                }
                )
            }
              , R = W=>{
                g(()=>{
                    z ? T(z)(W) : e && e(W)
                }
                )
            }
            ;
            E = W=>{
                sb(W, Y, C, la, R)
            }
            ;
            var ca = (W,Wc)=>{
                fc(O.Yh, W, Wc.response, Ma=>{
                    g(()=>{
                        q ? T(q)(Ma) : b && b(Ma)
                    }
                    )
                }
                , Ma=>{
                    g(()=>{
                        q ? T(q)(Ma) : b && b(Ma)
                    }
                    )
                }
                )
            }
              , ia = W=>{
                sb(W, ca, C, la, R)
            }
            ;
            if ("EM_IDB_STORE" === n)
                n = B[h + 84 >> 2],
                fc(O.Yh, a, S.slice(n, n + B[h + 88 >> 2]), Y, C);
            else if ("EM_IDB_DELETE" === n)
                Oc(O.Yh, a, Y, C);
            else if (M) {
                if (F)
                    return 0;
                sb(a, t ? ca : Y, C, la, R)
            } else
                Nc(O.Yh, a, Y, F ? C : t ? ia : E);
            return a
        },
        Aa: function(a, b) {
            b >>= 2;
            b = {
                alpha: !!l[b + 0],
                depth: !!l[b + 1],
                stencil: !!l[b + 2],
                antialias: !!l[b + 3],
                premultipliedAlpha: !!l[b + 4],
                preserveDrawingBuffer: !!l[b + 5],
                powerPreference: Vc[l[b + 6]],
                failIfMajorPerformanceCaveat: !!l[b + 7],
                sj: l[b + 8],
                Nl: l[b + 9],
                Zj: l[b + 10],
                pl: l[b + 11],
                mn: l[b + 12],
                qn: l[b + 13]
            };
            a = aa(a);
            return !a || b.pl ? 0 : p.Xh(a, b)
        },
        Lb: function(a) {
            a >>= 2;
            for (var b = 0; 14 > b; ++b)
                l[a + b] = 0;
            l[a + 0] = l[a + 1] = l[a + 3] = l[a + 4] = l[a + 8] = l[a + 10] = 1
        },
        ya: function(a) {
            return p.di(a) ? 0 : -5
        },
        Ha: function(a, b) {
            var c = 0;
            Ja().forEach(function(d, e) {
                var g = b + c;
                e = B[a + 4 * e >> 2] = g;
                for (g = 0; g < d.length; ++g)
                    Z[e++ >> 0] = d.charCodeAt(g);
                Z[e >> 0] = 0;
                c += d.length + 1
            });
            return 0
        },
        Ia: function(a, b) {
            var c = Ja();
            B[a >> 2] = c.length;
            var d = 0;
            c.forEach(function(e) {
                d += e.length + 1
            });
            B[b >> 2] = d;
            return 0
        },
        L: function(a) {
            try {
                var b = V.Hh(a);
                f.close(b);
                return 0
            } catch (c) {
                if ("undefined" == typeof f || !(c instanceof f.pg))
                    throw c;
                return c.Yg
            }
        },
        Ka: function(a, b, c, d) {
            try {
                a: {
                    var e = V.Hh(a);
                    a = b;
                    for (var g = b = 0; g < c; g++) {
                        var h = B[a >> 2]
                          , n = B[a + 4 >> 2];
                        a += 8;
                        var q = f.read(e, Z, h, n, void 0);
                        if (0 > q) {
                            var u = -1;
                            break a
                        }
                        b += q;
                        if (q < n)
                            break
                    }
                    u = b
                }
                l[d >> 2] = u;
                return 0
            } catch (w) {
                if ("undefined" == typeof f || !(w instanceof f.pg))
                    throw w;
                return w.Yg
            }
        },
        Ea: function(a, b, c, d, e) {
            try {
                b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
                if (isNaN(b))
                    return 61;
                var g = V.Hh(a);
                f.ah(g, b, d);
                U = [g.position >>> 0, (G = g.position,
                1 <= +Math.abs(G) ? 0 < G ? (Math.min(+Math.floor(G / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((G - +(~~G >>> 0)) / 4294967296) >>> 0 : 0)];
                l[e >> 2] = U[0];
                l[e + 4 >> 2] = U[1];
                g.jj && 0 === b && 0 === d && (g.jj = null);
                return 0
            } catch (h) {
                if ("undefined" == typeof f || !(h instanceof f.pg))
                    throw h;
                return h.Yg
            }
        },
        Ja: function(a, b, c, d) {
            try {
                a: {
                    var e = V.Hh(a);
                    a = b;
                    for (var g = b = 0; g < c; g++) {
                        var h = B[a >> 2]
                          , n = B[a + 4 >> 2];
                        a += 8;
                        var q = f.write(e, Z, h, n, void 0);
                        if (0 > q) {
                            var u = -1;
                            break a
                        }
                        b += q
                    }
                    u = b
                }
                B[d >> 2] = u;
                return 0
            } catch (w) {
                if ("undefined" == typeof f || !(w instanceof f.pg))
                    throw w;
                return w.Yg
            }
        },
        Fa: bb,
        Af: function(a) {
            k.clear(a)
        },
        ra: function(a, b, c, d) {
            k.clearColor(a, b, c, d)
        },
        Z: function(a) {
            k.clearDepth(a)
        },
        o: function(a) {
            k.clearStencil(a)
        },
        O: function(a) {
            k.depthMask(!!a)
        },
        xa: function(a, b, c, d) {
            k.viewport(a, b, c, d)
        },
        Ra: Ob,
        K: function() {},
        Ga: function(a, b, c, d) {
            return Pc(a, b, c, d)
        }
    };
    (function() {
        function a(e) {
            m.asm = e.exports;
            xc = m.asm.Lf;
            fb = e = xc.buffer;
            m.HEAP8 = Z = new Int8Array(e);
            m.HEAP16 = ua = new Int16Array(e);
            m.HEAP32 = l = new Int32Array(e);
            m.HEAPU8 = S = new Uint8Array(e);
            m.HEAPU16 = P = new Uint16Array(e);
            m.HEAPU32 = B = new Uint32Array(e);
            m.HEAPF32 = I = new Float32Array(e);
            m.HEAPF64 = ea = new Float64Array(e);
            Kb = m.asm.fg;
            kc.unshift(m.asm.Mf);
            sa("wasm-instantiate")
        }
        function b(e) {
            a(e.instance)
        }
        function c(e) {
            return Bc().then(function(g) {
                return WebAssembly.instantiate(g, d)
            }).then(function(g) {
                return g
            }).then(e, function(g) {
                ba("failed to asynchronously prepare wasm: " + g);
                da(g)
            })
        }
        var d = {
            a: Xc
        };
        Pa("wasm-instantiate");
        if (m.instantiateWasm)
            try {
                return m.instantiateWasm(d, a)
            } catch (e) {
                return ba("Module.instantiateWasm callback failed with error: " + e),
                !1
            }
        (function() {
            return ya || "function" != typeof WebAssembly.instantiateStreaming || Db(ja) || "function" != typeof fetch ? c(b) : fetch(ja, {
                credentials: "same-origin"
            }).then(function(e) {
                return WebAssembly.instantiateStreaming(e, d).then(b, function(g) {
                    ba("wasm streaming compile failed: " + g);
                    ba("falling back to ArrayBuffer instantiation");
                    return c(b)
                })
            })
        }
        )();
        return {}
    }
    )();
    m.___wasm_call_ctors = function() {
        return (m.___wasm_call_ctors = m.asm.Mf).apply(null, arguments)
    }
    ;
    var X = m._malloc = function() {
        return (X = m._malloc = m.asm.Nf).apply(null, arguments)
    }
      , Ia = m._free = function() {
        return (Ia = m._free = m.asm.Of).apply(null, arguments)
    }
      , yc = m._xsolla_close_iframe = function() {
        return (yc = m._xsolla_close_iframe = m.asm.Pf).apply(null, arguments)
    }
      , yb = m._cp6_canvas_context_lost = function() {
        return (yb = m._cp6_canvas_context_lost = m.asm.Qf).apply(null, arguments)
    }
      , zb = m._cp6_canvas_context_restored = function() {
        return (zb = m._cp6_canvas_context_restored = m.asm.Rf).apply(null, arguments)
    }
      , La = m._cp6_check_ws = function() {
        return (La = m._cp6_check_ws = m.asm.Sf).apply(null, arguments)
    }
      , rc = m._cp6_force_disconnect = function() {
        return (rc = m._cp6_force_disconnect = m.asm.Tf).apply(null, arguments)
    }
      , sc = m._cp6_force_server_id = function() {
        return (sc = m._cp6_force_server_id = m.asm.Uf).apply(null, arguments)
    }
    ;
    m._cp6_timeout_fire = function() {
        return (m._cp6_timeout_fire = m.asm.Vf).apply(null, arguments)
    }
    ;
    m._aip_complete = function() {
        return (m._aip_complete = m.asm.Wf).apply(null, arguments)
    }
    ;
    var tc = m._cp6_set_skip_text_cache = function() {
        return (tc = m._cp6_set_skip_text_cache = m.asm.Xf).apply(null, arguments)
    }
    ;
    m._main = function() {
        return (m._main = m.asm.Yf).apply(null, arguments)
    }
    ;
    var oc = m._cp6_set_clipboard_callback = function() {
        return (oc = m._cp6_set_clipboard_callback = m.asm.Zf).apply(null, arguments)
    }
      , pc = m._cp6_browser_quit_confirmation = function() {
        return (pc = m._cp6_browser_quit_confirmation = m.asm._f).apply(null, arguments)
    }
    ;
    m._cp6_location_hash_changed = function() {
        return (m._cp6_location_hash_changed = m.asm.$f).apply(null, arguments)
    }
    ;
    m._emscripten_sleep = function() {
        return (m._emscripten_sleep = m.asm.ag).apply(null, arguments)
    }
    ;
    var qc = m._cp6_mouse_wheel = function() {
        return (qc = m._cp6_mouse_wheel = m.asm.bg).apply(null, arguments)
    }
    ;
    m._webRTCProxyOpen = function() {
        return (m._webRTCProxyOpen = m.asm.cg).apply(null, arguments)
    }
    ;
    m._webRTCProxyMessage = function() {
        return (m._webRTCProxyMessage = m.asm.dg).apply(null, arguments)
    }
    ;
    var uc = m._webRTCProxyClosed = function() {
        return (uc = m._webRTCProxyClosed = m.asm.eg).apply(null, arguments)
    }
      , Ib = m.stackSave = function() {
        return (Ib = m.stackSave = m.asm.gg).apply(null, arguments)
    }
      , Jb = m.stackRestore = function() {
        return (Jb = m.stackRestore = m.asm.hg).apply(null, arguments)
    }
      , Va = m.stackAlloc = function() {
        return (Va = m.stackAlloc = m.asm.ig).apply(null, arguments)
    }
    ;
    m.dynCall_jiji = function() {
        return (m.dynCall_jiji = m.asm.jg).apply(null, arguments)
    }
    ;
    m.dynCall_ji = function() {
        return (m.dynCall_ji = m.asm.kg).apply(null, arguments)
    }
    ;
    m.dynCall_viijii = function() {
        return (m.dynCall_viijii = m.asm.lg).apply(null, arguments)
    }
    ;
    m.dynCall_iiiiij = function() {
        return (m.dynCall_iiiiij = m.asm.mg).apply(null, arguments)
    }
    ;
    m.dynCall_iiiiijj = function() {
        return (m.dynCall_iiiiijj = m.asm.ng).apply(null, arguments)
    }
    ;
    m.dynCall_iiiiiijj = function() {
        return (m.dynCall_iiiiiijj = m.asm.og).apply(null, arguments)
    }
    ;
    var db;
    xa = function b() {
        db || jc();
        db || (xa = b)
    }
    ;
    if (m.preInit)
        for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length; )
            m.preInit.pop()();
    var lc = !0;
    m.noInitialRun && (lc = !1);
    jc()
}
)();
