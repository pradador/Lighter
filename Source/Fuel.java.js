/*
---
description: Java language fuel.

license: MIT-style

authors:
- Italo Maia

requires:
  core/1.2.4: '*'

provides: [Fuel.java]

ps: no annotation support yet

...
*/
Fuel.java = new Class ({
	
	Extends: Fuel,
	language: 'java',
	
	initialize: function(code, options) {
		
		/** Set of keywords in CSV form. Add multiple keyword hashes for differentiate keyword sets. */
		this.keywords = new Hash({
			reserved: {
				csv: "abstract, continue, for, new, switch, assert, default, goto, package, synchronized, do, if, private, this, break, implements, protected, throw, else, import, public, throws, case, instanceof, return, transient, catch, extends, try, final, interface, static, void, class, finally, strictfp, volatile, const, native, super, while",
				alias: 'kw1'
			},
            primitives: {
				csv: "byte, short, int, long, float, double, boolean, char",
				alias: 'kw2'
			},
		}),
		
		/** Set of RegEx patterns to match */
		this.patterns = new Hash({
            'slashComments': {pattern: this.common.slashComments, alias: 'co1'},
			'multiComments': {pattern: this.common.multiComments, alias: 'co2'},
			
            'chars':         {pattern: this.common.singleQuotedString, alias: 'st0'},
			'strings':       {pattern: this.common.doubleQuotedString, alias: 'st1'},
            'annotation':    {pattern: /@[\W\w_][\w\d_]+/gm, alias: 'st1'},

			'numbers':    {pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim, alias: 'nu0'},
			'properties': {pattern: this.common.properties, alias: 'me0'},
			'brackets':   {pattern: this.common.brackets,   alias: 'br0'},
		});
		
		// Call parent constructor AFTER instance variables are set.
		this.parent(code, options);
	}
});
