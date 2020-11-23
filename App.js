import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {

  const [nome, setNome] = useState('')
  const [input, setInput] = useState('')
  const nomeInput = useRef(null)

  useEffect(() => {
    async function getStorage() {
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if (nomeStorage !== null) {
        setNome(nomeStorage);
      }
    }
    getStorage();
    //return() =>{};
  }, [])

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem('nomes', nome)
    }
    saveStorage();
  }, [nome])

  function alteraNome() {
    setNome(input);
    setInput('');
    Keyboard.dismiss;
  }

  function novoNome() {
    nomeInput.current.focus();
  }

  const letrasNome = useMemo(() => nome.length, [nome])
  console.log(letrasNome)

  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Seu nome...'
        value={input}
        onChangeText={(texto) => setInput(texto)}
        onSubmitEditing={alteraNome}
        ref={nomeInput}
      />

      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>
          Alterar Nome
        </Text>
      </TouchableOpacity>

      <Text style={styles.texto}>
        {nome}
      </Text>
      <Text style={styles.texto}>
        Tem {letrasNome} letras
      </Text>

      <TouchableOpacity style={styles.btn} onPress={novoNome}>
        <Text style={styles.btnText}>
          Novo nome
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  texto: {
    fontSize: 35
  },
  btn: {
    backgroundColor: '#222',
    alignItems: 'center',
    margin: 15,
    borderRadius: 25,
    height: 35,
    justifyContent: 'center',
    width: 125,
    alignSelf: 'center',
    elevation: 5
  },
  btnText: {
    color: 'white'
  }
})