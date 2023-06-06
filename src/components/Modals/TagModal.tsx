import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Tag from '../../library/class/Tag';
import TextIconButton from '../Buttons/TextIconButton';
import { COLORS } from '../../library/CommonColors';
import TagModalStyles from '../../styles/components/Modals/TagModalStyles';
import BookCard from '../cards/BookCard';
import { Feather } from '@expo/vector-icons';
import CommonStyles from '../../styles/CommonStyles';
import TagBuilder from '../../library/builders/TagBuilder';
import Modal from "react-native-modal";
import GestureRecognizer from 'react-native-swipe-gestures';

interface Props {
    tag: Tag;
    showModalTag: boolean;
    setShowModalTag: React.Dispatch<React.SetStateAction<boolean>> ;
    onRefresh: () => Promise<void> | void;
    navigation: any;
}

export default function TagModal({ tag, showModalTag, setShowModalTag, onRefresh, navigation }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onDeleteTag = async () => {
        setIsLoading(true);
        try {
            await tag.client.tagService.deleteTag(tag);
            onRefresh();
            
            setShowModalTag(!showModalTag);
        } catch(error) {
            console.log(error);
            ToastAndroid.show("Problème lors de la suppression du tag" , ToastAndroid.CENTER);
        }
        setIsLoading(false);
    };

    const onEditTag = () => {
        setShowModalTag(!showModalTag);
        const newTag:TagBuilder = new TagBuilder(tag.client, tag.toJSON());
        navigation.navigate('EditTagScreen', { newTag });
    }

    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={ () => setShowModalTag(false)}>
            <Modal 
                style={{ margin: 0 }} 
                isVisible={showModalTag} 
                onBackdropPress={() => setShowModalTag(false)} 
            >
                <View style={TagModalStyles.container}>
                    <View style={TagModalStyles.returnButton}>
                        <Feather name={'minus'} size={65} color={COLORS.accentColor}/>
                    </View>
                    <ScrollView style={CommonStyles.scrollViewModal} showsVerticalScrollIndicator={false}>
                        <Text style={TagModalStyles.textTag}>{tag.textTag}</Text>
                        <View style={TagModalStyles.colorContainer}>
                            <Text style={TagModalStyles.textHolder}>Couleur :</Text>
                            <View style={[{backgroundColor: tag.colorTag}, TagModalStyles.colorTag]}></View>
                        </View>
                        {   
                            tag.books.size !== 0 &&
                            <View style={TagModalStyles.booksContainer}>
                                <Text style={TagModalStyles.textHolder}>Livres : ({tag.books.size.toString()})</Text>
                                {
                                    Array.from(tag.books.values()).map((book, idBook) => 
                                        <BookCard key={idBook} book={book} onRefresh={onRefresh} navigation={navigation}/>
                                    )
                                }
                            </View>
                        }
                    </ScrollView>
                </View>
                <View style={TagModalStyles.buttonsContainer}>
                    <TextIconButton callBack={onEditTag} showIcon={false} text='Modifier' buttonStyle={TagModalStyles.button}/>
                    <TextIconButton callBack={onDeleteTag} isLoading={isLoading} showIcon={false} text='Supprimer' buttonStyle={TagModalStyles.button}/>
                </View>
            </Modal>
        </GestureRecognizer>
    )
}