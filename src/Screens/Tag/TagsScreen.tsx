import { View, Text, FlatList, RefreshControl, ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import CommonStyles from '../../styles/CommonStyles'
import TitleScreen from '../../components/TitleScreen'
import TagCard from '../../components/cards/TagCard'
import TagsStyles from '../../styles/Screens/Tag/TagsStyles'
import TopBar from '../../components/TopBar'
import { COLORS } from '../../library/CommonColors'
import TextIconButton from '../../components/Buttons/TextIconButton'
import Client from '../../library/class/Client'
import TagBuilder from '../../library/builders/TagBuilder'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TagsScreen({navigation, route } : any) {

    const client:Client = route.params.client;

    const [tags, setTags] = useState(Array.from(client.tagService.tags.values()));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation]);

    const onRefresh = async () => {
        const tags = Array.from(client.tagService.tags.values());
        setTags([...tags]);
    };

    const onRefreshFecthAPI = async () => {
        setIsLoading(true);
        try{
            const tags = Array.from((await client.tagService.fetchTags()).values());
            setTags([...tags]);
        } catch(error) {
            ToastAndroid.show("Problème lors du chargement des tags" , ToastAndroid.CENTER);
        }
        setIsLoading(false);
    };

    const onChangeSearch = (text : string) => {
        const filteredTags = Array.from(client.tagService.tags.values()).filter((tag) =>
            tag.textTag.toLowerCase().includes(text.toLowerCase())
        );
        setTags([...filteredTags]);
    };

    const onClickAddTag = () => {
        const tag = new TagBuilder(client);
        navigation.navigate('AddTagScreen', { tag });
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={(text) => onChangeSearch(text)}/>
            <View style={TagsStyles.headerContainer}>
                <View style={TagsStyles.textHeaderContainer}>
                    <MaterialCommunityIcons name="tag-multiple" color={COLORS.accentColor} size={30}/>
                    <Text style={TagsStyles.textHeader}>Mes Tags</Text>
                </View>
                <TextIconButton callBack={onClickAddTag} iconSize={30} showText={false} buttonStyle={TagsStyles.buttonHeader} iconName={'plus'} iconColor={COLORS.foreground}/>
            </View>
            <FlatList style={CommonStyles.flatListContainer} 
                ListEmptyComponent={<Text style={CommonStyles.noItems}>{!isLoading && "Aucun tag n'a été trouvé"}</Text>}
                columnWrapperStyle={TagsStyles.columnWrapperStyle}
                contentContainerStyle = {TagsStyles.tagsContainer}
                initialNumToRender={2}
                numColumns={2}
                data={tags}
                renderItem={({item, index}) => 
                    <View style={{flex: 1,marginLeft: index % 2 !== 0 ? 20 : 0}}>
                        <TagCard key={item.idTag} tag={item} navigation={navigation}/>
                    </View>
                }
                keyExtractor={item => item.idTag.toString()}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefreshFecthAPI}/>}
            />
        </View>
    ) 
}