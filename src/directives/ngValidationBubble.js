﻿ngValidationSummary.directive('ngValidationBubble', function () {

  var checkDirectivePrerequisites = function (attr, form, validationsContainer) {
    if (!attr.name) {
      throw "validationbubble must be set on an input element that has a 'name' attribute";
    }

    if (!attr.validationFriendlyName) {
      throw "validationbubble must define a 'validationFriendlyName' attribute for the control (this friendly name will be displayed in the validationSummary)";
    }

    if (!form.$name) {
      throw "validationbubble requires that a name is assigned to the ng-form containing the validated input";
    }

  };

  return {
    require: ['ngModel', '^form', "^ngValidationsContainer"],
    restrict: "A",

    link: function (scope, element, attr, ctrls) {
      var model = ctrls[0];
      var form = ctrls[1];
      var ngValidationsContainer = ctrls[2];
      var validationFriendlyName = attr.validationFriendlyName;
      var validationCustomErrorDirective =  attr.validationCustomErrorDirective;
      var validationCustomErrorMessage = attr.validationCustomErrorMessage;

      checkDirectivePrerequisites(attr, form, ngValidationsContainer);

      var propertyToWatch = form.$name + "." + model.$name + ".$valid";

      scope.$watch(propertyToWatch, function (isValid, lastValue) {
        if (typeof isValid !== "undefined") {
          ngValidationsContainer.$updateValidationResult(model, validationFriendlyName, validationCustomErrorDirective, validationCustomErrorMessage);
        }
      });
    }
  };
});