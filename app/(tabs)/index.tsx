import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, {  ReactNode } from "react";

interface items {
  id: number;
  name: string;
  value: string;
}
const arrItems: items[] = [
  {
    id: 1,
    name: "mirmonir",
    value: "best",
  },
  {
    id: 2,
    name: "mirmonir",
    value: "best",
  },
  {
    id: 3,
    name: "mirmonir",
    value: "best",
  },
  {
    id: 4,
    name: "mirmonir",
    value: "best",
  },
];
const index: React.FC = () => {
  return (
    <Container>
      <View style={styles.container}>
        {arrItems?.map((data, index) => (
               <View key={data.id} style={styles.child_container}>
              <Text style={styles.text}>{data?.name}</Text>
              <Text style={styles.text}>{data?.value}</Text>
            </View>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent:'flex-start',
    marginTop:30,
    gap: 24,
  },
  child_container: {
    padding: 12,
    backgroundColor: "green",
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: "inter",
    textTransform: "capitalize",
    color: "white",
  },
  image_container:{
    width:200,
    height:200,
    borderRadius:16,
    marginBottom:12
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderWidth:1,
    borderColor:'red'
  }
});
export default index;

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <View style={containerStyle.conatiner}>{children}</View>
    </>
  );
};
const containerStyle = StyleSheet.create({
  conatiner: {
    flex:1,
    paddingHorizontal: 24,
  },
});
