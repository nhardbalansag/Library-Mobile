import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Alert,
    ActivityIndicator
} from 'react-native';

import { Input } from 'react-native-elements';

import {styles, colors} from '../styles/styles'

import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Header, Content, Card, CardItem, Body, Left, Thumbnail, Button, Right } from "native-base";

import { 
    useSelector
} from 'react-redux';

import {APP_LINK} from '../config'

const ViewOne = ({navigation}) =>{

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const tokenresponse = useSelector(state => state.users.Token);
  const bookId = useSelector(state => state.users.BookId);

  const [refreshing, setRefreshing] = useState(false);
  const [Startrefreshing, setStartRefreshing] = useState(true);
  const [bookInfo, setbookInfo] = useState();
  const [loadingstate, setloadingstate] = useState(false);

    useEffect(() => {
        viewAllBooks(bookId)
    }, []); 

    const getBook = async (bookId) =>{
        setloadingstate(true)
        try {
            const response  = await fetch(APP_LINK + 'get-book', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + tokenresponse
                },
                body: JSON.stringify({
                    bookId
                })
            });  
            
            const responseData = await response.json();
            alertMessage(responseData)
        } catch (error) {
            ErrorMessage(error.message);
        }
        setloadingstate(false)
    }

    const viewAllBooks = async (bookId) => {
        setRefreshing(true)
        try {
            const response  = await fetch(APP_LINK + 'view-one-available-book/' + bookId, {
                method:'GET',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + tokenresponse
                }
            });  
            
            const responseData = await response.json();
            setbookInfo(responseData)
        } catch (error) {
            ErrorMessage(error.message);
        }
        setRefreshing(false)
        setStartRefreshing(false)
    }

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message? "Book added Successfully" : "failed",
            message? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
        );
    }

    const ErrorMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            [ { text: "OKAY"}]
        );
    }

    const refreshPage = () =>{
        setStartRefreshing(true)
        viewAllBooks(bookId)
    }

    const renderItem = () =>{
        return(
        <View>
            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text style={[styles.textBold]}>{bookInfo.title}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>
                               {bookInfo.description}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Text>{bookInfo.bookCategoryTitle}</Text>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                    <Left>
                        <Thumbnail source={require('../image/Library.png')} />
                        <Body>
                            <Text>Eulogio Amang Rodgriquez Institute Vocational High School</Text>
                            <Text note>EARIVHS</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image 
                            resizeMode="contain" 
                            source={{uri: 'http://library-cms.online/storage/' + bookInfo.image_path}} 
                            style={{height: 200, width: null, flex: 1}}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={[styles.flexRow, styles.justifySpaceAround, styles.alignCenter]}>
                                <Icon name='list' size={20} />
                                <Text style={[{marginLeft:5}]}>{bookInfo.book_inventory_count} Books Available</Text>
                            </View>
                        </Left>
                        <Right>
                            <TouchableOpacity onPress ={() => getBook(bookInfo.id)} style={[styles.backgroundPrimary, styles.rounded, {paddingHorizontal:30, paddingVertical:10}]}>
                                <View style={[styles.flexRow, styles.alignCenter]}>
                                    <Icon name='bookmark' size={20} color={colors.lightColor} />
                                    <Text style={[styles.textWhite, styles.font16, {marginLeft:5}]}>Get Book</Text>
                                    {
                                    loadingstate ? <ActivityIndicator style={[{marginLeft:5}]} size="small" color={colors.lightColor}/> : <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </View>
        )
    }

    return(
        <SafeAreaView>
            {
                !Startrefreshing
                ?
                    <FlatList 
                        ListHeaderComponent={renderItem}
                        refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
                        }
                    />
                :
                    <>
                        <ActivityIndicator style={[styles.mT10]} size="large" color={colors.primaryColor}/> 
                    </>
            }
            
       </SafeAreaView>
    );
}

export default ViewOne;