import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  
      footer:{
        position: 'absolute',
        bottom: 0,
        left:0,
        right: 0,
        backgroundColor: '#1F2024',
        justifyContent: 'center',
        alignItems: 'center'
      },
      logos:{
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
      icons:{
          width:40,
          height:40,
          padding:10,
          margin:5,
          backgroundColor:'white',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:5,
      },
      icon:{
      },
      footerText:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
     
})

export default style;