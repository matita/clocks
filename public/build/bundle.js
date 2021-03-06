
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/SearchForm.svelte generated by Svelte v3.35.0 */

    const file$4 = "src/components/SearchForm.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let label;
    	let t1;
    	let input;

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			label.textContent = "What time is it in";
    			t1 = space();
    			input = element("input");
    			attr_dev(label, "class", "search-label");
    			attr_dev(label, "for", "search-text");
    			add_location(label, file$4, 1, 2, 28);
    			attr_dev(input, "class", "search-text");
    			attr_dev(input, "id", "search-text");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "some city");
    			add_location(input, file$4, 2, 2, 103);
    			attr_dev(div, "class", "search-form");
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(div, t1);
    			append_dev(div, input);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SearchForm", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SearchForm> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SearchForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SearchForm",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/Footer.svelte generated by Svelte v3.35.0 */

    const file$3 = "src/components/Footer.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let span0;
    	let t0;
    	let a0;
    	let t2;
    	let span1;
    	let t3;
    	let a1;
    	let t5;
    	let t6;
    	let span2;
    	let t7;
    	let a2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text("Fork it on ");
    			a0 = element("a");
    			a0.textContent = "GitHub";
    			t2 = text("\n  ·\n  ");
    			span1 = element("span");
    			t3 = text("Need a feature? Found a bug? ");
    			a1 = element("a");
    			a1.textContent = "File an issue";
    			t5 = text("!");
    			t6 = text("\n  ·\n  ");
    			span2 = element("span");
    			t7 = text("Made by ");
    			a2 = element("a");
    			a2.textContent = "Matita";
    			attr_dev(a0, "href", "https://github.com/matita/clocks/");
    			add_location(a0, file$3, 1, 19, 40);
    			add_location(span0, file$3, 1, 2, 23);
    			attr_dev(a1, "href", "https://github.com/matita/clocks/issues");
    			add_location(a1, file$3, 3, 37, 150);
    			add_location(span1, file$3, 3, 2, 115);
    			attr_dev(a2, "href", "http://matita.github.io/2015/10/17/clocks/");
    			add_location(a2, file$3, 5, 16, 253);
    			add_location(span2, file$3, 5, 2, 239);
    			attr_dev(div, "class", "footer");
    			add_location(div, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(span0, a0);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(span1, a1);
    			append_dev(span1, t5);
    			append_dev(div, t6);
    			append_dev(div, span2);
    			append_dev(span2, t7);
    			append_dev(span2, a2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Footer", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/Clock.svelte generated by Svelte v3.35.0 */

    const file$2 = "src/components/Clock.svelte";

    function create_fragment$2(ctx) {
    	let div8;
    	let label0;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = (/*clock*/ ctx[0].name || "---") + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = /*clock*/ ctx[0].city + "";
    	let t4;
    	let label0_for_value;
    	let t5;
    	let input;
    	let input_id_value;
    	let t6;
    	let div7;
    	let div3;
    	let t8;
    	let div4;
    	let t10;
    	let div5;
    	let t12;
    	let div6;
    	let label1;

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			label0 = element("label");
    			div0 = element("div");
    			t0 = text(/*time*/ ctx[1]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			div7 = element("div");
    			div3 = element("div");
    			div3.textContent = "Rename";
    			t8 = space();
    			div4 = element("div");
    			div4.textContent = "Delete";
    			t10 = space();
    			div5 = element("div");
    			div5.textContent = "Test specific time";
    			t12 = space();
    			div6 = element("div");
    			label1 = element("label");
    			label1.textContent = "×";
    			attr_dev(div0, "class", "clock-time");
    			add_location(div0, file$2, 18, 4, 438);
    			attr_dev(div1, "class", "clock-name");
    			add_location(div1, file$2, 19, 4, 479);
    			attr_dev(div2, "class", "clock-city");
    			add_location(div2, file$2, 20, 4, 535);
    			attr_dev(label0, "for", label0_for_value = /*clock*/ ctx[0].id);
    			add_location(label0, file$2, 17, 2, 411);
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", input_id_value = /*clock*/ ctx[0].id);
    			attr_dev(input, "name", "clock-actions");
    			add_location(input, file$2, 23, 2, 592);
    			attr_dev(div3, "class", "clock-action clock-action-rename");
    			add_location(div3, file$2, 25, 4, 682);
    			attr_dev(div4, "class", "clock-action clock-action-delete");
    			add_location(div4, file$2, 26, 4, 745);
    			attr_dev(div5, "class", "clock-action clock-action-changeTime");
    			add_location(div5, file$2, 27, 4, 808);
    			attr_dev(label1, "for", "no-clock");
    			add_location(label1, file$2, 28, 36, 919);
    			attr_dev(div6, "class", "clock-action-close");
    			add_location(div6, file$2, 28, 4, 887);
    			attr_dev(div7, "class", "clock-actions");
    			add_location(div7, file$2, 24, 2, 650);
    			attr_dev(div8, "class", "clock");
    			toggle_class(div8, "clock-local", /*clock*/ ctx[0].isLocal);
    			add_location(div8, file$2, 16, 0, 353);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, label0);
    			append_dev(label0, div0);
    			append_dev(div0, t0);
    			append_dev(label0, t1);
    			append_dev(label0, div1);
    			append_dev(div1, t2);
    			append_dev(label0, t3);
    			append_dev(label0, div2);
    			append_dev(div2, t4);
    			append_dev(div8, t5);
    			append_dev(div8, input);
    			append_dev(div8, t6);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div7, t8);
    			append_dev(div7, div4);
    			append_dev(div7, t10);
    			append_dev(div7, div5);
    			append_dev(div7, t12);
    			append_dev(div7, div6);
    			append_dev(div6, label1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*time*/ 2) set_data_dev(t0, /*time*/ ctx[1]);
    			if (dirty & /*clock*/ 1 && t2_value !== (t2_value = (/*clock*/ ctx[0].name || "---") + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*clock*/ 1 && t4_value !== (t4_value = /*clock*/ ctx[0].city + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*clock*/ 1 && label0_for_value !== (label0_for_value = /*clock*/ ctx[0].id)) {
    				attr_dev(label0, "for", label0_for_value);
    			}

    			if (dirty & /*clock*/ 1 && input_id_value !== (input_id_value = /*clock*/ ctx[0].id)) {
    				attr_dev(input, "id", input_id_value);
    			}

    			if (dirty & /*clock*/ 1) {
    				toggle_class(div8, "clock-local", /*clock*/ ctx[0].isLocal);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Clock", slots, []);
    	let { clock } = $$props;
    	let { dateMs } = $$props;
    	const date = new Date();
    	let time;
    	const pad = text => ("0" + text).substr(-2);
    	const formatTime = d => pad(d.getHours()) + ":" + pad(d.getMinutes());
    	const HOUR = 1000 * 60 * 60;
    	const writable_props = ["clock", "dateMs"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Clock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("clock" in $$props) $$invalidate(0, clock = $$props.clock);
    		if ("dateMs" in $$props) $$invalidate(2, dateMs = $$props.dateMs);
    	};

    	$$self.$capture_state = () => ({
    		clock,
    		dateMs,
    		date,
    		time,
    		pad,
    		formatTime,
    		HOUR
    	});

    	$$self.$inject_state = $$props => {
    		if ("clock" in $$props) $$invalidate(0, clock = $$props.clock);
    		if ("dateMs" in $$props) $$invalidate(2, dateMs = $$props.dateMs);
    		if ("time" in $$props) $$invalidate(1, time = $$props.time);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*dateMs, clock*/ 5) {
    			{
    				date.setTime(dateMs + (clock.timezone || 0) * HOUR);
    				$$invalidate(1, time = formatTime(date));
    			}
    		}
    	};

    	return [clock, time, dateMs];
    }

    class Clock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { clock: 0, dateMs: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Clock",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*clock*/ ctx[0] === undefined && !("clock" in props)) {
    			console.warn("<Clock> was created without expected prop 'clock'");
    		}

    		if (/*dateMs*/ ctx[2] === undefined && !("dateMs" in props)) {
    			console.warn("<Clock> was created without expected prop 'dateMs'");
    		}
    	}

    	get clock() {
    		throw new Error("<Clock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set clock(value) {
    		throw new Error("<Clock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dateMs() {
    		throw new Error("<Clock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dateMs(value) {
    		throw new Error("<Clock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Clocks.svelte generated by Svelte v3.35.0 */
    const file$1 = "src/components/Clocks.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (26:2) {#each clocks as clock}
    function create_each_block(ctx) {
    	let clock;
    	let current;

    	clock = new Clock({
    			props: {
    				clock: /*clock*/ ctx[2],
    				dateMs: /*dateMs*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(clock.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(clock, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const clock_changes = {};
    			if (dirty & /*dateMs*/ 1) clock_changes.dateMs = /*dateMs*/ ctx[0];
    			clock.$set(clock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(clock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(clock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(clock, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(26:2) {#each clocks as clock}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let p;
    	let t1;
    	let current;
    	let each_value = /*clocks*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Back to current time";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "back-to-current-time");
    			add_location(p, file$1, 24, 2, 409);
    			attr_dev(div, "class", "clocks");
    			add_location(div, file$1, 23, 0, 386);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*clocks, dateMs*/ 3) {
    				each_value = /*clocks*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Clocks", slots, []);

    	let clocks = [
    		{
    			id: 0,
    			name: "",
    			city: "local",
    			isLocal: true
    		},
    		{
    			id: 1,
    			name: "some name",
    			city: "cityland",
    			timezone: 1
    		},
    		{
    			id: 2,
    			name: "some other name",
    			city: "townville",
    			timezone: 2.5
    		}
    	];

    	let dateMs = Date.now();
    	setInterval(() => $$invalidate(0, dateMs = Date.now()), 100);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Clocks> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Clock, clocks, dateMs });

    	$$self.$inject_state = $$props => {
    		if ("clocks" in $$props) $$invalidate(1, clocks = $$props.clocks);
    		if ("dateMs" in $$props) $$invalidate(0, dateMs = $$props.dateMs);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [dateMs, clocks];
    }

    class Clocks extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Clocks",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.35.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div;
    	let searchform;
    	let t0;
    	let input;
    	let t1;
    	let clocks;
    	let t2;
    	let footer;
    	let current;
    	searchform = new SearchForm({ $$inline: true });
    	clocks = new Clocks({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(searchform.$$.fragment);
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			create_component(clocks.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", "no-clock");
    			attr_dev(input, "name", "clock-actions");
    			add_location(input, file, 9, 2, 219);
    			attr_dev(div, "class", "main");
    			add_location(div, file, 6, 0, 180);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(searchform, div, null);
    			append_dev(div, t0);
    			append_dev(div, input);
    			append_dev(div, t1);
    			mount_component(clocks, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(searchform.$$.fragment, local);
    			transition_in(clocks.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(searchform.$$.fragment, local);
    			transition_out(clocks.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(searchform);
    			destroy_component(clocks);
    			if (detaching) detach_dev(t2);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SearchForm, Footer, Clocks });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
