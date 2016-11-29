var app = angular.module('myApp',[]);
app.config(function($interpolateProvider) {

  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
  console.log('configuring ...');

});
app.constant('SHEMA',[
			{ "desc": "ʾalif", "arabic": "\u0627", "latin": ["a"]},
			{ "desc": "bā’", "arabic": "\u0628", "latin": ["b", "B"]},
			{ "desc": "tā’", "arabic": "\u062A", "latin": ["t"]},
			{ "desc": "thā’", "arabic": "\u062B", "latin": ["c"]},
			{ "desc": "jīm", "arabic": "\u062C", "latin": ["j"]},
			{ "desc": "ḥā’", "arabic": "\u062D", "latin": ["h"]},
			{ "desc": "khā’", "arabic": "\u062E", "latin": ["h'","kh="]},
			{ "desc": "dāl", "arabic": "\u062F", "latin": ["d"]},
			{ "desc": "dhāl", "arabic": "\u0630", "latin": ["z"]},
			{ "desc": "rā’", "arabic": "\u0631", "latin": ["r", "R"]},
			{ "desc": "zāy", "arabic": "\u0632", "latin": ["Z"]},
			{ "desc": "sīn", "arabic": "\u0633", "latin": ["s"]},
			{ "desc": "shīn", "arabic": "\u0634", "latin": ["C"]},
			{ "desc": "ṣād", "arabic": "\u0635", "latin": ["S"]},
			{ "desc": "ḍād", "arabic": "\u0636", "latin": ["D"]},
			{ "desc": "ṭā’", "arabic": "\u0637", "latin": ["T"]},
			{ "desc": "ẓā’", "arabic": "\u0638", "latin": ["x","X"]},
			{ "desc": "‘ayn", "arabic": "\u0639", "latin": ["e", "E"]},
			{ "desc": "ghayn", "arabic": "\u063A", "latin": ["g", "G"]},
			{ "desc": "fā’", "arabic": "\u0641", "latin": ["f", "F", "p", "P"]},
			{ "desc": "qāf", "arabic": "\u0642", "latin": ["q", "Q"]},
			{ "desc": "kāf", "arabic": "\u0643", "latin": ["k", "K"]},
			{ "desc": "lām", "arabic": "\u0644", "latin": ["l", "L"]},
			{ "desc": "mīm", "arabic": "\u0645", "latin": ["m", "M"]},
			{ "desc": "nūn", "arabic": "\u0646", "latin": ["n", "N"]},
			{ "desc": "hā’", "arabic": "\u0647", "latin": ["H"]},
			{ "desc": "wāw", "arabic": "\u0648", "latin": ["w", "u", "W"]},
			{ "desc": "ta", "arabic": "\u0629", "latin": ["to=","o"]},
			{ "desc": "yā’", "arabic": "\u064A", "latin": ["y"]},
			{ "desc": "hamzah", "arabic": "\u0621", "latin": ["<"]},
			{ "desc": "zero", "arabic": "\u0660", "latin": ["0"]},
			{ "desc": "one", "arabic": "\u0661", "latin": ["1"]},
			{ "desc": "two", "arabic": "\u0662", "latin": ["2"]},
			{ "desc": "thre", "arabic": "\u0663", "latin": ["3"]},
			{ "desc": "four", "arabic": "\u0664", "latin": ["4"]},
			{ "desc": "five", "arabic": "\u0665", "latin": ["5"]},
			{ "desc": "six", "arabic": "\u0666", "latin": ["6"]},
			{ "desc": "seven", "arabic": "\u0667", "latin": ["7"]},
			{ "desc": "eight", "arabic": "\u0668", "latin": ["8"]},
			{ "desc": "nine", "arabic": "\u0669", "latin": ["9"]},
			{ "desc": "fat?ah", "arabic": "\u064E", "latin": ["a"]},
			{ "desc": "kasrah","arabic": "\u0650", "latin": ["i"]},
			{ "desc": "?ammah","arabic": "\u064F", "latin": ["u"]},
			{ "desc": "fat?atain","arabic": "\u064B", "latin": ["AA","an="]},
			{ "desc": "kasratain","arabic": "\u064D", "latin": ["II","in="]},
			{ "desc": "?ammatain","arabic": "\u064C", "latin": ["UU","un="]},
			{ "desc": "sukun", "arabic": "\u0652", "latin": ["`"]},
			{ "desc": "shaddah","arabic": "\u0651", "latin": ["{", "}"]},
			{ "desc": "maddah","arabic": "\u0653", "latin": ["~"]},
			{ "desc": "superscript alif","arabic": "\u0670", "latin": ["/"]},
			{ "desc": "subscript alif","arabic": "\u0656", "latin": ["-"]},
			{ "desc": "alif maqṣūrah","arabic": "\u0649", "latin": ["A"]},
			{ "desc": "question mark","arabic": "\u061F", "latin": ["qm="]},
]);
/* Makes main textarea to be always in focus */
app.directive('autoFocus',[ function() {
    return {
        restrict: 'A',
        scope: {
            value: "=autoFocus"
        },
        link: function($scope, $element, attrs) {
            $scope.$watch("value", function(currentValue, previousValue) {
                $element[0].focus();
            })
        }
    }
}])

app.controller('ArabicKeyCtrl',["$scope","SHEMA",function($scope,SHEMA) {
	$scope.text = "";
	$scope.shema = SHEMA;
	$scope.conversionOn = true;
	console.log('controller init');
	$scope.translate = function(letter){
		$scope.text += letter;
		$scope.autoFocus = ! $scope.autoFocus;
	}
	
	$scope.convert = function(text){

		if($scope.conversionOn){
		
			var txt = text || $scope.text;
				angular.forEach($scope.shema, function(obj, k){
					angular.forEach(obj.latin, function(c, kk){
						
						var re = new RegExp(c);
						txt = txt.replace(re,obj.arabic);
					});
				});
			
			
			//$scope.text = txt; 


			if(text === undefined)
				$scope.text = txt;
			else
				return txt;
			
		}
	}

	

	$scope.transform = function(){
		
				angular.forEach($scope.shema, function(obj, k){
					angular.forEach(obj.latin, function(c, kk){

						if(c.length >= 2){
							var result = $scope.convert(c);
							obj.latin.push(result);
							//console.log(angular.toJson(obj.latin));
						}
					});
				});
	}

	$scope.transform();
}]);


