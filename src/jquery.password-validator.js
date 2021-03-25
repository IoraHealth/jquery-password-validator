(function ($, window, document, undefined) {
  "use strict";

  // Plugin setup
  var pluginName = "passwordValidator",
    defaults = {
      length: 12,
      matchSelectors: {"matchOther": "Password", "matchThis": "ConfirmPassword"},
      require: ["length", "lower", "upper", "digit", "match"],
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.wrapperElement = element;
    this.element = $(element).find("#person_password");
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Actual plugin code follows:

  // Regular expressions used for validation
  var validators = {
    upper: {
      validate: function (password) {
        return password.match(/[A-Z]/) != null;
      },
      message: "capital letter",
    },
    lower: {
      validate: function (password) {
        return password.match(/[a-z]/) != null;
      },
      message: "lower case letter",
    },
    digit: {
      validate: function (password) {
        return password.match(/\d/) != null;
      },
      message: "number",
    },
    length: {
      validate: function (password, settings) {
        return password.length >= settings.length;
      },
      message: function (settings) {
        return settings.length + " characters";
      },
      preface: "Be at least",
    },
    match: {
      validate: function (password, id) {
        if (id === settings.matchSelectors.matchThis) {
          var confirmPassword = $('#' + _this.settings.matchSelectors.matchOther).val();
          return password === confirmPassword;
        }
      },
      message: function (settings) {
        return " " + settings.matchSelectors.matchOther;
      },
      preface: "Must Match"
    }
  };

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      this.wrapInput(this.wrapperElement);
      this.inputWrapper.append(this.buildUi());
      this.bindBehavior();
    },

    wrapInput: function (input) {
      $(input).wrap(JST.input_wrapper());
      this.inputWrapper = $(".jq-password-validator");
      return this.inputWrapper;
    },

    buildUi: function () {
      var ui = $(JST.popover());
      var _this = this;

      _.each(this.settings.require, function (requirement) {
        var message;
        if (validators[requirement].message instanceof Function) {
          message = validators[requirement].message(_this.settings);
        } else {
          message = validators[requirement].message;
        }

        var preface = validators[requirement].preface || "Contain a";

        var ruleMarkup = JST.row({
          ruleName: requirement,
          message: message,
          preface: preface,
        });

        ui.append($(ruleMarkup));
      });

      this.ui = ui;
      return ui;
    },

    bindBehavior: function () {
      var _this = this;
      $(this.element).on("focus", function () {
        _this.validate();
      });
      $(this.element).on("keyup", function () {
        _this.validate();
      });
    },

    showUi: function () {
      this.ui.show();
      $(this.element).parent().removeClass("is-hidden");
      $(this.element).parent().addClass("is-visible");
    },

    hideUi: function () {
      this.ui.hide();
      $(this.element).parent().removeClass("is-visible");
      $(this.element).parent().addClass("is-hidden");
    },

    validate: function () {
      var currentPassword = $(this.element).val();
      var _this = this;
      _.each(this.settings.require, function (requirement) {
        if (validators[requirement].validate(currentPassword, _this.settings,  _this.element.id)) {
          _this.markRuleValid(requirement);
        } else {
          _this.markRuleInvalid(requirement);
        }
      });
    },

    markRuleValid: function (ruleName) {
      var row = this.ui.find("." + ruleName);
      row.addClass("is-valid");
      row.removeClass("is-invalid");
    },

    markRuleInvalid: function (ruleName) {
      var row = this.ui.find("." + ruleName);
      row.removeClass("is-valid");
      row.addClass("is-invalid");
    },
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
