import { ListItem, Avatar, Button, Icon } from "@rneui/themed";
import React, { useContext } from "react";
import { View, FlatList, Alert } from "react-native";
import UsersContext from "../context/UserContext";

export default props => {

    const {state, dispatch} = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário',[
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ]   
        )
    }

    function getUserItem({ item : user }){
        return (
            <ListItem key={user.id} bottomDivider 
            onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Button 
                    onPress={() => props.navigation.navigate('UserForm',user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange"/>}>
                </Button>
                <Button 
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red"/>}>
                </Button>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}