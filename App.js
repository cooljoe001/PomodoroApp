// You can import supported modules from npm
// import { Card } from 'react-native-paper';

// or any files within the Snack
import {
  Text,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Vibration
} from 'react-native';
import { colors } from './assets/src/utils/colors';
import { TextInput } from 'react-native-paper';
import {ProgressBar} from 'react-native-paper';
import { useState } from 'react';
import { spacing } from './assets/src/utils/sizes';
import { Countdown } from './assets/src/Components/Countdown';
import { useKeepAwake } from 'expo-keep-awake';
import {FocusHistory}  from './assets/src/Components/FocusHistory';


export default function App() {
  const [currentsubject, setCurrentsubject] = useState();
  const [history,setHistory]=useState(["things"]);
   return (
    <SafeAreaView style={styles.container}>
      {!currentsubject ? (
        <>
        <Focus addSubject={setCurrentsubject} />
        <FocusHistory history={history}/>
        </>
      ) : (
        <Timer
          focusSubject={currentsubject}
          onTimerEnd={() => {}}
          clearSubject={() => {setCurrentsubject(null)}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 0.8,
    marginRight: 10,
    marginLeft: 18,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },

  cont: {
    flex: 1,
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper:{
    flex:0.1,
    flexDirection: 'row',
    paddingTop:spacing.xxl
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color:colors.white,
    textAlign:'center',
    fontWeight:"bold"
  },
  task:{
    color:colors.white,
    textAlign:"center"
  },
  timingButton:{
    flex:1,
      alignItems:'center',
  },
  clearSubjectWrapper:{
    flexDirection:"row",
    justifyContent:'center'
  }

});

const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          label="What would you like to focus on ?"
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[stylles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[stylles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const stylles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 2,
  },
  text: { color: colors.white, fontSize: size / 3 },
});

//IMPLEMENTING VIBRATION
 const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

const Timer = ({ focusSubject,clearSubject }) => {
   useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress,setProgress]=useState(1);
  const [minutes,Setminutes]=useState(0.1);

  const onEnd=(reset)=>{
   Vibration.vibrate(PATTERN);
   setIsStarted(false);
   setProgress(1);
   reset();
  }
  return (
    <View style={styles.cont}>
      <View style={styles.countdown}>
        <Countdown
        minutes={minutes}
          isPaused={isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{paddingTop:spacing.xxl}}>
        <Text style={styles.title}>Focusing on :</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop:spacing.sm}}>
      <ProgressBar 
      progress={progress}
      color={colors.progressBar}
      style={{height:spacing.sm}}

      />
      
      </View>

       <View style={styles.timingWrapper}>
       <Timing onChangeTime={Setminutes} />

       </View>


      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
     <View style={styles.clearSubjectWrapper}>
     <RoundedButton size={50} title="-" onPress={clearSubject}/>
     </View>
    </View>
  );
};

 const Timing=({onChangeTime})=>{
   return  (
     <>

     <View style={styles.timingButton}>
          <RoundedButton
            title="30"
            size={75}
            onPress={()=>onChangeTime(30)}
          / >
          </View>

          
     <View style={styles.timingButton}>
          <RoundedButton
            title="45"
            size={75}
            onPress={()=>onChangeTime(45)}
          / >
          </View>

          
     <View style={styles.timingButton}>
          <RoundedButton
            title="60"
            size={75}
            onPress={()=>onChangeTime(60)}
          / >
          </View>

          </>
   )


 } 
