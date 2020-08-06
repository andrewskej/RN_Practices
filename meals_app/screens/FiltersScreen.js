import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{true: Colors.primaryColor}} 
                thumbColor={Platform.OS === 'android' && Colors.primaryColor}
                value={props.state} 
                onValueChange={props.onChange}/>
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVeganFree, setIsVeganFree] = useState(false);
    const [isVegieFree, setIsVegieFree] = useState(false);
    
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree : isGlutenFree,
            lactoseFree: isLactoseFree,
            veganFree: isVeganFree,
            vegieFree: isVegieFree
        }

        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVeganFree, isVegieFree]);

    //to save the state..
    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions </Text>
            <FilterSwitch 
                label="Gluten-free" 
                state={isGlutenFree} 
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch 
                label="Lactose-free" 
                state={isLactoseFree} 
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
                label="Vegan-free" 
                state={isVeganFree} 
                onChange={newValue => setIsVeganFree(newValue)}
            />
            <FilterSwitch 
                label="Vegie-free" 
                state={isVegieFree} 
                onChange={newValue => setIsVegieFree(newValue)}
            />    
        </View>
    )
};



FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} 
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={() => {
                        navData.navigation.getParam('save');
                    }} />
            </HeaderButtons>
        ) 
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%',
        marginVertical:15
    },
    title:{
        fontSize:22,
        margin:20,
        textAlign:'center'
    }
})

export default FiltersScreen;