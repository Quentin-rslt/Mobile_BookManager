import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Tag from '../../library/class/Tag';
import TagStyles from '../../styles/Screens/Tag/TagStyles';
import TextIconButton from '../../components/Buttons/TextIconButton';
import BookCard from '../../components/cards/BookCard';
import TagBuilder from '../../library/builders/TagBuilder';
import TopBar from '../../components/TopBar';

export default function TagScreen({ navigation, route } : any) {

    const tag:Tag = route.params.tag;
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDeleteTag = async () => {
        setIsLoading(true);
        try {
            await tag.client.tagService.deleteTag(tag);
        } catch(error) {
            console.log(error);
            ToastAndroid.show("Problème lors de la suppression du tag" , ToastAndroid.CENTER);
        }
        setIsLoading(false);
    };

    const onEditTag = () => {
        const newTag:TagBuilder = new TagBuilder(tag.client, tag.toJSON());
        navigation.navigate('EditTagScreen', { newTag });
    }

    return (
        <View style={TagStyles.container}>
            <TopBar iconButtonShow={true} searchBarShow={false}/>
            <ScrollView style={TagStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <Text style={TagStyles.textTag}>{tag.textTag}</Text>
                <View style={TagStyles.colorContainer}>
                    <Text style={TagStyles.textHolder}>Couleur :</Text>
                    <View style={[{backgroundColor: tag.colorTag}, TagStyles.colorTag]}></View>
                </View>
                {   
                    tag.books.size !== 0 &&
                    <View style={TagStyles.booksContainer}>
                        <Text style={TagStyles.textHolder}>Livres : ({tag.books.size.toString()})</Text>
                        {
                            Array.from(tag.books.values()).map((book, idBook) => 
                                <BookCard key={idBook} book={book} navigation={navigation}/>
                            )
                        }
                    </View>
                }
            </ScrollView>
            <View style={TagStyles.buttonsContainer}>
                <TextIconButton callBack={onEditTag} showIcon={false} text='Modifier' buttonStyle={TagStyles.button}/>
                <TextIconButton callBack={onDeleteTag} isLoading={isLoading} showIcon={false} text='Supprimer' buttonStyle={TagStyles.button}/>
            </View>
        </View>
    )
}