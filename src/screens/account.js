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

import { 
    useDispatch,
    useSelector
  } from 'react-redux';

import {APP_LINK} from '../config'

const Account = ({navigation}) =>{

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
            const response  = await fetch(APP_LINK + 'view-all-available-books/' + limit, {
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

    const ViewOneBook = async (BookId) =>{
        try {
            await dispatch(Student.ViewOneBook(BookId));
            navigation.navigate('ViewOneScreen')
        } catch (error) {
            ErrorMessage(error.message);
        }
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
           <TouchableOpacity onPress={() => ViewOneBook(item.id)} style={[styles.mB2, {width:"50%", height:300, paddingHorizontal:5, paddingVertical:5}]}>
               <View style={[styles.bgLight, styles.flexCol, styles.rounded, {paddingHorizontal:5, paddingVertical:10}]}>
                    <View>
                        <Image
                            style={{width:"100%", height: 200}}
                            resizeMode="contain"
                            source={{uri: 'http://library-cms.online/storage/' + item.image_path}}
                        />
                    </View>
                    <View style={[styles.mY1, {height:50}]}>
                        <Text style={[styles.textCenter, styles.textCapitalize, styles.font13]}> 
                            <Text style={[styles.textBold]}>Title: </Text>
                            {item.title}
                        </Text>
                    </View>
               </View>
           </TouchableOpacity>
       )
   }

    return(
        <SafeAreaView>
            {
                !Startrefreshing
                ?
                    <FlatList 
                        keyExtractor={item => item.id.toString()} 
                        data={allBooks} 
                        renderItem={renderItem} 
                        ListFooterComponent={loadmore()}
                        numColumns={2}
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

export default Account;