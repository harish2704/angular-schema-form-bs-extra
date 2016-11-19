angular.module('asf.bs-extra').run(['$templateCache', function($templateCache) {$templateCache.put('asf-bs-extra/datetime.html','<div class="form-group {{form.htmlClass}} schema-form-select" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}"><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label><div class="{{ form.fieldWrapperHtmlClass }}"><div class="dropdown" ng-class="form.fieldHtmlClass + ( isOpen?\' open\': \'\' )"><a class="dropdown-toggle" ng-click="isOpen=!isOpen" id="{{form.key.slice(-1)[0]}}datetime"><div class="input-group"><input type="text" class="form-control" sf-field-model> <span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden="true"></span> <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div></a><ul class="dropdown-menu"><datetimepicker sf-field-model ng-disabled="form.readonly" sf-changed="form" schema-validate="form" on-set-time="isOpen=!isOpen" name="{{form.key.slice(-1)[0]}}"></datetimepicker></ul></div><div class="help-block" sf-message="form.description"></div><span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class="help-block" sf-message="form.description"></div></div></div>');
$templateCache.put('asf-bs-extra/multi-select.html','<div class="form-group {{form.htmlClass}} schema-form-select" ng-controller="typeaheadCtrl" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}"><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label><div class="{{ form.fieldWrapperHtmlClass }}"><ui-select multiple sf-field-model ng-disabled="form.readonly" sf-changed="form" class="{{form.fieldHtmlClass}}" schema-validate="form" name="{{form.key.slice(-1)[0]}}"><ui-select-match placeholder="{{ form.placeholder }}" allow-clear="true"><span ng-bind-html="getVal( $item, form.ref.label )"></span></ui-select-match><ui-select-choices repeat="getVal(item, form.ref.value ) as item in optionsData" refresh="search( form.ref, $select.search )" refresh-delay="1"><span ng-bind-html="getVal( item, form.ref.label )"></span></ui-select-choices></ui-select><div class="help-block" sf-message="form.description"></div><span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden="true"></span> <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class="help-block" sf-message="form.description"></div></div></div>');
$templateCache.put('asf-bs-extra/select.html','<div class="form-group {{form.htmlClass}} schema-form-select" ng-controller="typeaheadCtrl" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}"><label class="control-label {{form.labelHtmlClass}}" ng-show="showTitle()">{{form.title}}</label><div class="{{ form.fieldWrapperHtmlClass }}"><ui-select sf-field-model ng-disabled="form.readonly" sf-changed="form" class="{{form.fieldHtmlClass}}" schema-validate="form" name="{{form.key.slice(-1)[0]}}"><ui-select-match placeholder="{{ form.placeholder }}" allow-clear="true"><span ng-bind-html="getVal( $select.selected, form.ref.label )"></span></ui-select-match><ui-select-choices repeat="getVal(item, form.ref.value ) as item in optionsData" refresh="search( form.ref, $select.search )" refresh-delay="1"><span ng-bind-html="getVal( item, form.ref.label )"></span></ui-select-choices></ui-select><div class="help-block" sf-message="form.description"></div><span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden="true"></span> <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class="help-block" sf-message="form.description"></div></div></div>');
$templateCache.put('asf-bs-extra/typeahead.html','<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}" ng-controller="typeaheadCtrl" ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }"><label class="control-label {{form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{form.title}}</label><div class="{{ form.fieldWrapperHtmlClass }}"><input ng-if="!form.fieldAddonLeft && !form.fieldAddonRight" ng-show="form.key" type="{{form.type}}" step="any" sf-changed="form" uib-typeahead="item for item in search( form.ref, $viewValue )" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" ng-model-options="form.ngModelOptions" ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + \'Status\'}}"> <span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden="true"></span> <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + \'Status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class="help-block" sf-message="form.description"></div></div></div>');}]);