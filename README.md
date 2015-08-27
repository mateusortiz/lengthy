## lengthy

> Format Date JavaScript without [jQuery](https://jquery.com) and others dependencies.

## Getting Started

to get lengthy, you have these options:

Install via [bower](http://bower.io):

```sh
$ bower install lengthy --save
```

Or [Download option](https://github.com/mateusortiz/lengthy/archive/master.zip).

**Roadmap**

- [ ] Tests (TDD/BDD)

## Usage

*Browser*

```html
<script src="lengthy.min.js"></script>
<script>
	lengthy(MM.YYYY);
</script>
```

*Basic Usage*

```js
lengthy('dd.MM.YY') // 26.08.15

var date = new Date();
date.setFullYear(2020);
lengthy('dd.MM.YYYY', date); 26.08.2020
```

Property			| 	 Description
---				| ---
`YYYY`		|  4 digits year.
`YY`		|  Last 2 digits of year.
`MMMM`	|  Full name of month.
`MMM`		|  Short name of month.
`MM`		|  ISO8601-compatible number of month (i.e. zero-padded) in year (with January being 1st month).
`M`	|  Number of month in year without zero-padding (with January being 1st month).
`DD`		|  Full name of day.
`D`		|  Short name of day.
`dd`	|  Zero-padded number of day in month.
`d`		|  Number of day in month.
`HH`		|  Zero-padded 24 hour time.
`H`	|  24 hour time.
`hh`	|  Zero-padded 12 hour time.
`h`		|  12 hour time.
`mm`		|  Zero-padded minutes.
`m`	|  minutes.
`ss`		|  Zero-padded seconds.
`s`		|  Seconds.
`ff`	|  Zero-padded milleseconds, 3 digits.
`f`	|  Milleseconds.
`A`		|  AM/PM.
`a`		|  am/pm.
`Z`	|  Time-zone in ISO8601-compatible format (i.e. "-04:00").


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

Inspired by [Pretty](http://ejohn.org/blog/javascript-pretty-date/) of John Resig.

