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

import * as Student from '../redux/user/userActions'; 

import { Rating, AirbnbRating } from 'react-native-elements';

import { Container, Header, Content, Card, CardItem, Body, Left, Thumbnail, Button, Right } from "native-base";

import { 
    useDispatch,
    useSelector
  } from 'react-redux';

import {APP_LINK} from '../config'

const MyBooks = ({navigation}) =>{

  const dispatch = useDispatch(); 

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const tokenresponse = useSelector(state => state.users.Token);

  const [refreshing, setRefreshing] = useState(false);
  const [Startrefreshing, setStartRefreshing] = useState(true);
  const [loadMoreBool, setLoadmoreBool] = useState(false);
  const [allBooks, setallBooks] = useState();

  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState();
  const [total, setTotal] = useState();

   useEffect(() => {
    viewAllBooks(limit)
}, [limit]); 

    const viewAllBooks = async (limit) => {
        setRefreshing(true)
        setLoadmoreBool(true)
        try {
            const response  = await fetch(APP_LINK + 'get-mybook/' + limit, {
                method:'GET',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + tokenresponse
                }
            });  
            
            const responseData = await response.json();
            setallBooks(responseData.data)
            setCount(responseData.to)
            setTotal(responseData.total)

        } catch (error) {
            ErrorMessage(error.message);
        }
        setRefreshing(false)
        setStartRefreshing(false)
        setLoadmoreBool(false)
    }

    const rateBook = async (borrrowId, bookId) => {
        setRefreshing(true)
        try {
            const response  = await fetch(APP_LINK + 'ratings/rate-books', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + tokenresponse
                },
                body: JSON.stringify({
                    borrrowId, 
                    bookId
                })
            }); 

            const responseData = await response.json();

            ErrorMessage(responseData);

        } catch (error) {
            ErrorMessage(error.message)
        }
        setRefreshing(false)
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
        viewAllBooks(limit)
    }

   const loadmore = () =>{
        return(
                total > count
                ? 
                    <View style={[{flex:1, flexDirection:'row', justifyContent:'center', marginVertical:20}]}>
                        <TouchableOpacity 
                            onPress={() =>  setLimit(count + 2)}
                            style={[{
                                backgroundColor:colors.primaryColor,
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderRadius:10
                            }]}>
                            <View style={[{flexDirection:'row', justifyContent:'center', alignItems:'center'}]}>
                                <Text
                                    style={[{
                                        color:'white',
                                        fontSize:15,
                                        marginRight:5
                                    }]}
                                >
                                    Load more
                                </Text>
                                {
                                    !loadMoreBool 
                                    ? <Icon name="spinner" size={20} color={colors.lightColor} />
                                    : <Text> <ActivityIndicator size="small" color={colors.lightColor}/> </Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                : 
                    <></>
        )
    }

   const renderItem = ({item}) =>{
       return(
        <View>
            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text style={[styles.textBold]}>{item.title}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <View>
                                <Text>
                                    {item.description}
                                </Text>
                                <Text>{item.bookCategoryTitle}</Text>
                            </View>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <AirbnbRating
                            count={4}
                            reviews={["Terrible", "Good", "Satisfied", "Great"]}
                            defaultRating={4}
                            size={30}
                            onFinishRating={(text) => rateBook(item.borrowId, item.id)}
                        />
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
                            source={{uri: 'http://library-cms.online/storage/' + item.image_path}} 
                            style={{height: 200, width: null, flex: 1}}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={[styles.flexCol, styles.alignFlexStart]}>
                                <View style={[styles.flexRow, styles.justifySpaceAround, styles.alignCenter]}>
                                    <Text style={[styles.textBold]}>STATUS: </Text>
                                    <Text style={[item.borrowStatus == 'borrowed' ? styles.bgSuccess : (item.borrowStatus == 'pending' ? styles.bgWarning : styles.bgDanger), styles.textWhite, styles.rounded, {marginLeft:5, padding: 5}]}>{item.borrowStatus}</Text>
                                </View>
                                <View style={[styles.flexCol]}>
                                    <View style={[styles.flexRow, styles.justifySpaceAround, styles.alignCenter]}>
                                        <Text style={[styles.textBold]}>Date Borrow: </Text>
                                        <Text style={[styles.textDark]}>{item.dateBorrowed}</Text>
                                    </View>
                                    <View style={[styles.flexRow, styles.justifySpaceAround, styles.alignCenter]}>
                                        <Text style={[styles.textBold]}>Date to Return: </Text>
                                        <Text style={[styles.textDark]}>{item.dateReturned}</Text>
                                    </View>
                                </View>
                            </View>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </View>
       )
   }

   const loadPage = () =>{
        return(
            <View style={[styles.flexRow, styles.alignCenter, styles.justifyCenter, {marginVertical:20}]}>
                <TouchableOpacity 
                    onPress={() =>  viewAllBooks(limit)}
                    style={[{
                        backgroundColor:colors.primaryColor,
                        paddingVertical:10,
                        paddingHorizontal:10,
                        borderRadius:10
                    }]}>
                    <View style={[{flexDirection:'row', justifyContent:'center', alignItems:'center'}]}>
                        <Text
                            style={[{
                                color:'white',
                                fontSize:15,
                                marginRight:5
                            }]}
                        >
                            Refresh
                        </Text>
                        {
                            !loadMoreBool 
                            ? <Icon name="spinner" size={20} color={colors.lightColor} />
                            : <Text> <ActivityIndicator size="small" color={colors.lightColor}/> </Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
   }

    return(
        <SafeAreaView>
            {
                !Startrefreshing
                ?
                    <>
                    {
                        count ?
                            <>
                                <FlatList 
                                    keyExtractor={item => item.borrowId.toString()} 
                                    data={allBooks} 
                                    renderItem={renderItem} 
                                    ListFooterComponent={loadmore()}
                                    numColumns={1}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
                                    }
                                />
                            </>
                        :
                            loadPage() 
                    }
                    </>
                   
                :
                    <>
                        <ActivityIndicator style={[styles.mT10]} size="large" color={colors.primaryColor}/> 
                    </>
            }
            
       </SafeAreaView>
    );
}

export default MyBooks;