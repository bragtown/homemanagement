'use strict';

angular.module('homeManagementApp')
  .controller('MainCtrl', function ($scope) {

    //some sample meals and instantiation of the meals, CurrentMeals, and Ingredients arrays
    $scope.meals = [{
        mealname: "Cereal",
        ingredients: [{ingredientName: "cereal"}, {ingredientName: "milk"}],
        mealTime: "Breakfast",
        instructions: "Poor Cereal and milk in bowl: mix well"
    },{
        mealname: "Sandwhich",
        ingredients: [{ingredientName:"bread"}, {ingredientName:"cheese"}],
        mealTime: "Lunch",
        instructions: "make sandwhich; eat"
    }];
    $scope.CurrentMeals = [];
    $scope.ingredients = [{ingredientName:""}];

    //functionality in the add meal card
    $scope.addIngredient = function (){
        $scope.ingredients.push({ingredientName:""}); 
    }
    $scope.removeIngredient = function(id){
        $scope.ingredients.splice(id, 1);
    }
    $scope.addMeal = function (){
        $scope.meals.push({
            mealname: $scope.mealname,
            ingredients: $scope.ingredients,
            mealTime: $scope.mealTime,
            instructions: $scope.instructionsArea
        });
        clearNewMeal();
    }

    var clearNewMeal = function(){
        $scope.ingredients = [{ingredientName:""}];
        $scope.mealname = "";
        $scope.mealTime = "";
        $scope.instructionsArea = "";
        $scope.addItem = false;

    }

    $scope.deleteMeal = function($$hashKey){
        for (var i = 0; i<$scope.meals.length; i++){
            if ($scope.meals[i].$$hashKey === $$hashKey){
                $scope.meals.splice(i, 1);
            }
        }
    }
    var editingMeal;
    $scope.editMeal = function($$hashKey){
        for (var i = 0; i<$scope.meals.length; i++){
            if ($scope.meals[i].$$hashKey === $$hashKey){
                $scope.editButton = true;
                $scope.addItem = true;
                $scope.mealname = $scope.meals[i].mealname;
                $scope.ingredients = $scope.meals[i].ingredients;
                $scope.mealTime = $scope.meals[i].mealTime;
                $scope.instructionsArea = $scope.meals[i].instructions;
                editingMeal = i;
            }
        }
    }

    $scope.updateMeal = function(){
        $scope.meals[editingMeal] = {
            mealname: $scope.mealname,
            ingredients: $scope.ingredients,
            mealTime: $scope.mealTime,
            instructions: $scope.instructionsArea
        }
        $scope.editButton = false;
        $scope.addItem = false;
    }

    //logic for adding and subtracting meals to days of the week
    $scope.monday = true;
    $scope.day = "Monday"
    $scope.setDay = function (){
        $scope.monday = false;
        $scope.tuesday = false;
        $scope.wednesday = false;
        $scope.thursday = false;
        $scope.friday = false;
        $scope.saturday = false;
        $scope.sunday = false;
    }
    $scope.addToDay = function(meal){
        $scope.CurrentMeals.push({
            mealname: meal.mealname,
            ingredients: meal.ingredients,
            mealTime: meal.mealTime,
            instructions: meal.instructions,
            weekday: $scope.day
        });
    }
    $scope.removeCurrentMeal = function($$hashKey){
        for (var i = 0; i<$scope.CurrentMeals.length; i++){
            if ($scope.CurrentMeals[i].$$hashKey === $$hashKey){
                $scope.CurrentMeals.splice(i, 1);
            }
        }
    }
    $scope.shoppingList = [];
    $scope.generateShoppingList = function(){
        $scope.shoppingList = [];
        for(var i = 0; i< $scope.CurrentMeals.length; i++){
            for (var j = 0; j < $scope.CurrentMeals[i].ingredients.length; j++){
                var item = $scope.CurrentMeals[i].ingredients[j].ingredientName;
                if ($scope.shoppingList.length === 0){
                    $scope.shoppingList.push(item);
                }
                else{
                    var flipper = false;
                    for(var thing in $scope.shoppingList){
                        if($scope.shoppingList[thing] === item){
                            flipper = true;
                        }
                    }
                    if (!flipper){
                        $scope.shoppingList.push(item);
                    }
                }
                // $scope.shoppingList.push(item);
            }
        }
    }
  });
