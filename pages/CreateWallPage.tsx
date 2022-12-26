import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect} from "react";
import {Colors} from '../resources/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from "react-native-config";

interface CreateWallPageProps {
    isDarkMode: Boolean,
    closeModal: () => void
}

export const CreateWallPage = (props: CreateWallPageProps) => {

    const [text, setText] = React.useState('');

    function isValidInput(text: string) {
        console.log('text.length = ')
        console.log(text.length)
        return text.length > 0;
    }

    const fetchData = async (prompt: string) => {
        return await openai.createImage({
            prompt: prompt,
            n: 2,
            size: "1024x1024",
        });
    }
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        organization: "org-AhDSl82kW4GNckj56v3nY1pQ",
        apiKey: Config.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    useEffect(() => {

        // if (isValidInput(text)) {
        //     console.log('valid input. Making API call. Input = ' + text);
        //     fetchData(text).then(response => {
        //         console.log('Raw response' + JSON.stringify(response))
        //     });
        // } else {
        //     console.log('invalid input ');
        // }

        console.log('text changed. new = ' + text);


    }, [text])
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
        modalView: {
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'column',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        titleBar: {
            flexDirection: "row",
            backgroundColor: Colors.layerColor
        },
        closeButton: {
            borderColor: Colors.textColorSurface,
            borderWidth: 1,
            flexWrap: 'wrap',
            borderRadius: 24,
            alignSelf: 'baseline',
            marginHorizontal: 12,
            marginVertical: 12
        },
        backgroundDark: {
            backgroundColor: Colors.background,
        },
        backgroundLight: {
            backgroundColor: '#fff',
        },
        textInput: {
            margin: 12,
            color: '#fff',
            backgroundColor: Colors.transparent,
        },
        title: {
            flex: 1,
            marginHorizontal: 12,
            marginTop: 12,
            fontSize: 24,
            lineHeight: 31,
            color: Colors.textColorSurface
        },
        searchBar: {
            flexDirection: 'row',
            marginTop: 12,
            backgroundColor: Colors.layerColor,
        },
        resultContainer: {
            marginHorizontal: 12,
            flex: 1
        },
        buttonGenerate: {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#605651',
            flex: 1,
            marginHorizontal: 12,
            alignContent: 'center',
            marginBottom: 24,
            flexWrap: 'wrap',
            alignSelf: 'baseline',
            backgroundColor: props.isDarkMode ? Colors.generateDark : Colors.lighter,
        },
        generateText: {
            marginHorizontal: 12,
            fontSize: 24,
            padding: 12,
            color: Colors.black,
            alignSelf: 'center',
            lineHeight: 31,
        }
    });

    function requestImages(text: string) {
        if (isValidInput(text)) {
            console.log('valid input. Making API call. Input = ' + text);
            fetchData(text).then(response => {
                console.log('Raw response' + JSON.stringify(response))
            }).catch(err => {
                console.log('error = ' + JSON.stringify(err))
            });
        } else {
            console.log('invalid input ');
        }
    }

    return (<SafeAreaView style={styles.centeredView}>
        <View
            style={[
                styles.modalView,
                props.isDarkMode ? styles.backgroundDark : styles.backgroundLight,
            ]}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>
                    Imagine...
                </Text>
                <MaterialIcons.Button
                    style={styles.closeButton}
                    name={'close'}
                    backgroundColor={Colors.transparent}
                    color={Colors.textColor}
                    onPress={() => props.closeModal()}>
                    Close
                </MaterialIcons.Button>
            </View>
            <View style={styles.searchBar}>
            <TextInput
                style={styles.textInput}
                onChangeText={(input) => {
                    console.log('input = ' + input)
                    setText(input);
                }}
                onSubmitEditing={(event) => {
                    setText(event.nativeEvent.text);
                    requestImages(text)
                }}
                placeholder={'"A cat standing on top of Empire state building"'}
                cursorColor={Colors.white}
                placeholderTextColor={Colors.textColorHint}
            />
            </View>
            <View style={styles.resultContainer}>
                <Text>So empty</Text>
            </View>
            <View style={{
                flexDirection: "row",
            }}>
                <Pressable
                    style={({pressed}) => [styles.buttonGenerate, {opacity: pressed ? 0.5 : 1}]}
                    onPress={() => {
                        console.log('Submit query. query = ' + text)
                        requestImages(text)
                    }}>
                    <Text style={styles.generateText}>Generate</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>);
}




