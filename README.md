# jQuery Password Validator

### Simple live validation of password requirements

This plugin is intended to provide a simple, drop in solution for helping users meet burdensome password requirements.

## Usage

1. Include [jQuery](http://jquery.com/) and [Underscore.js](http://underscorejs.org/):

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="path/to/jquery-password-validator.min.js"></script>
	<link rel="stylesheet" href="path/to/jquery-password-validator.css"></link>
	```

3. Call the plugin:

	```html
	<input type="password" id="password_input">

	<script>
		$(function () {
			$("#password_input").passwordValidator({
				// list of qualities to require
				require: ['length', 'lower', 'upper', 'digit', 'match'],
				// minimum length requirement
				length: 12,
				// if using match, what elements are you wanting to match
				matchSelectors: {'matchOther': 'Password', 'matchThis': 'ConfirmPassword'},
			});
		});
	</script>
	```

### Options

#### require
An array of validation requirements. Valid options are:

* length - validate minimum password length
* lower - validate password includes at least one lower case character
* upper - validate password includes at least one upper case character
* digit - validate password includes at least one digit

For example `require: ['lower', 'digit']` would result in validation which requires at least one lower case alpha character, and a numeric character, but use no explicit length validation (although in this example a password would need to be at least two characters to satisfy the other requirements), nor the inclusion of an upper case character.

Default is to require all 4 available options.

#### length
The minimum length to require, if `"length"` is included in the `require` option.

Default value is 12.

## Contributing
Check [CONTRIBUTING.md](https://github.com/IoraHealth/jquery-password-validator/blob/master/CONTRIBUTING.md) for more information.

## License

[MIT License](https://github.com/IoraHealth/jquery-password-validator/blob/mc-inital_implementation/LICENSE.md) © Iora Health
