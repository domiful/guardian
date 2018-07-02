import React from 'react';
import PropTypes from 'prop-types';
import { Image, TextInput } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, Text, View } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const oldL = "";
const c = 1;
const newRecipes = null;
let recipe = null;
const RecipeEdit = ({
  error,
  recipes,
  recipeId,
}) => {
  if(c){
      console.log('run');
      newRecipes = recipes;
      c--;
  }
  
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  if (recipeId && recipes && recipe===null) {
    console.log('hi');
    recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  }

  // Recipe not found
  if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  // Build Ingredients listing
  const ingredients = recipe.ingredients.map(item => (
    <ListItem key={item} textInput={true} textInputValue={item} textInputContainerStyle={{ flex: 5 }}
    rightIcon={{ style: { opacity: 0 } }}
    textInputOnChangeText={(val) => {
        var nRi = recipes.findIndex(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
        var nIi = recipe.ingredients.findIndex(item => item === oldL);
        
        recipe.ingredients[nIi] = val;
        console.log(recipe);
        newRecipes[nRi]=recipe;
        console.log(newRecipes[nRi]);
        
    }} 
    textInputOnFocus={(val) => {oldL = val;}}/>
  ));

  // Build Method listing
  const method = recipe.method.map(item => (
    <ListItem key={item} textInput={true} textInputValue={item} rightIcon={{ style: { opacity: 0 } }}/>
  ));

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: recipe.image }} style={{ height: 200, width: null, flex: 1 }} />

        <Spacer size={25} />
        <View style={{borderWidth:1, borderColor:'rgba(0,0,0,0.2)', paddingLeft: 5}}>
          <TextInput
            key={"title"}
            style={{height: 40, fontSize: 22, fontWeight: 'bold'}}
            value={recipe.title}
            onChangeText={(val) => {
                var nRi = recipes.findIndex(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
                
                newRecipes[nRi].title=val;
                recipe.title=val;
            }} 
          />
        </View>
        
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>Description</Text>
          </CardItem>
            <TextInput
            key={"desc"}
            multiline={true}
            numberOfLines={4}
            style={{padding: 5, fontSize: 15}}
            value={recipe.body}
            onChangeText={(val) => {
                var nRi = recipes.findIndex(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
                
                newRecipes[nRi].body=val;
                recipe.body=val;
            }}
        />
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Ingredients</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {ingredients}
              </List>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Instructions</Text>
          </CardItem>

            <CardItem>
            <Content>
              <List>
                {method}
              </List>
            </Content>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeEdit.propTypes = {
  error: PropTypes.string,
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeEdit.defaultProps = {
  error: null,
};

export default RecipeEdit;

export function updateRecipes() {
    let recipesUrl = url + "/mobile/custom/VitamixCustomAPI/updateRecipeData";
    let auth = {
      headers: {
        "Authorization": aToken,
        "Oracle-Mobile-Backend-ID": backID,
        'Content-Type': 'application/json'
      }
    };
    
    return axios
        .post(recipesUrl, newRecipes ,auth)
        .then(function (response) {
          
          return response;
        }).catch(e => console.log(e));
  }