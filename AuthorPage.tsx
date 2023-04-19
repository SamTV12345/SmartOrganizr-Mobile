import {useAppDispatch, useAppSelector} from './store/hooks';
import {FC, useEffect} from 'react';
import {Page} from './models/Page';
import {AuthorEmbeddedContainer} from './models/AuthorEmbeddedContainer';
import {Author} from './models/Author';
import axios from 'axios';
import {setAuthorPage, setBaseURL} from './slices/CommonSlice';
import {mergeAuthors} from './utils/AuthorUtilList';
import {View, FlatList, Animated} from 'react-native';
import {DetailAuthorView} from './components/DetailAuthorView';
import {fixProtocol} from './utils/ProtocolUtils';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ScrollView, Text} from "native-base";
import ListItem from "./components/ListItem";
import {SearchBarHeader} from "./components/SearchBarHeader";
import {DetailNoteView} from "./components/DetailNoteView";

interface AuthorPageProps {
  navigation: any;
}
export const AuthorPage = () => {
  const authors = useAppSelector(state => state.commonReducer.authors);
  const authorPage = useAppSelector(state => state.commonReducer.authors);
  const dispatch = useAppDispatch();
  const keycloakConfig = useAppSelector(
    state => state.commonReducer.keycloakConfig,
  );
  const accessToken = useAppSelector(state => state.commonReducer.accessToken);
  const loginURL = useAppSelector(state => state.commonReducer.loginURL);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (authors === undefined && keycloakConfig) {
      const authorLink =
        keycloakConfig._links.author.href.substring(
          0,
          keycloakConfig._links.author.href.lastIndexOf('/'),
        ) + '?page=0';
      dispatch(
        setBaseURL(
          keycloakConfig._links.author.href.substring(
            0,
            keycloakConfig._links.author.href.indexOf('/authors'),
          ),
        ),
      );
      loadAuthors(authorLink);
    }
  }, [accessToken]);

  const loadAuthors = async (link: string) => {
    const authorsInResponse: Page<AuthorEmbeddedContainer<Author>> =
      await new Promise<Page<AuthorEmbeddedContainer<Author>>>(resolve => {
        axios
          .get(fixProtocol(link.replace("?page=0","/authors?page=0")))
          .then(resp => resolve(resp.data))
          .catch(error => {
            console.log(error);
          });
      });
    if (authorsInResponse !== undefined) {
      if (authorPage !== undefined) {
        dispatch(setAuthorPage(mergeAuthors(authorPage, authorsInResponse)));
      } else {
        dispatch(setAuthorPage(authorsInResponse));
      }
    }
  };

  const AuthorView: FC<AuthorPageProps> = ({navigation}) => {
    return (
      <View>
        <Text style={{fontSize: 20, textAlign:'center', fontWeight:"500", marginTop: '5%', marginBottom: '4%'}}>Authoren</Text>
        {authors && (
            <FlatList ListHeaderComponent={<SearchBarHeader/>}
            data={authors._embedded?authors._embedded.authorRepresentationModelList: []}

            onEndReached={() => {
              if (authors._links.next !== undefined) {
                loadAuthors(authors._links.next.href);
              }
            }}
            renderItem={({item}) => (
              <ListItem item={item} navigate={navigation} />
            )}
          />
        )}
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={AuthorView} name="Overview" />
      <Stack.Screen name={'Detailansicht'} component={DetailAuthorView} />
    </Stack.Navigator>
  );
};
